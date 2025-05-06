"use client"

import { useState, useEffect, useCallback } from "react"

export function useSound() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize sound settings from localStorage
  useEffect(() => {
    const savedSoundSetting = localStorage.getItem("terminal-sound")
    if (savedSoundSetting !== null) {
      setIsSoundEnabled(savedSoundSetting === "true")
    }
  }, [])

  // Save sound settings to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("terminal-sound", isSoundEnabled.toString())
    }
  }, [isSoundEnabled, isInitialized])

  useEffect(() => {
    // Initialize AudioContext on user interaction
    const handleUserInteraction = () => {
      if (!audioContext) {
        const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        setAudioContext(newAudioContext)
        setIsInitialized(true)
      }

      // Remove event listeners after initialization
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("keydown", handleUserInteraction)

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }
  }, [audioContext])

  // Function to play a simple tone with useCallback for stable reference
  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.2) => {
      if (!audioContext || !isSoundEnabled) return

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.type = type
      oscillator.frequency.value = frequency
      gainNode.gain.value = volume

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.start()
      oscillator.stop(audioContext.currentTime + duration)
    },
    [audioContext, isSoundEnabled],
  )

  // Different sound effects with useCallback
  const playKeyPress = useCallback(() => {
    playTone(440, 0.02, "sine", 0.05)
  }, [playTone])

  const playCommand = useCallback(() => {
    playTone(660, 0.08, "sine", 0.1)
  }, [playTone])

  const playError = useCallback(() => {
    playTone(220, 0.1, "sawtooth", 0.1)
    setTimeout(() => playTone(200, 0.1, "sawtooth", 0.1), 100)
  }, [playTone])

  const playSuccess = useCallback(() => {
    playTone(880, 0.1, "sine", 0.1)
    setTimeout(() => playTone(1320, 0.1, "sine", 0.1), 100)
  }, [playTone])

  const playBoot = useCallback(() => {
    if (!audioContext || !isSoundEnabled) return

    // Boot sequence sound
    setTimeout(() => playTone(440, 0.1, "sine", 0.1), 0)
    setTimeout(() => playTone(880, 0.1, "sine", 0.1), 200)
    setTimeout(() => playTone(1320, 0.2, "sine", 0.1), 400)
  }, [playTone, audioContext, isSoundEnabled])

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => !prev)
  }, [])

  return {
    playKeyPress,
    playCommand,
    playError,
    playSuccess,
    playBoot,
    isSoundEnabled,
    setIsSoundEnabled,
    toggleSound,
  }
}

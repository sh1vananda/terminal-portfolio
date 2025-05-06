"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback } from "react"
import { Fira_Code } from "next/font/google"
import { cn } from "@/lib/utils"
import CommandProcessor from "@/lib/command-processor"
import { useSound } from "@/hooks/use-sound"
import { ChevronRight, TerminalIcon } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { useMobile } from "@/hooks/use-mobile"

const firaCode = Fira_Code({ subsets: ["latin"] })

export default function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isBooting, setIsBooting] = useState(true)
  const [currentView, setCurrentView] = useState("home")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()

  // Create a new CommandProcessor instance with a ref to ensure it doesn't get recreated on each render
  const commandProcessorRef = useRef<CommandProcessor | null>(null)

  // Initialize the CommandProcessor only once
  if (!commandProcessorRef.current) {
    commandProcessorRef.current = new CommandProcessor(setHistory, setCurrentView, { setTheme })
  }

  const { playKeyPress, playCommand, playError, playBoot, isSoundEnabled, toggleSound } = useSound()

  // Boot sequence
  const hasBooted = useRef(false)
  useEffect(() => {
    const bootSequence = async () => {
      // Only run the boot sequence once
      if (hasBooted.current) return
      hasBooted.current = true

      playBoot()

      const bootMessages = [
        "Initializing system...",
        "Loading kernel modules...",
        "Mounting file systems...",
        "Starting network services...",
        "Initializing user interface...",
        "System ready.",
      ]

      // Clear history once at the beginning
      setHistory([])

      for (const message of bootMessages) {
        setHistory((prev) => [...prev, message])
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      await new Promise((resolve) => setTimeout(resolve, 500))
      setHistory((prev) => [
        ...prev,
        "",
        "░█▀▄░█▀▀░▀█▀░█▀▄░█▀█░░░▀█▀░█▀▀░█▀▄░█▄█░▀█▀░█▀█░█▀█░█░░",
        "░█▀▄░█▀▀░░█░░█▀▄░█░█░░░░█░░█▀▀░█▀▄░█░█░░█░░█░█░█▀█░█░░",
        "░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░░░░▀░░▀▀▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀░▀░▀▀▀",
        "",
        "Hello! Welcome to my interactive terminal portfolio.",
        'Type "help" to see available commands.',
        "",
      ])

      setIsBooting(false)
      inputRef.current?.focus()
    }

    bootSequence()

    // Focus the input when clicking anywhere in the terminal
    const handleTerminalClick = () => {
      inputRef.current?.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Global keyboard shortcuts
      if (e.key === "Escape") {
        inputRef.current?.focus()
        setInput("")
      }
    }

    terminalRef.current?.addEventListener("click", handleTerminalClick)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      terminalRef.current?.removeEventListener("click", handleTerminalClick)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [playBoot])

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Update command processor with latest dependencies
  useEffect(() => {
    if (commandProcessorRef.current) {
      commandProcessorRef.current.updateDependencies({
        setTheme,
        toggleSound,
        isSoundEnabled,
      })
    }
  }, [setTheme, toggleSound, isSoundEnabled])

  // Handle command execution
  const executeCommand = useCallback(() => {
    if (!input.trim() || !commandProcessorRef.current) return

    const trimmedInput = input.trim()
    playCommand()

    // Add command to history display
    setHistory((prev) => [...prev, `> ${trimmedInput}`])

    // Process the command
    try {
      commandProcessorRef.current.processCommand(trimmedInput)
    } catch (error) {
      console.error("Error processing command:", error)
      setHistory((prev) => [
        ...prev,
        "",
        "An error occurred while processing your command.",
        'Please try again or type "help" for available commands.',
        "",
      ])
    }

    // Add to command history for up/down navigation
    setCommandHistory((prev) => [trimmedInput, ...prev])
    setHistoryIndex(-1)

    // Clear input
    setInput("")
    setCursorPosition(0)
  }, [input, playCommand])

  // Handle key presses
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        executeCommand()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
          setCursorPosition(commandHistory[newIndex].length)
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.selectionStart = commandHistory[newIndex].length
              inputRef.current.selectionEnd = commandHistory[newIndex].length
            }
          }, 0)
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
          setCursorPosition(commandHistory[newIndex].length)
        } else if (historyIndex === 0) {
          setHistoryIndex(-1)
          setInput("")
          setCursorPosition(0)
        }
      } else if (e.key === "Tab") {
        e.preventDefault()
        // Simple tab completion
        if (commandProcessorRef.current) {
          const commands = commandProcessorRef.current.getAvailableCommands()

          if (input) {
            const matchingCommands = commands.filter((cmd) => cmd.startsWith(input))
            if (matchingCommands.length === 1) {
              setInput(matchingCommands[0])
              setCursorPosition(matchingCommands[0].length)
            } else if (matchingCommands.length > 1) {
              setHistory((prev) => [...prev, `> ${input}`, ...matchingCommands])
            }
          }
        }
      } else if (!e.ctrlKey && !e.altKey && !e.metaKey) {
        playKeyPress()
      }
    },
    [commandHistory, historyIndex, input, executeCommand, playKeyPress],
  )

  // Handle input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setCursorPosition(e.target.selectionStart || 0)
  }, [])

  // Handle cursor position changes
  const handleSelect = useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
    setCursorPosition(e.currentTarget.selectionStart || 0)
  }, [])

  // Get terminal theme colors
  const getThemeColors = () => {
    switch (theme) {
      case "green":
        return "border-green-500 shadow-green-500/20"
      case "blue":
        return "border-blue-500 shadow-blue-500/20"
      case "amber":
        return "border-amber-500 shadow-amber-500/20"
      case "purple":
        return "border-purple-500 shadow-purple-500/20"
      case "pink":
        return "border-pink-500 shadow-pink-500/20"
      default:
        return "border-green-500 shadow-green-500/20"
    }
  }

  const getTextColor = () => {
    switch (theme) {
      case "green":
        return "text-green-400"
      case "blue":
        return "text-blue-400"
      case "amber":
        return "text-amber-400"
      case "purple":
        return "text-purple-400"
      case "pink":
        return "text-pink-400"
      default:
        return "text-green-400"
    }
  }

  const getAccentColor = () => {
    switch (theme) {
      case "green":
        return "text-green-500"
      case "blue":
        return "text-blue-500"
      case "amber":
        return "text-amber-500"
      case "purple":
        return "text-purple-500"
      case "pink":
        return "text-pink-500"
      default:
        return "text-green-500"
    }
  }

  const getBorderColor = () => {
    switch (theme) {
      case "green":
        return "border-green-800"
      case "blue":
        return "border-blue-800"
      case "amber":
        return "border-amber-800"
      case "purple":
        return "border-purple-800"
      case "pink":
        return "border-pink-800"
      default:
        return "border-green-800"
    }
  }

  const getCursorColor = () => {
    switch (theme) {
      case "green":
        return "bg-green-400"
      case "blue":
        return "bg-blue-400"
      case "amber":
        return "bg-amber-400"
      case "purple":
        return "bg-purple-400"
      case "pink":
        return "bg-pink-400"
      default:
        return "bg-green-400"
    }
  }

  const getCommandColor = () => {
    switch (theme) {
      case "green":
        return "text-cyan-400"
      case "blue":
        return "text-sky-300"
      case "amber":
        return "text-yellow-300"
      case "purple":
        return "text-indigo-300"
      case "pink":
        return "text-rose-300"
      default:
        return "text-cyan-400"
    }
  }

  return (
    <div
      ref={terminalRef}
      className={cn(
        "w-full max-w-3xl h-[80vh] bg-black border-2 rounded-md p-4 overflow-y-auto",
        "flex flex-col shadow-lg",
        getThemeColors(),
        firaCode.className,
        isMobile ? "h-[90vh]" : "h-[80vh]",
      )}
      role="region"
      aria-label="Terminal interface"
    >
      {/* Terminal header */}
      <div className={cn("flex items-center justify-between mb-4 border-b pb-2", getBorderColor())}>
        <div className="flex items-center gap-2">
          <TerminalIcon className={cn("h-5 w-5", getAccentColor())} />
          <span className={cn("font-bold", getAccentColor())}>Terminal Portfolio v1.0</span>
        </div>
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Terminal output */}
      <div className={cn("flex-1 mb-4 whitespace-pre-wrap", getTextColor())}>
        {history.map((line, i) => (
          <div key={i} className={line.startsWith(">") ? getCommandColor() : ""}>
            {line}
          </div>
        ))}
      </div>

      {/* Terminal input */}
      {!isBooting && (
        <div className={cn("flex items-center", getAccentColor())}>
          <ChevronRight className="h-4 w-4 mr-1" />
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onSelect={handleSelect}
              className={cn("w-full bg-transparent outline-none border-none caret-transparent", getTextColor())}
              autoFocus
              aria-label="Terminal input"
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" aria-hidden="true">
              <span className={getTextColor()}>{input}</span>
              <span
                className={cn("animate-pulse inline-block w-2 h-5 ml-0.5", getCursorColor())}
                style={{
                  position: "absolute",
                  left: `${cursorPosition * 0.6}rem`,
                  top: "0",
                }}
              ></span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

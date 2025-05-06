"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Theme = "green" | "blue" | "amber" | "purple" | "pink"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "green",
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("green")

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("terminal-theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("terminal-theme", theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

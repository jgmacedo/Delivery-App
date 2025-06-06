"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

type ThemeMode = "light" | "dark" | "system"

interface ThemeContextType {
  theme: "light" | "dark"
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  themeMode: "system",
  setThemeMode: () => {},
  isDark: false,
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme()
  const [themeMode, setThemeMode] = useState<ThemeMode>("system")

  useEffect(() => {
    // Load saved theme preference
    const loadThemePreference = async () => {
      try {
        const savedThemeMode = await AsyncStorage.getItem("themeMode")
        if (savedThemeMode) {
          setThemeMode(savedThemeMode as ThemeMode)
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error)
      }
    }

    loadThemePreference()
  }, [])

  const saveThemePreference = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem("themeMode", mode)
      setThemeMode(mode)
    } catch (error) {
      console.error("Failed to save theme preference:", error)
    }
  }

  // Determine actual theme based on mode and system preference
  const theme = themeMode === "system" ? systemColorScheme || "light" : themeMode

  const isDark = theme === "dark"

  const value = {
    theme,
    themeMode,
    setThemeMode: saveThemePreference,
    isDark,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

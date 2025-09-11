import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')
  const [accentColor, setAccentColor] = useState('blue')
  const [animations, setAnimations] = useState(true)
  const [particles, setParticles] = useState(true)

  const themes = {
    dark: {
      name: 'Sombre',
      bg: 'bg-gray-900',
      card: 'bg-gray-800',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700',
      accent: 'blue'
    },
    light: {
      name: 'Clair',
      bg: 'bg-gray-50',
      card: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      accent: 'blue'
    },
    ocean: {
      name: 'Océan',
      bg: 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900',
      card: 'bg-blue-800/50 backdrop-blur-sm',
      text: 'text-blue-100',
      textSecondary: 'text-blue-200',
      border: 'border-blue-600/30',
      accent: 'cyan'
    },
    sunset: {
      name: 'Coucher de Soleil',
      bg: 'bg-gradient-to-br from-orange-900 via-red-800 to-pink-900',
      card: 'bg-orange-800/50 backdrop-blur-sm',
      text: 'text-orange-100',
      textSecondary: 'text-orange-200',
      border: 'border-orange-600/30',
      accent: 'orange'
    },
    neon: {
      name: 'Néon',
      bg: 'bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900',
      card: 'bg-purple-800/30 backdrop-blur-sm border border-purple-500/20',
      text: 'text-purple-100',
      textSecondary: 'text-purple-200',
      border: 'border-purple-500/30',
      accent: 'purple'
    }
  }

  const accentColors = {
    blue: {
      primary: 'bg-blue-600 hover:bg-blue-700',
      secondary: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-500'
    },
    green: {
      primary: 'bg-green-600 hover:bg-green-700',
      secondary: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-500'
    },
    purple: {
      primary: 'bg-purple-600 hover:bg-purple-700',
      secondary: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-500'
    },
    orange: {
      primary: 'bg-orange-600 hover:bg-orange-700',
      secondary: 'bg-orange-100 dark:bg-orange-900',
      text: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-500'
    },
    pink: {
      primary: 'bg-pink-600 hover:bg-pink-700',
      secondary: 'bg-pink-100 dark:bg-pink-900',
      text: 'text-pink-600 dark:text-pink-400',
      border: 'border-pink-500'
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('whaleTheme')
    const savedAccent = localStorage.getItem('whaleAccent')
    const savedAnimations = localStorage.getItem('whaleAnimations')
    const savedParticles = localStorage.getItem('whaleParticles')

    if (savedTheme) setTheme(savedTheme)
    if (savedAccent) setAccentColor(savedAccent)
    if (savedAnimations !== null) setAnimations(JSON.parse(savedAnimations))
    if (savedParticles !== null) setParticles(JSON.parse(savedParticles))
  }, [])

  useEffect(() => {
    localStorage.setItem('whaleTheme', theme)
    localStorage.setItem('whaleAccent', accentColor)
    localStorage.setItem('whaleAnimations', JSON.stringify(animations))
    localStorage.setItem('whaleParticles', JSON.stringify(particles))

    // Appliquer le thème au document
    const currentTheme = themes[theme]
    const currentAccent = accentColors[accentColor]

    document.documentElement.className = theme === 'dark' ? 'dark' : ''
    
    // Appliquer les couleurs personnalisées
    const root = document.documentElement
    root.style.setProperty('--theme-bg', currentTheme.bg)
    root.style.setProperty('--theme-card', currentTheme.card)
    root.style.setProperty('--theme-text', currentTheme.text)
    root.style.setProperty('--theme-text-secondary', currentTheme.textSecondary)
    root.style.setProperty('--theme-border', currentTheme.border)
  }, [theme, accentColor, animations, particles])

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
  }

  const changeAccentColor = (newColor) => {
    setAccentColor(newColor)
  }

  const toggleAnimations = () => {
    setAnimations(!animations)
  }

  const toggleParticles = () => {
    setParticles(!particles)
  }

  const value = {
    theme,
    accentColor,
    animations,
    particles,
    themes,
    accentColors,
    currentTheme: themes[theme],
    currentAccent: accentColors[accentColor],
    changeTheme,
    changeAccentColor,
    toggleAnimations,
    toggleParticles
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

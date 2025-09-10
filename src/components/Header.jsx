import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  Bell, 
  Settings, 
  TrendingUp, 
  Sun, 
  Moon,
  Play,
  Square,
  Palette,
  Activity,
  Zap,
  Shield,
  Sparkles,
  Cpu,
  Database,
  Bitcoin,
  Coins
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import { useTheme } from '../context/ThemeContext'

const Header = ({ activeTab, setActiveTab }) => {
  const { isMonitoring, startMonitoring, stopMonitoring } = useWhale()
  const { theme, changeTheme } = useTheme()

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'from-blue-400 to-blue-600' },
    { id: 'trading', label: 'Bot 🤖', icon: Cpu, color: 'from-green-400 to-emerald-600' },
    { id: 'technical', label: 'Analysis 📊', icon: Activity, color: 'from-cyan-400 to-blue-600' },
    { id: 'ai', label: 'IA 🧠', icon: Shield, color: 'from-purple-400 to-pink-600' },
    { id: 'portfolio', label: 'Portfolio 💰', icon: Sparkles, color: 'from-green-400 to-emerald-600' },
    { id: 'alerts', label: 'Alertes', icon: Bell, color: 'from-red-400 to-red-600' },
    { id: 'bitcoin', label: 'BTC', icon: Bitcoin, color: 'from-orange-400 to-orange-600' },
    { id: 'ethereum', label: 'ETH', icon: Coins, color: 'from-blue-400 to-indigo-600' },
    { id: 'solana', label: 'SOL', icon: Zap, color: 'from-purple-400 to-purple-600' },
    { id: 'render', label: 'RNDR', icon: Palette, color: 'from-cyan-400 to-teal-600' },
    { id: 'funding', label: 'Funding', icon: Activity, color: 'from-purple-400 to-purple-600' },
    { id: 'openinterest', label: 'OI', icon: Database, color: 'from-cyan-400 to-cyan-600' },
    { id: 'stats', label: 'Stats', icon: TrendingUp, color: 'from-green-400 to-green-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-gray-400 to-gray-600' }
  ]

  const handleMonitoringToggle = () => {
    if (isMonitoring) {
      stopMonitoring()
    } else {
      startMonitoring()
    }
  }

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-2xl"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl"
              >
                🐋
              </motion.div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                WHALE ALERT PRO
              </h1>
              <p className="text-sm text-gray-400">Professional Crypto Monitoring</p>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                    flex items-center space-x-2 group overflow-hidden
                    ${isActive 
                      ? 'text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                    }
                  `}
                >
                  {/* Background animé pour l'onglet actif */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl opacity-0 
                    group-hover:opacity-20 transition-opacity duration-300
                  `} />
                  
                  {/* Contenu */}
                  <div className="relative z-10 flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                    <span className="hidden md:block">{tab.label}</span>
                  </div>
                  
                  {/* Glow effect pour l'onglet actif */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} blur-lg opacity-30 -z-10`} />
                  )}
                </motion.button>
              )
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:bg-white/10"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Monitoring Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMonitoringToggle}
              className={`
                relative px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300
                flex items-center space-x-3 overflow-hidden backdrop-blur-sm
                ${isMonitoring
                  ? 'bg-red-500/20 text-red-300 border-2 border-red-500/50 hover:bg-red-500/30'
                  : 'bg-green-500/20 text-green-300 border-2 border-green-500/50 hover:bg-green-500/30'
                }
              `}
            >
              {/* Background pulse pour monitoring actif */}
              {isMonitoring && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-red-500/20 rounded-xl"
                />
              )}
              
              <div className="relative z-10 flex items-center space-x-3">
                <motion.div
                  animate={isMonitoring ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  {isMonitoring ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </motion.div>
                <span className="hidden sm:block">
                  {isMonitoring ? 'ARRÊTER' : 'DÉMARRER'}
                </span>
                <Sparkles className="w-4 h-4" />
              </div>
              
              {/* Glow effect */}
              <div className={`
                absolute inset-0 blur-lg opacity-30 -z-10 rounded-xl
                ${isMonitoring ? 'bg-red-500/40' : 'bg-green-500/40'}
              `} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Progress bar animé en bas */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
    </motion.header>
  )
}

export default Header
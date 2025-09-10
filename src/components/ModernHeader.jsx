import React from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  AlertTriangle, 
  Bitcoin, 
  Coins,
  TrendingUp,
  Wallet,
  Settings,
  Activity,
  Zap,
  Eye,
  EyeOff,
  Play,
  Square
} from 'lucide-react'

const ModernHeader = ({ activeTab, setActiveTab, onToggleMonitoring, isMonitoring = false }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'alerts', label: 'Alertes', icon: AlertTriangle, badge: '0' },
    { id: 'btc', label: 'Bitcoin', icon: Bitcoin },
    { id: 'eth', label: 'Ethereum', icon: Coins },
    { id: 'sol', label: 'Solana', icon: TrendingUp },
    { id: 'rndr', label: 'Render', icon: Zap },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'ai', label: 'AI Insights', icon: Activity },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ]

  return (
    <header className="modern-header">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Whale Alert
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 ml-2">
                  Pro
                </span>
              </h1>
              <p className="text-sm text-slate-400 -mt-1">
                Surveillance crypto intelligente
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`modern-nav-item ${activeTab === item.id ? 'active' : ''}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </nav>

          {/* Contrôles */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Status surveillance */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className={`modern-status ${isMonitoring ? 'modern-status-online' : 'modern-status-offline'}`}></div>
              <span className="text-sm font-medium text-slate-300">
                {isMonitoring ? 'En ligne' : 'Hors ligne'}
              </span>
            </div>

            {/* Bouton surveillance */}
            <motion.button
              onClick={onToggleMonitoring}
              className={`modern-btn ${isMonitoring ? 'modern-btn-secondary' : 'modern-btn-primary'} px-4 py-2`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isMonitoring ? (
                <>
                  <Square className="w-4 h-4" />
                  <span className="hidden sm:inline">Arrêter</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="hidden sm:inline">Démarrer</span>
                </>
              )}
            </motion.button>

            {/* Menu mobile */}
            <motion.button
              className="lg:hidden p-2 rounded-lg bg-slate-800 border border-slate-700"
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-5 h-5 text-slate-300" />
            </motion.button>
          </motion.div>
        </div>

        {/* Navigation mobile */}
        <div className="lg:hidden mt-4 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {navItems.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`modern-nav-item whitespace-nowrap ${activeTab === item.id ? 'active' : ''}`}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default ModernHeader

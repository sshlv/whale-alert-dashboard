import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  BarChart3, 
  Shield, 
  Database,
  TrendingUp,
  Settings,
  Bell,
  User,
  Search,
  Zap
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'

const ProfessionalHeader = memo(({ activeTab, setActiveTab, onToggleMonitoring }) => {
  const { isMonitoring, alerts, stats } = useWhale()

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: alerts.length },
    { id: 'btc', label: 'Bitcoin', icon: '₿' },
    { id: 'eth', label: 'Ethereum', icon: 'Ξ' },
    { id: 'sol', label: 'Solana', icon: '◎' },
    { id: 'rndr', label: 'Render', icon: '🎨' },
    { id: 'portfolio', label: 'Portfolio', icon: Database },
    { id: 'ai', label: 'AI Insights', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <header className="professional-header sticky top-0 z-50">
      <div className="professional-container">
        <div className="professional-nav">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-10 h-10 professional-bg-card professional-rounded-md flex items-center justify-center professional-border">
                <span className="text-xl">🐋</span>
              </div>
              <motion.div 
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full professional-border ${
                  isMonitoring ? 'bg-green-400' : 'bg-red-400'
                }`}
                animate={isMonitoring ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            <div>
              <h1 className="professional-text-xl professional-font-bold professional-text-primary">
                WHALE ALERT
              </h1>
              <p className="professional-text-xs professional-text-muted">
                Professional Crypto Intelligence
              </p>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveTab(item.id)}
                className={`
                  professional-nav-item relative flex items-center gap-2 px-4 py-2 professional-rounded
                  ${activeTab === item.id 
                    ? 'professional-text-primary bg-white/10 border border-white/20' 
                    : 'professional-text-secondary hover:professional-text-primary hover:bg-white/5'
                  }
                  transition-all duration-200
                `}
              >
                {typeof item.icon === 'string' ? (
                  <span className="professional-text-base">{item.icon}</span>
                ) : (
                  <item.icon className="w-4 h-4" />
                )}
                <span className="professional-text-sm professional-font-medium">
                  {item.label}
                </span>
                {item.badge && item.badge > 0 && (
                  <span className="professional-text-xs bg-red-500 text-white px-2 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Status & Actions */}
          <div className="flex items-center gap-4">
            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`
                professional-status flex items-center gap-2 px-3 py-2 professional-rounded-lg
                ${isMonitoring ? 'professional-status-online' : 'professional-status-offline'}
              `}
            >
              <motion.div
                className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-400' : 'bg-red-400'}`}
                animate={isMonitoring ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className="professional-text-xs professional-font-semibold">
                {isMonitoring ? 'ONLINE' : 'OFFLINE'}
              </span>
            </motion.div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-4 professional-text-xs professional-text-muted">
              <div className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                <span>{alerts.length} alerts</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{stats.totalVolume || '0'} vol</span>
              </div>
            </div>

            {/* Monitoring Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleMonitoring}
              className={`
                professional-btn flex items-center gap-2 px-4 py-2 professional-rounded-lg font-medium
                ${isMonitoring 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' 
                  : 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
                }
                transition-all duration-200
              `}
            >
              <Shield className="w-4 h-4" />
              <span className="professional-text-sm">
                {isMonitoring ? 'STOP' : 'START'}
              </span>
            </motion.button>

            {/* User Menu */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="professional-btn-ghost w-8 h-8 professional-rounded-lg flex items-center justify-center"
            >
              <User className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden professional-border-t professional-bg-secondary">
        <div className="professional-container">
          <div className="flex items-center gap-1 py-2 overflow-x-auto">
            {navigationItems.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex flex-col items-center gap-1 px-3 py-2 professional-rounded min-w-[4rem]
                  ${activeTab === item.id 
                    ? 'professional-text-primary bg-white/10' 
                    : 'professional-text-muted'
                  }
                `}
              >
                {typeof item.icon === 'string' ? (
                  <span className="professional-text-sm">{item.icon}</span>
                ) : (
                  <item.icon className="w-4 h-4" />
                )}
                <span className="professional-text-xs">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white professional-text-xs rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
})

ProfessionalHeader.displayName = 'ProfessionalHeader'

export default ProfessionalHeader

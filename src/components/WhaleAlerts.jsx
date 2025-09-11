import React, { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Eye,
  EyeOff,
  Coins,
  Bitcoin,
  Zap,
  Palette
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import EnhancedAlertCard from './EnhancedAlertCard'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import AnimatedBackground from './ui/AnimatedBackground'

const WhaleAlerts = memo(() => {
  const { alerts, stats } = useWhale()
  const [showAddresses, setShowAddresses] = React.useState(false)
  const [filter, setFilter] = React.useState('all')

  const getAlertLevel = (value) => {
    if (value >= 1000000) return { level: 'whale', color: 'text-red-400', bgColor: 'bg-red-500/10', icon: '🔴' }
    if (value >= 500000) return { level: 'large', color: 'text-orange-400', bgColor: 'bg-orange-500/10', icon: '🟠' }
    return { level: 'medium', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', icon: '🟡' }
  }

  const getChainIcon = (type) => {
    const icons = {
      'ETH': Coins,
      'BTC': Bitcoin,
      'SOL': Zap,
      'RNDR': Palette
    }
    return icons[type] || Coins
  }

  const getChainEmoji = (type) => {
    const emojis = {
      'ETH': '🔷',
      'BTC': '🟠',
      'SOL': '🟣',
      'RNDR': '🎨'
    }
    return emojis[type] || '💰'
  }

  const formatAddress = (address) => {
    if (!showAddresses) return `${address.slice(0, 6)}...${address.slice(-4)}`
    return address
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true
    const alertInfo = getAlertLevel(alert.value_usd)
    return alertInfo.level === filter
  })

  const alertMetrics = [
    {
      title: '🔔 Total Alertes',
      value: alerts.length.toLocaleString(),
      change: '+15%',
      changeType: 'positive',
      icon: AlertTriangle,
      gradient: 'red'
    },
    {
      title: '🐋 Baleines',
      value: alerts.filter(a => a.value_usd >= 1000000).length,
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'purple'
    },
    {
      title: '📊 Dernière Heure',
      value: alerts.filter(a => Date.now() - new Date(a.timestamp).getTime() < 3600000).length,
      change: '+22%',
      changeType: 'positive',
      icon: Clock,
      gradient: 'blue'
    },
    {
      title: '📈 Tendance',
      value: 'Haussière',
      change: 'Active',
      changeType: 'positive',
      icon: TrendingUp,
      gradient: 'green'
    }
  ]

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header Premium */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-black mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              🚨 WHALE ALERTS
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-4xl">
              SURVEILLANCE CENTER
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Centre de surveillance des grosses transactions crypto
          </motion.p>
        </motion.div>

        {/* Métriques Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {alertMetrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Filtres et Contrôles */}
        <PremiumCard className="group mb-8" delay={0.5}>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <h3 className="text-2xl font-bold text-white">🔍 Filtres</h3>
              <div className="flex space-x-2">
                {[
                  { id: 'all', label: 'Toutes', color: 'from-gray-500 to-gray-600' },
                  { id: 'whale', label: 'Baleines', color: 'from-red-500 to-red-600' },
                  { id: 'large', label: 'Grosses', color: 'from-orange-500 to-orange-600' },
                  { id: 'medium', label: 'Moyennes', color: 'from-yellow-500 to-yellow-600' }
                ].map((filterOption) => (
                  <motion.button
                    key={filterOption.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(filterOption.id)}
                    className={`
                      px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300
                      ${filter === filterOption.id 
                        ? `bg-gradient-to-r ${filterOption.color} text-white shadow-lg` 
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {filterOption.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddresses(!showAddresses)}
              className="btn-premium flex items-center space-x-2"
            >
              {showAddresses ? <EyeOff size={18} /> : <Eye size={18} />}
              <span>{showAddresses ? 'Masquer' : 'Afficher'} adresses</span>
            </motion.button>
          </div>
        </PremiumCard>

        {/* Liste des Alertes */}
        <PremiumCard className="group" delay={0.7}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">📋 Alertes Détectées</h3>
              <p className="text-gray-400 text-lg">{filteredAlerts.length} alertes correspondantes</p>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert, index) => (
                  <EnhancedAlertCard
                    key={alert.id || alert.hash}
                    alert={alert}
                    index={index}
                    delay={index * 0.05}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-2xl font-semibold text-gray-300 mb-4">Aucune alerte trouvée</h3>
                  <p className="text-gray-500 text-lg">
                    {filter === 'all' 
                      ? 'Aucune alerte détectée pour le moment'
                      : `Aucune alerte de type "${filter}" trouvée`
                    }
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PremiumCard>
      </div>
    </div>
  )
})

WhaleAlerts.displayName = 'WhaleAlerts'

export default WhaleAlerts
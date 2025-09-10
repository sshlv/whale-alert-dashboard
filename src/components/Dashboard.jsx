import React, { memo, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Activity, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  Eye,
  EyeOff,
  Coins,
  Bitcoin,
  Zap,
  Palette,
  Globe,
  Shield,
  Cpu,
  Bell,
  BarChart3,
  Wifi
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import { useNotifications } from './NotificationSystem'
import { useRealTime } from './RealTimeDataManager'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import AnimatedBackground from './ui/AnimatedBackground'
import { usePerformance } from '../hooks/usePerformance'

// Lazy loading pour optimiser les performances
const PriceTicker = lazy(() => import('./PriceTicker'))
const ExportData = lazy(() => import('./ExportData'))
const FundingRateMonitor = lazy(() => import('./FundingRateMonitor'))
const AISignalGenerator = lazy(() => import('./AISignalGenerator'))
const APIStatus = lazy(() => import('./APIStatus'))

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="spinner" />
  </div>
)

const Dashboard = memo(() => {
  const { alerts, stats, isMonitoring, settings } = useWhale()
  const { addNotification, templates } = useNotifications()
  const { liveData } = useRealTime()
  const [showAddresses, setShowAddresses] = React.useState(false)
  const { isLoading } = usePerformance()

  const recentAlerts = alerts.slice(0, 5)

  // Génération d'alertes automatiques pour démonstration
  React.useEffect(() => {
    if (!isMonitoring) return

    const generateAlert = () => {
      const cryptos = ['BTC', 'ETH', 'SOL', 'RNDR']
      const exchanges = ['Binance', 'Coinbase', 'Kraken', 'Bybit']
      const crypto = cryptos[Math.floor(Math.random() * cryptos.length)]
      const exchange = exchanges[Math.floor(Math.random() * exchanges.length)]
      const amount = (Math.random() * 50 + 5).toFixed(1) + 'M'

      addNotification(templates.whaleMovement(crypto, `$${amount}`, exchange))
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% de chance de générer une alerte
        generateAlert()
      }
    }, 8000) // Toutes les 8 secondes

    return () => clearInterval(interval)
  }, [isMonitoring, addNotification, templates])

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

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header Ultra-Premium */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-7xl md:text-8xl font-black mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              🐋 WHALE ALERT
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent text-5xl">
              PROFESSIONAL
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Surveillance intelligente et analyse avancée des transactions crypto
          </motion.p>
          
          {/* Status Premium */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="inline-flex items-center"
          >
            <div className={`
              relative px-8 py-4 rounded-2xl font-bold text-lg flex items-center space-x-4
              ${isMonitoring 
                ? 'bg-green-500/20 text-green-300 border-2 border-green-500/50' 
                : 'bg-red-500/20 text-red-300 border-2 border-red-500/50'
              }
              backdrop-blur-xl
            `}>
              <motion.div 
                className={`w-4 h-4 rounded-full ${isMonitoring ? 'bg-green-400' : 'bg-red-400'}`}
                animate={isMonitoring ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span>{isMonitoring ? '🟢 SYSTÈME ACTIF' : '🔴 SYSTÈME INACTIF'}</span>
              <Wifi className="w-5 h-5" />
              
              {/* Glow effect */}
              <div className={`
                absolute inset-0 rounded-2xl blur-xl opacity-50
                ${isMonitoring ? 'bg-green-500/30' : 'bg-red-500/30'}
              `} />
            </div>
          </motion.div>
        </motion.div>

        {/* Métriques Ultra-Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <MetricCard
            title="🔔 Alertes Temps Réel"
            value={alerts.length.toLocaleString()}
            change={isMonitoring ? "🟢 En direct" : "🔴 Arrêté"}
            changeType={isMonitoring ? "positive" : "negative"}
            icon={Bell}
            gradient="blue"
            delay={0.1}
          />
          <MetricCard
            title="💰 Prix BTC Live"
            value={liveData?.prices?.BTC ? `$${Math.round(liveData.prices.BTC.price).toLocaleString()}` : '$42,850'}
            change={liveData?.prices?.BTC ? `${liveData.prices.BTC.change24h > 0 ? '+' : ''}${liveData.prices.BTC.change24h.toFixed(1)}%` : '+3.2%'}
            changeType={(liveData?.prices?.BTC?.change24h || 3.2) > 0 ? "positive" : "negative"}
            icon={DollarSign}
            gradient="green"
            delay={0.2}
          />
          <MetricCard
            title="📊 Fear & Greed Index"
            value={Math.round(liveData?.marketSentiment?.fearGreedIndex || 72)}
            change={liveData?.marketSentiment?.fearGreedIndex > 75 ? "Extrême Greed" : liveData?.marketSentiment?.fearGreedIndex > 50 ? "Greed" : liveData?.marketSentiment?.fearGreedIndex > 25 ? "Fear" : "Extrême Fear"}
            changeType={(liveData?.marketSentiment?.fearGreedIndex || 72) > 50 ? "positive" : "negative"}
            icon={TrendingUp}
            gradient="purple"
            delay={0.3}
          />
          <MetricCard
            title="🌐 Chaînes Actives"
            value={settings.enabledChains.length}
            change="100%"
            changeType="positive"
            icon={Globe}
            gradient="cyan"
            delay={0.4}
          />
        </div>

        {/* Prix en temps réel avec suspense */}
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <PriceTicker />
          </motion.div>
        </Suspense>

        {/* Section Alertes Récentes Premium */}
        <PremiumCard className="group" gradient={true} delay={0.7}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">🚨 Alertes Récentes</h3>
                <p className="text-gray-400">Dernières transactions détectées</p>
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

          <div className="space-y-4">
            <AnimatePresence>
              {recentAlerts.length > 0 ? (
                recentAlerts.map((alert, index) => {
                  const alertInfo = getAlertLevel(alert.value_usd)
                  const ChainIcon = getChainIcon(alert.type)
                  
                  return (
                    <motion.div
                      key={alert.hash}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: index * 0.1 }}
                      className={`
                        relative p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02]
                        ${alertInfo.bgColor} border-white/10 backdrop-blur-sm
                        hover:border-white/20 cursor-pointer group/item
                      `}
                    >
                      {/* Background glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <ChainIcon className="w-6 h-6 text-blue-400" />
                            <span className="text-2xl">{getChainEmoji(alert.type)}</span>
                            <span className="text-xl">{alertInfo.icon}</span>
                          </div>
                          
                          <div>
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-white text-lg">
                                ${alert.value_usd?.toLocaleString() || 'N/A'}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${alertInfo.color} ${alertInfo.bgColor}`}>
                                {alertInfo.level.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-gray-400 text-sm mt-1">
                              De: {formatAddress(alert.from)} → À: {formatAddress(alert.to)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-gray-300 text-sm flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{format(new Date(alert.timestamp), 'HH:mm:ss', { locale: fr })}</span>
                          </div>
                          <div className="text-gray-500 text-xs mt-1">
                            {format(new Date(alert.timestamp), 'dd/MM/yyyy', { locale: fr })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">Aucune alerte récente</h3>
                  <p className="text-gray-500">Les alertes apparaîtront ici dès qu'une transaction importante sera détectée</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PremiumCard>

        {/* Monitoring des Funding Rates avec suspense */}
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <FundingRateMonitor />
          </motion.div>
        </Suspense>

        {/* Générateur de Signaux IA */}
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <AISignalGenerator />
          </motion.div>
        </Suspense>

        {/* Export des données avec suspense */}
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <ExportData />
          </motion.div>
        </Suspense>

        {/* Statistiques par chaîne */}
        <PremiumCard className="group" delay={1.2}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">📈 Statistiques par Chaîne</h3>
              <p className="text-gray-400">Performance détaillée par blockchain</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(stats.chainStats).map(([chain, chainStats], index) => {
              const ChainIcon = getChainIcon(chain)
              return (
                <motion.div
                  key={chain}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group/chain"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <ChainIcon className="w-8 h-8 text-blue-400 group-hover/chain:scale-110 transition-transform duration-300" />
                      <span className="text-3xl">{getChainEmoji(chain)}</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{chain}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-gray-400 text-sm">Alertes</div>
                      <div className="text-xl font-bold text-white">{chainStats.alerts}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Volume</div>
                      <div className="text-lg font-semibold text-green-400">
                        ${(chainStats.volume / 1000000).toFixed(1)}M
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </PremiumCard>
      </div>
    </div>
  )
})

Dashboard.displayName = 'Dashboard'

export default Dashboard
import React, { memo, Suspense } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  Globe,
  Zap,
  Shield,
  Target,
  BarChart3,
  Wifi
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import AnimatedBackground from './ui/AnimatedBackground'

// Lazy loading pour optimiser les performances
const FundingRateMonitor = React.lazy(() => import('./FundingRateMonitor'))

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
    />
  </div>
)

const FundingRates = memo(() => {
  const { stats } = useWhale()

  // Métriques simulées pour les funding rates
  const fundingMetrics = [
    {
      title: '⚡ Taux Moyens',
      value: '0.045%',
      change: '+0.008%',
      changeType: 'positive',
      icon: Activity,
      gradient: 'blue'
    },
    {
      title: '📊 Plateformes',
      value: '5',
      change: '100%',
      changeType: 'positive',
      icon: Globe,
      gradient: 'green'
    },
    {
      title: '🎯 Alertes Actives',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: AlertTriangle,
      gradient: 'orange'
    },
    {
      title: '⏱️ Mise à Jour',
      value: 'Live',
      change: 'Temps réel',
      changeType: 'positive',
      icon: Wifi,
      gradient: 'purple'
    }
  ]

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
            className="text-6xl md:text-7xl font-black mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
              📈 FUNDING RATES
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-4xl">
              PROFESSIONAL MONITOR
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Surveillance intelligente des taux de financement des contrats perpétuels
          </motion.p>
          
          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="inline-flex items-center"
          >
            <div className="relative px-8 py-4 rounded-2xl font-bold text-lg flex items-center space-x-4 bg-green-500/20 text-green-300 border-2 border-green-500/50 backdrop-blur-xl">
              <motion.div 
                className="w-4 h-4 rounded-full bg-green-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span>🟢 SURVEILLANCE ACTIVE</span>
              <Activity className="w-5 h-5" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 bg-green-500/30" />
            </div>
          </motion.div>
        </motion.div>

        {/* Métriques Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {fundingMetrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Section Principales Plateformes */}
        <PremiumCard className="group mb-8" gradient={true} delay={0.5}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🏛️ Plateformes Surveillées</h3>
              <p className="text-gray-400 text-lg">Binance, Bybit, OKX, Coinbase, Deribit</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {['Binance', 'Bybit', 'OKX', 'Coinbase', 'Deribit'].map((exchange, index) => (
              <motion.div
                key={exchange}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 group/card text-center"
              >
                <div className="text-4xl mb-4">
                  {index === 0 && '🟡'} {/* Binance */}
                  {index === 1 && '🟠'} {/* Bybit */}
                  {index === 2 && '🔵'} {/* OKX */}
                  {index === 3 && '🟢'} {/* Coinbase */}
                  {index === 4 && '🟣'} {/* Deribit */}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{exchange}</h4>
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm font-semibold">ACTIF</span>
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover/card:opacity-20 blur transition-opacity duration-500 -z-10" />
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Funding Rates par Crypto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* BTC Funding Rates */}
          <PremiumCard className="group" delay={0.8}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">🟠</div>
              <div>
                <h3 className="text-2xl font-bold text-white">₿ BITCOIN Funding</h3>
                <p className="text-gray-400">Taux de financement BTC</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { exchange: 'Binance', rate: '0.0234%', change: '+0.0045%', color: 'text-green-400' },
                { exchange: 'Bybit', rate: '0.0198%', change: '-0.0012%', color: 'text-red-400' },
                { exchange: 'OKX', rate: '0.0267%', change: '+0.0078%', color: 'text-green-400' },
                { exchange: 'Coinbase', rate: '0.0189%', change: '+0.0023%', color: 'text-green-400' }
              ].map((data, index) => (
                <motion.div
                  key={data.exchange}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
                    <span className="font-semibold text-white">{data.exchange}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-orange-400">{data.rate}</div>
                    <div className={`text-sm ${data.color}`}>{data.change}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </PremiumCard>

          {/* ETH Funding Rates */}
          <PremiumCard className="group" delay={0.9}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">🔷</div>
              <div>
                <h3 className="text-2xl font-bold text-white">🔷 ETHEREUM Funding</h3>
                <p className="text-gray-400">Taux de financement ETH</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { exchange: 'Binance', rate: '0.0156%', change: '+0.0034%', color: 'text-green-400' },
                { exchange: 'Bybit', rate: '0.0143%', change: '-0.0008%', color: 'text-red-400' },
                { exchange: 'OKX', rate: '0.0178%', change: '+0.0056%', color: 'text-green-400' },
                { exchange: 'Deribit', rate: '0.0134%', change: '+0.0012%', color: 'text-green-400' }
              ].map((data, index) => (
                <motion.div
                  key={data.exchange}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                    <span className="font-semibold text-white">{data.exchange}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-400">{data.rate}</div>
                    <div className={`text-sm ${data.color}`}>{data.change}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </PremiumCard>
        </div>

        {/* SOL et RNDR Funding Rates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* SOL Funding Rates */}
          <PremiumCard className="group" delay={1.0}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">🟣</div>
              <div>
                <h3 className="text-2xl font-bold text-white">⚡ SOLANA Funding</h3>
                <p className="text-gray-400">Taux de financement SOL</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { exchange: 'Binance', rate: '0.0321%', change: '+0.0123%', color: 'text-green-400' },
                { exchange: 'Bybit', rate: '0.0298%', change: '+0.0089%', color: 'text-green-400' },
                { exchange: 'OKX', rate: '0.0345%', change: '+0.0156%', color: 'text-green-400' },
                { exchange: 'Coinbase', rate: '0.0287%', change: '+0.0067%', color: 'text-green-400' }
              ].map((data, index) => (
                <motion.div
                  key={data.exchange}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                    <span className="font-semibold text-white">{data.exchange}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-purple-400">{data.rate}</div>
                    <div className={`text-sm ${data.color}`}>{data.change}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </PremiumCard>

          {/* RNDR Funding Rates */}
          <PremiumCard className="group" delay={1.1}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">🎨</div>
              <div>
                <h3 className="text-2xl font-bold text-white">🎨 RENDER Funding</h3>
                <p className="text-gray-400">Taux de financement RNDR</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { exchange: 'Binance', rate: '0.0567%', change: '+0.0234%', color: 'text-green-400' },
                { exchange: 'Bybit', rate: '0.0489%', change: '+0.0178%', color: 'text-green-400' },
                { exchange: 'OKX', rate: '0.0612%', change: '+0.0287%', color: 'text-green-400' },
                { exchange: 'Gate.io', rate: '0.0534%', change: '+0.0201%', color: 'text-green-400' }
              ].map((data, index) => (
                <motion.div
                  key={data.exchange}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="font-semibold text-white">{data.exchange}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-cyan-400">{data.rate}</div>
                    <div className={`text-sm ${data.color}`}>{data.change}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </PremiumCard>
        </div>

        {/* Graphique Comparatif */}
        <PremiumCard className="group" delay={1.3}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">📊 Comparaison des Taux</h3>
              <p className="text-gray-400 text-lg">Évolution des funding rates par crypto</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { crypto: 'Bitcoin', symbol: 'BTC', rate: '0.0234%', trend: 'up', emoji: '🟠', color: 'text-orange-400' },
              { crypto: 'Ethereum', symbol: 'ETH', rate: '0.0156%', trend: 'up', emoji: '🔷', color: 'text-blue-400' },
              { crypto: 'Solana', symbol: 'SOL', rate: '0.0321%', trend: 'up', emoji: '🟣', color: 'text-purple-400' },
              { crypto: 'Render', symbol: 'RNDR', rate: '0.0567%', trend: 'up', emoji: '🎨', color: 'text-cyan-400' }
            ].map((crypto, index) => (
              <motion.div
                key={crypto.symbol}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:scale-105 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{crypto.emoji}</div>
                <h4 className="text-xl font-bold text-white mb-2">{crypto.crypto}</h4>
                <p className="text-gray-400 text-sm mb-3">{crypto.symbol}USDT</p>
                <div className={`text-2xl font-bold ${crypto.color} mb-2`}>{crypto.rate}</div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-semibold">Haussier</span>
                </div>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Composant Principal avec Suspense */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <FundingRateMonitor />
          </Suspense>
        </motion.div>

        {/* Section Informations Avancées */}
        <PremiumCard className="group" delay={1.0}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">💡 Informations Clés</h3>
              <p className="text-gray-400 text-lg">Comprendre les Funding Rates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20"
            >
              <div className="text-3xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-white mb-3">Qu'est-ce que c'est ?</h4>
              <p className="text-gray-400">
                Les funding rates sont des frais périodiques échangés entre les traders long et short sur les contrats perpétuels.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-green-500/10 rounded-xl p-6 border border-green-500/20"
            >
              <div className="text-3xl mb-4">⚡</div>
              <h4 className="text-xl font-bold text-white mb-3">Fréquence</h4>
              <p className="text-gray-400">
                Les taux sont généralement calculés toutes les 8 heures et appliqués automatiquement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20"
            >
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="text-xl font-bold text-white mb-3">Impact</h4>
              <p className="text-gray-400">
                Des taux élevés indiquent souvent un sentiment de marché fort et peuvent signaler des retournements.
              </p>
            </motion.div>
          </div>
        </PremiumCard>
      </div>
    </div>
  )
})

FundingRates.displayName = 'FundingRates'

export default FundingRates
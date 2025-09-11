import React, { memo, Suspense } from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  Globe,
  BarChart3,
  Activity,
  Target,
  Wifi,
  Shield
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import AnimatedBackground from './ui/AnimatedBackground'

// Lazy loading pour optimiser les performances
const OpenInterestMonitor = React.lazy(() => import('./OpenInterestMonitor'))

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full"
    />
  </div>
)

const OpenInterest = memo(() => {
  const { stats } = useWhale()

  // Métriques simulées pour l'Open Interest
  const oiMetrics = [
    {
      title: '💰 OI Total',
      value: '$2.8B',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'cyan'
    },
    {
      title: '📊 Positions',
      value: '1.2M',
      change: '+8.7%',
      changeType: 'positive',
      icon: BarChart3,
      gradient: 'blue'
    },
    {
      title: '⚠️ Alertes',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: AlertTriangle,
      gradient: 'orange'
    },
    {
      title: '🌐 Plateformes',
      value: '3',
      change: '100%',
      changeType: 'positive',
      icon: Globe,
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
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              📊 OPEN INTEREST
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-4xl">
              ANALYTICS PRO
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Analyse avancée des positions ouvertes sur les marchés dérivés
          </motion.p>
          
          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="inline-flex items-center"
          >
            <div className="relative px-8 py-4 rounded-2xl font-bold text-lg flex items-center space-x-4 bg-cyan-500/20 text-cyan-300 border-2 border-cyan-500/50 backdrop-blur-xl">
              <motion.div 
                className="w-4 h-4 rounded-full bg-cyan-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span>🔵 ANALYSE EN COURS</span>
              <Database className="w-5 h-5" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 bg-cyan-500/30" />
            </div>
          </motion.div>
        </motion.div>

        {/* Métriques Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {oiMetrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Section Principales Cryptos */}
        <PremiumCard className="group mb-8" gradient={true} delay={0.5}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🎯 Assets Surveillés</h3>
              <p className="text-gray-400 text-lg">BTC, ETH, SOL, RNDR - Positions majeures</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Bitcoin', symbol: 'BTC', emoji: '🟠', color: 'from-orange-500 to-yellow-500' },
              { name: 'Ethereum', symbol: 'ETH', emoji: '🔷', color: 'from-blue-500 to-indigo-500' },
              { name: 'Solana', symbol: 'SOL', emoji: '🟣', color: 'from-purple-500 to-pink-500' },
              { name: 'Render', symbol: 'RNDR', emoji: '🎨', color: 'from-green-500 to-teal-500' }
            ].map((crypto, index) => (
              <motion.div
                key={crypto.symbol}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 group/card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{crypto.emoji}</div>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${crypto.color} animate-pulse`} />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2">{crypto.name}</h4>
                <p className="text-gray-400 text-sm mb-4">{crypto.symbol}USDT</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">OI Total</span>
                    <span className="text-green-400 font-semibold">
                      ${(Math.random() * 1000 + 500).toFixed(0)}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Change 24h</span>
                    <span className={`font-semibold ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'}`}>
                      {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 15).toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${crypto.color} opacity-0 group-hover/card:opacity-20 blur transition-opacity duration-500 -z-10`} />
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Open Interest par Crypto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* BTC Open Interest */}
          <PremiumCard className="group" delay={0.8}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">🟠</div>
              <div>
                <h3 className="text-2xl font-bold text-white">₿ BITCOIN OI</h3>
                <p className="text-gray-400">Open Interest BTC</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { exchange: 'Binance', oi: '$1.2B', change: '+8.5%', color: 'text-green-400', volume: '45.2K BTC' },
                { exchange: 'Bybit', oi: '$890M', change: '+12.3%', color: 'text-green-400', volume: '32.1K BTC' },
                { exchange: 'OKX', oi: '$756M', change: '-3.2%', color: 'text-red-400', volume: '27.8K BTC' },
                { exchange: 'Deribit', oi: '$612M', change: '+5.7%', color: 'text-green-400', volume: '22.9K BTC' }
              ].map((data, index) => (
                <motion.div
                  key={data.exchange}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
                      <span className="font-semibold text-white">{data.exchange}</span>
                    </div>
                    <div className={`text-sm font-semibold ${data.color}`}>{data.change}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-orange-400">{data.oi}</div>
                    <div className="text-gray-400 text-sm">{data.volume}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </PremiumCard>

          {/* ETH Open Interest */}
          <PremiumCard className="group" delay={0.9}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">🔷</div>
              <div>
                <h3 className="text-2xl font-bold text-white">🔷 ETHEREUM OI</h3>
                <p className="text-gray-400">Open Interest ETH</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { exchange: 'Binance', oi: '$945M', change: '+15.2%', color: 'text-green-400', volume: '332K ETH' },
                { exchange: 'Bybit', oi: '$712M', change: '+9.8%', color: 'text-green-400', volume: '251K ETH' },
                { exchange: 'OKX', oi: '$598M', change: '+6.4%', color: 'text-green-400', volume: '210K ETH' },
                { exchange: 'Deribit', oi: '$423M', change: '-2.1%', color: 'text-red-400', volume: '149K ETH' }
              ].map((data, index) => (
                <motion.div
                  key={data.exchange}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                      <span className="font-semibold text-white">{data.exchange}</span>
                    </div>
                    <div className={`text-sm font-semibold ${data.color}`}>{data.change}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-blue-400">{data.oi}</div>
                    <div className="text-gray-400 text-sm">{data.volume}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </PremiumCard>
        </div>

        {/* SOL et RNDR Open Interest */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* SOL Open Interest */}
          <PremiumCard className="group" delay={1.0}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">🟣</div>
              <div>
                <h3 className="text-2xl font-bold text-white">⚡ SOLANA OI</h3>
                <p className="text-gray-400">Open Interest SOL</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { exchange: 'Binance', oi: '$156M', change: '+28.7%', color: 'text-green-400', volume: '1.6M SOL' },
                { exchange: 'Bybit', oi: '$123M', change: '+22.1%', color: 'text-green-400', volume: '1.3M SOL' },
                { exchange: 'OKX', oi: '$98M', change: '+18.9%', color: 'text-green-400', volume: '1.0M SOL' },
                { exchange: 'FTX', oi: '$67M', change: '+14.3%', color: 'text-green-400', volume: '695K SOL' }
              ].map((data, index) => (
                <motion.div
                  key={data.exchange}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                      <span className="font-semibold text-white">{data.exchange}</span>
                    </div>
                    <div className={`text-sm font-semibold ${data.color}`}>{data.change}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-purple-400">{data.oi}</div>
                    <div className="text-gray-400 text-sm">{data.volume}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </PremiumCard>

          {/* RNDR Open Interest */}
          <PremiumCard className="group" delay={1.1}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">🎨</div>
              <div>
                <h3 className="text-2xl font-bold text-white">🎨 RENDER OI</h3>
                <p className="text-gray-400">Open Interest RNDR</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { exchange: 'Binance', oi: '$45M', change: '+67.8%', color: 'text-green-400', volume: '5.7M RNDR' },
                { exchange: 'Bybit', oi: '$32M', change: '+52.3%', color: 'text-green-400', volume: '4.1M RNDR' },
                { exchange: 'OKX', oi: '$28M', change: '+43.9%', color: 'text-green-400', volume: '3.6M RNDR' },
                { exchange: 'Gate.io', oi: '$19M', change: '+38.7%', color: 'text-green-400', volume: '2.4M RNDR' }
              ].map((data, index) => (
                <motion.div
                  key={data.exchange}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                      <span className="font-semibold text-white">{data.exchange}</span>
                    </div>
                    <div className={`text-sm font-semibold ${data.color}`}>{data.change}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-cyan-400">{data.oi}</div>
                    <div className="text-gray-400 text-sm">{data.volume}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </PremiumCard>
        </div>

        {/* Graphique Comparatif OI */}
        <PremiumCard className="group" delay={1.3}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">📊 Comparaison Open Interest</h3>
              <p className="text-gray-400 text-lg">Répartition des positions ouvertes par crypto</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { crypto: 'Bitcoin', symbol: 'BTC', oi: '$3.46B', dominance: '52.1%', emoji: '🟠', color: 'text-orange-400' },
              { crypto: 'Ethereum', symbol: 'ETH', oi: '$2.68B', dominance: '40.3%', emoji: '🔷', color: 'text-blue-400' },
              { crypto: 'Solana', symbol: 'SOL', oi: '$444M', dominance: '6.7%', emoji: '🟣', color: 'text-purple-400' },
              { crypto: 'Render', symbol: 'RNDR', oi: '$124M', dominance: '1.9%', emoji: '🎨', color: 'text-cyan-400' }
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
                <div className={`text-2xl font-bold ${crypto.color} mb-2`}>{crypto.oi}</div>
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-green-400 text-sm font-semibold">{crypto.dominance}</span>
                  <span className="text-gray-400 text-sm">dominance</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${crypto.symbol === 'BTC' ? 'from-orange-500 to-yellow-500' : crypto.symbol === 'ETH' ? 'from-blue-500 to-indigo-500' : crypto.symbol === 'SOL' ? 'from-purple-500 to-pink-500' : 'from-cyan-500 to-teal-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: crypto.dominance }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Alertes OI par Crypto */}
        <PremiumCard className="group" delay={1.5}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🚨 Alertes OI Récentes</h3>
              <p className="text-gray-400 text-lg">Variations importantes d'Open Interest</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { crypto: 'BTC', message: 'OI Bitcoin +$156M en 1h', severity: 'high', color: 'border-red-500/30 bg-red-500/10', emoji: '🟠' },
              { crypto: 'ETH', message: 'OI Ethereum +$89M sur Binance', severity: 'medium', color: 'border-blue-500/30 bg-blue-500/10', emoji: '🔷' },
              { crypto: 'SOL', message: 'OI Solana +28% en 24h', severity: 'high', color: 'border-purple-500/30 bg-purple-500/10', emoji: '🟣' },
              { crypto: 'RNDR', message: 'OI Render +67% cette semaine', severity: 'critical', color: 'border-cyan-500/30 bg-cyan-500/10', emoji: '🎨' }
            ].map((alert, index) => (
              <motion.div
                key={alert.crypto}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className={`p-6 rounded-xl border ${alert.color} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{alert.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-white">{alert.crypto}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        alert.severity === 'critical' ? 'bg-red-500/20 text-red-300' :
                        alert.severity === 'high' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-300">{alert.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Composant Principal avec Suspense */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <OpenInterestMonitor />
          </Suspense>
        </motion.div>

        {/* Section Plateformes de Trading */}
        <PremiumCard className="group" delay={1.0}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🏛️ Exchanges Connectés</h3>
              <p className="text-gray-400 text-lg">Sources de données en temps réel</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Binance', status: 'Actif', volume: '1.2B', emoji: '🟡' },
              { name: 'Bybit', status: 'Actif', volume: '890M', emoji: '🟠' },
              { name: 'OKX', status: 'Actif', volume: '650M', emoji: '🔵' }
            ].map((exchange, index) => (
              <motion.div
                key={exchange.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{exchange.emoji}</div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{exchange.name}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 text-sm font-semibold">{exchange.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume OI</span>
                    <span className="text-cyan-400 font-bold">${exchange.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Latence</span>
                    <span className="text-green-400 font-semibold">&lt;50ms</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Section Informations Avancées */}
        <PremiumCard className="group" delay={1.3}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-green-500 to-cyan-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">💡 Guide Open Interest</h3>
              <p className="text-gray-400 text-lg">Comprendre les positions ouvertes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-cyan-500/10 rounded-xl p-6 border border-cyan-500/20"
            >
              <div className="text-3xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-white mb-3">Définition</h4>
              <p className="text-gray-400">
                L'Open Interest représente le nombre total de contrats dérivés ouverts qui n'ont pas encore été liquidés.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20"
            >
              <div className="text-3xl mb-4">📈</div>
              <h4 className="text-xl font-bold text-white mb-3">Interprétation</h4>
              <p className="text-gray-400">
                Un OI croissant avec un prix en hausse confirme la tendance. Un OI décroissant peut signaler un affaiblissement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20"
            >
              <div className="text-3xl mb-4">⚡</div>
              <h4 className="text-xl font-bold text-white mb-3">Signaux</h4>
              <p className="text-gray-400">
                Les variations importantes d'OI peuvent indiquer des changements de sentiment et des opportunités de trading.
              </p>
            </motion.div>
          </div>
        </PremiumCard>
      </div>
    </div>
  )
})

OpenInterest.displayName = 'OpenInterest'

export default OpenInterest

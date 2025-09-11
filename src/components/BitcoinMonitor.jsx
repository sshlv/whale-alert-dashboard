import React, { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bitcoin, 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  Globe,
  Zap,
  Shield,
  Target,
  Activity,
  Clock
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import PremiumChart from './ui/PremiumChart'
import AnimatedBackground from './ui/AnimatedBackground'

const BitcoinMonitor = memo(() => {
  const { stats } = useWhale()
  const [btcData, setBtcData] = useState({
    price: 42850.75,
    change24h: 3.2,
    marketCap: 839.5,
    volume24h: 28.4,
    dominance: 51.2
  })

  // Simulation données temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setBtcData(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 100,
        change24h: prev.change24h + (Math.random() - 0.5) * 0.5
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const btcMetrics = [
    {
      title: '₿ Prix Bitcoin',
      value: `$${btcData.price.toLocaleString()}`,
      change: `${btcData.change24h > 0 ? '+' : ''}${btcData.change24h.toFixed(1)}%`,
      changeType: btcData.change24h > 0 ? 'positive' : 'negative',
      icon: Bitcoin,
      gradient: 'orange'
    },
    {
      title: '📊 Market Cap',
      value: `$${btcData.marketCap}B`,
      change: '+5.2%',
      changeType: 'positive',
      icon: BarChart3,
      gradient: 'blue'
    },
    {
      title: '💰 Volume 24h',
      value: `$${btcData.volume24h}B`,
      change: '+12.8%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'green'
    },
    {
      title: '👑 Dominance',
      value: `${btcData.dominance}%`,
      change: '+0.8%',
      changeType: 'positive',
      icon: Target,
      gradient: 'purple'
    }
  ]

  // Données pour graphiques
  const priceHistory = Array.from({ length: 24 }, (_, i) => ({
    name: `${i}h`,
    value: 42000 + Math.random() * 2000,
    volume: Math.random() * 50000000
  }))

  const networkStats = [
    { label: 'Hash Rate', value: '450.2 EH/s', color: 'text-orange-400' },
    { label: 'Difficulté', value: '62.46 T', color: 'text-blue-400' },
    { label: 'Mempool', value: '15.2 MB', color: 'text-green-400' },
    { label: 'Fees Moyens', value: '12 sat/vB', color: 'text-purple-400' }
  ]

  const majorAddresses = [
    { label: 'Binance Cold Wallet', address: '34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo', balance: '248,597 BTC' },
    { label: 'Bitfinex Cold Wallet', address: '3D2oetdNuZUqQHPJmcMDDHYoqkyNVsFk9r', balance: '168,010 BTC' },
    { label: 'Unknown Whale', address: '1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF', balance: '79,957 BTC' }
  ]

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header Bitcoin */}
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
            <span className="bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
              ₿ BITCOIN
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-4xl">
              MONITORING CENTER
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Surveillance avancée du réseau Bitcoin et des grandes transactions
          </motion.p>
          
          {/* Status Live */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="inline-flex items-center"
          >
            <div className="relative px-8 py-4 rounded-2xl font-bold text-lg flex items-center space-x-4 bg-orange-500/20 text-orange-300 border-2 border-orange-500/50 backdrop-blur-xl">
              <motion.div 
                className="w-4 h-4 rounded-full bg-orange-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span>🟠 BITCOIN LIVE</span>
              <Bitcoin className="w-5 h-5" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 bg-orange-500/30" />
            </div>
          </motion.div>
        </motion.div>

        {/* Métriques Bitcoin */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {btcMetrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Graphiques Prix et Volume */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <PremiumChart
              title="📈 Prix Bitcoin (24h)"
              data={priceHistory}
              type="area"
              gradient="orange"
              height={350}
              dataKey="value"
              xAxisKey="name"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <PremiumChart
              title="💰 Volume de Trading"
              data={priceHistory}
              type="bar"
              gradient="blue"
              height={350}
              dataKey="volume"
              xAxisKey="name"
            />
          </motion.div>
        </div>

        {/* Statistiques Réseau */}
        <PremiumCard className="group mb-8" delay={0.7}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🔗 Statistiques Réseau</h3>
              <p className="text-gray-400 text-lg">Métriques de sécurité et performance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {networkStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-orange-500/30 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">
                  {index === 0 && '⚡'}
                  {index === 1 && '🎯'}
                  {index === 2 && '📦'}
                  {index === 3 && '💎'}
                </div>
                <h4 className="text-white font-semibold mb-2">{stat.label}</h4>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Principales Adresses */}
        <PremiumCard className="group mb-8" delay={0.9}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🐋 Principales Adresses</h3>
              <p className="text-gray-400 text-lg">Portefeuilles surveillés avec de gros volumes</p>
            </div>
          </div>

          <div className="space-y-4">
            {majorAddresses.map((addr, index) => (
              <motion.div
                key={addr.address}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{addr.label}</h4>
                    <p className="text-gray-400 font-mono text-sm">{addr.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-400">{addr.balance}</p>
                    <p className="text-sm text-gray-400">≈ ${(parseFloat(addr.balance.replace(/[^0-9.]/g, '')) * btcData.price / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Alertes Bitcoin Récentes */}
        <PremiumCard className="group" delay={1.1}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🚨 Alertes Bitcoin Récentes</h3>
              <p className="text-gray-400 text-lg">Transactions importantes détectées</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { amount: '1,247 BTC', usd: '$53.2M', from: 'Unknown', to: 'Binance', time: '2 min', type: 'whale' },
              { amount: '892 BTC', usd: '$38.1M', from: 'Coinbase', to: 'Unknown', time: '8 min', type: 'large' },
              { amount: '445 BTC', usd: '$19.0M', from: 'Unknown', to: 'Kraken', time: '15 min', type: 'large' }
            ].map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className={`
                  p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]
                  ${alert.type === 'whale' 
                    ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50' 
                    : 'bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">
                      {alert.type === 'whale' ? '🔴' : '🟠'}
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">{alert.amount}</p>
                      <p className="text-lg font-semibold text-green-400">{alert.usd}</p>
                      <p className="text-gray-400 text-sm">{alert.from} → {alert.to}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </PremiumCard>
      </div>
    </div>
  )
})

BitcoinMonitor.displayName = 'BitcoinMonitor'

export default BitcoinMonitor

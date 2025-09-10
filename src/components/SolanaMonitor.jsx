import React, { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  Globe,
  Activity,
  Shield,
  Target,
  Clock,
  Cpu
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import PremiumChart from './ui/PremiumChart'
import AnimatedBackground from './ui/AnimatedBackground'

const SolanaMonitor = memo(() => {
  const { stats } = useWhale()
  const [solData, setSolData] = useState({
    price: 98.45,
    change24h: 8.3,
    marketCap: 42.8,
    volume24h: 2.4,
    tps: 2847
  })

  // Simulation données temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setSolData(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 3,
        change24h: prev.change24h + (Math.random() - 0.5) * 0.5,
        tps: Math.max(1000, prev.tps + (Math.random() - 0.5) * 500)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const solMetrics = [
    {
      title: '⚡ Prix Solana',
      value: `$${solData.price.toFixed(2)}`,
      change: `${solData.change24h > 0 ? '+' : ''}${solData.change24h.toFixed(1)}%`,
      changeType: solData.change24h > 0 ? 'positive' : 'negative',
      icon: Zap,
      gradient: 'purple'
    },
    {
      title: '📊 Market Cap',
      value: `$${solData.marketCap}B`,
      change: '+12.5%',
      changeType: 'positive',
      icon: BarChart3,
      gradient: 'green'
    },
    {
      title: '💰 Volume 24h',
      value: `$${solData.volume24h}B`,
      change: '+28.7%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'blue'
    },
    {
      title: '🚀 TPS Actuel',
      value: solData.tps.toLocaleString(),
      change: 'Temps réel',
      changeType: 'positive',
      icon: Activity,
      gradient: 'orange'
    }
  ]

  // Données pour graphiques
  const priceHistory = Array.from({ length: 24 }, (_, i) => ({
    name: `${i}h`,
    value: 95 + Math.random() * 10,
    volume: Math.random() * 5000000,
    tps: 2000 + Math.random() * 1500
  }))

  const networkStats = [
    { label: 'Total Supply', value: '435.2M SOL', color: 'text-purple-400' },
    { label: 'Staked SOL', value: '381.7M SOL', color: 'text-green-400' },
    { label: 'Validators', value: '1,872', color: 'text-blue-400' },
    { label: 'APY Staking', value: '6.8%', color: 'text-orange-400' }
  ]

  const topPrograms = [
    { name: 'Serum DEX', program: 'srmU...', tvl: '$2.1B', logo: '🏪' },
    { name: 'Raydium', program: '675k...', tvl: '$890M', logo: '🌊' },
    { name: 'Orca', program: 'whir...', tvl: '$654M', logo: '🐋' },
    { name: 'Mango', program: 'mv3e...', tvl: '$432M', logo: '🥭' }
  ]

  const majorWallets = [
    { name: 'Binance Hot Wallet', address: 'FWE...qcG', balance: '18.7M SOL' },
    { name: 'Solana Foundation', address: 'So11...111', balance: '12.3M SOL' },
    { name: 'FTX Cold Storage', address: 'Ftx9...xyz', balance: '8.9M SOL' }
  ]

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header Solana */}
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
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              ⚡ SOLANA
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-4xl">
              HIGH-SPEED MONITOR
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Surveillance haute performance du réseau Solana et écosystème DeFi
          </motion.p>
          
          {/* Status Live */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="inline-flex items-center"
          >
            <div className="relative px-8 py-4 rounded-2xl font-bold text-lg flex items-center space-x-4 bg-purple-500/20 text-purple-300 border-2 border-purple-500/50 backdrop-blur-xl">
              <motion.div 
                className="w-4 h-4 rounded-full bg-purple-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
              <span>🟣 SOLANA TURBO</span>
              <Zap className="w-5 h-5" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 bg-purple-500/30" />
            </div>
          </motion.div>
        </motion.div>

        {/* Métriques Solana */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {solMetrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Graphiques Prix et TPS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <PremiumChart
              title="📈 Prix Solana (24h)"
              data={priceHistory}
              type="area"
              gradient="purple"
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
              title="🚀 Performance TPS"
              data={priceHistory}
              type="line"
              gradient="green"
              height={350}
              dataKey="tps"
              xAxisKey="name"
            />
          </motion.div>
        </div>

        {/* Statistiques Réseau Solana */}
        <PremiumCard className="group mb-8" delay={0.7}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">⚡ Performance Réseau</h3>
              <p className="text-gray-400 text-lg">Métriques de vitesse et staking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {networkStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">
                  {index === 0 && '⚡'}
                  {index === 1 && '🔒'}
                  {index === 2 && '👥'}
                  {index === 3 && '📈'}
                </div>
                <h4 className="text-white font-semibold mb-2">{stat.label}</h4>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Top Programs Solana */}
        <PremiumCard className="group mb-8" delay={0.9}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🏗️ Top Programs DeFi</h3>
              <p className="text-gray-400 text-lg">Programmes avec la plus grande TVL</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPrograms.map((program, index) => (
              <motion.div
                key={program.program}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{program.logo}</div>
                <h4 className="text-xl font-bold text-white mb-2">{program.name}</h4>
                <p className="text-gray-400 font-mono text-xs mb-2">{program.program}</p>
                <p className="text-2xl font-bold text-green-400">{program.tvl}</p>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Principaux Portefeuilles */}
        <PremiumCard className="group mb-8" delay={1.1}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🐋 Gros Portefeuilles SOL</h3>
              <p className="text-gray-400 text-lg">Adresses avec les plus gros volumes</p>
            </div>
          </div>

          <div className="space-y-4">
            {majorWallets.map((wallet, index) => (
              <motion.div
                key={wallet.address}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{wallet.name}</h4>
                    <p className="text-gray-400 font-mono text-sm">{wallet.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-400">{wallet.balance}</p>
                    <p className="text-sm text-gray-400">≈ ${(parseFloat(wallet.balance.replace(/[^0-9.]/g, '')) * solData.price / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Alertes Solana Récentes */}
        <PremiumCard className="group" delay={1.3}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🚨 Alertes Solana Récentes</h3>
              <p className="text-gray-400 text-lg">Transactions importantes et mouvements DeFi</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { amount: '850,000 SOL', usd: '$83.7M', from: 'Unknown', to: 'Serum DEX', time: '1 min', type: 'whale' },
              { amount: '425,000 SOL', usd: '$41.8M', from: 'Binance', to: 'Unknown', time: '7 min', type: 'large' },
              { amount: '280,000 SOL', usd: '$27.6M', from: 'Raydium', to: 'Unknown', time: '14 min', type: 'large' }
            ].map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className={`
                  p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]
                  ${alert.type === 'whale' 
                    ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50' 
                    : 'bg-purple-500/10 border-purple-500/30 hover:border-purple-500/50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">
                      {alert.type === 'whale' ? '🔴' : '🟣'}
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

SolanaMonitor.displayName = 'SolanaMonitor'

export default SolanaMonitor

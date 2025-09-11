import React, { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Coins, 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  Globe,
  Zap,
  Shield,
  Target,
  Activity,
  Clock,
  Cpu
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import PremiumChart from './ui/PremiumChart'
import AnimatedBackground from './ui/AnimatedBackground'

const EthereumMonitor = memo(() => {
  const { stats } = useWhale()
  const [ethData, setEthData] = useState({
    price: 2847.92,
    change24h: 5.8,
    marketCap: 342.1,
    volume24h: 18.7,
    gasPrice: 25
  })

  // Simulation données temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setEthData(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 50,
        change24h: prev.change24h + (Math.random() - 0.5) * 0.3,
        gasPrice: Math.max(10, prev.gasPrice + (Math.random() - 0.5) * 5)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const ethMetrics = [
    {
      title: '💎 Prix Ethereum',
      value: `$${ethData.price.toLocaleString()}`,
      change: `${ethData.change24h > 0 ? '+' : ''}${ethData.change24h.toFixed(1)}%`,
      changeType: ethData.change24h > 0 ? 'positive' : 'negative',
      icon: Coins,
      gradient: 'blue'
    },
    {
      title: '📊 Market Cap',
      value: `$${ethData.marketCap}B`,
      change: '+7.2%',
      changeType: 'positive',
      icon: BarChart3,
      gradient: 'green'
    },
    {
      title: '💰 Volume 24h',
      value: `$${ethData.volume24h}B`,
      change: '+15.4%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'purple'
    },
    {
      title: '⛽ Gas Price',
      value: `${Math.round(ethData.gasPrice)} Gwei`,
      change: ethData.gasPrice > 30 ? 'Élevé' : 'Normal',
      changeType: ethData.gasPrice > 30 ? 'negative' : 'positive',
      icon: Zap,
      gradient: 'orange'
    }
  ]

  // Données pour graphiques
  const priceHistory = Array.from({ length: 24 }, (_, i) => ({
    name: `${i}h`,
    value: 2800 + Math.random() * 200,
    volume: Math.random() * 20000000,
    gas: 15 + Math.random() * 20
  }))

  const networkStats = [
    { label: 'Total Supply', value: '120.3M ETH', color: 'text-blue-400' },
    { label: 'Staked ETH', value: '31.2M ETH', color: 'text-green-400' },
    { label: 'Validators', value: '975,432', color: 'text-purple-400' },
    { label: 'APR Staking', value: '3.8%', color: 'text-orange-400' }
  ]

  const topTokens = [
    { name: 'USDT', symbol: 'USDT', tvl: '$83.2B', logo: '💚' },
    { name: 'USDC', symbol: 'USDC', tvl: '$25.1B', logo: '🔵' },
    { name: 'WETH', symbol: 'WETH', tvl: '$8.9B', logo: '🔷' },
    { name: 'DAI', symbol: 'DAI', tvl: '$4.3B', logo: '🟡' }
  ]

  const majorContracts = [
    { name: 'Uniswap V3', address: '0xE592427A0AEce92De3Edee1F18E0157C05861564', tvl: '$4.2B' },
    { name: 'AAVE V3', address: '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2', tvl: '$7.8B' },
    { name: 'Compound', address: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B', tvl: '$2.1B' }
  ]

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header Ethereum */}
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
            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              🔷 ETHEREUM
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-4xl">
              ECOSYSTEM MONITOR
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Surveillance avancée du réseau Ethereum et de l'écosystème DeFi
          </motion.p>
          
          {/* Status Live */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="inline-flex items-center"
          >
            <div className="relative px-8 py-4 rounded-2xl font-bold text-lg flex items-center space-x-4 bg-blue-500/20 text-blue-300 border-2 border-blue-500/50 backdrop-blur-xl">
              <motion.div 
                className="w-4 h-4 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span>🔷 ETHEREUM LIVE</span>
              <Coins className="w-5 h-5" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 bg-blue-500/30" />
            </div>
          </motion.div>
        </motion.div>

        {/* Métriques Ethereum */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {ethMetrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Graphiques Prix, Volume et Gas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <PremiumChart
              title="📈 Prix Ethereum (24h)"
              data={priceHistory}
              type="area"
              gradient="blue"
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
              title="⛽ Prix du Gas (Gwei)"
              data={priceHistory}
              type="line"
              gradient="orange"
              height={350}
              dataKey="gas"
              xAxisKey="name"
            />
          </motion.div>
        </div>

        {/* Statistiques Réseau Ethereum */}
        <PremiumCard className="group mb-8" delay={0.7}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🛡️ Statistiques Réseau</h3>
              <p className="text-gray-400 text-lg">Métriques Proof of Stake et staking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {networkStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">
                  {index === 0 && '💎'}
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

        {/* Top Tokens ERC-20 */}
        <PremiumCard className="group mb-8" delay={0.9}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🪙 Top Tokens ERC-20</h3>
              <p className="text-gray-400 text-lg">Tokens avec la plus grande valeur verrouillée</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topTokens.map((token, index) => (
              <motion.div
                key={token.symbol}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{token.logo}</div>
                <h4 className="text-xl font-bold text-white mb-2">{token.name}</h4>
                <p className="text-gray-400 mb-2">{token.symbol}</p>
                <p className="text-2xl font-bold text-green-400">{token.tvl}</p>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Principaux Smart Contracts */}
        <PremiumCard className="group mb-8" delay={1.1}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">📜 Smart Contracts Majeurs</h3>
              <p className="text-gray-400 text-lg">Protocoles DeFi avec le plus de TVL</p>
            </div>
          </div>

          <div className="space-y-4">
            {majorContracts.map((contract, index) => (
              <motion.div
                key={contract.address}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{contract.name}</h4>
                    <p className="text-gray-400 font-mono text-sm">{contract.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-400">{contract.tvl}</p>
                    <p className="text-sm text-gray-400">TVL</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Alertes Ethereum Récentes */}
        <PremiumCard className="group" delay={1.3}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🚨 Alertes Ethereum Récentes</h3>
              <p className="text-gray-400 text-lg">Transactions importantes et mouvements DeFi</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { amount: '15,247 ETH', usd: '$43.4M', from: 'Unknown', to: 'Uniswap V3', time: '3 min', type: 'whale' },
              { amount: '8,921 ETH', usd: '$25.4M', from: 'Binance', to: 'Unknown', time: '12 min', type: 'large' },
              { amount: '5,483 ETH', usd: '$15.6M', from: 'AAVE', to: 'Unknown', time: '18 min', type: 'large' }
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
                    : 'bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">
                      {alert.type === 'whale' ? '🔴' : '🔷'}
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

EthereumMonitor.displayName = 'EthereumMonitor'

export default EthereumMonitor

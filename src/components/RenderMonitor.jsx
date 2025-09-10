import React, { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Palette, 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  Globe,
  Activity,
  Shield,
  Target,
  Clock,
  Cpu,
  Film
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import PremiumChart from './ui/PremiumChart'
import AnimatedBackground from './ui/AnimatedBackground'

const RenderMonitor = memo(() => {
  const { stats } = useWhale()
  const [rndrData, setRndrData] = useState({
    price: 7.85,
    change24h: 15.7,
    marketCap: 4.1,
    volume24h: 0.8,
    renderNodes: 425891
  })

  // Simulation données temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setRndrData(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 0.5,
        change24h: prev.change24h + (Math.random() - 0.5) * 1,
        renderNodes: Math.max(400000, prev.renderNodes + Math.floor((Math.random() - 0.5) * 1000))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const rndrMetrics = [
    {
      title: '🎨 Prix RNDR',
      value: `$${rndrData.price.toFixed(2)}`,
      change: `${rndrData.change24h > 0 ? '+' : ''}${rndrData.change24h.toFixed(1)}%`,
      changeType: rndrData.change24h > 0 ? 'positive' : 'negative',
      icon: Palette,
      gradient: 'cyan'
    },
    {
      title: '📊 Market Cap',
      value: `$${rndrData.marketCap}B`,
      change: '+22.8%',
      changeType: 'positive',
      icon: BarChart3,
      gradient: 'green'
    },
    {
      title: '💰 Volume 24h',
      value: `$${rndrData.volume24h}B`,
      change: '+45.2%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'blue'
    },
    {
      title: '🖥️ Render Nodes',
      value: rndrData.renderNodes.toLocaleString(),
      change: 'Réseau actif',
      changeType: 'positive',
      icon: Cpu,
      gradient: 'purple'
    }
  ]

  // Données pour graphiques
  const priceHistory = Array.from({ length: 24 }, (_, i) => ({
    name: `${i}h`,
    value: 7 + Math.random() * 2,
    volume: Math.random() * 1000000,
    nodes: 420000 + Math.random() * 20000
  }))

  const networkStats = [
    { label: 'Total Supply', value: '532.7M RNDR', color: 'text-cyan-400' },
    { label: 'Circulating', value: '389.2M RNDR', color: 'text-green-400' },
    { label: 'Nodes Actifs', value: '425,891', color: 'text-purple-400' },
    { label: 'GPU Hours/Month', value: '2.1M', color: 'text-orange-400' }
  ]

  const renderProjects = [
    { name: 'Octane Render', type: 'GPU Rendering', usage: '34%', logo: '🔺' },
    { name: 'Blender', type: '3D Animation', usage: '28%', logo: '🟠' },
    { name: 'Cinema 4D', type: 'Motion Graphics', usage: '19%', logo: '🔵' },
    { name: 'Maya', type: 'VFX Pipeline', usage: '19%', logo: '🟢' }
  ]

  const topHolders = [
    { name: 'Render Foundation', address: '0x...abc123', balance: '45.2M RNDR' },
    { name: 'Binance Hot Wallet', address: '0x...def456', balance: '18.7M RNDR' },
    { name: 'OKX Exchange', address: '0x...ghi789', balance: '12.3M RNDR' }
  ]

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header Render */}
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
            <span className="bg-gradient-to-r from-cyan-400 via-teal-500 to-green-600 bg-clip-text text-transparent">
              🎨 RENDER
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-4xl">
              GPU NETWORK
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Surveillance du réseau de rendu décentralisé et écosystème créatif
          </motion.p>
          
          {/* Status Live */}
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
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <span>🎨 RENDER ACTIVE</span>
              <Palette className="w-5 h-5" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 bg-cyan-500/30" />
            </div>
          </motion.div>
        </motion.div>

        {/* Métriques Render */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {rndrMetrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Graphiques Prix et Nodes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <PremiumChart
              title="📈 Prix RNDR (24h)"
              data={priceHistory}
              type="area"
              gradient="cyan"
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
              title="🖥️ Nodes Actifs"
              data={priceHistory}
              type="line"
              gradient="purple"
              height={350}
              dataKey="nodes"
              xAxisKey="name"
            />
          </motion.div>
        </div>

        {/* Statistiques Réseau Render */}
        <PremiumCard className="group mb-8" delay={0.7}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🖥️ Statistiques Réseau</h3>
              <p className="text-gray-400 text-lg">Métriques de puissance de calcul GPU</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {networkStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">
                  {index === 0 && '🎨'}
                  {index === 1 && '💰'}
                  {index === 2 && '🖥️'}
                  {index === 3 && '⚡'}
                </div>
                <h4 className="text-white font-semibold mb-2">{stat.label}</h4>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Projets de Rendu Populaires */}
        <PremiumCard className="group mb-8" delay={0.9}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <Film className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🎬 Projets de Rendu</h3>
              <p className="text-gray-400 text-lg">Applications les plus utilisées sur le réseau</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{project.logo}</div>
                <h4 className="text-xl font-bold text-white mb-2">{project.name}</h4>
                <p className="text-gray-400 text-sm mb-3">{project.type}</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-500 to-teal-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: project.usage }}
                    transition={{ delay: 1.1 + index * 0.1, duration: 1, ease: "easeOut" }}
                  />
                </div>
                <p className="text-lg font-bold text-cyan-400">{project.usage}</p>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Top Holders RNDR */}
        <PremiumCard className="group mb-8" delay={1.1}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🐋 Top Holders RNDR</h3>
              <p className="text-gray-400 text-lg">Portefeuilles avec les plus gros volumes</p>
            </div>
          </div>

          <div className="space-y-4">
            {topHolders.map((holder, index) => (
              <motion.div
                key={holder.address}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{holder.name}</h4>
                    <p className="text-gray-400 font-mono text-sm">{holder.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-cyan-400">{holder.balance}</p>
                    <p className="text-sm text-gray-400">≈ ${(parseFloat(holder.balance.replace(/[^0-9.]/g, '')) * rndrData.price / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Alertes RNDR Récentes */}
        <PremiumCard className="group" delay={1.3}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🚨 Alertes RNDR Récentes</h3>
              <p className="text-gray-400 text-lg">Mouvements importants de tokens RNDR</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { amount: '5.2M RNDR', usd: '$40.8M', from: 'Unknown', to: 'Binance', time: '5 min', type: 'whale' },
              { amount: '2.8M RNDR', usd: '$22.0M', from: 'Render Foundation', to: 'Unknown', time: '18 min', type: 'large' },
              { amount: '1.9M RNDR', usd: '$14.9M', from: 'OKX', to: 'Unknown', time: '25 min', type: 'large' }
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
                    : 'bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">
                      {alert.type === 'whale' ? '🔴' : '🎨'}
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

RenderMonitor.displayName = 'RenderMonitor'

export default RenderMonitor

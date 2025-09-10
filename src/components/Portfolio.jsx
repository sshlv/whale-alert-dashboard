import React, { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  Minus,
  DollarSign,
  BarChart3,
  PieChart,
  Target,
  Activity,
  Edit,
  Trash2
} from 'lucide-react'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import PremiumChart from './ui/PremiumChart'
import { useRealTime } from './RealTimeDataManager'

const Portfolio = memo(() => {
  const { liveData, getFormattedPrice } = useRealTime()
  const [positions, setPositions] = useState([
    {
      id: 1,
      symbol: 'BTC',
      amount: 0.5,
      avgBuyPrice: 41200,
      currentPrice: 42850.75,
      emoji: '🟠'
    },
    {
      id: 2,
      symbol: 'ETH',
      amount: 2.3,
      avgBuyPrice: 2650,
      currentPrice: 2847.92,
      emoji: '🔷'
    },
    {
      id: 3,
      symbol: 'SOL',
      amount: 15,
      avgBuyPrice: 89.50,
      currentPrice: 98.45,
      emoji: '🟣'
    },
    {
      id: 4,
      symbol: 'RNDR',
      amount: 500,
      avgBuyPrice: 6.80,
      currentPrice: 7.85,
      emoji: '🎨'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newPosition, setNewPosition] = useState({
    symbol: 'BTC',
    amount: '',
    avgBuyPrice: ''
  })

  // Mise à jour prix en temps réel
  useEffect(() => {
    setPositions(prev => prev.map(pos => ({
      ...pos,
      currentPrice: liveData.prices[pos.symbol]?.price || pos.currentPrice
    })))
  }, [liveData.prices])

  // Calculs portfolio
  const portfolioMetrics = positions.reduce((acc, pos) => {
    const currentValue = pos.amount * pos.currentPrice
    const investedValue = pos.amount * pos.avgBuyPrice
    const pnl = currentValue - investedValue
    const pnlPercent = (pnl / investedValue) * 100

    return {
      totalValue: acc.totalValue + currentValue,
      totalInvested: acc.totalInvested + investedValue,
      totalPnL: acc.totalPnL + pnl,
      positions: acc.positions + 1
    }
  }, { totalValue: 0, totalInvested: 0, totalPnL: 0, positions: 0 })

  const totalPnLPercent = (portfolioMetrics.totalPnL / portfolioMetrics.totalInvested) * 100

  const addPosition = () => {
    if (newPosition.amount && newPosition.avgBuyPrice) {
      const id = Math.max(...positions.map(p => p.id)) + 1
      const emoji = {
        'BTC': '🟠',
        'ETH': '🔷',
        'SOL': '🟣',
        'RNDR': '🎨'
      }[newPosition.symbol] || '💰'

      setPositions([...positions, {
        id,
        symbol: newPosition.symbol,
        amount: parseFloat(newPosition.amount),
        avgBuyPrice: parseFloat(newPosition.avgBuyPrice),
        currentPrice: liveData.prices[newPosition.symbol]?.price || 0,
        emoji
      }])

      setNewPosition({ symbol: 'BTC', amount: '', avgBuyPrice: '' })
      setShowAddModal(false)
    }
  }

  const removePosition = (id) => {
    setPositions(positions.filter(p => p.id !== id))
  }

  const portfolioData = positions.map(pos => ({
    name: pos.symbol,
    value: pos.amount * pos.currentPrice,
    percentage: ((pos.amount * pos.currentPrice) / portfolioMetrics.totalValue) * 100
  }))

  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: portfolioMetrics.totalValue * (1 + (Math.random() - 0.5) * 0.1 * (i / 30))
  }))

  const portfolioMetricsCards = [
    {
      title: '💰 Valeur Totale',
      value: `$${portfolioMetrics.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      change: `${totalPnLPercent > 0 ? '+' : ''}${totalPnLPercent.toFixed(1)}%`,
      changeType: totalPnLPercent > 0 ? 'positive' : 'negative',
      icon: Wallet,
      gradient: 'blue'
    },
    {
      title: '📈 P&L Total',
      value: `$${portfolioMetrics.totalPnL.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      change: totalPnLPercent > 0 ? 'Profit' : 'Perte',
      changeType: totalPnLPercent > 0 ? 'positive' : 'negative',
      icon: totalPnLPercent > 0 ? TrendingUp : TrendingDown,
      gradient: totalPnLPercent > 0 ? 'green' : 'red'
    },
    {
      title: '💎 Positions',
      value: portfolioMetrics.positions,
      change: 'Actives',
      changeType: 'positive',
      icon: Target,
      gradient: 'purple'
    },
    {
      title: '📊 Diversification',
      value: `${positions.length} cryptos`,
      change: 'Équilibrée',
      changeType: 'positive',
      icon: PieChart,
      gradient: 'cyan'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header Portfolio */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-black bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
          💰 PORTFOLIO TRACKER
        </h2>
        <p className="text-gray-400 text-lg">
          Suivi en temps réel de votre portefeuille crypto
        </p>
      </motion.div>

      {/* Métriques Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioMetricsCards.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <PremiumChart
            title="📈 Performance Portfolio (30j)"
            data={performanceData}
            type="area"
            gradient="green"
            height={350}
            dataKey="value"
            xAxisKey="day"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <PremiumChart
            title="🥧 Répartition Portfolio"
            data={portfolioData}
            type="bar"
            gradient="purple"
            height={350}
            dataKey="value"
            xAxisKey="name"
          />
        </motion.div>
      </div>

      {/* Positions */}
      <PremiumCard className="group" delay={0.7}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">💎 Mes Positions</h3>
              <p className="text-gray-400 text-lg">Portfolio détaillé avec P&L en temps réel</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="btn-premium flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter Position</span>
          </motion.button>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {positions.map((position, index) => {
              const currentValue = position.amount * position.currentPrice
              const investedValue = position.amount * position.avgBuyPrice
              const pnl = currentValue - investedValue
              const pnlPercent = (pnl / investedValue) * 100
              const isProfit = pnl > 0

              return (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{position.emoji}</div>
                      <div>
                        <h4 className="text-2xl font-bold text-white">{position.symbol}</h4>
                        <p className="text-gray-400">
                          {position.amount} {position.symbol} @ ${position.avgBuyPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        ${currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className={`text-lg font-semibold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                        {isProfit ? '+' : ''}${pnl.toFixed(0)} ({isProfit ? '+' : ''}{pnlPercent.toFixed(1)}%)
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removePosition(position.id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Prix Actuel</p>
                      <p className="text-white font-semibold">${position.currentPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Prix Moyen</p>
                      <p className="text-white font-semibold">${position.avgBuyPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Quantité</p>
                      <p className="text-white font-semibold">{position.amount} {position.symbol}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">% Portfolio</p>
                      <p className="text-cyan-400 font-semibold">
                        {((currentValue / portfolioMetrics.totalValue) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </PremiumCard>

      {/* Modal Ajout Position */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">➕ Ajouter Position</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Crypto</label>
                  <select
                    value={newPosition.symbol}
                    onChange={(e) => setNewPosition({ ...newPosition, symbol: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                  >
                    <option value="BTC">🟠 Bitcoin (BTC)</option>
                    <option value="ETH">🔷 Ethereum (ETH)</option>
                    <option value="SOL">🟣 Solana (SOL)</option>
                    <option value="RNDR">🎨 Render (RNDR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Quantité</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={newPosition.amount}
                    onChange={(e) => setNewPosition({ ...newPosition, amount: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                    placeholder="Ex: 0.5"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Prix d'achat moyen</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPosition.avgBuyPrice}
                    onChange={(e) => setNewPosition({ ...newPosition, avgBuyPrice: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                    placeholder="Ex: 42000"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-xl transition-colors"
                >
                  Annuler
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addPosition}
                  className="flex-1 btn-premium"
                >
                  Ajouter
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

Portfolio.displayName = 'Portfolio'

export default Portfolio

import React, { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, TrendingDown, Activity } from 'lucide-react'
import PremiumCard from './ui/PremiumCard'
import { useRealTime } from './RealTimeDataManager'

const HeatMapCell = ({ data, maxValue, index }) => {
  const intensity = Math.abs(data.value) / maxValue
  const isPositive = data.value > 0
  
  const getColor = () => {
    if (isPositive) {
      if (intensity > 0.7) return 'bg-green-500'
      if (intensity > 0.4) return 'bg-green-400'
      if (intensity > 0.2) return 'bg-green-300'
      return 'bg-green-200'
    } else {
      if (intensity > 0.7) return 'bg-red-500'
      if (intensity > 0.4) return 'bg-red-400'
      if (intensity > 0.2) return 'bg-red-300'
      return 'bg-red-200'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      className={`relative group cursor-pointer rounded-lg transition-all duration-300 ${getColor()}`}
      style={{ 
        opacity: 0.3 + intensity * 0.7,
        aspectRatio: '1'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
          {data.value > 0 ? '+' : ''}{data.value.toFixed(1)}%
        </span>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
        <div className="font-semibold">{data.symbol}</div>
        <div className="text-gray-300">{data.exchange}</div>
        <div className={`font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {data.value > 0 ? '+' : ''}{data.value.toFixed(2)}%
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </motion.div>
  )
}

const HeatMapVisualization = memo(() => {
  const { liveData } = useRealTime()
  const [heatmapData, setHeatmapData] = useState([])
  const [timeframe, setTimeframe] = useState('24h')
  const [metric, setMetric] = useState('price_change')

  useEffect(() => {
    // Génération des données de heatmap
    const exchanges = ['Binance', 'Bybit', 'OKX', 'Coinbase', 'Kraken', 'FTX']
    const symbols = ['BTC', 'ETH', 'SOL', 'RNDR', 'ADA', 'DOT', 'LINK', 'UNI']
    
    const generateHeatmapData = () => {
      const data = []
      
      symbols.forEach(symbol => {
        exchanges.forEach(exchange => {
          let value
          
          switch (metric) {
            case 'price_change':
              value = (Math.random() - 0.5) * 20 // -10% à +10%
              break
            case 'volume_change':
              value = (Math.random() - 0.3) * 100 // -30% à +70%
              break
            case 'funding_rate':
              value = (Math.random() - 0.5) * 0.1 // -0.05% à +0.05%
              break
            case 'open_interest':
              value = (Math.random() - 0.2) * 50 // -10% à +40%
              break
            default:
              value = (Math.random() - 0.5) * 20
          }
          
          data.push({
            symbol,
            exchange,
            value,
            id: `${symbol}-${exchange}`
          })
        })
      })
      
      return data
    }

    setHeatmapData(generateHeatmapData())
    
    // Mise à jour périodique
    const interval = setInterval(() => {
      setHeatmapData(generateHeatmapData())
    }, 5000)
    
    return () => clearInterval(interval)
  }, [metric, timeframe])

  const maxValue = Math.max(...heatmapData.map(d => Math.abs(d.value)))
  const symbols = ['BTC', 'ETH', 'SOL', 'RNDR', 'ADA', 'DOT', 'LINK', 'UNI']
  const exchanges = ['Binance', 'Bybit', 'OKX', 'Coinbase', 'Kraken', 'FTX']

  const getMetricLabel = () => {
    switch (metric) {
      case 'price_change': return 'Variation Prix'
      case 'volume_change': return 'Variation Volume'
      case 'funding_rate': return 'Funding Rate'
      case 'open_interest': return 'Open Interest'
      default: return 'Variation Prix'
    }
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent mb-4">
          🔥 HEATMAP CRYPTO
        </h2>
        <p className="text-gray-400 text-lg">
          Visualisation en temps réel des performances par exchange
        </p>
      </motion.div>

      {/* Contrôles */}
      <PremiumCard className="group" delay={0.2}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">Métrique:</span>
            </div>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            >
              <option value="price_change">💰 Variation Prix</option>
              <option value="volume_change">📈 Variation Volume</option>
              <option value="funding_rate">💸 Funding Rate</option>
              <option value="open_interest">📊 Open Interest</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold">Période:</span>
            </div>
            <div className="flex space-x-2">
              {['1h', '24h', '7j', '30j'].map(period => (
                <motion.button
                  key={period}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    timeframe === period 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {period}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </PremiumCard>

      {/* Heatmap */}
      <PremiumCard className="group" delay={0.4}>
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">🔥 {getMetricLabel()} - {timeframe}</h3>
            <p className="text-gray-400 text-lg">Comparaison inter-exchanges en temps réel</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Headers exchanges */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              <div></div> {/* Empty corner */}
              {exchanges.map(exchange => (
                <div key={exchange} className="text-center">
                  <div className="text-sm font-semibold text-gray-300 rotate-45 origin-bottom-left transform translate-x-4">
                    {exchange}
                  </div>
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="space-y-2">
              {symbols.map((symbol, symbolIndex) => (
                <div key={symbol} className="grid grid-cols-7 gap-2 items-center">
                  {/* Symbol label */}
                  <div className="text-right pr-4">
                    <div className="flex items-center justify-end space-x-2">
                      <span className="text-sm font-semibold text-white">{symbol}</span>
                      <div className="text-lg">
                        {symbol === 'BTC' && '🟠'}
                        {symbol === 'ETH' && '🔷'}
                        {symbol === 'SOL' && '🟣'}
                        {symbol === 'RNDR' && '🎨'}
                        {symbol === 'ADA' && '💙'}
                        {symbol === 'DOT' && '🔴'}
                        {symbol === 'LINK' && '🔗'}
                        {symbol === 'UNI' && '🦄'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Cells */}
                  {exchanges.map((exchange, exchangeIndex) => {
                    const cellData = heatmapData.find(d => d.symbol === symbol && d.exchange === exchange)
                    const cellIndex = symbolIndex * exchanges.length + exchangeIndex
                    
                    return cellData ? (
                      <HeatMapCell
                        key={cellData.id}
                        data={cellData}
                        maxValue={maxValue}
                        index={cellIndex}
                      />
                    ) : (
                      <div key={`${symbol}-${exchange}`} className="aspect-square bg-gray-700 rounded-lg opacity-30"></div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Légende */}
        <div className="mt-8 flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-300 text-sm">Baisse forte</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-300 rounded"></div>
            <span className="text-gray-300 text-sm">Baisse légère</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-500 rounded"></div>
            <span className="text-gray-300 text-sm">Neutre</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-300 rounded"></div>
            <span className="text-gray-300 text-sm">Hausse légère</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-300 text-sm">Hausse forte</span>
          </div>
        </div>
      </PremiumCard>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Performers */}
        <PremiumCard className="group" delay={0.6}>
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h4 className="text-xl font-bold text-white">🚀 Top Performers</h4>
          </div>
          <div className="space-y-3">
            {heatmapData
              .filter(d => d.value > 0)
              .sort((a, b) => b.value - a.value)
              .slice(0, 5)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{item.symbol}</span>
                    <span className="text-gray-400 text-sm">{item.exchange}</span>
                  </div>
                  <span className="text-green-400 font-bold">+{item.value.toFixed(1)}%</span>
                </motion.div>
              ))}
          </div>
        </PremiumCard>

        {/* Worst Performers */}
        <PremiumCard className="group" delay={0.7}>
          <div className="flex items-center space-x-3 mb-4">
            <TrendingDown className="w-6 h-6 text-red-400" />
            <h4 className="text-xl font-bold text-white">📉 Pires Performances</h4>
          </div>
          <div className="space-y-3">
            {heatmapData
              .filter(d => d.value < 0)
              .sort((a, b) => a.value - b.value)
              .slice(0, 5)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{item.symbol}</span>
                    <span className="text-gray-400 text-sm">{item.exchange}</span>
                  </div>
                  <span className="text-red-400 font-bold">{item.value.toFixed(1)}%</span>
                </motion.div>
              ))}
          </div>
        </PremiumCard>

        {/* Statistiques globales */}
        <PremiumCard className="group" delay={0.8}>
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-blue-400" />
            <h4 className="text-xl font-bold text-white">📊 Stats Globales</h4>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Moyenne</span>
              <span className="text-white font-semibold">
                {(heatmapData.reduce((acc, d) => acc + d.value, 0) / heatmapData.length).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Volatilité</span>
              <span className="text-white font-semibold">
                {Math.sqrt(heatmapData.reduce((acc, d) => acc + d.value * d.value, 0) / heatmapData.length).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Positifs</span>
              <span className="text-green-400 font-semibold">
                {heatmapData.filter(d => d.value > 0).length}/{heatmapData.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Négatifs</span>
              <span className="text-red-400 font-semibold">
                {heatmapData.filter(d => d.value < 0).length}/{heatmapData.length}
              </span>
            </div>
          </div>
        </PremiumCard>
      </div>
    </div>
  )
})

HeatMapVisualization.displayName = 'HeatMapVisualization'

export default HeatMapVisualization

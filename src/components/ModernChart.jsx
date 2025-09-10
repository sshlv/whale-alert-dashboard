import React, { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react'

const ModernChart = ({ 
  title = "Prix Bitcoin", 
  data = [], 
  color = "#00d4ff", 
  type = "area",
  height = 300,
  showGrid = true,
  animated = true 
}) => {
  const [timeframe, setTimeframe] = useState('24h')
  const [chartData, setChartData] = useState([])

  const timeframes = [
    { id: '1h', label: '1H' },
    { id: '24h', label: '24H' },
    { id: '7d', label: '7J' },
    { id: '30d', label: '30J' },
    { id: '1y', label: '1A' }
  ]

  // Générer des données de démonstration réalistes
  useEffect(() => {
    const generateData = () => {
      const points = timeframe === '1h' ? 60 : timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 365
      const now = Date.now()
      const interval = timeframe === '1h' ? 60000 : timeframe === '24h' ? 3600000 : 86400000
      
      let basePrice = 45000
      const trend = Math.random() > 0.5 ? 1 : -1
      
      const newData = Array.from({ length: points }, (_, i) => {
        const timestamp = now - (points - 1 - i) * interval
        const volatility = 0.02 + Math.random() * 0.03
        const change = (Math.random() - 0.5) * volatility * basePrice
        const trendInfluence = trend * (Math.random() * 0.01 * basePrice)
        
        basePrice += change + trendInfluence
        basePrice = Math.max(basePrice, 30000) // Prix minimum
        
        return {
          time: new Date(timestamp).toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit',
            ...(timeframe !== '1h' && timeframe !== '24h' && { month: 'short', day: 'numeric' })
          }),
          price: Math.round(basePrice),
          volume: Math.round(Math.random() * 1000000000)
        }
      })
      
      setChartData(newData)
    }

    generateData()
    const interval = setInterval(generateData, 30000) // Mise à jour toutes les 30s
    return () => clearInterval(interval)
  }, [timeframe])

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0
  const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].price : currentPrice
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = previousPrice !== 0 ? ((priceChange / previousPrice) * 100) : 0
  const isPositive = priceChange >= 0

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-lg">
          <p className="text-slate-300 text-sm mb-1">{label}</p>
          <p className="text-white font-semibold">
            ${payload[0].value.toLocaleString()}
          </p>
          {payload[0].payload.volume && (
            <p className="text-slate-400 text-xs mt-1">
              Volume: ${(payload[0].payload.volume / 1000000).toFixed(1)}M
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const ChartComponent = type === 'area' ? AreaChart : LineChart

  return (
    <motion.div 
      className="modern-chart-container"
      initial={animated ? { opacity: 0, y: 20 } : false}
      animate={animated ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="modern-chart-header">
        <div className="flex items-center space-x-4">
          <div className="modern-metric-icon">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="modern-chart-title">{title}</h3>
            <div className="flex items-center space-x-3 mt-1">
              <span className="text-2xl font-bold text-white">
                ${currentPrice.toLocaleString()}
              </span>
              <div className={`modern-metric-change ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3 inline mr-1" /> : <TrendingDown className="w-3 h-3 inline mr-1" />}
                {isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        <div className="modern-chart-timeframe">
          {timeframes.map((tf) => (
            <button
              key={tf.id}
              onClick={() => setTimeframe(tf.id)}
              className={`modern-timeframe-btn ${timeframe === tf.id ? 'active' : ''}`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Graphique */}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={chartData}>
            <defs>
              <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255, 255, 255, 0.1)" 
                vertical={false}
              />
            )}
            
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickMargin={10}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickMargin={10}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {type === 'area' ? (
              <Area
                type="monotone"
                dataKey="price"
                stroke={color}
                strokeWidth={2}
                fill={`url(#gradient-${color.replace('#', '')})`}
                animationDuration={animated ? 1500 : 0}
                animationBegin={0}
              />
            ) : (
              <Line
                type="monotone"
                dataKey="price"
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: color, strokeWidth: 2, fill: '#ffffff' }}
                animationDuration={animated ? 1500 : 0}
                animationBegin={0}
              />
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>

      {/* Stats rapides */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">24h Vol:</span>
            <span className="text-white font-medium">$2.1B</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">Market Cap:</span>
            <span className="text-white font-medium">$890B</span>
          </div>
        </div>
        
        <div className="text-xs text-slate-500">
          Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}
        </div>
      </div>
    </motion.div>
  )
}

export default ModernChart

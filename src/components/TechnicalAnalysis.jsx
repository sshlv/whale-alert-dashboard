import React, { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Activity,
  Target,
  Zap,
  Brain,
  AlertTriangle,
  CheckCircle,
  DollarSign
} from 'lucide-react'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import PremiumChart from './ui/PremiumChart'
import { useRealTime } from './RealTimeDataManager'

const TechnicalAnalysis = memo(() => {
  const { liveData } = useRealTime()
  const [selectedCrypto, setSelectedCrypto] = useState('BTC')
  const [timeframe, setTimeframe] = useState('1h')
  const [indicators, setIndicators] = useState({})

  // Génération d'indicateurs techniques
  useEffect(() => {
    const generateIndicators = () => {
      const cryptos = ['BTC', 'ETH', 'SOL', 'RNDR']
      const newIndicators = {}

      cryptos.forEach(crypto => {
        // RSI (Relative Strength Index)
        const rsi = Math.random() * 100
        
        // MACD
        const macdLine = (Math.random() - 0.5) * 100
        const signalLine = (Math.random() - 0.5) * 100
        const histogram = macdLine - signalLine

        // Bollinger Bands
        const price = liveData?.prices?.[crypto]?.price || Math.random() * 50000
        const upperBand = price * (1 + Math.random() * 0.05)
        const lowerBand = price * (1 - Math.random() * 0.05)
        const bandPosition = ((price - lowerBand) / (upperBand - lowerBand)) * 100

        // Stochastic
        const stochK = Math.random() * 100
        const stochD = Math.random() * 100

        // Moving Averages
        const sma20 = price * (0.95 + Math.random() * 0.1)
        const sma50 = price * (0.93 + Math.random() * 0.14)
        const ema12 = price * (0.96 + Math.random() * 0.08)
        const ema26 = price * (0.94 + Math.random() * 0.12)

        // Volume indicators
        const volumeMA = Math.random() * 1000000000
        const currentVolume = volumeMA * (0.5 + Math.random() * 1.5)

        // Support/Resistance
        const support1 = price * 0.95
        const support2 = price * 0.90
        const resistance1 = price * 1.05
        const resistance2 = price * 1.10

        newIndicators[crypto] = {
          price,
          rsi: {
            value: rsi.toFixed(1),
            signal: rsi > 70 ? 'OVERBOUGHT' : rsi < 30 ? 'OVERSOLD' : 'NEUTRAL',
            color: rsi > 70 ? 'text-red-400' : rsi < 30 ? 'text-green-400' : 'text-yellow-400'
          },
          macd: {
            line: macdLine.toFixed(2),
            signal: signalLine.toFixed(2),
            histogram: histogram.toFixed(2),
            trend: histogram > 0 ? 'BULLISH' : 'BEARISH',
            color: histogram > 0 ? 'text-green-400' : 'text-red-400'
          },
          bollinger: {
            upper: upperBand.toFixed(2),
            lower: lowerBand.toFixed(2),
            position: bandPosition.toFixed(1),
            signal: bandPosition > 80 ? 'OVERBOUGHT' : bandPosition < 20 ? 'OVERSOLD' : 'NEUTRAL'
          },
          stochastic: {
            k: stochK.toFixed(1),
            d: stochD.toFixed(1),
            signal: stochK > 80 && stochD > 80 ? 'OVERBOUGHT' : 
                   stochK < 20 && stochD < 20 ? 'OVERSOLD' : 'NEUTRAL'
          },
          movingAverages: {
            sma20: sma20.toFixed(2),
            sma50: sma50.toFixed(2),
            ema12: ema12.toFixed(2),
            ema26: ema26.toFixed(2),
            trend: price > sma20 && sma20 > sma50 ? 'BULLISH' : 
                   price < sma20 && sma20 < sma50 ? 'BEARISH' : 'SIDEWAYS'
          },
          volume: {
            current: currentVolume,
            average: volumeMA,
            ratio: (currentVolume / volumeMA).toFixed(2),
            signal: currentVolume > volumeMA * 1.5 ? 'HIGH' : 
                   currentVolume < volumeMA * 0.5 ? 'LOW' : 'NORMAL'
          },
          supportResistance: {
            resistance2: resistance2.toFixed(2),
            resistance1: resistance1.toFixed(2),
            support1: support1.toFixed(2),
            support2: support2.toFixed(2)
          }
        }
      })

      setIndicators(newIndicators)
    }

    generateIndicators()
    const interval = setInterval(generateIndicators, 5000) // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval)
  }, [liveData])

  const currentIndicators = indicators[selectedCrypto] || {}

  // Score technique global
  const getTechnicalScore = (crypto) => {
    const ind = indicators[crypto]
    if (!ind) return { score: 50, signal: 'NEUTRAL', color: 'text-yellow-400' }

    let score = 50
    
    // RSI
    if (ind.rsi.signal === 'OVERSOLD') score += 15
    else if (ind.rsi.signal === 'OVERBOUGHT') score -= 15

    // MACD
    if (ind.macd.trend === 'BULLISH') score += 10
    else score -= 10

    // Moving Averages
    if (ind.movingAverages.trend === 'BULLISH') score += 15
    else if (ind.movingAverages.trend === 'BEARISH') score -= 15

    // Volume
    if (ind.volume.signal === 'HIGH') score += 10

    // Bollinger
    if (ind.bollinger.signal === 'OVERSOLD') score += 10
    else if (ind.bollinger.signal === 'OVERBOUGHT') score -= 10

    score = Math.max(0, Math.min(100, score))

    return {
      score: score.toFixed(0),
      signal: score >= 70 ? 'BULLISH' : score <= 30 ? 'BEARISH' : 'NEUTRAL',
      color: score >= 70 ? 'text-green-400' : score <= 30 ? 'text-red-400' : 'text-yellow-400'
    }
  }

  // Données pour les graphiques
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}h`,
    price: Math.random() * 1000 + 40000,
    rsi: Math.random() * 100,
    volume: Math.random() * 1000000
  }))

  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin', emoji: '🟠', color: 'from-orange-400 to-yellow-500' },
    { symbol: 'ETH', name: 'Ethereum', emoji: '🔷', color: 'from-blue-400 to-indigo-500' },
    { symbol: 'SOL', name: 'Solana', emoji: '🟣', color: 'from-purple-400 to-pink-500' },
    { symbol: 'RNDR', name: 'Render', emoji: '🎨', color: 'from-cyan-400 to-teal-500' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
          📊 ANALYSE TECHNIQUE AVANCÉE
        </h2>
        <p className="text-gray-400 text-lg">
          Indicateurs techniques et signaux de trading en temps réel
        </p>
      </motion.div>

      {/* Sélecteurs */}
      <PremiumCard className="group" delay={0.2}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-white font-semibold">Crypto:</span>
            <div className="flex space-x-2">
              {cryptos.map(crypto => (
                <motion.button
                  key={crypto.symbol}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCrypto(crypto.symbol)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCrypto === crypto.symbol
                      ? `bg-gradient-to-r ${crypto.color} text-white`
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <span className="text-lg">{crypto.emoji}</span>
                  <span>{crypto.symbol}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white font-semibold">Timeframe:</span>
            <div className="flex space-x-2">
              {['5m', '15m', '1h', '4h', '1d'].map(tf => (
                <motion.button
                  key={tf}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    timeframe === tf
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {tf}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </PremiumCard>

      {/* Scores Techniques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cryptos.map((crypto, index) => {
          const score = getTechnicalScore(crypto.symbol)
          return (
            <MetricCard
              key={crypto.symbol}
              title={`${crypto.emoji} ${crypto.name}`}
              value={`${score.score}/100`}
              change={score.signal}
              changeType={score.signal === 'BULLISH' ? 'positive' : score.signal === 'BEARISH' ? 'negative' : 'neutral'}
              icon={score.signal === 'BULLISH' ? TrendingUp : score.signal === 'BEARISH' ? TrendingDown : Activity}
              gradient={score.signal === 'BULLISH' ? 'green' : score.signal === 'BEARISH' ? 'red' : 'gray'}
              delay={index * 0.1}
            />
          )
        })}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <PremiumChart
            title={`📈 Prix ${selectedCrypto} (${timeframe})`}
            data={chartData}
            type="area"
            dataKey="price"
            xAxisKey="time"
            strokeColor="#10b981"
            fillColor="url(#priceGradient)"
            unit="$"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <PremiumChart
            title={`📊 RSI ${selectedCrypto}`}
            data={chartData}
            type="line"
            dataKey="rsi"
            xAxisKey="time"
            strokeColor="#8b5cf6"
            unit=""
          />
        </motion.div>
      </div>

      {/* Indicateurs Détaillés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RSI & Oscillateurs */}
        <PremiumCard className="group" delay={0.8}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">🔄 Oscillateurs</h3>
          </div>

          <div className="space-y-6">
            {/* RSI */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold">RSI (14)</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  currentIndicators.rsi?.signal === 'OVERBOUGHT' ? 'bg-red-500/20 text-red-400' :
                  currentIndicators.rsi?.signal === 'OVERSOLD' ? 'bg-green-500/20 text-green-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {currentIndicators.rsi?.signal || 'NEUTRAL'}
                </span>
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {currentIndicators.rsi?.value || '50.0'}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${currentIndicators.rsi?.value || 50}%` }}
                />
              </div>
            </div>

            {/* Stochastic */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold">Stochastic</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  currentIndicators.stochastic?.signal === 'OVERBOUGHT' ? 'bg-red-500/20 text-red-400' :
                  currentIndicators.stochastic?.signal === 'OVERSOLD' ? 'bg-green-500/20 text-green-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {currentIndicators.stochastic?.signal || 'NEUTRAL'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">%K</div>
                  <div className="text-xl font-bold text-blue-400">
                    {currentIndicators.stochastic?.k || '50.0'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">%D</div>
                  <div className="text-xl font-bold text-cyan-400">
                    {currentIndicators.stochastic?.d || '50.0'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PremiumCard>

        {/* MACD & Trend */}
        <PremiumCard className="group" delay={0.9}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">📈 Trend & Momentum</h3>
          </div>

          <div className="space-y-6">
            {/* MACD */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold">MACD</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  currentIndicators.macd?.trend === 'BULLISH' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {currentIndicators.macd?.trend || 'NEUTRAL'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-xs text-gray-400">MACD</div>
                  <div className="text-lg font-bold text-green-400">
                    {currentIndicators.macd?.line || '0.00'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Signal</div>
                  <div className="text-lg font-bold text-orange-400">
                    {currentIndicators.macd?.signal || '0.00'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Histogram</div>
                  <div className={`text-lg font-bold ${
                    parseFloat(currentIndicators.macd?.histogram || 0) > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {currentIndicators.macd?.histogram || '0.00'}
                  </div>
                </div>
              </div>
            </div>

            {/* Moving Averages */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold">Moving Averages</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  currentIndicators.movingAverages?.trend === 'BULLISH' ? 'bg-green-500/20 text-green-400' :
                  currentIndicators.movingAverages?.trend === 'BEARISH' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {currentIndicators.movingAverages?.trend || 'SIDEWAYS'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400">SMA 20</div>
                  <div className="text-sm font-bold text-blue-400">
                    ${currentIndicators.movingAverages?.sma20 || '0'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">SMA 50</div>
                  <div className="text-sm font-bold text-purple-400">
                    ${currentIndicators.movingAverages?.sma50 || '0'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">EMA 12</div>
                  <div className="text-sm font-bold text-green-400">
                    ${currentIndicators.movingAverages?.ema12 || '0'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">EMA 26</div>
                  <div className="text-sm font-bold text-orange-400">
                    ${currentIndicators.movingAverages?.ema26 || '0'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PremiumCard>
      </div>

      {/* Support/Resistance & Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Support/Resistance */}
        <PremiumCard className="group" delay={1.0}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">🎯 Support & Résistance</h3>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="text-center text-white font-semibold mb-4">
                Prix Actuel: ${currentIndicators.price?.toFixed(2) || '0.00'}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                  <span className="text-red-400 font-semibold">Résistance 2</span>
                  <span className="text-white">${currentIndicators.supportResistance?.resistance2 || '0'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                  <span className="text-red-300 font-semibold">Résistance 1</span>
                  <span className="text-white">${currentIndicators.supportResistance?.resistance1 || '0'}</span>
                </div>
                
                <div className="h-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border-2 border-yellow-500/30">
                  <span className="text-yellow-400 font-bold">PRIX ACTUEL</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                  <span className="text-green-300 font-semibold">Support 1</span>
                  <span className="text-white">${currentIndicators.supportResistance?.support1 || '0'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <span className="text-green-400 font-semibold">Support 2</span>
                  <span className="text-white">${currentIndicators.supportResistance?.support2 || '0'}</span>
                </div>
              </div>
            </div>
          </div>
        </PremiumCard>

        {/* Volume Analysis */}
        <PremiumCard className="group" delay={1.1}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">📊 Analyse Volume</h3>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold">Volume Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  currentIndicators.volume?.signal === 'HIGH' ? 'bg-green-500/20 text-green-400' :
                  currentIndicators.volume?.signal === 'LOW' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {currentIndicators.volume?.signal || 'NORMAL'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Volume Actuel</div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {currentIndicators.volume?.current ? 
                      `${(currentIndicators.volume.current / 1000000).toFixed(1)}M` : '0M'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Volume Moyen</div>
                  <div className="text-xl font-bold text-blue-400">
                    {currentIndicators.volume?.average ? 
                      `${(currentIndicators.volume.average / 1000000).toFixed(1)}M` : '0M'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Ratio</div>
                  <div className="text-xl font-bold text-white">
                    {currentIndicators.volume?.ratio || '1.00'}x
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    style={{ 
                      width: `${Math.min(100, (parseFloat(currentIndicators.volume?.ratio || 1) * 50))}%` 
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bollinger Bands */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold">Bollinger Bands</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  currentIndicators.bollinger?.signal === 'OVERBOUGHT' ? 'bg-red-500/20 text-red-400' :
                  currentIndicators.bollinger?.signal === 'OVERSOLD' ? 'bg-green-500/20 text-green-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {currentIndicators.bollinger?.signal || 'NEUTRAL'}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Upper Band</span>
                  <span className="text-red-400">${currentIndicators.bollinger?.upper || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lower Band</span>
                  <span className="text-green-400">${currentIndicators.bollinger?.lower || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Position</span>
                  <span className="text-yellow-400">{currentIndicators.bollinger?.position || '50'}%</span>
                </div>
              </div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </div>
  )
})

TechnicalAnalysis.displayName = 'TechnicalAnalysis'

export default TechnicalAnalysis

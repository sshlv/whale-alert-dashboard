import React, { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target,
  Zap,
  AlertTriangle,
  Star,
  BarChart3,
  Activity,
  Eye
} from 'lucide-react'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import { useRealTime } from './RealTimeDataManager'

const AIInsights = memo(() => {
  const { liveData } = useRealTime()
  const [predictions, setPredictions] = useState([])
  const [marketSignals, setMarketSignals] = useState([])
  const [aiConfidence, setAiConfidence] = useState(87.3)

  // Simulation IA avec prédictions dynamiques
  useEffect(() => {
    const generatePredictions = () => {
      const cryptos = ['BTC', 'ETH', 'SOL', 'RNDR']
      const newPredictions = cryptos.map(crypto => {
        const currentPrice = liveData.prices[crypto]?.price || 0
        const prediction = currentPrice * (1 + (Math.random() - 0.4) * 0.1) // ±10% variation
        const confidence = Math.random() * 40 + 60 // 60-100% confidence
        const timeframe = ['24h', '7j', '30j'][Math.floor(Math.random() * 3)]
        
        return {
          crypto,
          currentPrice,
          predictedPrice: prediction,
          change: ((prediction - currentPrice) / currentPrice) * 100,
          confidence,
          timeframe,
          signal: prediction > currentPrice ? 'bullish' : 'bearish',
          factors: [
            'Volume institutionnel en hausse',
            'Sentiment social positif',
            'Indicateurs techniques haussiers',
            'Corrélation avec BTC forte'
          ].slice(0, Math.floor(Math.random() * 3) + 2)
        }
      })
      setPredictions(newPredictions)
    }

    const generateMarketSignals = () => {
      const signals = [
        {
          type: 'whale_movement',
          message: 'Mouvement de baleine détecté: 2,500 BTC transférés',
          impact: 'high',
          confidence: 92,
          action: 'buy'
        },
        {
          type: 'funding_rate',
          message: 'Funding rates ETH atteignent des niveaux extrêmes',
          impact: 'medium',
          confidence: 78,
          action: 'watch'
        },
        {
          type: 'sentiment',
          message: 'Sentiment social SOL en forte amélioration (+23%)',
          impact: 'medium',
          confidence: 85,
          action: 'buy'
        },
        {
          type: 'technical',
          message: 'RNDR casse résistance majeure avec volume',
          impact: 'high',
          confidence: 89,
          action: 'strong_buy'
        }
      ]
      setMarketSignals(signals)
    }

    generatePredictions()
    generateMarketSignals()

    const interval = setInterval(() => {
      generatePredictions()
      setAiConfidence(Math.random() * 20 + 80) // 80-100%
    }, 15000) // Mise à jour toutes les 15 secondes

    return () => clearInterval(interval)
  }, [liveData])

  const getSignalColor = (signal) => {
    switch (signal) {
      case 'bullish': return 'text-green-400'
      case 'bearish': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getActionColor = (action) => {
    switch (action) {
      case 'strong_buy': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'buy': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'watch': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'sell': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const aiMetrics = [
    {
      title: '🧠 IA Confiance',
      value: `${aiConfidence.toFixed(1)}%`,
      change: 'Très élevée',
      changeType: 'positive',
      icon: Brain,
      gradient: 'purple'
    },
    {
      title: '🎯 Prédictions',
      value: predictions.length,
      change: 'Actives',
      changeType: 'positive',
      icon: Target,
      gradient: 'blue'
    },
    {
      title: '⚡ Signaux',
      value: marketSignals.length,
      change: 'Temps réel',
      changeType: 'positive',
      icon: Zap,
      gradient: 'orange'
    },
    {
      title: '📊 Précision',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: BarChart3,
      gradient: 'green'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header IA */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
          🧠 INTELLIGENCE ARTIFICIELLE
        </h2>
        <p className="text-gray-400 text-lg">
          Prédictions et analyse de marché pilotées par IA
        </p>
      </motion.div>

      {/* Métriques IA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiMetrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Prédictions IA */}
      <PremiumCard className="group" delay={0.5}>
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">🔮 Prédictions IA</h3>
            <p className="text-gray-400 text-lg">Analyse prédictive basée sur machine learning</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {predictions.map((pred, index) => (
              <motion.div
                key={pred.crypto}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">
                      {pred.crypto === 'BTC' && '🟠'}
                      {pred.crypto === 'ETH' && '🔷'}
                      {pred.crypto === 'SOL' && '🟣'}
                      {pred.crypto === 'RNDR' && '🎨'}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{pred.crypto}</h4>
                      <p className="text-gray-400 text-sm">{pred.timeframe}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getSignalColor(pred.signal)}`}>
                    {pred.signal === 'bullish' ? '📈 HAUSSIER' : '📉 BAISSIER'}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prix actuel</span>
                    <span className="text-white font-semibold">${pred.currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prédiction</span>
                    <span className={`font-bold ${getSignalColor(pred.signal)}`}>
                      ${pred.predictedPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Variation</span>
                    <span className={`font-bold ${getSignalColor(pred.signal)}`}>
                      {pred.change > 0 ? '+' : ''}{pred.change.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confiance IA</span>
                    <span className="text-cyan-400 font-semibold">{pred.confidence.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-400 text-sm mb-2">Facteurs clés:</p>
                  <div className="space-y-1">
                    {pred.factors.map((factor, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-gray-300 text-xs">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </PremiumCard>

      {/* Signaux de Marché */}
      <PremiumCard className="group" delay={0.7}>
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">⚡ Signaux IA en Temps Réel</h3>
            <p className="text-gray-400 text-lg">Alertes intelligentes basées sur l'analyse de données</p>
          </div>
        </div>

        <div className="space-y-4">
          {marketSignals.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">
                    {signal.type === 'whale_movement' && '🐋'}
                    {signal.type === 'funding_rate' && '💰'}
                    {signal.type === 'sentiment' && '📱'}
                    {signal.type === 'technical' && '📈'}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-1">{signal.message}</p>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        signal.impact === 'high' ? 'bg-red-500/20 text-red-300' :
                        signal.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {signal.impact.toUpperCase()} IMPACT
                      </span>
                      <span className="text-cyan-400 text-sm">
                        Confiance: {signal.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-xl border font-semibold text-sm ${getActionColor(signal.action)}`}>
                  {signal.action.replace('_', ' ').toUpperCase()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </PremiumCard>

      {/* Analyse de Sentiment */}
      <PremiumCard className="group" delay={0.9}>
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">👁️ Analyse de Sentiment</h3>
            <p className="text-gray-400 text-lg">Sentiment global du marché basé sur l'IA</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fear & Greed Index */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
            className="text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#fearGreedGradient)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={351}
                  initial={{ strokeDashoffset: 351 }}
                  animate={{ strokeDashoffset: 351 - (liveData.marketSentiment.fearGreedIndex / 100) * 351 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="fearGreedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{Math.round(liveData.marketSentiment.fearGreedIndex)}</div>
                  <div className="text-xs text-gray-400">F&G Index</div>
                </div>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Fear & Greed</h4>
            <p className="text-gray-400 text-sm">Indice psychologique du marché</p>
          </motion.div>

          {/* Sentiment Social */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center"
          >
            <div className="text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-4">
              {Math.round(liveData.marketSentiment.socialSentiment * 100)}%
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Sentiment Social</h4>
            <p className="text-gray-400 text-sm">Analyse Twitter/Reddit/Discord</p>
          </motion.div>

          {/* Score News */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <div className="text-6xl font-black bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
              {Math.round(liveData.marketSentiment.newsScore * 100)}%
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Score News</h4>
            <p className="text-gray-400 text-sm">Analyse sentiment actualités</p>
          </motion.div>
        </div>
      </PremiumCard>
    </div>
  )
})

AIInsights.displayName = 'AIInsights'

export default AIInsights

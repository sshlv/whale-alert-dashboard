import React, { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Target,
  Bell,
  CheckCircle,
  Clock,
  BarChart3,
  Activity,
  Eye,
  Volume2,
  VolumeX
} from 'lucide-react'
import { useRealTime } from './RealTimeDataManager'
import { useWhale } from '../context/WhaleContext'
import { useNotifications } from './NotificationSystem'
import { aiService } from '../services/aiService'
import PremiumCard from './ui/PremiumCard'

const AISignalGenerator = memo(() => {
  const { liveData } = useRealTime()
  const { alerts, settings } = useWhale()
  const { addNotification } = useNotifications()
  
  const [signals, setSignals] = useState([])
  const [isActive, setIsActive] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [signalStrength, setSignalStrength] = useState('medium')
  const [lastAnalysis, setLastAnalysis] = useState(null)

  // Génération intelligente de signaux IA
  useEffect(() => {
    if (!isActive) return

    const generateIntelligentSignal = () => {
      const cryptos = ['BTC', 'ETH', 'SOL', 'RNDR']
      const crypto = cryptos[Math.floor(Math.random() * cryptos.length)]
      
      // Analyse contextuelle du marché
      const currentPrice = liveData?.prices?.[crypto]?.price || 0
      const change24h = liveData?.prices?.[crypto]?.change24h || 0
      const sentiment = aiService.analyzeSentiment(liveData?.prices)
      
      // Génération de prédiction IA
      const prediction = aiService.generatePrediction(crypto, [currentPrice])
      
      // Facteurs techniques simulés mais réalistes
      const technicalFactors = {
        rsi: Math.random() * 100,
        macd: Math.random() > 0.5 ? 'bullish' : 'bearish',
        volume: Math.random() > 0.3 ? 'high' : 'normal',
        bollinger: Math.random() > 0.7 ? 'squeeze' : 'normal'
      }
      
      // Calcul de la force du signal
      let strength = 'weak'
      let confidence = prediction.confidence
      
      if (confidence > 85) strength = 'very_strong'
      else if (confidence > 75) strength = 'strong'
      else if (confidence > 65) strength = 'medium'
      
      // Type de signal basé sur la prédiction
      const priceChange = ((prediction.predictedPrice - currentPrice) / currentPrice) * 100
      let signalType = 'neutral'
      let action = 'WATCH'
      
      if (priceChange > 3) {
        signalType = 'bullish'
        action = priceChange > 7 ? 'STRONG_BUY' : 'BUY'
      } else if (priceChange < -3) {
        signalType = 'bearish'
        action = priceChange < -7 ? 'STRONG_SELL' : 'SELL'
      }
      
      // Raisons intelligentes basées sur l'analyse
      const reasons = []
      if (technicalFactors.rsi > 70) reasons.push('RSI en zone de surachat')
      else if (technicalFactors.rsi < 30) reasons.push('RSI en zone de survente')
      
      if (technicalFactors.macd === 'bullish') reasons.push('Signal MACD haussier')
      else reasons.push('Signal MACD baissier')
      
      if (technicalFactors.volume === 'high') reasons.push('Volume inhabituellement élevé')
      if (technicalFactors.bollinger === 'squeeze') reasons.push('Compression Bollinger - explosion imminente')
      
      if (Math.abs(change24h) > 5) {
        reasons.push(`Momentum ${change24h > 0 ? 'haussier' : 'baissier'} fort (+${Math.abs(change24h).toFixed(1)}%)`)
      }
      
      // Signal d'actualité simulé
      if (Math.random() > 0.7) {
        const newsEvents = [
          'Adoption institutionnelle détectée',
          'Sentiment social très positif',
          'Flux d\'actualités haussières',
          'Activité développeur en hausse',
          'Corrélation macro favorable'
        ]
        reasons.push(newsEvents[Math.floor(Math.random() * newsEvents.length)])
      }

      const signal = {
        id: Date.now() + Math.random(),
        crypto,
        type: signalType,
        action,
        strength,
        confidence: confidence.toFixed(1),
        currentPrice: currentPrice.toFixed(2),
        predictedPrice: prediction.predictedPrice.toFixed(2),
        priceChange: priceChange.toFixed(1),
        timeframe: prediction.timeframe,
        reasons: reasons.slice(0, 3), // Max 3 raisons
        timestamp: new Date(),
        technical: technicalFactors,
        risk: prediction.risk,
        isUrgent: strength === 'very_strong' || Math.abs(priceChange) > 8
      }

      setSignals(prev => [signal, ...prev.slice(0, 9)]) // Garde 10 signaux max

      // Notification pour les signaux forts
      if (signal.isUrgent || strength === 'very_strong') {
        addNotification({
          type: signal.type === 'bullish' ? 'success' : signal.type === 'bearish' ? 'warning' : 'ai',
          title: `🧠 Signal IA ${signal.strength.toUpperCase()}`,
          message: `${signal.action} ${signal.crypto} - Confiance: ${signal.confidence}%`,
          data: signal,
          critical: signal.isUrgent
        })

        // Son d'alerte si activé
        if (audioEnabled && signal.isUrgent) {
          playAlertSound(signal.type)
        }
      }

      return signal
    }

    // Analyse de marché périodique
    const analyzeMarket = () => {
      const analysis = {
        timestamp: new Date(),
        sentiment: aiService.analyzeSentiment(liveData?.prices),
        totalAlerts: alerts.length,
        volatility: calculateMarketVolatility(),
        trend: detectMarketTrend(),
        recommendation: ''
      }

      // Recommandation basée sur l'analyse
      if (analysis.sentiment.includes('bullish') && analysis.volatility < 0.05) {
        analysis.recommendation = '📈 Marché haussier stable - Opportunités d\'achat'
      } else if (analysis.sentiment.includes('bearish') && analysis.volatility > 0.1) {
        analysis.recommendation = '🚨 Marché baissier volatile - Protection du capital recommandée'
      } else if (analysis.volatility > 0.15) {
        analysis.recommendation = '⚡ Haute volatilité - Trading court terme uniquement'
      } else {
        analysis.recommendation = '🤔 Marché en consolidation - Patience recommandée'
      }

      setLastAnalysis(analysis)
    }

    // Fréquence adaptée selon le niveau de signal
    const signalInterval = signalStrength === 'high' ? 5000 : signalStrength === 'medium' ? 8000 : 12000
    
    const intervals = [
      setInterval(generateIntelligentSignal, signalInterval),
      setInterval(analyzeMarket, 30000) // Analyse toutes les 30s
    ]

    return () => intervals.forEach(clearInterval)
  }, [isActive, signalStrength, liveData, alerts, addNotification, audioEnabled])

  // Calculs d'analyse de marché
  const calculateMarketVolatility = () => {
    if (!liveData?.prices) return 0.05
    
    const changes = Object.values(liveData.prices).map(p => Math.abs(p.change24h || 0))
    return changes.reduce((a, b) => a + b, 0) / changes.length / 100
  }

  const detectMarketTrend = () => {
    if (!liveData?.prices) return 'neutral'
    
    const changes = Object.values(liveData.prices).map(p => p.change24h || 0)
    const avgChange = changes.reduce((a, b) => a + b, 0) / changes.length
    
    if (avgChange > 2) return 'bullish'
    if (avgChange < -2) return 'bearish'
    return 'neutral'
  }

  // Son d'alerte
  const playAlertSound = (signalType) => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Fréquences différentes selon le signal
      const frequencies = {
        bullish: [800, 1000, 1200],
        bearish: [400, 300, 200],
        neutral: [600, 600, 600]
      }
      
      frequencies[signalType].forEach((freq, i) => {
        setTimeout(() => {
          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
          
          if (i === 0) oscillator.start()
          if (i === frequencies[signalType].length - 1) {
            setTimeout(() => oscillator.stop(), 200)
          }
        }, i * 200)
      })
    }
  }

  const getSignalColor = (signal) => {
    const colors = {
      bullish: {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-400',
        icon: '📈'
      },
      bearish: {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        icon: '📉'
      },
      neutral: {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
        icon: '📊'
      }
    }
    return colors[signal.type] || colors.neutral
  }

  const getStrengthIcon = (strength) => {
    switch (strength) {
      case 'very_strong': return '🔥'
      case 'strong': return '⚡'
      case 'medium': return '💡'
      default: return '📍'
    }
  }

  const getCryptoEmoji = (crypto) => {
    const emojis = {
      'BTC': '🟠',
      'ETH': '🔷', 
      'SOL': '🟣',
      'RNDR': '🎨'
    }
    return emojis[crypto] || '💰'
  }

  return (
    <PremiumCard className="group" delay={0.2}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">🧠 Générateur de Signaux IA</h3>
            <p className="text-gray-400">Intelligence artificielle avancée</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Contrôles audio */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2 rounded-lg transition-all ${
              audioEnabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </motion.button>

          {/* Toggle activation */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              isActive
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
            }`}
          >
            {isActive ? 'ACTIF' : 'INACTIF'}
          </motion.button>
        </div>
      </div>

      {/* Analyse de marché en temps réel */}
      {lastAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span>Analyse de Marché IA</span>
            </h4>
            <span className="text-xs text-gray-400">
              {lastAnalysis.timestamp.toLocaleTimeString()}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
            <div className="text-center">
              <div className="text-sm text-gray-400">Sentiment</div>
              <div className="text-lg font-bold text-purple-400">{lastAnalysis.sentiment.toUpperCase()}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Volatilité</div>
              <div className="text-lg font-bold text-orange-400">{(lastAnalysis.volatility * 100).toFixed(1)}%</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Tendance</div>
              <div className="text-lg font-bold text-blue-400">{lastAnalysis.trend.toUpperCase()}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Alertes</div>
              <div className="text-lg font-bold text-green-400">{lastAnalysis.totalAlerts}</div>
            </div>
          </div>
          
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-200 text-sm font-medium">{lastAnalysis.recommendation}</p>
          </div>
        </motion.div>
      )}

      {/* Configuration */}
      <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
        <h4 className="text-lg font-semibold text-white mb-3">⚙️ Configuration Signaux</h4>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Fréquence:</span>
          <div className="flex space-x-2">
            {['low', 'medium', 'high'].map(level => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSignalStrength(level)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                  signalStrength === level
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {level.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Signaux */}
      <div className="space-y-4">
        {signals.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🤖</div>
            <p className="text-gray-400 text-lg">
              {isActive ? 'Génération de signaux IA en cours...' : 'Générateur désactivé'}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {signals.map((signal, index) => {
              const colors = getSignalColor(signal)
              return (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 ${colors.bg} ${colors.border}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getCryptoEmoji(signal.crypto)}</span>
                      <span className="text-2xl">{colors.icon}</span>
                      <span className="text-xl">{getStrengthIcon(signal.strength)}</span>
                      {signal.isUrgent && <span className="text-2xl animate-pulse">🚨</span>}
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${colors.text}`}>{signal.action}</div>
                      <div className="text-sm text-gray-400">{signal.strength.replace('_', ' ').toUpperCase()}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-400">Crypto</div>
                      <div className="text-lg font-bold text-white">{signal.crypto}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Prix Actuel</div>
                      <div className="text-lg font-semibold text-gray-200">${signal.currentPrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Prédiction</div>
                      <div className={`text-lg font-semibold ${colors.text}`}>${signal.predictedPrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Variation</div>
                      <div className={`text-lg font-bold ${colors.text}`}>
                        {signal.priceChange > 0 ? '+' : ''}{signal.priceChange}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-gray-300">Confiance: {signal.confidence}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">{signal.timeframe}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-gray-300">Risque: {signal.risk}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {signal.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-2">🔍 Facteurs d'analyse:</div>
                    <div className="space-y-1">
                      {signal.reasons.map((reason, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span className="text-xs text-gray-300">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>
    </PremiumCard>
  )
})

AISignalGenerator.displayName = 'AISignalGenerator'

export default AISignalGenerator

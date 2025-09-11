import React, { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  Play, 
  Pause, 
  TrendingUp, 
  TrendingDown, 
  Target,
  DollarSign,
  Zap,
  Brain,
  Settings as SettingsIcon,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import { useRealTime } from './RealTimeDataManager'
import { useNotifications } from './NotificationSystem'

const TradingBot = memo(() => {
  const { liveData } = useRealTime()
  const { addNotification } = useNotifications()
  
  const [botSettings, setBotSettings] = useState({
    enabled: false,
    strategy: 'scalping',
    riskLevel: 'medium',
    maxPositionSize: 1000,
    stopLoss: 2.0,
    takeProfit: 5.0,
    enabledPairs: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'],
    tradingFrequency: 'high' // high, medium, low
  })

  const [botStats, setBotStats] = useState({
    totalTrades: 0,
    winRate: 0,
    totalProfit: 0,
    currentPositions: [],
    dailyPnL: 0,
    weeklyPnL: 0,
    monthlyPnL: 0,
    maxDrawdown: 0,
    sharpeRatio: 0
  })

  const [activeTrades, setActiveTrades] = useState([])
  const [tradeHistory, setTradeHistory] = useState([])
  const [signals, setSignals] = useState([])

  // Simulation du trading bot
  useEffect(() => {
    if (!botSettings.enabled) return

    const generateSignal = () => {
      const pairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'RNDR/USDT']
      const pair = pairs[Math.floor(Math.random() * pairs.length)]
      const action = Math.random() > 0.5 ? 'BUY' : 'SELL'
      const confidence = Math.random() * 40 + 60 // 60-100%
      const price = liveData?.prices?.[pair.split('/')[0]]?.price || Math.random() * 50000
      
      const signal = {
        id: Date.now() + Math.random(),
        pair,
        action,
        price: price.toFixed(2),
        confidence: confidence.toFixed(1),
        timestamp: new Date(),
        reason: [
          'RSI divergence détectée',
          'Cassure de résistance',
          'Signal MACD bullish',
          'Volume en augmentation',
          'Support technique fort'
        ][Math.floor(Math.random() * 5)]
      }

      setSignals(prev => [signal, ...prev.slice(0, 9)])

      // Notification pour signaux forts
      if (confidence > 85) {
        addNotification({
          type: 'ai',
          title: `🤖 Signal Trading Fort`,
          message: `${action} ${pair} - Confiance: ${confidence.toFixed(1)}%`,
          data: { pair, action, confidence: confidence.toFixed(1) },
          critical: true
        })
      }
    }

    const executeTrade = () => {
      if (activeTrades.length >= 5) return // Max 5 positions

      const pairs = botSettings.enabledPairs
      const pair = pairs[Math.floor(Math.random() * pairs.length)]
      const action = Math.random() > 0.5 ? 'BUY' : 'SELL'
      const amount = Math.random() * botSettings.maxPositionSize + 100
      const price = liveData?.prices?.[pair.split('/')[0]]?.price || Math.random() * 50000

      const trade = {
        id: Date.now(),
        pair,
        action,
        amount: amount.toFixed(2),
        entryPrice: price.toFixed(2),
        currentPrice: price.toFixed(2),
        pnl: 0,
        status: 'OPEN',
        timestamp: new Date(),
        stopLoss: action === 'BUY' ? 
          (price * (1 - botSettings.stopLoss / 100)).toFixed(2) :
          (price * (1 + botSettings.stopLoss / 100)).toFixed(2),
        takeProfit: action === 'BUY' ?
          (price * (1 + botSettings.takeProfit / 100)).toFixed(2) :
          (price * (1 - botSettings.takeProfit / 100)).toFixed(2)
      }

      setActiveTrades(prev => [trade, ...prev])

      addNotification({
        type: 'success',
        title: `🤖 Trade Exécuté`,
        message: `${action} ${amount} ${pair} à ${price.toFixed(2)}`,
        data: { pair, action, amount, price }
      })
    }

    // Mise à jour des trades actifs
    const updateTrades = () => {
      setActiveTrades(prev => prev.map(trade => {
        const currentPrice = liveData?.prices?.[trade.pair.split('/')[0]]?.price || parseFloat(trade.currentPrice)
        const priceDiff = currentPrice - parseFloat(trade.entryPrice)
        const pnl = trade.action === 'BUY' ? 
          (priceDiff / parseFloat(trade.entryPrice)) * 100 :
          (-priceDiff / parseFloat(trade.entryPrice)) * 100

        return {
          ...trade,
          currentPrice: currentPrice.toFixed(2),
          pnl: pnl.toFixed(2)
        }
      }))
    }

    const intervals = [
      setInterval(generateSignal, 8000), // Signaux toutes les 8s
      setInterval(executeTrade, 15000), // Trades toutes les 15s
      setInterval(updateTrades, 3000)   // Mise à jour prix toutes les 3s
    ]

    return () => intervals.forEach(clearInterval)
  }, [botSettings.enabled, liveData, addNotification, botSettings])

  // Calcul des stats
  useEffect(() => {
    const totalPnL = activeTrades.reduce((sum, trade) => sum + parseFloat(trade.pnl || 0), 0)
    const winningTrades = activeTrades.filter(trade => parseFloat(trade.pnl || 0) > 0).length
    const winRate = activeTrades.length > 0 ? (winningTrades / activeTrades.length) * 100 : 0

    setBotStats(prev => ({
      ...prev,
      totalTrades: activeTrades.length + tradeHistory.length,
      winRate: winRate.toFixed(1),
      dailyPnL: totalPnL.toFixed(2),
      currentPositions: activeTrades.length
    }))
  }, [activeTrades, tradeHistory])

  const strategies = [
    { id: 'scalping', name: 'Scalping', desc: 'Trades rapides, petits profits' },
    { id: 'swing', name: 'Swing Trading', desc: 'Positions moyennes termes' },
    { id: 'dca', name: 'DCA', desc: 'Dollar Cost Averaging' },
    { id: 'grid', name: 'Grid Trading', desc: 'Trading en grille' },
    { id: 'arbitrage', name: 'Arbitrage', desc: 'Différences de prix' }
  ]

  const riskLevels = [
    { id: 'low', name: 'Faible', color: 'text-green-400', desc: '1-2% par trade' },
    { id: 'medium', name: 'Moyen', color: 'text-yellow-400', desc: '2-5% par trade' },
    { id: 'high', name: 'Élevé', color: 'text-red-400', desc: '5-10% par trade' }
  ]

  const toggleBot = () => {
    setBotSettings(prev => ({ ...prev, enabled: !prev.enabled }))
    
    addNotification({
      type: botSettings.enabled ? 'warning' : 'success',
      title: `🤖 Bot ${botSettings.enabled ? 'Arrêté' : 'Démarré'}`,
      message: `Trading automatique ${botSettings.enabled ? 'désactivé' : 'activé'}`,
      critical: false
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-black bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
          🤖 TRADING BOT AUTOMATIQUE
        </h2>
        <p className="text-gray-400 text-lg">
          Intelligence artificielle pour le trading automatisé
        </p>
      </motion.div>

      {/* Contrôles Bot */}
      <PremiumCard className="group" delay={0.2}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className={`p-4 rounded-xl transition-all duration-300 ${
              botSettings.enabled 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                : 'bg-gradient-to-r from-gray-500 to-gray-600'
            }`}>
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">Status du Bot</h3>
              <p className={`text-lg ${botSettings.enabled ? 'text-green-400' : 'text-red-400'}`}>
                {botSettings.enabled ? '🟢 ACTIF - Trading en cours' : '🔴 INACTIF - Bot arrêté'}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleBot}
            className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              botSettings.enabled
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            } text-white shadow-lg`}
          >
            {botSettings.enabled ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            <span>{botSettings.enabled ? 'ARRÊTER' : 'DÉMARRER'}</span>
          </motion.button>
        </div>

        {/* Paramètres rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-white font-semibold mb-2">Stratégie</label>
            <select
              value={botSettings.strategy}
              onChange={(e) => setBotSettings(prev => ({ ...prev, strategy: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
              disabled={botSettings.enabled}
            >
              {strategies.map(strategy => (
                <option key={strategy.id} value={strategy.id}>
                  {strategy.name} - {strategy.desc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Niveau de Risque</label>
            <select
              value={botSettings.riskLevel}
              onChange={(e) => setBotSettings(prev => ({ ...prev, riskLevel: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
              disabled={botSettings.enabled}
            >
              {riskLevels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name} - {level.desc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Taille Max Position ($)</label>
            <input
              type="number"
              value={botSettings.maxPositionSize}
              onChange={(e) => setBotSettings(prev => ({ ...prev, maxPositionSize: parseInt(e.target.value) }))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
              disabled={botSettings.enabled}
              min="100"
              max="10000"
              step="100"
            />
          </div>
        </div>
      </PremiumCard>

      {/* Métriques Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="💰 P&L Journalier"
          value={`$${botStats.dailyPnL}`}
          change={parseFloat(botStats.dailyPnL) > 0 ? `+${Math.abs(parseFloat(botStats.dailyPnL)).toFixed(1)}%` : `${botStats.dailyPnL}%`}
          changeType={parseFloat(botStats.dailyPnL) > 0 ? 'positive' : 'negative'}
          icon={DollarSign}
          gradient={parseFloat(botStats.dailyPnL) > 0 ? 'green' : 'red'}
          delay={0.1}
        />
        <MetricCard
          title="📊 Taux de Réussite"
          value={`${botStats.winRate}%`}
          change={parseFloat(botStats.winRate) > 60 ? 'Excellent' : parseFloat(botStats.winRate) > 40 ? 'Bon' : 'À améliorer'}
          changeType={parseFloat(botStats.winRate) > 50 ? 'positive' : 'negative'}
          icon={Target}
          gradient="blue"
          delay={0.2}
        />
        <MetricCard
          title="🔄 Trades Actifs"
          value={botStats.currentPositions}
          change={`${botStats.totalTrades} total`}
          changeType="positive"
          icon={Activity}
          gradient="purple"
          delay={0.3}
        />
        <MetricCard
          title="⚡ Fréquence"
          value={botSettings.tradingFrequency.toUpperCase()}
          change={botSettings.enabled ? 'En cours' : 'Arrêté'}
          changeType={botSettings.enabled ? 'positive' : 'negative'}
          icon={Zap}
          gradient="orange"
          delay={0.4}
        />
      </div>

      {/* Signaux IA */}
      <PremiumCard className="group" delay={0.6}>
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">🧠 Signaux IA en Temps Réel</h3>
            <p className="text-gray-400 text-lg">Analyse technique automatisée</p>
          </div>
        </div>

        {signals.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🤖</div>
            <p className="text-gray-400 text-lg">En attente de signaux...</p>
            {!botSettings.enabled && (
              <p className="text-yellow-400 text-sm mt-2">💡 Cliquez sur "DÉMARRER" pour activer l'IA</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {signals.map((signal, index) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border backdrop-blur-sm ${
                    signal.action === 'BUY' 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`text-4xl ${signal.action === 'BUY' ? '🟢' : '🔴'}`}>
                        {signal.action === 'BUY' ? '📈' : '📉'}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-2xl font-bold ${
                            signal.action === 'BUY' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {signal.action}
                          </span>
                          <span className="text-white text-xl font-semibold">{signal.pair}</span>
                        </div>
                        <p className="text-gray-300 text-sm mt-1">{signal.reason}</p>
                        <p className="text-gray-400 text-xs">
                          {signal.timestamp.toLocaleTimeString()} - Prix: ${signal.price}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">{signal.confidence}%</div>
                      <div className="text-sm text-gray-400">Confiance</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </PremiumCard>

      {/* Positions Actives */}
      <PremiumCard className="group" delay={0.8}>
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">📊 Positions Actives</h3>
            <p className="text-gray-400 text-lg">Trades en cours d'exécution</p>
          </div>
        </div>

        {activeTrades.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">💤</div>
            <p className="text-gray-400 text-lg">Aucune position active</p>
            {!botSettings.enabled && (
              <p className="text-yellow-400 text-sm mt-2">Démarrez le bot pour voir les trades</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400">Paire</th>
                  <th className="text-left py-3 px-4 text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400">Montant</th>
                  <th className="text-left py-3 px-4 text-gray-400">Prix d'entrée</th>
                  <th className="text-left py-3 px-4 text-gray-400">Prix actuel</th>
                  <th className="text-left py-3 px-4 text-gray-400">P&L</th>
                  <th className="text-left py-3 px-4 text-gray-400">Temps</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {activeTrades.map((trade, index) => (
                    <motion.tr
                      key={trade.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="py-3 px-4 text-white font-semibold">{trade.pair}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          trade.action === 'BUY' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {trade.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">${trade.amount}</td>
                      <td className="py-3 px-4 text-gray-300">${trade.entryPrice}</td>
                      <td className="py-3 px-4 text-white font-semibold">${trade.currentPrice}</td>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${
                          parseFloat(trade.pnl) > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {parseFloat(trade.pnl) > 0 ? '+' : ''}{trade.pnl}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {Math.floor((new Date() - trade.timestamp) / 60000)}m
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </PremiumCard>
    </div>
  )
})

TradingBot.displayName = 'TradingBot'

export default TradingBot

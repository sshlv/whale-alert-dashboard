import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ModernChart from './ModernChart'
import ModernMetricCard from './ModernMetricCard'
import SuperModernAlertsSection from './SuperModernAlertsSection'
import RealTimePrices from './RealTimePrices'
import PriceStatusIndicator from './PriceStatusIndicator'
import ForceRealPrices from './ForceRealPrices'
import { useWhale } from '../context/WhaleContext'
import { usePrices } from '../context/PriceContext'
import FreeMarketAPIsService from '../services/freeMarketAPIs'
import { 
  Activity, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Users,
  Globe,
  Zap,
  Shield,
  Eye,
  Bitcoin,
  Coins
} from 'lucide-react'

const ModernDashboard = () => {
  // Accès aux vraies données du contexte
  const { alerts, stats, isMonitoring } = useWhale()
  const { prices: contextPrices, loading: pricesLoading, error: pricesError, connectionStatus } = usePrices()
  
  const [marketData, setMarketData] = useState({
    btcPrice: 0,
    ethPrice: 0,
    solPrice: 0,
    rndrPrice: 0,
    totalAlerts: stats.totalAlerts || 0,
    activeWhales: stats.chainStats?.ETH?.alerts || 0,
    marketCap: 0,
    fearGreed: 0
  })
  const [realPrices, setRealPrices] = useState({})
  const [loading, setLoading] = useState(true)

  // 🔥 UTILISATION DU NOUVEAU CONTEXTE PRIX OPTIMISÉ
  useEffect(() => {
    console.log('🔍 [ModernDashboard] Context prices changed:', contextPrices)
    console.log('🔍 [ModernDashboard] Prices loading:', pricesLoading)
    console.log('🔍 [ModernDashboard] Connection status:', connectionStatus)
    
    if (contextPrices && Object.keys(contextPrices).length > 0) {
      // Vérifier si les prix ne sont pas à 0 (ce qui signifierait qu'ils n'ont pas été récupérés)
      const hasValidPrices = contextPrices.BTC?.price > 0 || contextPrices.ETH?.price > 0
      
      if (hasValidPrices) {
        console.log('✅ [ModernDashboard] Using REAL context prices:', contextPrices)
        
        setRealPrices(contextPrices)
        setMarketData(prev => ({
          ...prev,
          btcPrice: contextPrices.BTC?.price || 0,
          ethPrice: contextPrices.ETH?.price || 0,
          solPrice: contextPrices.SOL?.price || 0,
          rndrPrice: contextPrices.RNDR?.price || 0
        }))
        setLoading(false)
      } else {
        console.warn('⚠️ [ModernDashboard] Context prices are zero, keeping loading state')
      }
    } else {
      console.warn('⚠️ [ModernDashboard] No context prices available')
    }
  }, [contextPrices, pricesLoading, connectionStatus])
  const marketService = new FreeMarketAPIsService()

  // Mise à jour avec les vraies données du contexte
  useEffect(() => {
    setMarketData(prev => ({
      ...prev,
      totalAlerts: stats.totalAlerts || 0,
      activeWhales: (stats.chainStats?.ETH?.alerts || 0) + (stats.chainStats?.BTC?.alerts || 0) + (stats.chainStats?.SOL?.alerts || 0)
    }))
  }, [stats])

  // 🚫 ANCIENNE FONCTION DÉSACTIVÉE - UTILISE MAINTENANT LE CONTEXTE OPTIMISÉ
  const fetchRealPrices = async () => {
    console.log('⚠️ [ModernDashboard] fetchRealPrices désactivé - utilise le contexte PriceContext')
    // Cette fonction est maintenant remplacée par le contexte PriceContext optimisé
    return
  }

  // 🚫 ANCIEN INTERVAL DÉSACTIVÉ - LE CONTEXTE GÈRE MAINTENANT LES MISES À JOUR
  /*
  useEffect(() => {
    fetchRealPrices()
    const interval = setInterval(fetchRealPrices, 10000)
    return () => clearInterval(interval)
  }, [])
  */

  const fmtUSD = (n) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(n || 0)

  // 🔥 DEBUG: Log des prix pour voir ce qui se passe
  console.log('🔍 [DEBUG CARDS] marketData:', marketData)
  console.log('🔍 [DEBUG CARDS] realPrices:', realPrices)
  console.log('🔍 [DEBUG CARDS] contextPrices:', contextPrices)

  const metricCards = [
    {
      title: "Prix Bitcoin",
      value: `$${new Intl.NumberFormat('en-US').format(
        contextPrices.BTC?.price || marketData.btcPrice || 0
      )}`,
      change: `${(contextPrices.BTC?.change || realPrices.BTC?.change24h || 0) > 0 ? '+' : ''}${((contextPrices.BTC?.change || realPrices.BTC?.change24h || 0)).toFixed(2)}%`,
      changePercent: contextPrices.BTC?.change || realPrices.BTC?.change24h || 0,
      icon: Bitcoin,
      color: "orange",
      trend: "up",
      subtitle: `Bitcoin ${contextPrices.BTC?.price ? '🟢 LIVE' : '🔴 STATIC'}`
    },
    {
      title: "Prix Ethereum", 
      value: `$${new Intl.NumberFormat('en-US').format(
        contextPrices.ETH?.price || marketData.ethPrice || 0
      )}`,
      change: `${(contextPrices.ETH?.change || realPrices.ETH?.change24h || 0) > 0 ? '+' : ''}${((contextPrices.ETH?.change || realPrices.ETH?.change24h || 0)).toFixed(2)}%`,
      changePercent: contextPrices.ETH?.change || realPrices.ETH?.change24h || 0,
      icon: Coins,
      color: "blue",
      trend: "up",
      subtitle: `Ethereum ${contextPrices.ETH?.price ? '🟢 LIVE' : '🔴 STATIC'}`
    },
    {
      title: "Prix Solana",
      value: `$${new Intl.NumberFormat('en-US').format(marketData.solPrice || 190)}`,
      change: `${realPrices.SOL?.change24h > 0 ? '+' : ''}${(realPrices.SOL?.change24h || 4.2).toFixed(2)}%`,
      changePercent: realPrices.SOL?.change24h || 4.2,
      icon: Coins,
      color: "purple",
      trend: "up",
      subtitle: "Solana"
    },
    {
      title: "Prix Render",
      value: `$${new Intl.NumberFormat('en-US').format(marketData.rndrPrice || 3.36)}`,
      change: `${realPrices.RNDR?.change24h > 0 ? '+' : ''}${(realPrices.RNDR?.change24h || -1.2).toFixed(2)}%`,
      changePercent: realPrices.RNDR?.change24h || -1.2,
      icon: Coins,
      color: "green",
      trend: realPrices.RNDR?.change24h > 0 ? "up" : "down",
      subtitle: "Render Token"
    },
    {
      title: "Alertes Aujourd'hui",
      value: marketData.totalAlerts.toString(),
      change: "+12",
      icon: AlertTriangle,
      color: "yellow",
      trend: "up",
      subtitle: "Dernière: il y a 2min"
    },
    {
      title: "Baleines Actives",
      value: marketData.activeWhales.toString(),
      change: "+5",
      icon: Users,
      color: "purple",
      trend: "up", 
      subtitle: "Surveillance continue"
    },
    {
      title: "Market Cap Total",
      value: `$${marketData.marketCap.toFixed(1)}T`,
      change: "+3.2%",
      changePercent: 3.2,
      icon: Globe,
      color: "green",
      trend: "up",
      subtitle: "Crypto global"
    },
    {
      title: "Fear & Greed Index",
      value: marketData.fearGreed.toString(),
      change: "Greed",
      icon: Activity,
      color: "green",
      trend: "up",
      subtitle: "Sentiment positif"
    }
  ]

  // Utiliser les vraies alertes du contexte avec toutes les données
  const recentAlerts = alerts.slice(0, 5)

  const topCryptos = [
    { 
      symbol: "BTC", 
      name: "Bitcoin", 
      price: fmtUSD(realPrices.BTC?.price || marketData.btcPrice || 0), 
      change: realPrices.BTC?.change24h || 0, 
      volume: realPrices.BTC?.volume ? `$${fmtUSD(realPrices.BTC.volume)}` : "Chargement..."
    },
    { 
      symbol: "ETH", 
      name: "Ethereum", 
      price: fmtUSD(realPrices.ETH?.price || marketData.ethPrice || 0), 
      change: realPrices.ETH?.change24h || 0, 
      volume: realPrices.ETH?.volume ? `$${fmtUSD(realPrices.ETH.volume)}` : "Chargement..."
    },
    { 
      symbol: "SOL", 
      name: "Solana", 
      price: fmtUSD(realPrices.SOL?.price || marketData.solPrice || 0), 
      change: realPrices.SOL?.change24h || 0, 
      volume: realPrices.SOL?.volume ? `$${fmtUSD(realPrices.SOL.volume)}` : "Chargement..."
    },
    { 
      symbol: "RNDR", 
      name: "Render", 
      price: fmtUSD(realPrices.RNDR?.price || marketData.rndrPrice || 0), 
      change: realPrices.RNDR?.change24h || 0, 
      volume: realPrices.RNDR?.volume ? `$${fmtUSD(realPrices.RNDR.volume)}` : "Chargement..."
    }
  ]

  return (
    <div className="modern-animate space-y-6 p-6">
      {/* 🔥 TEST DIRECT BINANCE API */}
      <ForceRealPrices />
      
      {/* 🔥 INDICATEUR DE STATUS DES PRIX */}
      <PriceStatusIndicator 
        prices={contextPrices}
        loading={pricesLoading}
        error={pricesError}
        connectionStatus={connectionStatus}
      />
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-slate-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Tableau de Bord
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 ml-3">
                  Crypto
                </span>
                {/* 🔥 INDICATEUR SYSTÈME OPTIMISÉ */}
                <span className={`ml-3 px-2 py-1 rounded-lg text-xs font-bold ${
                  connectionStatus === 'connected' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {connectionStatus === 'connected' ? '🟢 PRIX RÉELS' : '🔴 PROBLÈME'}
                </span>
              </h1>
              <p className="text-slate-400">
                Surveillance en temps réel des mouvements de baleines et analyse du marché
                {pricesError && (
                  <span className="ml-2 text-red-400 text-sm">
                    ⚠️ Erreur API: {pricesError}
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  ${(marketData.btcPrice + marketData.ethPrice).toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">Portfolio Total</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Status rapide */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className="text-sm text-slate-300">
                {isMonitoring ? 'Surveillance active' : 'Surveillance arrêtée'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">{marketData.totalAlerts} alertes aujourd'hui</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">API 100% gratuite</span>
            </div>
          </div>
        </div>

        {/* Effet de background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Métriques principales - TOUS LES PRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {metricCards.map((card, index) => (
          <ModernMetricCard
            key={card.title}
            {...card}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Graphiques et données */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique Bitcoin */}
        <ModernChart
          title="Bitcoin (BTC)"
          color="#f7931a"
          type="area"
          height={350}
        />

        {/* Graphique Ethereum */}
        <ModernChart
          title="Ethereum (ETH)" 
          color="#627eea"
          type="area"
          height={350}
        />
      </div>

      {/* Données détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertes récentes */}
        <motion.div 
          className="modern-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                Alertes Récentes
              </h3>
              <span className="text-sm bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full">
                {recentAlerts.length} {recentAlerts.length === 0 ? '(Aucune alerte)' : 'nouvelles'}
              </span>
            </div>

            <SuperModernAlertsSection alerts={recentAlerts} />

            <motion.button 
              className="w-full mt-4 modern-btn modern-btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Voir toutes les alertes
            </motion.button>
          </div>
        </motion.div>

        {/* Top Cryptos */}
        <motion.div 
          className="modern-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Top Cryptos
              </h3>
              <span className="text-sm text-slate-400">Prix en temps réel</span>
            </div>

            <div className="space-y-4">
              {topCryptos.map((crypto, index) => (
                <motion.div
                  key={crypto.symbol}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {crypto.symbol}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{crypto.name}</div>
                      <div className="text-sm text-slate-400">Vol: {crypto.volume}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">
                      ${crypto.price.toLocaleString()}
                    </div>
                    <div className={`text-sm font-medium ${
                      crypto.change > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {crypto.change > 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button 
              className="w-full mt-4 modern-btn modern-btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Analyser le marché
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ModernDashboard

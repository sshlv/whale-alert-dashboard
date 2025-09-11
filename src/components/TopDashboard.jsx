import React from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Wifi, WifiOff, Activity, AlertCircle, CheckCircle, Server } from 'lucide-react'
import { usePrices } from '../context/PriceContext'
import OptimizedPriceCard from './OptimizedPriceCard'
import SuperModernAlertsSection from './SuperModernAlertsSection'
import { useWhale } from '../context/WhaleContext'

const TopDashboard = () => {
  const { 
    loading, 
    error, 
    lastUpdate, 
    refreshPrices, 
    connectionStatus, 
    apiSource, 
    retryCount,
    getStats 
  } = usePrices()
  const { alerts } = useWhale()
  
  const stats = getStats()
  
  const cryptos = ['BTC', 'ETH', 'SOL', 'RNDR']

  return (
    <div className="space-y-8 p-6">
      {/* Header avec status */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Crypto Dashboard Pro
          </h1>
          <p className="text-slate-400 mt-2">
            Prix en temps réel - Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Status de connexion amélioré */}
          <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 ${
            connectionStatus === 'error' 
              ? 'bg-red-500/10 border border-red-500/20' 
              : connectionStatus === 'connected'
              ? 'bg-green-500/10 border border-green-500/20'
              : 'bg-yellow-500/10 border border-yellow-500/20'
          }`}>
            <div className="flex items-center space-x-2">
              {connectionStatus === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-400" />
              ) : connectionStatus === 'connected' ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <Activity className="w-4 h-4 text-yellow-400 animate-pulse" />
              )}
              
              <div className="flex flex-col">
                <span className={`text-xs font-medium ${
                  connectionStatus === 'error' ? 'text-red-400' : 
                  connectionStatus === 'connected' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {connectionStatus === 'error' ? 'Erreur' : 
                   connectionStatus === 'connected' ? 'En ligne' : 'Connexion...'}
                </span>
                <span className="text-xs text-slate-500">via {apiSource}</span>
              </div>
            </div>

            {retryCount > 0 && (
              <div className="flex items-center space-x-1">
                <Server className="w-3 h-3 text-orange-400" />
                <span className="text-xs text-orange-400">{retryCount}</span>
              </div>
            )}
          </div>

          {/* Statistiques rapides */}
          <div className="hidden md:flex items-center space-x-3 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <div className="text-xs text-slate-400">
              Requêtes: <span className="text-white font-mono">{stats.totalRequests}</span>
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
            <div className="text-xs text-slate-400">
              Source: <span className="text-blue-400 font-medium">{apiSource}</span>
            </div>
          </div>

          {/* Bouton refresh amélioré */}
          <button
            onClick={refreshPrices}
            disabled={loading}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg
              bg-blue-500/10 border border-blue-500/20 text-blue-400
              hover:bg-blue-500/20 transition-all duration-200
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20'}
            `}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">
              {loading ? 'Mise à jour...' : 'Actualiser'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Grille des prix crypto */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cryptos.map((symbol, index) => (
          <OptimizedPriceCard
            key={symbol}
            symbol={symbol}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Section des alertes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <SuperModernAlertsSection alerts={alerts} />
      </motion.div>

      {/* Footer avec informations système amélioré */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="text-slate-300 font-medium flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Système</span>
            </h4>
            <div className="space-y-1 text-slate-400">
              <p>🚀 Source principale: {apiSource}</p>
              <p>📊 Fréquence: 15-60s adaptatif</p>
              <p>🔄 Fallback automatique</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-slate-300 font-medium flex items-center space-x-2">
              <Server className="w-4 h-4" />
              <span>Performance</span>
            </h4>
            <div className="space-y-1 text-slate-400">
              <p>📈 Requêtes: {stats.totalRequests}</p>
              <p>⏱️ Dernière: {stats.lastRequestTime.toLocaleTimeString('fr-FR')}</p>
              <p>🔧 Rate limiting intelligent</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-slate-300 font-medium flex items-center space-x-2">
              {connectionStatus === 'connected' ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400" />
              )}
              <span>État</span>
            </h4>
            <div className="space-y-1 text-slate-400">
              <p className={connectionStatus === 'connected' ? 'text-green-400' : 'text-red-400'}>
                {connectionStatus === 'connected' ? '✅ Tout fonctionne' : '⚠️ Problème détecté'}
              </p>
              {retryCount > 0 && (
                <p className="text-orange-400">🔄 Tentatives: {retryCount}</p>
              )}
              {error && (
                <p className="text-red-400 text-xs">
                  Erreur: {error.length > 50 ? error.substring(0, 50) + '...' : error}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default TopDashboard

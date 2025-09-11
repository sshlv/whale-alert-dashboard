import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  Activity, 
  Wifi, 
  Server, 
  Clock, 
  BarChart3, 
  RefreshCw, 
  Zap,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { usePrices } from '../context/PriceContext'

const DeveloperPanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const { 
    connectionStatus, 
    apiSource, 
    retryCount, 
    getStats, 
    enablePowerSaveMode,
    error,
    loading
  } = usePrices()
  
  const stats = getStats()
  const [performanceMetrics, setPerformanceMetrics] = useState({
    responseTime: 0,
    successRate: 100,
    requestsPerMinute: 0
  })

  // Simulation de métriques de performance
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceMetrics(prev => ({
        responseTime: Math.random() * 1000 + 200, // 200-1200ms
        successRate: retryCount > 0 ? Math.max(70, 100 - (retryCount * 10)) : 100,
        requestsPerMinute: Math.floor(stats.totalRequests / ((Date.now() - stats.lastRequestTime.getTime()) / 60000)) || 0
      }))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [retryCount, stats])

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-400'
      case 'error': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <Wifi className="w-4 h-4" />
      case 'error': return <Server className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bouton de toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-lg backdrop-blur-xl border
          ${connectionStatus === 'connected' 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : connectionStatus === 'error'
            ? 'bg-red-500/10 border-red-500/20 text-red-400'
            : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
          }
          hover:scale-105 transition-all duration-200 shadow-lg
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {getStatusIcon(connectionStatus)}
        <span className="text-sm font-medium">Dev Panel</span>
        {loading && <RefreshCw className="w-3 h-3 animate-spin" />}
        {retryCount > 0 && (
          <span className="bg-orange-500 text-white text-xs px-1 rounded-full">
            {retryCount}
          </span>
        )}
      </motion.button>

      {/* Panel développeur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Panel Développeur</span>
              </h3>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Status rapide */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  {getStatusIcon(connectionStatus)}
                  <span className="text-xs text-slate-400">Connexion</span>
                </div>
                <div className={`text-sm font-medium ${getStatusColor(connectionStatus)}`}>
                  {connectionStatus === 'connected' ? 'Stable' : 
                   connectionStatus === 'error' ? 'Erreur' : 'Instable'}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Server className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-slate-400">Source</span>
                </div>
                <div className="text-sm font-medium text-blue-400">
                  {apiSource}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-slate-400">Requêtes</span>
                </div>
                <div className="text-sm font-medium text-purple-400">
                  {stats.totalRequests}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-slate-400">Latence</span>
                </div>
                <div className="text-sm font-medium text-green-400">
                  {performanceMetrics.responseTime.toFixed(0)}ms
                </div>
              </div>
            </div>

            {/* Métriques détaillées */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  {/* Taux de succès */}
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">Taux de succès</span>
                      <span className={`text-sm font-medium ${
                        performanceMetrics.successRate > 90 ? 'text-green-400' :
                        performanceMetrics.successRate > 70 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {performanceMetrics.successRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          performanceMetrics.successRate > 90 ? 'bg-green-400' :
                          performanceMetrics.successRate > 70 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${performanceMetrics.successRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Erreurs */}
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Server className="w-4 h-4 text-red-400" />
                        <span className="text-xs text-red-400">Dernière erreur</span>
                      </div>
                      <div className="text-xs text-red-300 break-words">
                        {error.length > 50 ? error.substring(0, 50) + '...' : error}
                      </div>
                    </div>
                  )}

                  {/* Statistiques avancées */}
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-2">Statistiques</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Tentatives échouées:</span>
                        <span className="text-orange-400">{retryCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Req/min moyenne:</span>
                        <span className="text-blue-400">{performanceMetrics.requestsPerMinute}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Dernière requête:</span>
                        <span className="text-green-400 font-mono">
                          {stats.lastRequestTime.toLocaleTimeString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={enablePowerSaveMode}
                      className="flex-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs py-2 px-3 rounded-lg hover:bg-yellow-500/20 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Mode éco</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-slate-700/50">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>API Status Monitor</span>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-green-400 animate-pulse' :
                    connectionStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'
                  }`} />
                  <span>Live</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DeveloperPanel

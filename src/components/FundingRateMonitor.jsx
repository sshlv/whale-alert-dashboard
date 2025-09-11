import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertTriangle, Activity, RefreshCw } from 'lucide-react'
import { FundingRateService } from '../services/fundingRateService'

const FundingRateMonitor = () => {
  const [fundingData, setFundingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fundingService = new FundingRateService()

  const fetchFundingRates = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await fundingService.monitorFundingRates()
      setFundingData(data)
      setLastUpdate(new Date())
    } catch (err) {
      setError('Erreur lors de la récupération des funding rates')
      console.error('Erreur funding rates:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFundingRates()
    const interval = setInterval(fetchFundingRates, 60000) // Mise à jour toutes les minutes
    return () => clearInterval(interval)
  }, [])

  const formatFundingRate = (rate) => {
    const sign = rate >= 0 ? '+' : ''
    const color = rate >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
    return (
      <span className={color}>
        {sign}{rate.toFixed(4)}%
      </span>
    )
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      case 'high': return 'bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      default: return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return '🚨'
      case 'high': return '⚠️'
      case 'medium': return '⚡'
      default: return '✅'
    }
  }

  if (loading && !fundingData) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-center space-x-2">
          <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
          <span className="text-gray-600 dark:text-gray-400">Chargement des funding rates...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card p-6">
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
          <AlertTriangle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            📊 Funding Rates Monitor
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Surveillance des taux de financement des principales plateformes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchFundingRates}
            disabled={loading}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          {lastUpdate && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Mis à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
            </span>
          )}
        </div>
      </div>

      {/* Résumé */}
      {fundingData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="card p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Symboles</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {fundingData.summary.totalSymbols}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Alertes Critiques</p>
                <p className="text-lg font-semibold text-red-600">
                  {fundingData.summary.criticalAlerts}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Alertes Élevées</p>
                <p className="text-lg font-semibold text-orange-600">
                  {fundingData.summary.highAlerts}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Funding Moyen</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {fundingData.summary.avgFundingRate.toFixed(4)}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Funding Rates par symbole */}
      {fundingData && fundingData.rates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
            📈 Funding Rates par Symbole
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Symbole</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Funding Rate</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Min/Max</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Plateformes</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Statut</th>
                </tr>
              </thead>
              <tbody>
                {fundingData.rates.map((rate, index) => (
                  <motion.tr
                    key={rate.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="py-3">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {rate.symbol}
                      </span>
                    </td>
                    <td className="py-3">
                      {formatFundingRate(rate.avgFundingRate)}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {rate.minFundingRate.toFixed(4)}% / {rate.maxFundingRate.toFixed(4)}%
                    </td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {rate.platforms.map(platform => (
                          <span
                            key={platform}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(rate.alertLevel.level)}`}>
                        {getSeverityIcon(rate.alertLevel.level)} {rate.alertLevel.level}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Alertes */}
      {fundingData && fundingData.alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
            🚨 Alertes Funding Rates
          </h4>
          <div className="space-y-3">
            {fundingData.alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-lg">{getSeverityIcon(alert.severity)}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {alert.message}
                    </p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>Symbole: {alert.symbol}</span>
                      <span>Rate: {alert.fundingRate.toFixed(4)}%</span>
                      <span>Plateformes: {alert.platforms.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default FundingRateMonitor

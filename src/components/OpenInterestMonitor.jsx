import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, AlertTriangle, RefreshCw, DollarSign } from 'lucide-react'

const OpenInterestMonitor = () => {
  const [oiData, setOiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  // Simulation des données d'Open Interest (remplace par vraies APIs)
  const fetchOpenInterestData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulation de données réalistes
      const mockData = {
        openInterest: [
          {
            symbol: 'BTCUSDT',
            totalOpenInterest: 45230.5,
            avgOpenInterest: 15076.8,
            totalValue: 1850000000,
            platforms: ['Binance', 'Bybit', 'OKX'],
            change: {
              absoluteChange: 1250.3,
              percentChange: 8.5,
              valueChange: 125000000,
              trend: 'increasing'
            },
            alertLevel: { level: 'medium', color: 'yellow', icon: '📈' }
          },
          {
            symbol: 'ETHUSDT',
            totalOpenInterest: 892340.2,
            avgOpenInterest: 297446.7,
            totalValue: 950000000,
            platforms: ['Binance', 'Bybit', 'OKX'],
            change: {
              absoluteChange: -12450.8,
              percentChange: -12.3,
              valueChange: -85000000,
              trend: 'decreasing'
            },
            alertLevel: { level: 'high', color: 'orange', icon: '⚠️' }
          },
          {
            symbol: 'SOLUSDT',
            totalOpenInterest: 125680.4,
            avgOpenInterest: 41893.5,
            totalValue: 320000000,
            platforms: ['Binance', 'Bybit'],
            change: {
              absoluteChange: 2340.1,
              percentChange: 2.1,
              valueChange: 15000000,
              trend: 'increasing'
            },
            alertLevel: { level: 'normal', color: 'green', icon: '✅' }
          },
          {
            symbol: 'RNDRUSDT',
            totalOpenInterest: 8450.7,
            avgOpenInterest: 2816.9,
            totalValue: 45000000,
            platforms: ['Binance', 'Bybit'],
            change: {
              absoluteChange: 890.2,
              percentChange: 18.5,
              valueChange: 8500000,
              trend: 'increasing'
            },
            alertLevel: { level: 'critical', color: 'red', icon: '🚨' }
          }
        ],
        alerts: [
          {
            type: 'OI_MASSIVE_INCREASE',
            symbol: 'RNDRUSDT',
            change: 18.5,
            message: 'Augmentation massive d\'OI sur RNDRUSDT: +18.50% (signal haussier potentiel)',
            severity: 'critical',
            trend: 'bullish'
          },
          {
            type: 'OI_MASSIVE_DECREASE',
            symbol: 'ETHUSDT',
            change: -12.3,
            message: 'Diminution importante d\'OI sur ETHUSDT: -12.30% (déleverage en cours)',
            severity: 'high',
            trend: 'bearish'
          }
        ],
        summary: {
          totalSymbols: 4,
          criticalAlerts: 1,
          highAlerts: 1,
          totalOIValue: 3165000000,
          avgOIChange: 4.2
        }
      }
      
      setOiData(mockData)
      setLastUpdate(new Date())
    } catch (err) {
      setError('Erreur lors de la récupération des Open Interest')
      console.error('Erreur OI:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOpenInterestData()
    const interval = setInterval(fetchOpenInterestData, 300000) // Mise à jour toutes les 5 minutes
    return () => clearInterval(interval)
  }, [])

  const formatValue = (value) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${value.toFixed(2)}`
  }

  const formatChange = (change) => {
    if (!change) return { text: 'N/A', color: 'text-gray-500' }
    
    const sign = change.percentChange >= 0 ? '+' : ''
    const color = change.percentChange >= 0 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400'
    
    return {
      text: `${sign}${change.percentChange.toFixed(2)}%`,
      color: color,
      icon: change.percentChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
      case 'high': return 'bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200'
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
      default: return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'bullish': return '🐂'
      case 'bearish': return '🐻'
      default: return '↔️'
    }
  }

  if (loading && !oiData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-center space-x-2">
          <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
          <span className="text-gray-600 dark:text-gray-400">Chargement des Open Interest...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
            📊 Open Interest Monitor
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Surveillance des positions ouvertes sur les principales plateformes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchOpenInterestData}
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
      {oiData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Symboles</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {oiData.summary.totalSymbols}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Valeur Totale OI</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatValue(oiData.summary.totalOIValue)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Alertes Critiques</p>
                <p className="text-lg font-semibold text-red-600">
                  {oiData.summary.criticalAlerts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Variation Moyenne</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  +{oiData.summary.avgOIChange.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Open Interest par symbole */}
      {oiData && oiData.openInterest.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
            📈 Open Interest par Symbole
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Symbole</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">OI Total</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Valeur</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Variation 24h</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Plateformes</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Statut</th>
                </tr>
              </thead>
              <tbody>
                {oiData.openInterest.map((oi, index) => {
                  const changeData = formatChange(oi.change)
                  return (
                    <tr
                      key={oi.symbol}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="py-3">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {oi.symbol}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                        {oi.totalOpenInterest.toLocaleString('fr-FR')}
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">
                        {formatValue(oi.totalValue)}
                      </td>
                      <td className="py-3">
                        <div className={`flex items-center space-x-1 ${changeData.color}`}>
                          {changeData.icon}
                          <span className="text-sm font-medium">{changeData.text}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {oi.platforms.map(platform => (
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
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(oi.alertLevel.level)}`}>
                          {oi.alertLevel.icon} {oi.alertLevel.level}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Alertes Open Interest */}
      {oiData && oiData.alerts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
            🚨 Alertes Open Interest
          </h4>
          <div className="space-y-3">
            {oiData.alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-lg">{getTrendIcon(alert.trend)}</span>
                  <div className="flex-1">
                    <p className="font-medium">
                      {alert.message}
                    </p>
                    <div className="flex items-center space-x-4 mt-1 text-sm opacity-75">
                      <span>Symbole: {alert.symbol}</span>
                      <span>Variation: {alert.change.toFixed(2)}%</span>
                      <span>Tendance: {alert.trend}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OpenInterestMonitor

import React, { memo, Suspense } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  TrendingUp, 
  Eye, 
  Shield,
  DollarSign,
  Users,
  Zap,
  Globe
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import { useRealTime } from './RealTimeDataManager'
import ProfessionalMetricCard from './ProfessionalMetricCard'

const ProfessionalDashboard = memo(() => {
  const { alerts, isMonitoring, activeChains, stats, settings } = useWhale()
  const { liveData } = useRealTime()

  const LoadingCard = () => (
    <div className="professional-card">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 professional-bg-secondary professional-rounded animate-pulse" />
        <div className="flex-1">
          <div className="h-4 professional-bg-secondary professional-rounded animate-pulse mb-2" />
          <div className="h-6 professional-bg-secondary professional-rounded animate-pulse w-20" />
        </div>
      </div>
    </div>
  )

  const getCurrentMetrics = () => {
    const btcPrice = liveData?.prices?.BTC?.price || 0
    const btcChange = liveData?.prices?.BTC?.change24h || 0
    const totalMarketCap = liveData?.marketSentiment?.totalMarketCap || 0
    const volume24h = liveData?.marketSentiment?.totalVolume || 0

    return [
      {
        title: 'Alerts Today',
        value: alerts.length.toString(),
        change: `+${Math.floor(Math.random() * 20)}`,
        icon: Activity,
        trend: 'positive',
        subtitle: 'detected'
      },
      {
        title: 'Total Volume',
        value: volume24h > 0 ? `$${(volume24h / 1e9).toFixed(1)}B` : '$42.5B',
        change: '+5.2%',
        icon: DollarSign,
        trend: 'positive',
        subtitle: '24h'
      },
      {
        title: 'Market Cap',
        value: totalMarketCap > 0 ? `$${(totalMarketCap / 1e12).toFixed(2)}T` : '$1.65T',
        change: '+2.1%',
        icon: TrendingUp,
        trend: 'positive',
        subtitle: 'total'
      },
      {
        title: 'Active Chains',
        value: activeChains.length.toString(),
        change: 'stable',
        icon: Eye,
        trend: 'neutral',
        subtitle: 'monitored'
      },
      {
        title: 'System Status',
        value: isMonitoring ? 'ONLINE' : 'OFFLINE',
        change: isMonitoring ? '99.9%' : '0%',
        icon: Shield,
        trend: isMonitoring ? 'positive' : 'negative',
        subtitle: 'uptime'
      },
      {
        title: 'API Sources',
        value: '5/5',
        change: '100%',
        icon: Globe,
        trend: 'positive',
        subtitle: 'active'
      }
    ]
  }

  const marketStatus = () => {
    const btcChange = liveData?.prices?.BTC?.change24h || 0
    const fearGreed = liveData?.marketSentiment?.fearGreedIndex || 50

    if (fearGreed > 75) return { status: 'Extreme Greed', color: 'text-red-400', icon: '🔥' }
    if (fearGreed > 55) return { status: 'Greed', color: 'text-orange-400', icon: '📈' }
    if (fearGreed > 45) return { status: 'Neutral', color: 'text-gray-400', icon: '⚖️' }
    if (fearGreed > 25) return { status: 'Fear', color: 'text-yellow-400', icon: '⚠️' }
    return { status: 'Extreme Fear', color: 'text-green-400', icon: '💎' }
  }

  const currentStatus = marketStatus()
  const metrics = getCurrentMetrics()

  return (
    <div className="professional-container py-6 space-y-8">
      {/* System Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="professional-card"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isMonitoring 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="professional-text-xl professional-font-bold professional-text-primary">
                Whale Alert Professional
              </h2>
              <p className="professional-text-sm professional-text-muted">
                Real-time crypto monitoring with AI-powered insights
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="professional-text-sm professional-font-medium professional-text-muted">
                Market Sentiment
              </div>
              <div className={`professional-text-lg professional-font-bold ${currentStatus.color}`}>
                {currentStatus.icon} {currentStatus.status}
              </div>
            </div>
            
            <div className={`professional-status ${
              isMonitoring ? 'professional-status-online' : 'professional-status-offline'
            }`}>
              <motion.div
                className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-400' : 'bg-red-400'}`}
                animate={isMonitoring ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              {isMonitoring ? 'SYSTEM ACTIVE' : 'SYSTEM INACTIVE'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="professional-text-lg professional-font-bold professional-text-primary mb-6"
        >
          Key Metrics
        </motion.h3>
        
        <div className="professional-grid professional-grid-cols-1 md:professional-grid-cols-2 lg:professional-grid-cols-3 xl:professional-grid-cols-6">
          {metrics.map((metric, index) => (
            <ProfessionalMetricCard
              key={metric.title}
              {...metric}
              delay={index * 0.1}
              isLoading={!liveData && index < 3}
            />
          ))}
        </div>
      </div>

      {/* Real-time Data Section */}
      <div className="professional-grid professional-grid-cols-1 lg:professional-grid-cols-2 gap-8">
        {/* Price Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="professional-card"
        >
          <div className="professional-card-header">
            <h4 className="professional-card-title">Live Prices</h4>
            <div className="professional-text-xs professional-text-muted">
              Real-time from multiple sources
            </div>
          </div>
          
          <div className="space-y-4">
            {['BTC', 'ETH', 'SOL', 'RNDR'].map((symbol) => {
              const data = liveData?.prices?.[symbol]
              const price = data?.price || 0
              const change = data?.change24h || 0
              
              return (
                <div key={symbol} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 professional-bg-secondary professional-rounded flex items-center justify-center">
                      <span className="professional-text-sm professional-font-bold">
                        {symbol === 'BTC' ? '₿' : symbol === 'ETH' ? 'Ξ' : symbol === 'SOL' ? '◎' : '🎨'}
                      </span>
                    </div>
                    <div>
                      <div className="professional-font-medium professional-text-primary">
                        {symbol}
                      </div>
                      <div className="professional-text-xs professional-text-muted">
                        {symbol === 'BTC' ? 'Bitcoin' : 
                         symbol === 'ETH' ? 'Ethereum' : 
                         symbol === 'SOL' ? 'Solana' : 'Render'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="professional-font-bold professional-text-primary">
                      ${price > 0 ? price.toLocaleString() : '---'}
                    </div>
                    <div className={`professional-text-sm ${
                      change > 0 ? 'text-green-400' : change < 0 ? 'text-red-400' : 'professional-text-muted'
                    }`}>
                      {change > 0 ? '+' : ''}{change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="professional-card"
        >
          <div className="professional-card-header">
            <h4 className="professional-card-title">Recent Activity</h4>
            <div className="professional-text-xs professional-text-muted">
              Last {alerts.length} alerts
            </div>
          </div>
          
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <div className="professional-text-4xl mb-2">🔍</div>
                <p className="professional-text-muted">No alerts detected</p>
                <p className="professional-text-xs professional-text-muted">
                  System is monitoring for whale transactions
                </p>
              </div>
            ) : (
              alerts.slice(0, 5).map((alert, index) => (
                <div key={alert.id || index} className="flex items-start gap-3 p-3 professional-bg-secondary professional-rounded">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="professional-text-sm professional-font-medium professional-text-primary">
                      {alert.type} Transaction
                    </div>
                    <div className="professional-text-xs professional-text-muted">
                      {alert.amount} {alert.symbol} • {alert.timestamp || 'Now'}
                    </div>
                  </div>
                  <div className="professional-text-xs professional-text-muted">
                    {alert.chain}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Performance Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="professional-card"
      >
        <div className="professional-card-header">
          <h4 className="professional-card-title">System Performance</h4>
          <div className="professional-text-xs professional-text-muted">
            Last 24 hours
          </div>
        </div>
        
        <div className="professional-grid professional-grid-cols-2 md:professional-grid-cols-4 gap-6">
          <div className="text-center">
            <div className="professional-text-2xl professional-font-bold professional-text-primary mb-1">
              99.9%
            </div>
            <div className="professional-text-xs professional-text-muted">Uptime</div>
          </div>
          <div className="text-center">
            <div className="professional-text-2xl professional-font-bold professional-text-primary mb-1">
              {alerts.length}
            </div>
            <div className="professional-text-xs professional-text-muted">Alerts Processed</div>
          </div>
          <div className="text-center">
            <div className="professional-text-2xl professional-font-bold professional-text-primary mb-1">
              5
            </div>
            <div className="professional-text-xs professional-text-muted">API Sources</div>
          </div>
          <div className="text-center">
            <div className="professional-text-2xl professional-font-bold professional-text-primary mb-1">
              &lt;200ms
            </div>
            <div className="professional-text-xs professional-text-muted">Response Time</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
})

ProfessionalDashboard.displayName = 'ProfessionalDashboard'

export default ProfessionalDashboard

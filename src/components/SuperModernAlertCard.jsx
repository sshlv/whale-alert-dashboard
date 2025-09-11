import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  Clock,
  Activity,
  Minus,
  ExternalLink,
  Hash,
  Copy,
  Check,
  Eye,
  Zap,
  Target,
  ArrowRightLeft
} from 'lucide-react'

const SuperModernAlertCard = ({ alert, index, delay = 0 }) => {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // Déterminer les couleurs et styles selon la tendance
  const getTrendConfig = (trend) => {
    switch (trend) {
      case 'bullish':
        return {
          label: 'HAUSSIER 📈',
          icon: TrendingUp,
          gradient: 'from-emerald-400/20 via-green-500/10 to-teal-400/5',
          border: 'border-emerald-400/30',
          accent: 'text-emerald-400',
          glow: 'shadow-emerald-500/20',
          background: 'bg-gradient-to-br from-emerald-900/20 to-green-800/10'
        }
      case 'bearish':
        return {
          label: 'BAISSIER 📉',
          icon: TrendingDown,
          gradient: 'from-red-400/20 via-rose-500/10 to-pink-400/5',
          border: 'border-red-400/30',
          accent: 'text-red-400',
          glow: 'shadow-red-500/20',
          background: 'bg-gradient-to-br from-red-900/20 to-rose-800/10'
        }
      default:
        return {
          label: 'NEUTRE ➡️',
          icon: Minus,
          gradient: 'from-slate-400/20 via-gray-500/10 to-zinc-400/5',
          border: 'border-slate-400/30',
          accent: 'text-slate-400',
          glow: 'shadow-slate-500/20',
          background: 'bg-gradient-to-br from-slate-900/20 to-gray-800/10'
        }
    }
  }

  // Calculer l'impact
  const getImpactConfig = (value) => {
    if (value >= 100000000) return { level: '🌊 TSUNAMI', color: 'text-purple-400 bg-purple-500/20' }
    if (value >= 50000000) return { level: '💥 MASSIVE', color: 'text-red-400 bg-red-500/20' }
    if (value >= 10000000) return { level: '🔥 ÉNORME', color: 'text-orange-400 bg-orange-500/20' }
    if (value >= 1000000) return { level: '⚡ LARGE', color: 'text-yellow-400 bg-yellow-500/20' }
    return { level: '💫 NORMAL', color: 'text-blue-400 bg-blue-500/20' }
  }

  // Formatage des montants
  const formatAmount = (amount, symbol) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M ${symbol}`
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K ${symbol}`
    }
    return `${amount.toFixed(2)} ${symbol}`
  }

  // Formatage valeur USD
  const formatValue = (value) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toLocaleString()}`
  }

  // Copier le hash
  const copyHash = async () => {
    if (alert.hash) {
      await navigator.clipboard.writeText(alert.hash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Explorer blockchain
  const openExplorer = () => {
    const getExplorerUrl = (type, hash) => {
      switch (type) {
        case 'BTC':
          return `https://blockstream.info/tx/${hash}`
        case 'ETH':
          return `https://etherscan.io/tx/${hash}`
        case 'SOL':
          return `https://explorer.solana.com/tx/${hash}`
        default:
          return `https://etherscan.io/tx/${hash}`
      }
    }
    
    if (alert.hash) {
      window.open(getExplorerUrl(alert.type, alert.hash), '_blank')
    }
  }

  const trendConfig = getTrendConfig(alert.trend)
  const impact = getImpactConfig(alert.value_usd)
  const TrendIcon = trendConfig.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ 
        delay: index * delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={`
        relative overflow-hidden rounded-2xl border backdrop-blur-xl
        ${trendConfig.border} ${trendConfig.background} ${trendConfig.glow}
        shadow-2xl cursor-pointer group
        hover:shadow-3xl transition-all duration-500
      `}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Gradient animé de fond */}
      <div className={`absolute inset-0 bg-gradient-to-br ${trendConfig.gradient} opacity-50`} />
      
      {/* Motif géométrique de fond */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
      </div>

      <div className="relative z-10 p-6">
        {/* Header avec crypto et tendance */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: alert.color }}
            >
              {alert.symbol}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{alert.token}</h3>
              <p className="text-sm text-slate-300">{alert.symbol}</p>
            </div>
          </div>
          
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl bg-black/20 border ${trendConfig.border}`}>
            <TrendIcon className={`w-5 h-5 ${trendConfig.accent}`} />
            <span className={`text-sm font-bold ${trendConfig.accent}`}>
              {trendConfig.label}
            </span>
          </div>
        </div>

        {/* Montants en grille */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-black/30 rounded-xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Montant
              </span>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatAmount(alert.amount, alert.symbol)}
            </p>
          </div>

          <div className="bg-black/30 rounded-xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Valeur USD
              </span>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatValue(alert.value_usd)}
            </p>
          </div>
        </div>

        {/* Transaction flow */}
        <div className="bg-black/20 rounded-xl p-4 mb-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white bg-slate-700/50 px-3 py-1 rounded-lg">
                  {alert.from}
                </span>
                <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-white bg-slate-700/50 px-3 py-1 rounded-lg">
                  {alert.to}
                </span>
              </div>
            </div>
            
            <div className={`px-3 py-1 rounded-lg text-xs font-bold ${impact.color}`}>
              {impact.level}
            </div>
          </div>
        </div>

        {/* Section Hash - TOUJOURS VISIBLE */}
        {alert.hash && (
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 mb-4 border border-blue-500/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Hash className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                  Transaction Hash
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    copyHash()
                  }}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-blue-400" />
                  )}
                  <span className="text-xs text-blue-400 font-medium">
                    {copied ? 'Copié!' : 'Copier'}
                  </span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openExplorer()
                  }}
                  className="flex items-center space-x-1 px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-purple-400 font-medium">
                    Explorer
                  </span>
                </button>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-slate-300 font-mono break-all leading-relaxed">
                {alert.hash}
              </p>
            </div>
          </div>
        )}

        {/* Footer avec timestamp et détails */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-400">
            <Clock className="w-3 h-3" />
            <span>{new Date(alert.timestamp).toLocaleTimeString('fr-FR')}</span>
            {alert.is_test && (
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg font-medium">
                TEST
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span className="text-slate-300 font-medium">
              Block #{alert.block || 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Effet de brillance animé */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-pulse" />
      </div>
    </motion.div>
  )
}

export default SuperModernAlertCard

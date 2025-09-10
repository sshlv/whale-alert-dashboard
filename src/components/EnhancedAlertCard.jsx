import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  Clock,
  Activity,
  Minus
} from 'lucide-react'

const EnhancedAlertCard = ({ alert, index, delay = 0 }) => {
  // Déterminer les couleurs et icônes selon la tendance
  const getTrendInfo = (trend) => {
    switch (trend) {
      case 'bullish':
        return {
          label: 'HAUSSIER',
          icon: TrendingUp,
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          textColor: 'text-green-400',
          gradientFrom: 'from-green-500/20',
          gradientTo: 'to-emerald-500/5'
        }
      case 'bearish':
        return {
          label: 'BAISSIER',
          icon: TrendingDown,
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          textColor: 'text-red-400',
          gradientFrom: 'from-red-500/20',
          gradientTo: 'to-pink-500/5'
        }
      default:
        return {
          label: 'NEUTRE',
          icon: Minus,
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          textColor: 'text-yellow-400',
          gradientFrom: 'from-yellow-500/20',
          gradientTo: 'to-orange-500/5'
        }
    }
  }

  const trendInfo = getTrendInfo(alert.trend)
  const TrendIcon = trendInfo.icon

  // Formater le montant avec la devise
  const formatAmount = (amount, symbol) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M ${symbol}`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K ${symbol}`
    }
    return `${amount.toLocaleString()} ${symbol}`
  }

  // Formater la valeur USD
  const formatValue = (value) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toLocaleString()}`
  }

  // Déterminer l'impact selon la valeur
  const getImpactLevel = (value) => {
    if (value >= 50000000) return { level: 'MASSIVE', color: 'text-purple-400' }
    if (value >= 10000000) return { level: 'ÉNORME', color: 'text-red-400' }
    if (value >= 1000000) return { level: 'LARGE', color: 'text-orange-400' }
    if (value >= 100000) return { level: 'MOYEN', color: 'text-yellow-400' }
    return { level: 'PETIT', color: 'text-green-400' }
  }

  const impact = getImpactLevel(alert.value_usd)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: delay + index * 0.1 }}
      className={`
        relative overflow-hidden rounded-xl border-2 ${trendInfo.borderColor} 
        bg-gradient-to-br ${trendInfo.gradientFrom} ${trendInfo.gradientTo}
        p-4 hover:scale-[1.02] transition-all duration-300 cursor-pointer
        shadow-lg hover:shadow-xl
      `}
    >
      {/* Header avec crypto et tendance */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {/* Icône crypto avec couleur */}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
            style={{ backgroundColor: alert.color }}
          >
            {alert.symbol}
          </div>
          
          {/* Info crypto */}
          <div>
            <h3 className="text-lg font-bold text-white">{alert.token}</h3>
            <p className="text-sm text-slate-400">{alert.symbol}</p>
          </div>
        </div>

        {/* Badge de tendance */}
        <div className={`
          flex items-center space-x-2 px-3 py-1.5 rounded-lg border
          ${trendInfo.bgColor} ${trendInfo.borderColor}
        `}>
          <TrendIcon className={`w-4 h-4 ${trendInfo.textColor}`} />
          <span className={`text-xs font-bold ${trendInfo.textColor}`}>
            {trendInfo.label}
          </span>
        </div>
      </div>

      {/* Montant et valeur */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400 uppercase tracking-wide">Montant</span>
          </div>
          <p className="text-lg font-bold text-white">
            {formatAmount(alert.amount, alert.symbol)}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-xs text-slate-400 uppercase tracking-wide">Valeur</span>
          </div>
          <p className="text-lg font-bold text-white">
            {formatValue(alert.value_usd)}
          </p>
        </div>
      </div>

      {/* Movement info */}
      <div className="bg-slate-800/30 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-slate-300">{alert.from}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-300">{alert.to}</span>
            </div>
          </div>
          
          <div className={`text-xs font-bold px-2 py-1 rounded ${impact.color} bg-slate-700/50`}>
            {impact.level}
          </div>
        </div>
      </div>

      {/* Footer avec timestamp */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{new Date(alert.timestamp).toLocaleTimeString('fr-FR')}</span>
        </div>
        
        {alert.is_test && (
          <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full text-xs font-medium">
            TEST
          </span>
        )}
      </div>

      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Indicateur de côté pour la tendance */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        alert.trend === 'bullish' ? 'bg-green-500' : 
        alert.trend === 'bearish' ? 'bg-red-500' : 'bg-yellow-500'
      }`} />
    </motion.div>
  )
}

export default EnhancedAlertCard

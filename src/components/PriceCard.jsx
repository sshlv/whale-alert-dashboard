import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Bitcoin, Coins, CircleDollarSign } from 'lucide-react'
import { usePrice } from '../context/PriceContext'

const PriceCard = ({ symbol, delay = 0 }) => {
  const priceData = usePrice(symbol)
  
  if (!priceData) return null

  const getIcon = (symbol) => {
    switch (symbol.toUpperCase()) {
      case 'BTC': return Bitcoin
      case 'ETH': return Coins
      case 'SOL': return CircleDollarSign
      case 'RNDR': return CircleDollarSign
      default: return Coins
    }
  }

  const getColor = (symbol) => {
    switch (symbol.toUpperCase()) {
      case 'BTC': return {
        icon: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
        accent: 'from-orange-500/20'
      }
      case 'ETH': return {
        icon: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        accent: 'from-blue-500/20'
      }
      case 'SOL': return {
        icon: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        accent: 'from-purple-500/20'
      }
      case 'RNDR': return {
        icon: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        accent: 'from-green-500/20'
      }
      default: return {
        icon: 'text-slate-400',
        bg: 'bg-slate-500/10',
        border: 'border-slate-500/20',
        accent: 'from-slate-500/20'
      }
    }
  }

  const Icon = getIcon(symbol)
  const colors = getColor(symbol)
  const isPositive = priceData.isPositive

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`
        relative overflow-hidden rounded-2xl border backdrop-blur-xl p-6
        ${colors.bg} ${colors.border}
        shadow-lg hover:shadow-xl transition-all duration-300
        hover:scale-[1.02] cursor-pointer group
      `}
    >
      {/* Gradient de fond */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.accent} to-transparent opacity-50`} />
      
      {/* Contenu */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
              <Icon className={`w-6 h-6 ${colors.icon}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{symbol.toUpperCase()}</h3>
              <p className="text-sm text-slate-400">{priceData.name}</p>
            </div>
          </div>
          
          {/* Indicateur de tendance */}
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Prix */}
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">
            {priceData.formattedPrice}
          </div>
          
          <div className={`text-lg font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {priceData.formattedChange}
          </div>
        </div>

        {/* Footer avec info supplémentaire */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">24h Vol</span>
              <span className="text-white font-medium">
                ${(priceData.volume / 1e9).toFixed(1)}B
              </span>
            </div>
            
            {priceData.high24h && priceData.low24h && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">24h Range</span>
                <div className="flex items-center space-x-2">
                  <span className="text-red-400">
                    ${priceData.low24h < 1 ? priceData.low24h.toFixed(4) : priceData.low24h.toFixed(2)}
                  </span>
                  <span className="text-slate-500">-</span>
                  <span className="text-green-400">
                    ${priceData.high24h < 1 ? priceData.high24h.toFixed(4) : priceData.high24h.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
            
            {priceData.lastUpdate && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Dernière MAJ</span>
                <span className="text-slate-400 font-mono">
                  {priceData.lastUpdate.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Effet de brillance au hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12" />
      </div>
    </motion.div>
  )
}

export default PriceCard

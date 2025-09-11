import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Bitcoin, Coins, CircleDollarSign, Clock } from 'lucide-react'
import { usePrice } from '../context/PriceContext'

// Composant optimisé avec memo pour éviter les re-rendus inutiles
const OptimizedPriceCard = memo(({ symbol, delay = 0 }) => {
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
        accent: 'from-orange-500/20',
        glow: 'shadow-orange-500/20'
      }
      case 'ETH': return {
        icon: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        accent: 'from-blue-500/20',
        glow: 'shadow-blue-500/20'
      }
      case 'SOL': return {
        icon: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        accent: 'from-purple-500/20',
        glow: 'shadow-purple-500/20'
      }
      case 'RNDR': return {
        icon: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        accent: 'from-green-500/20',
        glow: 'shadow-green-500/20'
      }
      default: return {
        icon: 'text-slate-400',
        bg: 'bg-slate-500/10',
        border: 'border-slate-500/20',
        accent: 'from-slate-500/20',
        glow: 'shadow-slate-500/20'
      }
    }
  }

  const Icon = getIcon(symbol)
  const colors = getColor(symbol)
  const isPositive = priceData.isPositive
  const priceChangeAbs = Math.abs(priceData.change)
  
  // Calcul de l'intensité du changement pour les animations
  const changeIntensity = priceChangeAbs > 10 ? 'high' : priceChangeAbs > 5 ? 'medium' : 'low'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        // Animation subtile basée sur le changement de prix
        boxShadow: changeIntensity === 'high' 
          ? `0 0 20px ${isPositive ? '#10b981' : '#ef4444'}40`
          : changeIntensity === 'medium'
          ? `0 0 10px ${isPositive ? '#10b981' : '#ef4444'}20`
          : '0 4px 20px rgba(0,0,0,0.1)'
      }}
      transition={{ 
        duration: 0.5, 
        delay,
        boxShadow: { duration: 2, ease: "easeInOut" }
      }}
      className={`
        relative overflow-hidden rounded-2xl border backdrop-blur-xl p-6
        ${colors.bg} ${colors.border}
        shadow-lg hover:shadow-xl hover:${colors.glow} 
        transition-all duration-300 hover:scale-[1.02] cursor-pointer group
      `}
    >
      {/* Gradient de fond animé */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.accent} to-transparent opacity-50`} />
      
      {/* Indicateur de fraîcheur des données */}
      {priceData.lastUpdate && (
        <div className="absolute top-2 right-2">
          <div className={`w-2 h-2 rounded-full ${
            Date.now() - priceData.lastUpdate.getTime() < 30000 
              ? 'bg-green-400 animate-pulse' 
              : Date.now() - priceData.lastUpdate.getTime() < 60000
              ? 'bg-yellow-400'
              : 'bg-red-400'
          }`} />
        </div>
      )}
      
      {/* Contenu */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border} backdrop-blur-sm`}>
              <Icon className={`w-6 h-6 ${colors.icon}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {symbol.toUpperCase()}
              </h3>
              <p className="text-sm text-slate-400">{priceData.name}</p>
            </div>
          </div>
          
          {/* Indicateur de tendance avec animation */}
          <motion.div 
            className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}
            animate={{ 
              scale: changeIntensity === 'high' ? [1, 1.1, 1] : 1,
              rotate: changeIntensity === 'high' ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 1.5, repeat: changeIntensity === 'high' ? Infinity : 0, repeatDelay: 3 }}
          >
            {isPositive ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span className="text-xs font-mono">
              {changeIntensity === 'high' ? '🔥' : changeIntensity === 'medium' ? '📈' : ''}
            </span>
          </motion.div>
        </div>

        {/* Prix avec animation de pulse pour les gros changements */}
        <div className="space-y-2">
          <motion.div 
            className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors"
            animate={changeIntensity === 'high' ? { 
              scale: [1, 1.05, 1],
              textShadow: [
                '0 0 0px rgba(255,255,255,0)',
                `0 0 10px ${isPositive ? '#10b981' : '#ef4444'}`,
                '0 0 0px rgba(255,255,255,0)'
              ]
            } : {}}
            transition={{ duration: 2, repeat: changeIntensity === 'high' ? Infinity : 0, repeatDelay: 1 }}
          >
            {priceData.formattedPrice}
          </motion.div>
          
          <div className={`text-lg font-medium flex items-center space-x-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            <span>{priceData.formattedChange}</span>
            {changeIntensity === 'high' && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-xs"
              >
                {isPositive ? '🚀' : '📉'}
              </motion.span>
            )}
          </div>
        </div>

        {/* Footer avec infos détaillées */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Volume 24h</span>
              <span className="text-white font-medium">
                ${(priceData.volume / 1e9).toFixed(1)}Md
              </span>
            </div>
            
            {priceData.high24h && priceData.low24h && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Fourchette 24h</span>
                <div className="flex items-center space-x-1">
                  <span className="text-red-400 font-mono">
                    ${priceData.low24h < 1 ? priceData.low24h.toFixed(4) : priceData.low24h.toFixed(2)}
                  </span>
                  <span className="text-slate-500">→</span>
                  <span className="text-green-400 font-mono">
                    ${priceData.high24h < 1 ? priceData.high24h.toFixed(4) : priceData.high24h.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
            
            {priceData.lastUpdate && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span className="text-slate-500">Mis à jour</span>
                </div>
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

      {/* Effet de brillance au hover amélioré */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>

      {/* Bordure animée pour les gros changements */}
      {changeIntensity === 'high' && (
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 ${isPositive ? 'border-green-400' : 'border-red-400'}`}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      )}
    </motion.div>
  )
}, (prevProps, nextProps) => {
  // Comparaison personnalisée pour éviter les re-rendus inutiles
  return prevProps.symbol === nextProps.symbol && prevProps.delay === nextProps.delay
})

OptimizedPriceCard.displayName = 'OptimizedPriceCard'

export default OptimizedPriceCard

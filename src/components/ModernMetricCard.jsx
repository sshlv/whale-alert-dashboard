import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const ModernMetricCard = ({ 
  title,
  value,
  change,
  changePercent,
  icon: Icon,
  color = "blue",
  trend = "up",
  subtitle,
  animated = true,
  delay = 0
}) => {
  const colorClasses = {
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20"
    },
    green: {
      gradient: "from-green-500 to-emerald-500", 
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/20"
    },
    purple: {
      gradient: "from-purple-500 to-violet-500",
      bg: "bg-purple-500/10", 
      text: "text-purple-400",
      border: "border-purple-500/20"
    },
    orange: {
      gradient: "from-orange-500 to-red-500",
      bg: "bg-orange-500/10",
      text: "text-orange-400", 
      border: "border-orange-500/20"
    },
    yellow: {
      gradient: "from-yellow-500 to-orange-500",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      border: "border-yellow-500/20"
    }
  }

  const isPositive = trend === "up" || (changePercent && changePercent > 0)
  const currentColors = colorClasses[color] || colorClasses.blue

  return (
    <motion.div
      className="modern-card group cursor-pointer"
      initial={animated ? { opacity: 0, y: 20, scale: 0.95 } : false}
      animate={animated ? { opacity: 1, y: 0, scale: 1 } : false}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient de haut */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${currentColors.gradient} rounded-t-2xl`} />
      
      <div className="p-6">
        {/* Header avec icône */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${currentColors.bg} ${currentColors.border} border group-hover:scale-110 transition-transform duration-300`}>
            {Icon && <Icon className={`w-6 h-6 ${currentColors.text}`} />}
          </div>
          
          {(change || changePercent) && (
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-semibold ${
              isPositive 
                ? 'bg-green-500/10 text-green-400' 
                : 'bg-red-500/10 text-red-400'
            }`}>
              {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {changePercent ? `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%` : change}
            </div>
          )}
        </div>

        {/* Valeur principale */}
        <div className="mb-2">
          <motion.div 
            className="text-3xl font-bold text-white mb-1"
            initial={animated ? { scale: 0.8, opacity: 0 } : false}
            animate={animated ? { scale: 1, opacity: 1 } : false}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          >
            {value}
          </motion.div>
          <h3 className="text-slate-400 font-medium text-sm uppercase tracking-wider">
            {title}
          </h3>
        </div>

        {/* Subtitle optionnel */}
        {subtitle && (
          <p className="text-slate-500 text-xs mt-2">
            {subtitle}
          </p>
        )}

        {/* Indicateur de tendance */}
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? 'En hausse' : 'En baisse'}
              </span>
            </div>
            
            <div className="text-xs text-slate-500">
              Dernière heure
            </div>
          </div>
        </div>

        {/* Mini graphique de tendance */}
        <div className="mt-3">
          <div className="flex items-end space-x-1 h-8">
            {Array.from({ length: 12 }, (_, i) => {
              const height = Math.random() * 100
              const isLast = i === 11
              return (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-sm ${
                    isLast 
                      ? `bg-gradient-to-t ${currentColors.gradient}` 
                      : 'bg-slate-700/50'
                  }`}
                  style={{ height: `${Math.max(height, 20)}%` }}
                  initial={animated ? { height: 0 } : false}
                  animate={animated ? { height: `${Math.max(height, 20)}%` } : false}
                  transition={{ duration: 0.8, delay: delay + 0.1 + (i * 0.05) }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Effet de brillance au hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}

export default ModernMetricCard

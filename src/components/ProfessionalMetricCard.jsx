import React, { memo } from 'react'
import { motion } from 'framer-motion'

const ProfessionalMetricCard = memo(({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = 'neutral',
  subtitle,
  delay = 0,
  isLoading = false 
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'positive': return 'professional-metric-change positive'
      case 'negative': return 'professional-metric-change negative'
      default: return 'professional-metric-change neutral'
    }
  }

  const getIconBg = () => {
    switch (trend) {
      case 'positive': return 'bg-green-500/10 text-green-400'
      case 'negative': return 'bg-red-500/10 text-red-400'
      default: return 'bg-blue-500/10 text-blue-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="professional-card professional-fade-in"
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
    >
      <div className="professional-metric">
        <div className={`professional-metric-icon ${getIconBg()}`}>
          {isLoading ? (
            <div className="professional-loading" />
          ) : (
            <Icon className="w-5 h-5" />
          )}
        </div>
        
        <div className="professional-metric-content">
          <div className="flex items-center justify-between mb-1">
            <h3 className="professional-text-sm professional-font-medium professional-text-muted">
              {title}
            </h3>
            {change && (
              <span className={getTrendColor()}>
                {change.startsWith('+') || change.startsWith('-') ? change : `+${change}`}
              </span>
            )}
          </div>
          
          <div className="flex items-end gap-2">
            <span className="professional-metric-value">
              {isLoading ? '---' : value}
            </span>
            {subtitle && (
              <span className="professional-text-xs professional-text-muted mb-1">
                {subtitle}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
})

ProfessionalMetricCard.displayName = 'ProfessionalMetricCard'

export default ProfessionalMetricCard

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive',
  icon: Icon,
  gradient = 'blue',
  delay = 0 
}) => {
  const gradients = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    cyan: 'from-cyan-500 to-cyan-600'
  }

  const changeColor = changeType === 'positive' ? 'text-green-400' : 'text-red-400'
  const ChangeIcon = changeType === 'positive' ? TrendingUp : TrendingDown

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 group"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[gradient]} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Icon Container */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${gradients[gradient]} mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {Icon && <Icon className="w-6 h-6 text-white" />}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
        <div className="flex items-end justify-between">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
            className="text-3xl font-bold text-white"
          >
            {value}
          </motion.div>
          
          {change && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.4 }}
              className={`flex items-center text-sm font-medium ${changeColor}`}
            >
              <ChangeIcon className="w-4 h-4 mr-1" />
              {change}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradients[gradient]} opacity-0 group-hover:opacity-20 blur transition-opacity duration-300 -z-10`} />
    </motion.div>
  )
}

export default MetricCard

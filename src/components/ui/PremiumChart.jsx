import React from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const PremiumChart = ({ 
  data = [], 
  type = 'line', 
  gradient = 'blue',
  height = 300,
  title,
  dataKey = 'value',
  xAxisKey = 'name'
}) => {
  const gradients = {
    blue: { start: '#3B82F6', end: '#1E40AF' },
    green: { start: '#10B981', end: '#047857' },
    purple: { start: '#8B5CF6', end: '#5B21B6' },
    orange: { start: '#F59E0B', end: '#D97706' },
    red: { start: '#EF4444', end: '#DC2626' },
    cyan: { start: '#06B6D4', end: '#0891B2' }
  }

  const selectedGradient = gradients[gradient] || gradients.blue

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl"
        >
          <p className="text-white font-semibold">{label}</p>
          <p className="text-blue-400">
            {payload[0].name}: <span className="text-white font-bold">{payload[0].value}</span>
          </p>
        </motion.div>
      )
    }
    return null
  }

  const renderChart = () => {
    const commonProps = {
      data,
      height,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    }

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={`gradient-${gradient}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={selectedGradient.start} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={selectedGradient.end} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={selectedGradient.start}
              strokeWidth={3}
              fill={`url(#gradient-${gradient})`}
              dot={{ fill: selectedGradient.start, strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: selectedGradient.start, strokeWidth: 2, fill: '#fff' }}
            />
          </AreaChart>
        )

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={dataKey} 
              fill={selectedGradient.start}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )

      default: // line
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={selectedGradient.start}
              strokeWidth={3}
              dot={{ fill: selectedGradient.start, strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: selectedGradient.start, strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
    >
      {title && (
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-white mb-6"
        >
          {title}
        </motion.h3>
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  )
}

export default PremiumChart

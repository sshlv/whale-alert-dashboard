import React from 'react'
import { motion } from 'framer-motion'

const PremiumCard = ({ 
  children, 
  className = '', 
  gradient = false,
  glow = false,
  hover = true,
  delay = 0,
  ...props 
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: hover ? {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    } : {}
  }

  const gradientClass = gradient ? 'bg-gradient-to-br from-blue-500/10 to-purple-600/10' : ''
  const glowClass = glow ? 'animate-pulse-glow' : ''

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`
        card-premium relative overflow-hidden
        ${gradientClass}
        ${glowClass}
        ${className}
      `}
      {...props}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shine Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm -z-10" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/20 to-transparent opacity-50" />
    </motion.div>
  )
}

export default PremiumCard

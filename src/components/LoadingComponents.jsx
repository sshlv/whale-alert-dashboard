import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'md', text = 'Chargement...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

const LoadingCard = ({ children, isLoading = false, loadingText = 'Chargement...' }) => {
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
          <LoadingSpinner text={loadingText} />
        </div>
      )}
      {children}
    </div>
  )
}

const PulseLoader = () => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 bg-blue-600 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  )
}

const SkeletonLoader = ({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  )
}

const WhaleLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className="text-6xl"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        🐋
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg font-semibold text-gray-700 dark:text-gray-300"
      >
        Surveillance des baleines...
      </motion.p>
      <PulseLoader />
    </div>
  )
}

export { LoadingSpinner, LoadingCard, PulseLoader, SkeletonLoader, WhaleLoader }

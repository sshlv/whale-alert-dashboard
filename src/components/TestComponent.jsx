import React from 'react'
import { motion } from 'framer-motion'

const TestComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        🐋 Test des Composants
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Si vous voyez ce message, les composants de base fonctionnent !
      </p>
    </motion.div>
  )
}

export default TestComponent

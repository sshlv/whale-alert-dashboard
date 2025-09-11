import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader } from 'lucide-react'

const PriceStatusIndicator = ({ prices, loading, error, connectionStatus }) => {
  const getBTCPrice = () => {
    if (prices?.BTC?.price > 0) {
      return prices.BTC.price.toLocaleString()
    }
    return 'N/A'
  }

  const getStatus = () => {
    if (loading) return 'loading'
    if (error) return 'error'
    if (prices?.BTC?.price > 0) return 'success'
    return 'waiting'
  }

  const status = getStatus()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        fixed top-20 left-4 z-50 p-4 rounded-xl border backdrop-blur-xl
        ${status === 'success' 
          ? 'bg-green-500/10 border-green-500/30 text-green-400' 
          : status === 'error'
          ? 'bg-red-500/10 border-red-500/30 text-red-400'
          : status === 'loading'
          ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
          : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
        }
        shadow-2xl max-w-xs
      `}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {status === 'success' && <CheckCircle className="w-6 h-6" />}
          {status === 'error' && <AlertCircle className="w-6 h-6" />}
          {status === 'loading' && <Loader className="w-6 h-6 animate-spin" />}
          {status === 'waiting' && <AlertCircle className="w-6 h-6" />}
        </div>
        
        <div className="flex-1">
          <div className="font-bold text-sm">
            {status === 'success' && '✅ PRIX RÉELS ACTIFS'}
            {status === 'error' && '❌ ERREUR API'}
            {status === 'loading' && '🔄 RÉCUPÉRATION...'}
            {status === 'waiting' && '⏳ ATTENTE DONNÉES'}
          </div>
          
          <div className="text-xs opacity-80 mt-1">
            {status === 'success' && (
              <>
                BTC: ${getBTCPrice()}<br/>
                Source: {connectionStatus}
              </>
            )}
            {status === 'error' && `Erreur: ${error?.substring(0, 30)}...`}
            {status === 'loading' && 'Connexion aux APIs...'}
            {status === 'waiting' && 'En attente de prix valides'}
          </div>
        </div>
      </div>
      
      {/* Debug info */}
      <div className="mt-3 pt-3 border-t border-current/20 text-xs opacity-60">
        <div>Status: {connectionStatus}</div>
        <div>Prices: {Object.keys(prices || {}).length} coins</div>
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
      </div>
    </motion.div>
  )
}

export default PriceStatusIndicator

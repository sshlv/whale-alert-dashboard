import React, { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wifi, 
  WifiOff, 
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign
} from 'lucide-react'
import { freeMarketAPIs } from '../services/freeMarketAPIs'

const APIStatus = memo(() => {
  const [apiStatus, setApiStatus] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [lastCheck, setLastCheck] = useState(null)

  const checkAPIsStatus = async () => {
    setIsLoading(true)
    try {
      const status = await freeMarketAPIs.checkAPIStatus()
      setApiStatus(status)
      setLastCheck(new Date())
    } catch (error) {
      console.error('Erreur vérification APIs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAPIsStatus()
    // Vérifier le statut toutes les 5 minutes
    const interval = setInterval(checkAPIsStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    if (!status) return 'text-gray-400'
    return status.available ? 'text-green-400' : 'text-red-400'
  }

  const getStatusIcon = (status) => {
    if (!status) return AlertCircle
    return status.available ? CheckCircle : AlertCircle
  }

  const apiNames = {
    coinGecko: 'CoinGecko',
    coinCap: 'CoinCap',
    alternative: 'Alternative.me',
    binance: 'Binance',
    cryptoCompare: 'CryptoCompare'
  }

  const workingAPIs = Object.values(apiStatus).filter(status => status?.available).length
  const totalAPIs = Object.keys(apiStatus).length

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ rotate: isLoading ? 360 : 0 }}
            transition={{ duration: 2, repeat: isLoading ? Infinity : 0, ease: "linear" }}
          >
            <Wifi className="w-5 h-5 text-blue-400" />
          </motion.div>
          <h3 className="text-white font-semibold">APIs Gratuites</h3>
          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-bold">
            GRATUIT
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-white font-bold">
              {workingAPIs}/{totalAPIs}
            </div>
            <div className="text-xs text-gray-400">Actives</div>
          </div>
          
          {lastCheck && (
            <div className="text-right">
              <div className="text-xs text-gray-400 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{lastCheck.toLocaleTimeString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <AnimatePresence>
          {Object.entries(apiStatus).map(([key, status]) => {
            const StatusIcon = getStatusIcon(status)
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`bg-white/5 rounded-lg p-3 border transition-all ${
                  status?.available 
                    ? 'border-green-500/30 hover:bg-green-500/10' 
                    : 'border-red-500/30 hover:bg-red-500/10'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <StatusIcon className={`w-4 h-4 ${getStatusColor(status)}`} />
                  <span className="text-white text-sm font-medium">
                    {apiNames[key] || key}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className={`text-xs ${getStatusColor(status)}`}>
                    {status?.available ? 'En ligne' : 'Hors ligne'}
                  </div>
                  
                  {status?.free && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400">Gratuit</span>
                    </div>
                  )}
                  
                  {status?.rateLimit && (
                    <div className="text-xs text-gray-400">
                      Limite: {status.rateLimit}/min
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-2"
        >
          <div className="text-blue-400 text-sm">Vérification des APIs...</div>
        </motion.div>
      )}

      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between text-xs">
          <div className="text-gray-400">
            ✅ Toutes les données sont récupérées gratuitement
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={checkAPIsStatus}
            className="text-blue-400 hover:text-blue-300 transition-colors"
            disabled={isLoading}
          >
            🔄 Actualiser
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
})

APIStatus.displayName = 'APIStatus'

export default APIStatus

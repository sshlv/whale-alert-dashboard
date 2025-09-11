import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ForceRealPrices = () => {
  const [realPrices, setRealPrices] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchDirectPrices = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔥 [FORCE] Récupération DIRECTE des prix...')
      
      // Test direct Binance
      const btcResponse = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT')
      const btcData = await btcResponse.json()
      
      const ethResponse = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT')
      const ethData = await ethResponse.json()

      const prices = {
        BTC: {
          price: parseFloat(btcData.lastPrice),
          change: parseFloat(btcData.priceChangePercent),
          volume: parseFloat(btcData.quoteVolume)
        },
        ETH: {
          price: parseFloat(ethData.lastPrice),
          change: parseFloat(ethData.priceChangePercent),
          volume: parseFloat(ethData.quoteVolume)
        }
      }

      console.log('✅ [FORCE] Prix réels récupérés:', prices)
      setRealPrices(prices)
      setLoading(false)
      
    } catch (err) {
      console.error('❌ [FORCE] Erreur:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDirectPrices()
    const interval = setInterval(fetchDirectPrices, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 text-blue-400">
        🔄 Récupération des vrais prix...
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-400">
        ❌ Erreur: {error}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400 min-w-96"
    >
      <h3 className="font-bold mb-2">🔥 PRIX RÉELS DIRECTS BINANCE</h3>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Bitcoin:</span>
          <span className="font-mono font-bold">
            ${realPrices?.BTC?.price?.toLocaleString()} 
            <span className={realPrices?.BTC?.change > 0 ? 'text-green-300' : 'text-red-300'}>
              ({realPrices?.BTC?.change?.toFixed(2)}%)
            </span>
          </span>
        </div>
        <div className="flex justify-between">
          <span>Ethereum:</span>
          <span className="font-mono font-bold">
            ${realPrices?.ETH?.price?.toLocaleString()}
            <span className={realPrices?.ETH?.change > 0 ? 'text-green-300' : 'text-red-300'}>
              ({realPrices?.ETH?.change?.toFixed(2)}%)
            </span>
          </span>
        </div>
        <div className="text-xs mt-2 opacity-70">
          ✅ Connexion directe Binance API
        </div>
      </div>
    </motion.div>
  )
}

export default ForceRealPrices

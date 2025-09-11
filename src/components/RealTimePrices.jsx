import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bitcoin, Coins, TrendingUp, TrendingDown } from 'lucide-react'

const RealTimePrices = () => {
  const [prices, setPrices] = useState({
    BTC: { price: 0, change: 0 },
    ETH: { price: 0, change: 0 },
    SOL: { price: 0, change: 0 },
    RNDR: { price: 0, change: 0 }
  })
  const [loading, setLoading] = useState(true)

  const fetchPrices = async () => {
    try {
      console.log('🚀 FETCHING REAL PRICES...')
      
      const responses = await Promise.all([
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT'),
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT'),
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT'),
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=RNDRUSDT')
      ])

      const data = await Promise.all(responses.map(r => r.json()))
      
      const newPrices = {
        BTC: { 
          price: parseFloat(data[0].lastPrice), 
          change: parseFloat(data[0].priceChangePercent) 
        },
        ETH: { 
          price: parseFloat(data[1].lastPrice), 
          change: parseFloat(data[1].priceChangePercent) 
        },
        SOL: { 
          price: parseFloat(data[2].lastPrice), 
          change: parseFloat(data[2].priceChangePercent) 
        },
        RNDR: { 
          price: parseFloat(data[3].lastPrice), 
          change: parseFloat(data[3].priceChangePercent) 
        }
      }

      setPrices(newPrices)
      setLoading(false)
      
      console.log('✅ REAL PRICES LOADED:')
      console.log('BTC:', newPrices.BTC.price)
      console.log('ETH:', newPrices.ETH.price)
      console.log('SOL:', newPrices.SOL.price)
      console.log('RNDR:', newPrices.RNDR.price)
      
    } catch (error) {
      console.error('❌ ERROR:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 5000) // Every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2
    }).format(price)
  }

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}%`
  }

  const cryptos = [
    { 
      symbol: 'BTC', 
      name: 'Bitcoin', 
      icon: Bitcoin, 
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    { 
      symbol: 'ETH', 
      name: 'Ethereum', 
      icon: Coins, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    { 
      symbol: 'SOL', 
      name: 'Solana', 
      icon: Coins, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    { 
      symbol: 'RNDR', 
      name: 'Render', 
      icon: Coins, 
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cryptos.map((crypto, index) => {
        const price = prices[crypto.symbol]
        const Icon = crypto.icon
        const isPositive = price.change >= 0

        return (
          <motion.div
            key={crypto.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`
              relative overflow-hidden rounded-2xl border backdrop-blur-xl p-6
              ${crypto.bgColor} ${crypto.borderColor}
              shadow-lg hover:shadow-xl transition-all duration-300
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${crypto.bgColor}`}>
                  <Icon className={`w-6 h-6 ${crypto.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{crypto.symbol}</h3>
                  <p className="text-sm text-slate-400">{crypto.name}</p>
                </div>
              </div>
              
              <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">
                {loading ? 'Loading...' : formatPrice(price.price)}
              </div>
              
              <div className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {loading ? '...' : formatChange(price.change)}
              </div>
            </div>

            {/* Status indicator */}
            <div className="absolute top-2 right-2">
              <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default RealTimePrices

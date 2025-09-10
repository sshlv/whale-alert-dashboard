import React, { createContext, useContext, useState, useEffect } from 'react'

const RealTimeContext = createContext()

export const useRealTime = () => {
  const context = useContext(RealTimeContext)
  if (!context) {
    throw new Error('useRealTime doit être utilisé dans un RealTimeProvider')
  }
  return context
}

export const RealTimeProvider = ({ children }) => {
  const [liveData, setLiveData] = useState({
    prices: {
      BTC: { price: 42850.75, change24h: 3.2, volume: 28400000000 },
      ETH: { price: 2847.92, change24h: 5.8, volume: 18700000000 },
      SOL: { price: 98.45, change24h: 8.3, volume: 2400000000 },
      RNDR: { price: 7.85, change24h: 15.7, volume: 800000000 }
    },
    fundingRates: {
      BTC: { binance: 0.0234, bybit: 0.0198, okx: 0.0267 },
      ETH: { binance: 0.0156, bybit: 0.0143, okx: 0.0178 },
      SOL: { binance: 0.0321, bybit: 0.0298, okx: 0.0345 },
      RNDR: { binance: 0.0567, bybit: 0.0489, okx: 0.0612 }
    },
    openInterest: {
      BTC: { total: 3460000000, change24h: 8.5 },
      ETH: { total: 2680000000, change24h: 15.2 },
      SOL: { total: 444000000, change24h: 28.7 },
      RNDR: { total: 124000000, change24h: 67.8 }
    },
    marketSentiment: {
      overall: 'bullish',
      fearGreedIndex: 72,
      socialSentiment: 0.68,
      newsScore: 0.74
    },
    networkStats: {
      BTC: { hashRate: '450.2 EH/s', mempool: 15.2, fees: 12 },
      ETH: { gasPrice: 25, validators: 975432, stakingAPR: 3.8 },
      SOL: { tps: 2847, validators: 1872, stakingAPY: 6.8 },
      RNDR: { nodes: 425891, gpuHours: 2100000, utilizationRate: 87.3 }
    }
  })

  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulation WebSocket avec mise à jour temps réel
  useEffect(() => {
    setIsConnected(true)
    
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        prices: {
          BTC: {
            price: prev.prices.BTC.price + (Math.random() - 0.5) * 100,
            change24h: prev.prices.BTC.change24h + (Math.random() - 0.5) * 0.5,
            volume: prev.prices.BTC.volume * (1 + (Math.random() - 0.5) * 0.02)
          },
          ETH: {
            price: prev.prices.ETH.price + (Math.random() - 0.5) * 50,
            change24h: prev.prices.ETH.change24h + (Math.random() - 0.5) * 0.3,
            volume: prev.prices.ETH.volume * (1 + (Math.random() - 0.5) * 0.03)
          },
          SOL: {
            price: prev.prices.SOL.price + (Math.random() - 0.5) * 3,
            change24h: prev.prices.SOL.change24h + (Math.random() - 0.5) * 0.5,
            volume: prev.prices.SOL.volume * (1 + (Math.random() - 0.5) * 0.05)
          },
          RNDR: {
            price: prev.prices.RNDR.price + (Math.random() - 0.5) * 0.5,
            change24h: prev.prices.RNDR.change24h + (Math.random() - 0.5) * 1,
            volume: prev.prices.RNDR.volume * (1 + (Math.random() - 0.5) * 0.08)
          }
        },
        marketSentiment: {
          ...prev.marketSentiment,
          fearGreedIndex: Math.max(0, Math.min(100, prev.marketSentiment.fearGreedIndex + (Math.random() - 0.5) * 5)),
          socialSentiment: Math.max(0, Math.min(1, prev.marketSentiment.socialSentiment + (Math.random() - 0.5) * 0.1)),
          newsScore: Math.max(0, Math.min(1, prev.marketSentiment.newsScore + (Math.random() - 0.5) * 0.1))
        }
      }))
      setLastUpdate(new Date())
    }, 2000) // Mise à jour toutes les 2 secondes

    return () => clearInterval(interval)
  }, [])

  const value = {
    liveData,
    isConnected,
    lastUpdate,
    // Fonctions utilitaires
    getPriceChange: (symbol) => liveData.prices[symbol]?.change24h || 0,
    getFormattedPrice: (symbol) => `$${liveData.prices[symbol]?.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`,
    getSentimentColor: () => {
      const sentiment = liveData.marketSentiment.fearGreedIndex
      if (sentiment >= 75) return 'text-green-400'
      if (sentiment >= 50) return 'text-yellow-400'
      if (sentiment >= 25) return 'text-orange-400'
      return 'text-red-400'
    }
  }

  return (
    <RealTimeContext.Provider value={value}>
      {children}
    </RealTimeContext.Provider>
  )
}

export default RealTimeProvider

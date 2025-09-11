import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

const PriceTicker = () => {
  const [prices, setPrices] = useState({
    ETH: { price: 0, change: 0 },
    BTC: { price: 0, change: 0 },
    SOL: { price: 0, change: 0 },
    RNDR: { price: 0, change: 0 }
  })
  const [loading, setLoading] = useState(true)

  const COINGECKO_API_KEY = 'CG-32US6KPCWUbogVhisEhpdby4'

  useEffect(() => {
    fetchPrices()
    // Actualiser les prix toutes les 30 secondes
    const interval = setInterval(fetchPrices, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchPrices = async () => {
    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,solana,render-token&vs_currencies=usd&include_24hr_change=true&x_cg_demo_api_key=${COINGECKO_API_KEY}`
      
      const response = await fetch(url)
      const data = await response.json()

      setPrices({
        ETH: { 
          price: data.ethereum?.usd || 0, 
          change: data.ethereum?.usd_24h_change || 0 
        },
        BTC: { 
          price: data.bitcoin?.usd || 0, 
          change: data.bitcoin?.usd_24h_change || 0 
        },
        SOL: { 
          price: data.solana?.usd || 0, 
          change: data.solana?.usd_24h_change || 0 
        },
        RNDR: { 
          price: data['render-token']?.usd || 0, 
          change: data['render-token']?.usd_24h_change || 0 
        }
      })
      
      setLoading(false)
    } catch (error) {
      console.error('Erreur récupération prix:', error)
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `$${price.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}`
    } else if (price >= 1) {
      return `$${price.toFixed(2)}`
    } else {
      return `$${price.toFixed(4)}`
    }
  }

  const formatChange = (change) => {
    const isPositive = change >= 0
    return (
      <span className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        <span>{Math.abs(change).toFixed(2)}%</span>
      </span>
    )
  }

  const getChainEmoji = (chain) => {
    const emojis = {
      'ETH': '🔷',
      'BTC': '🟠',
      'SOL': '🟣',
      'RNDR': '🎨'
    }
    return emojis[chain] || '💰'
  }

  if (loading) {
    return (
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Prix en Temps Réel
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['ETH', 'BTC', 'SOL', 'RNDR'].map((chain) => (
            <div key={chain} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Prix en Temps Réel
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <DollarSign size={16} />
          <span>CoinGecko API</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(prices).map(([chain, data]) => (
          <div key={chain} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">{getChainEmoji(chain)}</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {chain}
              </span>
            </div>
            
            <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {formatPrice(data.price)}
            </div>
            
            <div className="text-sm">
              {formatChange(data.change)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        Prix mis à jour toutes les 30 secondes • Données fournies par CoinGecko
      </div>
    </div>
  )
}

export default PriceTicker

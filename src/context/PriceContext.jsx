import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

const PriceContext = createContext()

// Prix par défaut - TEMPORAIRES POUR DEBUG
const DEFAULT_PRICES = {
  BTC: { price: 0, change: 0, volume: 0, symbol: 'BTC', name: 'Bitcoin' },
  ETH: { price: 0, change: 0, volume: 0, symbol: 'ETH', name: 'Ethereum' },
  SOL: { price: 0, change: 0, volume: 0, symbol: 'SOL', name: 'Solana' },
  RNDR: { price: 0, change: 0, volume: 0, symbol: 'RNDR', name: 'Render' }
}

// Configuration des APIs avec priorités
const API_SOURCES = [
  {
    name: 'Binance',
    priority: 1,
    rateLimitPerMinute: 1200,
    endpoints: {
      BTC: 'https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT',
      ETH: 'https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT',
      SOL: 'https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT',
      RNDR: 'https://api.binance.com/api/v3/ticker/24hr?symbol=RNDRUSDT'
    }
  },
  {
    name: 'CoinGecko',
    priority: 2,
    rateLimitPerMinute: 10,
    endpoint: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,render-token&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true'
  }
]

export const PriceProvider = ({ children }) => {
  const [prices, setPrices] = useState(DEFAULT_PRICES)
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [error, setError] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('connected')
  const [apiSource, setApiSource] = useState('Binance')
  const [retryCount, setRetryCount] = useState(0)
  
  // Refs pour gérer les intervalles et les timeouts
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)
  const requestCountRef = useRef(0)
  const lastRequestTimeRef = useRef(0)

  // Fonction intelligente pour gérer le rate limiting
  const canMakeRequest = useCallback(() => {
    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTimeRef.current
    
    // Respecter un minimum de 5 secondes entre les requêtes
    if (timeSinceLastRequest < 5000) {
      return false
    }
    
    // Limiter à 10 requêtes par minute pour éviter les rate limits
    const minutesPassed = timeSinceLastRequest / (1000 * 60)
    if (minutesPassed < 1 && requestCountRef.current >= 10) {
      return false
    }
    
    // Reset le compteur après une minute
    if (minutesPassed >= 1) {
      requestCountRef.current = 0
    }
    
    return true
  }, [])

  // Fonction pour récupérer les prix depuis Binance
  const fetchFromBinance = async () => {
    console.log('🔍 [DEBUG BINANCE] Starting Binance fetch...')
    const endpoints = API_SOURCES[0].endpoints
    console.log('🔍 [DEBUG BINANCE] Endpoints:', endpoints)
    
    const responses = await Promise.allSettled([
      fetch(endpoints.BTC, { 
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000) // 10 sec timeout
      }),
      fetch(endpoints.ETH, { 
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000)
      }),
      fetch(endpoints.SOL, { 
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000)
      }),
      fetch(endpoints.RNDR, { 
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000)
      })
    ])
    
    console.log('🔍 [DEBUG BINANCE] All responses received:', responses.map(r => ({
      status: r.status,
      ok: r.status === 'fulfilled' ? r.value.ok : false,
      statusCode: r.status === 'fulfilled' ? r.value.status : 'rejected'
    })))

    const newPrices = { ...DEFAULT_PRICES }
    const cryptos = ['BTC', 'ETH', 'SOL', 'RNDR']
    let successCount = 0
    
    for (let i = 0; i < responses.length; i++) {
      const crypto = cryptos[i]
      console.log(`🔍 [DEBUG BINANCE] Processing ${crypto}...`)
      
      if (responses[i].status === 'fulfilled' && responses[i].value.ok) {
        try {
          const data = await responses[i].value.json()
          console.log(`🔍 [DEBUG BINANCE] Raw ${crypto} data:`, data)
          
          const newPrice = {
            ...newPrices[crypto],
            price: parseFloat(data.lastPrice),
            change: parseFloat(data.priceChangePercent),
            volume: parseFloat(data.quoteVolume),
            high24h: parseFloat(data.highPrice),
            low24h: parseFloat(data.lowPrice),
            lastUpdate: new Date()
          }
          
          newPrices[crypto] = newPrice
          successCount++
          
          console.log(`✅ [${crypto}] Binance SUCCESS:`, {
            price: newPrice.price,
            change: newPrice.change,
            volume: newPrice.volume
          })
        } catch (parseError) {
          console.error(`❌ [${crypto}] Parse error:`, parseError)
          console.error(`🔍 [DEBUG] Failed response:`, responses[i].value)
        }
      } else {
        console.error(`❌ [${crypto}] Request failed:`, {
          status: responses[i].status,
          reason: responses[i].reason,
          response: responses[i].value
        })
      }
    }

    if (successCount >= 2) { // Au moins 50% de réussite
      return { success: true, data: newPrices, source: 'Binance' }
    }
    
    throw new Error(`Échec Binance: seulement ${successCount}/4 prix récupérés`)
  }

  // Fonction pour récupérer les prix depuis CoinGecko
  const fetchFromCoinGecko = async () => {
    const response = await fetch(API_SOURCES[1].endpoint, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(15000)
    })

    if (!response.ok) {
      throw new Error(`CoinGecko HTTP ${response.status}`)
    }

    const data = await response.json()
    const newPrices = { ...DEFAULT_PRICES }

    const mapping = {
      'bitcoin': 'BTC',
      'ethereum': 'ETH', 
      'solana': 'SOL',
      'render-token': 'RNDR'
    }

    Object.keys(mapping).forEach(coinId => {
      const crypto = mapping[coinId]
      if (data[coinId]) {
        newPrices[crypto] = {
          ...newPrices[crypto],
          price: data[coinId].usd,
          change: data[coinId].usd_24h_change || 0,
          volume: data[coinId].usd_24h_vol || newPrices[crypto].volume,
          lastUpdate: new Date()
        }
        console.log(`✅ [${crypto}] CoinGecko: $${newPrices[crypto].price}`)
      }
    })

    return { success: true, data: newPrices, source: 'CoinGecko' }
  }

  // Fonction principale de récupération avec fallback intelligent
  const fetchRealPrices = useCallback(async () => {
    console.log('🔍 [DEBUG] fetchRealPrices called')
    
    if (!canMakeRequest()) {
      console.log('⏳ [PriceContext] Rate limit - skip request')
      return
    }

    console.log('✅ [DEBUG] Rate limit OK, proceeding with request')

    try {
      setLoading(true)
      setError(null)
      
      requestCountRef.current++
      lastRequestTimeRef.current = Date.now()
      
      console.log('🚀 [PriceContext] Fetching prices...')
      console.log('🔍 [DEBUG] Current state before fetch:', {
        currentPrices: prices,
        loading,
        error,
        connectionStatus
      })

      let result = null
      
      // Essayer Binance en premier (plus rapide)
      try {
        console.log('🎯 [DEBUG] Attempting Binance fetch...')
        result = await fetchFromBinance()
        console.log('✅ [DEBUG] Binance success:', result)
        setApiSource('Binance')
        setConnectionStatus('connected')
        setRetryCount(0)
      } catch (binanceError) {
        console.warn('⚠️ Binance failed:', binanceError.message)
        console.log('🔍 [DEBUG] Binance error details:', binanceError)
        
        // Fallback sur CoinGecko
        try {
          console.log('🎯 [DEBUG] Attempting CoinGecko fallback...')
          result = await fetchFromCoinGecko()
          console.log('✅ [DEBUG] CoinGecko success:', result)
          setApiSource('CoinGecko')
          setConnectionStatus('connected')
          setRetryCount(0)
          console.log('🔄 Switched to CoinGecko fallback')
        } catch (coingeckoError) {
          console.error('❌ [DEBUG] CoinGecko also failed:', coingeckoError)
          throw new Error(`Toutes les APIs ont échoué: ${binanceError.message} | ${coingeckoError.message}`)
        }
      }

      if (result && result.success) {
        console.log('🎯 [DEBUG] Setting new prices:', result.data)
        setPrices(result.data)
        setLastUpdate(new Date())
        console.log(`✅ [PriceContext] Prix mis à jour via ${result.source}`)
        console.log('🔍 [DEBUG] New prices state:', result.data)
      } else {
        console.warn('⚠️ [DEBUG] No valid result received')
      }
      
    } catch (err) {
      console.error('❌ [PriceContext] Error fetching prices:', err)
      console.error('🔍 [DEBUG] Full error:', err.stack)
      setError(err.message)
      setConnectionStatus('error')
      setRetryCount(prev => prev + 1)
      
      // Fallback progressif : augmenter l'intervalle après plusieurs échecs
      if (retryCount >= 3) {
        console.log('🔄 Too many failures, switching to slower updates')
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(fetchRealPrices, 60000) // 1 minute
      }
    } finally {
      setLoading(false)
      console.log('🏁 [DEBUG] fetchRealPrices completed')
    }
  }, [canMakeRequest, retryCount, prices])

  // Récupération automatique des prix avec gestion intelligente
  useEffect(() => {
    // Première récupération immédiate
    fetchRealPrices()
    
    // Intervalle adaptatif : 15 secondes initialement
    intervalRef.current = setInterval(fetchRealPrices, 15000)
    
    // Nettoyage
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [fetchRealPrices])

  // Fonction manuelle pour forcer la mise à jour
  const refreshPrices = useCallback(() => {
    if (canMakeRequest()) {
      fetchRealPrices()
    } else {
      console.log('⏳ Refresh rate limited')
    }
  }, [fetchRealPrices, canMakeRequest])

  // Fonction pour passer en mode économie d'énergie
  const enablePowerSaveMode = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(fetchRealPrices, 30000) // 30 secondes
      console.log('🔋 Power save mode enabled')
    }
  }, [fetchRealPrices])

  // Détection de visibilité de la page pour économiser les requêtes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page cachée : ralentir les mises à jour
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = setInterval(fetchRealPrices, 60000) // 1 minute
        }
      } else {
        // Page visible : reprendre le rythme normal
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = setInterval(fetchRealPrices, 15000) // 15 secondes
        }
        // Mise à jour immédiate au retour sur la page
        fetchRealPrices()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [fetchRealPrices])

  const value = {
    prices,
    loading,
    error,
    lastUpdate,
    connectionStatus,
    apiSource,
    retryCount,
    refreshPrices,
    enablePowerSaveMode,
    
    // Getters pratiques
    getBTC: () => prices.BTC,
    getETH: () => prices.ETH,
    getSOL: () => prices.SOL,
    getRNDR: () => prices.RNDR,
    
    // Statistiques
    getStats: () => ({
      totalRequests: requestCountRef.current,
      lastRequestTime: new Date(lastRequestTimeRef.current),
      connectionStatus,
      apiSource,
      retryCount
    }),
    
    // Formatters améliorés
    formatPrice: (price) => new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : price < 100 ? 2 : 0
    }).format(price),
    
    formatChange: (change) => `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
    
    formatVolume: (volume) => {
      if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}Md$`
      if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M$`
      if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K$`
      return `${Math.round(volume)}$`
    },
    
    formatMarketCap: (marketCap) => {
      if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T$`
      if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(1)}Md$`
      if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(1)}M$`
      return `${Math.round(marketCap)}$`
    }
  }

  return (
    <PriceContext.Provider value={value}>
      {children}
    </PriceContext.Provider>
  )
}

// Hook personnalisé pour utiliser les prix
export const usePrices = () => {
  const context = useContext(PriceContext)
  if (!context) {
    throw new Error('usePrices must be used within a PriceProvider')
  }
  return context
}

// Hook spécialisé pour un crypto spécifique
export const usePrice = (symbol) => {
  const { prices, formatPrice, formatChange } = usePrices()
  const price = prices[symbol.toUpperCase()]
  
  if (!price) {
    console.warn(`Price for ${symbol} not found`)
    return null
  }
  
  return {
    ...price,
    formattedPrice: formatPrice(price.price),
    formattedChange: formatChange(price.change),
    isPositive: price.change >= 0
  }
}

export default PriceContext

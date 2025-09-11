// Utilitaire de test pour le système de prix amélioré

export const testPriceSystem = {
  // Test de la connexion API
  async testAPIConnection() {
    console.log('🧪 [TEST] Testing API connections...')
    
    // Test Binance
    try {
      const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT')
      const data = await response.json()
      console.log('✅ [TEST] Binance API: OK', { price: data.lastPrice })
    } catch (error) {
      console.error('❌ [TEST] Binance API failed:', error.message)
    }

    // Test CoinGecko
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      const data = await response.json()
      console.log('✅ [TEST] CoinGecko API: OK', { price: data.bitcoin.usd })
    } catch (error) {
      console.error('❌ [TEST] CoinGecko API failed:', error.message)
    }
  },

  // Test du rate limiting
  testRateLimiting() {
    console.log('🧪 [TEST] Testing rate limiting...')
    
    const mockRequestTimes = []
    const addRequest = () => {
      const now = Date.now()
      mockRequestTimes.push(now)
      
      // Garder seulement les requêtes de la dernière minute
      const oneMinuteAgo = now - 60000
      const recentRequests = mockRequestTimes.filter(time => time > oneMinuteAgo)
      
      console.log(`📊 [TEST] Requests in last minute: ${recentRequests.length}`)
      
      // Simuler la logique de rate limiting
      if (recentRequests.length >= 10) {
        console.log('⚠️ [TEST] Rate limit would be triggered')
        return false
      }
      
      console.log('✅ [TEST] Request allowed')
      return true
    }

    // Simuler 15 requêtes rapides
    for (let i = 0; i < 15; i++) {
      setTimeout(() => addRequest(), i * 100)
    }
  },

  // Test de performance des composants
  testComponentPerformance() {
    console.log('🧪 [TEST] Testing component performance...')
    
    const testData = {
      BTC: { price: 97194, change: 2.5, volume: 28000000000 },
      ETH: { price: 3760, change: 1.8, volume: 15000000000 }
    }

    // Simuler les changements de prix pour tester les re-rendus
    console.log('📊 [TEST] Testing price updates...')
    
    Object.keys(testData).forEach(symbol => {
      const originalPrice = testData[symbol].price
      
      // Simuler une volatilité élevée
      testData[symbol].price = originalPrice * (1 + (Math.random() - 0.5) * 0.15)
      testData[symbol].change = ((testData[symbol].price - originalPrice) / originalPrice) * 100
      
      console.log(`📈 [TEST] ${symbol} volatility test:`, {
        originalPrice,
        newPrice: testData[symbol].price,
        change: testData[symbol].change.toFixed(2) + '%'
      })
    })
  },

  // Test de fallback
  async testFallbackSystem() {
    console.log('🧪 [TEST] Testing fallback system...')
    
    const mockFailedResponse = () => Promise.reject(new Error('API timeout'))
    const mockSuccessResponse = () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ bitcoin: { usd: 45000 } })
    })

    try {
      // Simuler échec Binance
      await mockFailedResponse()
    } catch (binanceError) {
      console.log('⚠️ [TEST] Binance failed (simulated), trying CoinGecko...')
      
      try {
        // Simuler succès CoinGecko
        const result = await mockSuccessResponse()
        const data = await result.json()
        console.log('✅ [TEST] CoinGecko fallback successful:', data)
      } catch (coinGeckoError) {
        console.log('❌ [TEST] All APIs failed, using fallback data')
      }
    }
  },

  // Test complet du système
  async runAllTests() {
    console.log('🚀 [TEST] Running complete price system tests...')
    console.log('=' .repeat(50))
    
    await this.testAPIConnection()
    console.log('-'.repeat(30))
    
    this.testRateLimiting()
    console.log('-'.repeat(30))
    
    this.testComponentPerformance()
    console.log('-'.repeat(30))
    
    await this.testFallbackSystem()
    console.log('=' .repeat(50))
    console.log('✅ [TEST] All tests completed!')
  }
}

// Fonction d'utilité pour les développeurs
export const debugPriceContext = (priceContext) => {
  console.group('🔍 [DEBUG] Price Context State')
  console.log('Prices:', priceContext.prices)
  console.log('Loading:', priceContext.loading)
  console.log('Error:', priceContext.error)
  console.log('Connection Status:', priceContext.connectionStatus)
  console.log('API Source:', priceContext.apiSource)
  console.log('Retry Count:', priceContext.retryCount)
  console.log('Last Update:', priceContext.lastUpdate)
  console.log('Stats:', priceContext.getStats())
  console.groupEnd()
}

// Performance monitor
export const performanceMonitor = {
  startTime: Date.now(),
  requestCount: 0,
  
  logRequest(apiSource, responseTime, success) {
    this.requestCount++
    const uptime = Date.now() - this.startTime
    
    console.log(`📊 [PERF] Request #${this.requestCount}`, {
      apiSource,
      responseTime: responseTime + 'ms',
      success: success ? '✅' : '❌',
      uptime: Math.floor(uptime / 1000) + 's',
      avgRequestsPerMinute: Math.round((this.requestCount / uptime) * 60000)
    })
  },

  getReport() {
    const uptime = Date.now() - this.startTime
    return {
      uptime: Math.floor(uptime / 1000),
      totalRequests: this.requestCount,
      avgRequestsPerMinute: Math.round((this.requestCount / uptime) * 60000)
    }
  }
}

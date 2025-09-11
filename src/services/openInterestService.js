// Service pour surveiller les Open Interest (OI) des principales plateformes
export class OpenInterestService {
  constructor() {
    this.endpoints = {
      binance: 'https://fapi.binance.com/fapi/v1/openInterest',
      bybit: 'https://api.bybit.com/v5/market/open-interest',
      okx: 'https://www.okx.com/api/v5/public/open-interest',
      coinbase: 'https://api.exchange.coinbase.com/products',
      deribit: 'https://www.deribit.com/api/v2/public/get_book_summary_by_currency'
    }
    
    this.symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'RNDRUSDT']
    this.historicalData = new Map() // Stocker les données historiques pour calculer les variations
  }

  // Récupérer les Open Interest de Binance
  async getBinanceOpenInterest() {
    try {
      const results = []
      
      for (const symbol of this.symbols) {
        const response = await fetch(`${this.endpoints.binance}?symbol=${symbol}`)
        const data = await response.json()
        
        if (data.openInterest) {
          results.push({
            symbol: symbol,
            openInterest: parseFloat(data.openInterest),
            openInterestValue: parseFloat(data.openInterestValue || 0),
            platform: 'Binance',
            timestamp: new Date().toISOString()
          })
        }
      }
      
      return results
    } catch (error) {
      console.error('Erreur Binance Open Interest:', error)
      return []
    }
  }

  // Récupérer les Open Interest de Bybit
  async getBybitOpenInterest() {
    try {
      const results = []
      
      for (const symbol of this.symbols) {
        const response = await fetch(`${this.endpoints.bybit}?symbol=${symbol}&intervalTime=1h&limit=1`)
        const data = await response.json()
        
        if (data.result && data.result.list && data.result.list.length > 0) {
          const item = data.result.list[0]
          results.push({
            symbol: symbol,
            openInterest: parseFloat(item.openInterest),
            openInterestValue: parseFloat(item.openInterestValue || 0),
            platform: 'Bybit',
            timestamp: new Date().toISOString()
          })
        }
      }
      
      return results
    } catch (error) {
      console.error('Erreur Bybit Open Interest:', error)
      return []
    }
  }

  // Récupérer les Open Interest de OKX
  async getOKXOpenInterest() {
    try {
      const results = []
      const okxSymbols = ['BTC-USDT-SWAP', 'ETH-USDT-SWAP', 'SOL-USDT-SWAP']
      
      for (const symbol of okxSymbols) {
        const response = await fetch(`${this.endpoints.okx}?instId=${symbol}`)
        const data = await response.json()
        
        if (data.data && data.data.length > 0) {
          const item = data.data[0]
          results.push({
            symbol: symbol.replace('-USDT-SWAP', 'USDT'),
            openInterest: parseFloat(item.oi),
            openInterestValue: parseFloat(item.oiCcy || 0),
            platform: 'OKX',
            timestamp: new Date().toISOString()
          })
        }
      }
      
      return results
    } catch (error) {
      console.error('Erreur OKX Open Interest:', error)
      return []
    }
  }

  // Calculer les variations d'Open Interest
  calculateOIChange(currentData, historicalData) {
    if (!historicalData) return null
    
    const change = currentData.openInterest - historicalData.openInterest
    const changePercent = (change / historicalData.openInterest) * 100
    const valueChange = currentData.openInterestValue - (historicalData.openInterestValue || 0)
    
    return {
      absoluteChange: change,
      percentChange: changePercent,
      valueChange: valueChange,
      trend: change > 0 ? 'increasing' : change < 0 ? 'decreasing' : 'stable'
    }
  }

  // Récupérer tous les Open Interest
  async getAllOpenInterest() {
    try {
      const [binanceOI, bybitOI, okxOI] = await Promise.all([
        this.getBinanceOpenInterest(),
        this.getBybitOpenInterest(),
        this.getOKXOpenInterest()
      ])

      const allOI = [...binanceOI, ...bybitOI, ...okxOI]
      
      // Grouper par symbole et calculer les moyennes
      const groupedOI = {}
      allOI.forEach(oi => {
        if (!groupedOI[oi.symbol]) {
          groupedOI[oi.symbol] = []
        }
        groupedOI[oi.symbol].push(oi)
      })

      // Calculer les statistiques par symbole
      const processedOI = Object.entries(groupedOI).map(([symbol, oiData]) => {
        const totalOI = oiData.reduce((sum, oi) => sum + oi.openInterest, 0)
        const avgOI = totalOI / oiData.length
        const totalValue = oiData.reduce((sum, oi) => sum + (oi.openInterestValue || 0), 0)
        
        // Récupérer les données historiques pour calculer la variation
        const historicalKey = `${symbol}_${new Date().toDateString()}`
        const historical = this.historicalData.get(historicalKey)
        
        const currentData = {
          openInterest: avgOI,
          openInterestValue: totalValue
        }
        
        const change = this.calculateOIChange(currentData, historical)
        
        // Sauvegarder les données actuelles comme historiques
        this.historicalData.set(historicalKey, currentData)
        
        return {
          symbol,
          totalOpenInterest: totalOI,
          avgOpenInterest: avgOI,
          totalValue: totalValue,
          platforms: oiData.map(oi => oi.platform),
          change: change,
          alertLevel: this.getOIAlertLevel(change),
          timestamp: new Date().toISOString(),
          data: oiData
        }
      })

      return processedOI
    } catch (error) {
      console.error('Erreur récupération Open Interest:', error)
      return []
    }
  }

  // Déterminer le niveau d'alerte basé sur les variations d'OI
  getOIAlertLevel(change) {
    if (!change) return { level: 'normal', color: 'gray', icon: '📊' }
    
    const absChange = Math.abs(change.percentChange)
    
    if (absChange >= 20) return { level: 'critical', color: 'red', icon: '🚨' }
    if (absChange >= 10) return { level: 'high', color: 'orange', icon: '⚠️' }
    if (absChange >= 5) return { level: 'medium', color: 'yellow', icon: '📈' }
    return { level: 'normal', color: 'green', icon: '✅' }
  }

  // Analyser les patterns d'Open Interest
  analyzeOIPatterns(oiData) {
    const alerts = []
    
    oiData.forEach(oi => {
      const { symbol, change, alertLevel } = oi
      
      if (!change) return
      
      // Alerte pour augmentation massive d'OI (potentiel mouvement de prix)
      if (change.percentChange > 15) {
        alerts.push({
          type: 'OI_MASSIVE_INCREASE',
          symbol,
          change: change.percentChange,
          message: `Augmentation massive d'OI sur ${symbol}: +${change.percentChange.toFixed(2)}% (signal haussier potentiel)`,
          severity: alertLevel.level,
          trend: 'bullish',
          timestamp: new Date().toISOString()
        })
      }
      
      // Alerte pour diminution massive d'OI (déleverage)
      if (change.percentChange < -15) {
        alerts.push({
          type: 'OI_MASSIVE_DECREASE',
          symbol,
          change: change.percentChange,
          message: `Diminution massive d'OI sur ${symbol}: ${change.percentChange.toFixed(2)}% (déleverage en cours)`,
          severity: alertLevel.level,
          trend: 'bearish',
          timestamp: new Date().toISOString()
        })
      }
      
      // Alerte pour OI anormalement élevé
      if (oi.totalValue > 1000000000) { // Plus de 1 milliard
        alerts.push({
          type: 'OI_EXTREMELY_HIGH',
          symbol,
          value: oi.totalValue,
          message: `OI extrêmement élevé sur ${symbol}: $${(oi.totalValue / 1000000000).toFixed(2)}B`,
          severity: 'high',
          trend: 'neutral',
          timestamp: new Date().toISOString()
        })
      }
      
      // Alerte pour divergence entre plateformes
      if (oi.data.length > 1) {
        const oiValues = oi.data.map(d => d.openInterest)
        const maxOI = Math.max(...oiValues)
        const minOI = Math.min(...oiValues)
        const divergence = ((maxOI - minOI) / minOI) * 100
        
        if (divergence > 25) {
          alerts.push({
            type: 'OI_PLATFORM_DIVERGENCE',
            symbol,
            divergence: divergence,
            message: `Divergence importante d'OI sur ${symbol}: ${divergence.toFixed(1)}% entre plateformes`,
            severity: 'medium',
            trend: 'neutral',
            timestamp: new Date().toISOString()
          })
        }
      }
    })
    
    return alerts
  }

  // Surveiller les Open Interest en continu
  async monitorOpenInterest() {
    try {
      const oiData = await this.getAllOpenInterest()
      const alerts = this.analyzeOIPatterns(oiData)
      
      return {
        openInterest: oiData,
        alerts: alerts,
        timestamp: new Date().toISOString(),
        summary: {
          totalSymbols: oiData.length,
          criticalAlerts: alerts.filter(a => a.severity === 'critical').length,
          highAlerts: alerts.filter(a => a.severity === 'high').length,
          totalOIValue: oiData.reduce((sum, oi) => sum + oi.totalValue, 0),
          avgOIChange: oiData.reduce((sum, oi) => sum + (oi.change?.percentChange || 0), 0) / oiData.length
        }
      }
    } catch (error) {
      console.error('Erreur surveillance Open Interest:', error)
      return { openInterest: [], alerts: [], error: error.message }
    }
  }

  // Obtenir les tendances d'OI pour un symbole spécifique
  getOITrend(symbol, timeframe = '1h') {
    const historicalData = Array.from(this.historicalData.entries())
      .filter(([key]) => key.startsWith(symbol))
      .map(([key, data]) => ({
        date: key.split('_')[1],
        ...data
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    
    return {
      symbol,
      timeframe,
      data: historicalData,
      trend: this.calculateTrend(historicalData)
    }
  }

  // Calculer la tendance générale
  calculateTrend(data) {
    if (data.length < 2) return 'insufficient_data'
    
    const recent = data.slice(-5) // 5 derniers points
    const increases = recent.filter((point, index) => 
      index > 0 && point.openInterest > recent[index - 1].openInterest
    ).length
    
    if (increases >= 3) return 'strong_uptrend'
    if (increases >= 2) return 'uptrend'
    if (increases <= 1) return 'downtrend'
    return 'sideways'
  }
}

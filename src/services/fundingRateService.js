// Service pour surveiller les Funding Rates des principales plateformes
export class FundingRateService {
  constructor() {
    this.endpoints = {
      binance: 'https://fapi.binance.com/fapi/v1/premiumIndex',
      bybit: 'https://api.bybit.com/v5/market/funding/history',
      okx: 'https://www.okx.com/api/v5/public/funding-rate-history',
      coinbase: 'https://api.exchange.coinbase.com/products',
      deribit: 'https://www.deribit.com/api/v2/public/get_funding_rate_value'
    }
  }

  // Récupérer les funding rates de Binance
  async getBinanceFundingRates() {
    try {
      const response = await fetch(this.endpoints.binance)
      const data = await response.json()
      
      return data.map(item => ({
        symbol: item.symbol,
        fundingRate: parseFloat(item.lastFundingRate) * 100, // Convertir en pourcentage
        nextFundingTime: item.nextFundingTime,
        markPrice: parseFloat(item.markPrice),
        indexPrice: parseFloat(item.indexPrice),
        platform: 'Binance'
      }))
    } catch (error) {
      console.error('Erreur Binance funding rates:', error)
      return []
    }
  }

  // Récupérer les funding rates de Bybit
  async getBybitFundingRates() {
    try {
      const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'RNDRUSDT']
      const rates = []
      
      for (const symbol of symbols) {
        const response = await fetch(`${this.endpoints.bybit}?symbol=${symbol}&limit=1`)
        const data = await response.json()
        
        if (data.result && data.result.list.length > 0) {
          const item = data.result.list[0]
          rates.push({
            symbol: symbol,
            fundingRate: parseFloat(item.fundingRate) * 100,
            nextFundingTime: item.fundingRateTimestamp,
            markPrice: parseFloat(item.markPrice),
            indexPrice: parseFloat(item.indexPrice),
            platform: 'Bybit'
          })
        }
      }
      
      return rates
    } catch (error) {
      console.error('Erreur Bybit funding rates:', error)
      return []
    }
  }

  // Récupérer les funding rates de OKX
  async getOKXFundingRates() {
    try {
      const symbols = ['BTC-USDT-SWAP', 'ETH-USDT-SWAP', 'SOL-USDT-SWAP']
      const rates = []
      
      for (const symbol of symbols) {
        const response = await fetch(`${this.endpoints.okx}?instId=${symbol}&limit=1`)
        const data = await response.json()
        
        if (data.data && data.data.length > 0) {
          const item = data.data[0]
          rates.push({
            symbol: symbol.replace('-USDT-SWAP', 'USDT'),
            fundingRate: parseFloat(item.fundingRate) * 100,
            nextFundingTime: item.fundingTime,
            markPrice: parseFloat(item.markPx),
            indexPrice: parseFloat(item.idxPx),
            platform: 'OKX'
          })
        }
      }
      
      return rates
    } catch (error) {
      console.error('Erreur OKX funding rates:', error)
      return []
    }
  }

  // Récupérer tous les funding rates
  async getAllFundingRates() {
    try {
      const [binanceRates, bybitRates, okxRates] = await Promise.all([
        this.getBinanceFundingRates(),
        this.getBybitFundingRates(),
        this.getOKXFundingRates()
      ])

      // Combiner tous les rates
      const allRates = [...binanceRates, ...bybitRates, ...okxRates]
      
      // Grouper par symbole et calculer la moyenne
      const groupedRates = {}
      allRates.forEach(rate => {
        if (!groupedRates[rate.symbol]) {
          groupedRates[rate.symbol] = []
        }
        groupedRates[rate.symbol].push(rate)
      })

      // Calculer les moyennes et détecter les anomalies
      const processedRates = Object.entries(groupedRates).map(([symbol, rates]) => {
        const avgFundingRate = rates.reduce((sum, rate) => sum + rate.fundingRate, 0) / rates.length
        const maxFundingRate = Math.max(...rates.map(r => r.fundingRate))
        const minFundingRate = Math.min(...rates.map(r => r.fundingRate))
        
        return {
          symbol,
          avgFundingRate,
          maxFundingRate,
          minFundingRate,
          platforms: rates.map(r => r.platform),
          rates: rates,
          alertLevel: this.getFundingAlertLevel(avgFundingRate),
          timestamp: new Date().toISOString()
        }
      })

      return processedRates
    } catch (error) {
      console.error('Erreur récupération funding rates:', error)
      return []
    }
  }

  // Déterminer le niveau d'alerte basé sur le funding rate
  getFundingAlertLevel(fundingRate) {
    const absRate = Math.abs(fundingRate)
    
    if (absRate >= 0.1) return { level: 'critical', color: 'red', icon: '🚨' }
    if (absRate >= 0.05) return { level: 'high', color: 'orange', icon: '⚠️' }
    if (absRate >= 0.02) return { level: 'medium', color: 'yellow', icon: '⚡' }
    return { level: 'normal', color: 'green', icon: '✅' }
  }

  // Analyser les funding rates pour détecter des patterns
  analyzeFundingPatterns(rates) {
    const alerts = []
    
    rates.forEach(rate => {
      const { symbol, avgFundingRate, alertLevel } = rate
      
      // Alerte pour funding rate élevé (pression haussière)
      if (avgFundingRate > 0.05) {
        alerts.push({
          type: 'FUNDING_HIGH_POSITIVE',
          symbol,
          fundingRate: avgFundingRate,
          message: `Funding rate élevé sur ${symbol}: +${avgFundingRate.toFixed(4)}% (pression haussière)`,
          severity: alertLevel.level,
          platforms: rate.platforms,
          timestamp: new Date().toISOString()
        })
      }
      
      // Alerte pour funding rate très négatif (pression baissière)
      if (avgFundingRate < -0.05) {
        alerts.push({
          type: 'FUNDING_HIGH_NEGATIVE',
          symbol,
          fundingRate: avgFundingRate,
          message: `Funding rate très négatif sur ${symbol}: ${avgFundingRate.toFixed(4)}% (pression baissière)`,
          severity: alertLevel.level,
          platforms: rate.platforms,
          timestamp: new Date().toISOString()
        })
      }
      
      // Alerte pour divergence entre plateformes
      const maxDiff = rate.maxFundingRate - rate.minFundingRate
      if (maxDiff > 0.02) {
        alerts.push({
          type: 'FUNDING_DIVERGENCE',
          symbol,
          fundingRate: avgFundingRate,
          message: `Divergence importante sur ${symbol}: écart de ${maxDiff.toFixed(4)}% entre plateformes`,
          severity: 'medium',
          platforms: rate.platforms,
          timestamp: new Date().toISOString()
        })
      }
    })
    
    return alerts
  }

  // Surveiller les funding rates en continu
  async monitorFundingRates() {
    try {
      const rates = await this.getAllFundingRates()
      const alerts = this.analyzeFundingPatterns(rates)
      
      return {
        rates,
        alerts,
        timestamp: new Date().toISOString(),
        summary: {
          totalSymbols: rates.length,
          criticalAlerts: alerts.filter(a => a.severity === 'critical').length,
          highAlerts: alerts.filter(a => a.severity === 'high').length,
          avgFundingRate: rates.reduce((sum, r) => sum + r.avgFundingRate, 0) / rates.length
        }
      }
    } catch (error) {
      console.error('Erreur surveillance funding rates:', error)
      return { rates: [], alerts: [], error: error.message }
    }
  }
}

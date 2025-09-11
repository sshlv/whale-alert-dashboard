// Service pour générer des alertes de test réalistes
export class TestAlertsService {
  static generateTestAlert() {
    const cryptos = [
      { name: 'Bitcoin', symbol: 'BTC', type: 'BTC', min: 1, max: 50, color: '#F7931A' },
      { name: 'Ethereum', symbol: 'ETH', type: 'ETH', min: 100, max: 5000, color: '#627EEA' },
      { name: 'Solana', symbol: 'SOL', type: 'SOL', min: 1000, max: 100000, color: '#14F195' },
      { name: 'Render Token', symbol: 'RNDR', type: 'RNDR', min: 10000, max: 1000000, color: '#FF6B35' }
    ]

    const exchangesPairs = [
      { from: 'Binance', to: 'Cold Storage', trend: 'bearish' }, // Sortie de exchange = vente
      { from: 'Coinbase', to: 'Unknown Wallet', trend: 'bearish' },
      { from: 'Kraken', to: 'Hardware Wallet', trend: 'bearish' },
      { from: 'Unknown Wallet', to: 'Binance', trend: 'bullish' }, // Entrée vers exchange = achat
      { from: 'Cold Storage', to: 'Coinbase', trend: 'bullish' },
      { from: 'Whale Wallet', to: 'OKX', trend: 'bullish' },
      { from: 'DEX Router', to: 'Uniswap', trend: 'neutral' },
      { from: 'Bybit', to: 'Gate.io', trend: 'neutral' }
    ]

    // Choisir une crypto aléatoirement
    const crypto = cryptos[Math.floor(Math.random() * cryptos.length)]
    
    // Choisir une paire d'échanges avec tendance
    const exchangePair = exchangesPairs[Math.floor(Math.random() * exchangesPairs.length)]
    
    // Générer un montant réaliste
    const amount = Math.floor(Math.random() * (crypto.max - crypto.min) + crypto.min)
    
    // Prix simulés
    const prices = {
      BTC: 45000 + (Math.random() - 0.5) * 5000,
      ETH: 2400 + (Math.random() - 0.5) * 400,
      SOL: 100 + (Math.random() - 0.5) * 20,
      RNDR: 4 + (Math.random() - 0.5) * 1
    }

    const value_usd = amount * prices[crypto.type]

    return {
      id: Date.now() + Math.random(),
      type: crypto.type,
      token: crypto.name,
      symbol: crypto.symbol,
      amount: amount,
      value_usd: Math.round(value_usd),
      from: exchangePair.from,
      to: exchangePair.to,
      trend: exchangePair.trend,
      color: crypto.color,
      timestamp: new Date().toISOString(),
      hash: this.generateRandomHash(),
      block: Math.floor(Math.random() * 1000000) + 18000000,
      gas_price: Math.floor(Math.random() * 100) + 20,
      is_test: true // Marquer comme alerte de test
    }
  }

  static generateRandomHash() {
    const chars = '0123456789abcdef'
    let result = '0x'
    for (let i = 0; i < 64; i++) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
  }

  static startTestAlerts(addAlert, intervalMs = 15000) {
    // Générer une alerte immédiatement
    setTimeout(() => {
      const testAlert = this.generateTestAlert()
      console.log('🧪 Génération alerte de test:', testAlert)
      addAlert(testAlert)
    }, 2000)

    // Puis générer des alertes périodiquement
    const interval = setInterval(() => {
      // 30% de chance de générer une alerte à chaque intervalle
      if (Math.random() < 0.3) {
        const testAlert = this.generateTestAlert()
        console.log('🧪 Génération alerte de test:', testAlert)
        addAlert(testAlert)
      }
    }, intervalMs)

    return interval
  }

  static generateMultipleTestAlerts(count = 3) {
    const alerts = []
    for (let i = 0; i < count; i++) {
      alerts.push(this.generateTestAlert())
    }
    return alerts
  }

  // Générer des alertes avec valeurs spécifiques pour démo
  static generateDemoAlerts() {
    return [
      {
        id: Date.now() + 1,
        type: 'BTC',
        token: 'Bitcoin',
        symbol: 'BTC',
        amount: 2450,
        value_usd: 110800000,
        from: 'Binance',
        to: 'Cold Storage',
        trend: 'bearish',
        color: '#F7931A',
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        block: 18500001,
        is_test: true
      },
      {
        id: Date.now() + 2,
        type: 'ETH', 
        token: 'Ethereum',
        symbol: 'ETH',
        amount: 15680,
        value_usd: 36700000,
        from: 'Unknown Wallet',
        to: 'Coinbase',
        trend: 'bullish',
        color: '#627EEA',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        hash: '0x456789abcdef123456789abcdef123456789abcdef123456789abcdef12345678',
        block: 18500002,
        is_test: true
      },
      {
        id: Date.now() + 3,
        type: 'SOL',
        token: 'Solana',
        symbol: 'SOL',
        amount: 125000,
        value_usd: 12500000,
        from: 'Whale Wallet',
        to: 'OKX',
        trend: 'bullish',
        color: '#14F195',
        timestamp: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
        hash: '0x789abcdef123456789abcdef123456789abcdef123456789abcdef123456789abc',
        block: 18500003,
        is_test: true
      }
    ]
  }
}

export default TestAlertsService

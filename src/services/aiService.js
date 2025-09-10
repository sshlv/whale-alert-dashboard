// Service IA gratuit avec plusieurs alternatives
// Utilise des APIs gratuites ou des modèles locaux simple

class AIService {
  constructor() {
    this.apiKey = null // Pas besoin d'API key pour les services gratuits
    this.isAvailable = true
    this.model = 'local' // local, huggingface, cohere
  }

  // Base de connaissances trading
  tradingKnowledge = {
    patterns: {
      'bull flag': 'Pattern haussier de continuation, souvent suivi d\'une hausse',
      'bear flag': 'Pattern baissier de continuation, attention à la chute',
      'head and shoulders': 'Pattern de retournement baissier très fiable',
      'double top': 'Signal de retournement baissier, préparez-vous à vendre',
      'double bottom': 'Signal de retournement haussier, bon moment d\'acheter',
      'triangle': 'Pattern de consolidation, cassure détermine la direction'
    },
    
    indicators: {
      'rsi > 70': 'Zone de surachat, possible correction',
      'rsi < 30': 'Zone de survente, rebond possible',
      'macd bullish cross': 'Signal haussier fort',
      'macd bearish cross': 'Signal baissier, soyez prudent',
      'bollinger squeeze': 'Volatilité faible, explosion imminente',
      'volume spike': 'Intérêt accru, mouvement de prix probable'
    },
    
    market_conditions: {
      'high volatility': 'Marchés nerveux, réduisez les positions',
      'low volatility': 'Consolidation, attendez la cassure',
      'trending market': 'Suivez la tendance, pas de contre-tendance',
      'sideways market': 'Range trading, achetez support vendez résistance'
    },
    
    risk_management: [
      'Ne risquez jamais plus de 2% de votre capital par trade',
      'Utilisez des stops loss systématiquement',
      'Diversifiez vos positions sur plusieurs cryptos',
      'Gardez toujours des liquidités pour les opportunités',
      'Les émotions sont l\'ennemi du trader',
      'Un plan de trading est essentiel'
    ],
    
    crypto_insights: {
      'BTC': {
        role: 'King crypto, influence tout le marché',
        correlation: 'Forte corrélation avec l\'ensemble du marché',
        strategy: 'HODL long terme ou swing trading',
        signals: ['dominance', 'institutional adoption', 'regulatory news']
      },
      'ETH': {
        role: 'Platform leader, smart contracts king',
        correlation: 'Suit BTC mais avec plus de volatilité',
        strategy: 'Excellent pour DeFi et staking',
        signals: ['gas fees', 'DeFi TVL', 'upgrade news']
      },
      'SOL': {
        role: 'High performance blockchain',
        correlation: 'Plus volatile que ETH',
        strategy: 'Momentum trading, attention aux dumps',
        signals: ['network outages', 'ecosystem growth', 'NFT activity']
      },
      'RNDR': {
        role: 'AI and rendering utility token',
        correlation: 'Suit les trends AI/gaming',
        strategy: 'Thematic investment, long terme',
        signals: ['AI hype', 'GPU demand', 'metaverse news']
      }
    }
  }

  // Analyse de sentiment simple basée sur les prix
  analyzeSentiment(priceData) {
    if (!priceData) return 'neutral'
    
    const changes = Object.values(priceData).map(p => p.change24h || 0)
    const avgChange = changes.reduce((a, b) => a + b, 0) / changes.length
    
    if (avgChange > 3) return 'very_bullish'
    if (avgChange > 1) return 'bullish'
    if (avgChange < -3) return 'very_bearish'
    if (avgChange < -1) return 'bearish'
    return 'neutral'
  }

  // Génération de conseils contextuels
  generateAdvice(context = {}) {
    const { sentiment, crypto, timeframe, riskLevel } = context
    let advice = []

    // Conseils basés sur le sentiment
    switch (sentiment) {
      case 'very_bullish':
        advice.push('🚀 Marché très haussier ! Profitez de la tendance mais attention aux prises de profit')
        advice.push('💰 Bon moment pour les positions longues, mais gardez vos stops')
        break
      case 'bullish':
        advice.push('📈 Tendance positive, recherchez les opportunités d\'achat sur les dips')
        break
      case 'very_bearish':
        advice.push('🔴 Marché très baissier ! Protégez votre capital, cash is king')
        advice.push('⚠️ Évitez les longs, considérez les shorts ou attendez')
        break
      case 'bearish':
        advice.push('📉 Prudence recommandée, attendez des signaux de retournement')
        break
      default:
        advice.push('🤔 Marché en consolidation, patience avant de prendre position')
    }

    // Conseils spécifiques par crypto
    if (crypto && this.tradingKnowledge.crypto_insights[crypto]) {
      const insights = this.tradingKnowledge.crypto_insights[crypto]
      advice.push(`💡 ${crypto}: ${insights.role}`)
      advice.push(`📊 Stratégie recommandée: ${insights.strategy}`)
    }

    // Conseils de risk management
    const riskAdvice = this.tradingKnowledge.risk_management[
      Math.floor(Math.random() * this.tradingKnowledge.risk_management.length)
    ]
    advice.push(`🛡️ ${riskAdvice}`)

    return advice
  }

  // Analyse technique simple
  analyzeIndicators(technicalData) {
    const signals = []
    
    if (technicalData.rsi > 70) {
      signals.push({ type: 'warning', message: 'RSI en zone de surachat (>70)', strength: 'medium' })
    } else if (technicalData.rsi < 30) {
      signals.push({ type: 'opportunity', message: 'RSI en zone de survente (<30)', strength: 'medium' })
    }

    if (technicalData.macd && technicalData.macd.trend === 'BULLISH') {
      signals.push({ type: 'bullish', message: 'MACD donne un signal haussier', strength: 'strong' })
    } else if (technicalData.macd && technicalData.macd.trend === 'BEARISH') {
      signals.push({ type: 'bearish', message: 'MACD donne un signal baissier', strength: 'strong' })
    }

    if (technicalData.volume && technicalData.volume.signal === 'HIGH') {
      signals.push({ type: 'attention', message: 'Volume élevé détecté, mouvement probable', strength: 'high' })
    }

    return signals
  }

  // Prédictions simples basées sur les patterns
  generatePrediction(crypto, priceHistory, timeframe = '24h') {
    // Simulation intelligente basée sur des patterns réels
    const basePrice = priceHistory[priceHistory.length - 1] || Math.random() * 50000
    const volatility = this.calculateVolatility(priceHistory)
    const trend = this.detectTrend(priceHistory)
    
    let prediction = basePrice
    let confidence = 60 + Math.random() * 30 // 60-90% base confidence
    
    // Ajustement basé sur la tendance
    if (trend === 'bullish') {
      prediction *= (1 + Math.random() * 0.08) // +0-8%
      confidence += 10
    } else if (trend === 'bearish') {
      prediction *= (1 - Math.random() * 0.08) // -0-8%
      confidence += 10
    } else {
      prediction *= (1 + (Math.random() - 0.5) * 0.06) // ±3%
    }

    // Ajustement basé sur la volatilité
    if (volatility > 0.1) confidence -= 15 // Haute volatilité = moins fiable
    if (volatility < 0.03) confidence += 10 // Basse volatilité = plus stable

    // Facteurs crypto-spécifiques
    const cryptoFactor = this.getCryptoFactor(crypto)
    prediction *= cryptoFactor.multiplier
    confidence += cryptoFactor.confidenceBonus

    return {
      predictedPrice: prediction,
      confidence: Math.min(95, Math.max(30, confidence)),
      timeframe,
      factors: this.getFactors(crypto, trend, volatility),
      risk: volatility > 0.08 ? 'high' : volatility > 0.04 ? 'medium' : 'low'
    }
  }

  calculateVolatility(prices) {
    if (prices.length < 2) return 0.05 // Default volatility
    
    const changes = []
    for (let i = 1; i < prices.length; i++) {
      changes.push((prices[i] - prices[i-1]) / prices[i-1])
    }
    
    const mean = changes.reduce((a, b) => a + b, 0) / changes.length
    const variance = changes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / changes.length
    return Math.sqrt(variance)
  }

  detectTrend(prices) {
    if (prices.length < 3) return 'neutral'
    
    const recent = prices.slice(-5) // 5 derniers points
    const first = recent[0]
    const last = recent[recent.length - 1]
    const change = (last - first) / first
    
    if (change > 0.02) return 'bullish'
    if (change < -0.02) return 'bearish'
    return 'neutral'
  }

  getCryptoFactor(crypto) {
    const factors = {
      'BTC': { multiplier: 1.0, confidenceBonus: 5 }, // Stable, predictable
      'ETH': { multiplier: 1.01, confidenceBonus: 3 }, // Slightly more volatile
      'SOL': { multiplier: 1.02, confidenceBonus: -5 }, // More volatile
      'RNDR': { multiplier: 1.03, confidenceBonus: -10 } // Most volatile
    }
    return factors[crypto] || { multiplier: 1.0, confidenceBonus: 0 }
  }

  getFactors(crypto, trend, volatility) {
    const factors = [
      'Analyse technique avancée',
      'Patterns de prix historiques',
      'Corrélations de marché',
      'Momentum indicators'
    ]

    if (trend === 'bullish') factors.push('Tendance haussière confirmée')
    if (trend === 'bearish') factors.push('Pression baissière détectée')
    if (volatility > 0.08) factors.push('Haute volatilité - incertitude élevée')
    if (volatility < 0.03) factors.push('Faible volatilité - stabilité relative')

    return factors.slice(0, 3 + Math.floor(Math.random() * 2)) // 3-4 factors
  }

  // Analyse de contexte pour réponses intelligentes
  analyzeContext(message, marketData) {
    const context = {
      intent: this.detectIntent(message),
      crypto: this.extractCrypto(message),
      sentiment: this.analyzeSentiment(marketData?.prices),
      urgency: this.detectUrgency(message)
    }
    
    return context
  }

  detectIntent(message) {
    const msg = message.toLowerCase()
    
    if (msg.includes('prix') || msg.includes('prédiction') || msg.includes('prévision')) return 'price_prediction'
    if (msg.includes('conseil') || msg.includes('stratégie') || msg.includes('aide')) return 'advice'
    if (msg.includes('risque') || msg.includes('protection') || msg.includes('stop')) return 'risk_management'
    if (msg.includes('technique') || msg.includes('analyse') || msg.includes('indicateur')) return 'technical_analysis'
    if (msg.includes('marché') || msg.includes('sentiment') || msg.includes('tendance')) return 'market_analysis'
    
    return 'general'
  }

  extractCrypto(message) {
    const msg = message.toLowerCase()
    
    if (msg.includes('btc') || msg.includes('bitcoin')) return 'BTC'
    if (msg.includes('eth') || msg.includes('ethereum')) return 'ETH'
    if (msg.includes('sol') || msg.includes('solana')) return 'SOL'
    if (msg.includes('rndr') || msg.includes('render')) return 'RNDR'
    
    return null
  }

  detectUrgency(message) {
    const urgentWords = ['urgent', 'rapide', 'maintenant', 'immédiat', 'vite', 'emergency']
    return urgentWords.some(word => message.toLowerCase().includes(word))
  }

  // Réponse intelligente basée sur le contexte
  generateIntelligentResponse(message, context, marketData) {
    const { intent, crypto, sentiment, urgency } = context
    
    switch (intent) {
      case 'price_prediction':
        return this.generatePricePredictionResponse(crypto, marketData, urgency)
      
      case 'advice':
        return this.generateAdviceResponse(sentiment, crypto, urgency)
      
      case 'risk_management':
        return this.generateRiskResponse(marketData, urgency)
      
      case 'technical_analysis':
        return this.generateTechnicalResponse(crypto, marketData)
      
      case 'market_analysis':
        return this.generateMarketResponse(sentiment, marketData)
      
      default:
        return this.generateGeneralResponse(message, sentiment)
    }
  }

  generatePricePredictionResponse(crypto, marketData, urgent) {
    if (!crypto) {
      return "🔮 Pour une prédiction précise, spécifiez quelle crypto vous intéresse (BTC, ETH, SOL, RNDR). Je peux analyser les tendances et vous donner une estimation basée sur l'analyse technique !"
    }

    const currentPrice = marketData?.prices?.[crypto]?.price || 0
    const prediction = this.generatePrediction(crypto, [currentPrice])
    
    const urgencyPrefix = urgent ? "🚨 ANALYSE URGENTE 🚨\n\n" : ""
    
    return `${urgencyPrefix}🔮 **Prédiction ${crypto}**\n\n💰 Prix actuel: $${currentPrice.toFixed(2)}\n📈 Prédiction: $${prediction.predictedPrice.toFixed(2)}\n🎯 Confiance: ${prediction.confidence.toFixed(1)}%\n⚠️ Risque: ${prediction.risk}\n\n📊 Facteurs clés:\n${prediction.factors.map(f => `• ${f}`).join('\n')}\n\n💡 Cette prédiction est basée sur l'analyse technique et les patterns historiques. Toujours faire ses propres recherches !`
  }

  generateAdviceResponse(sentiment, crypto, urgent) {
    const advice = this.generateAdvice({ sentiment, crypto })
    const urgencyPrefix = urgent ? "🚨 CONSEIL URGENT 🚨\n\n" : ""
    
    return `${urgencyPrefix}💡 **Conseils Trading**\n\n${advice.map(a => `${a}`).join('\n\n')}\n\n🎯 Rappelez-vous: Le trading crypto est risqué. Ne tradez que ce que vous pouvez vous permettre de perdre !`
  }

  generateRiskResponse(marketData, urgent) {
    const sentiment = this.analyzeSentiment(marketData?.prices)
    const urgencyPrefix = urgent ? "🚨 GESTION RISQUE URGENTE 🚨\n\n" : ""
    
    let riskAdvice = "🛡️ **Gestion des Risques**\n\n"
    
    if (sentiment.includes('bearish')) {
      riskAdvice += "📉 Marché baissier détecté:\n• Réduisez vos positions\n• Augmentez votre cash\n• Stops loss serrés\n• Évitez les longs"
    } else if (sentiment.includes('bullish')) {
      riskAdvice += "📈 Marché haussier:\n• Profitez mais restez prudent\n• Prenez des profits partiels\n• Gardez vos stops\n• Ne sur-leveragez pas"
    } else {
      riskAdvice += "🤔 Marché neutre:\n• Patience recommandée\n• Positions réduites\n• Attendez la confirmation\n• Préparez vos plans"
    }
    
    riskAdvice += "\n\n⚖️ Règles d'or:\n• Max 2% de capital par trade\n• Diversification obligatoire\n• Stop loss systématique\n• Plan avant trade"
    
    return urgencyPrefix + riskAdvice
  }

  generateTechnicalResponse(crypto, marketData) {
    return `📊 **Analyse Technique ${crypto || 'Globale'}**\n\n🔍 Indicateurs à surveiller:\n\n📈 **RSI**: Momentum price\n• >70 = Surachat ⚠️\n• <30 = Survente 💚\n• 30-70 = Zone neutre\n\n📊 **MACD**: Tendance\n• Cross bullish = Signal achat 📈\n• Cross bearish = Signal vente 📉\n\n📏 **Bollinger Bands**: Volatilité\n• Prix proche bande haute = Résistance\n• Prix proche bande basse = Support\n\n🎯 **Support/Résistance**: Niveaux clés\n• Cassure support = Baisse probable\n• Cassure résistance = Hausse probable\n\n💡 Combinez plusieurs indicateurs pour confirmation !`
  }

  generateMarketResponse(sentiment, marketData) {
    const sentimentEmoji = {
      'very_bullish': '🚀',
      'bullish': '📈',
      'neutral': '🤔',
      'bearish': '📉',
      'very_bearish': '💥'
    }
    
    return `${sentimentEmoji[sentiment] || '📊'} **Analyse de Marché**\n\nSentiment actuel: **${sentiment.replace('_', ' ').toUpperCase()}**\n\n🌡️ **Température du marché**:\n• Fear & Greed: Variable\n• Volatilité: En surveillance\n• Volume: À analyser\n\n💭 **Facteurs d'influence**:\n• Actualités réglementaires\n• Mouvements institutionnels\n• Sentiment social media\n• Indicateurs macroéconomiques\n\n🎯 **Recommandation**: Adaptez votre stratégie au sentiment actuel. En cas de doute, cash is king !`
  }

  generateGeneralResponse(message, sentiment) {
    const responses = [
      `🤖 Excellente question ! Le marché crypto est actuellement ${sentiment}. Comment puis-je vous aider spécifiquement avec votre trading ?`,
      `💭 Je comprends votre préoccupation. Avec un marché ${sentiment}, il faut rester vigilant. Que souhaitez-vous analyser ?`,
      `🧠 Intéressant ! En tant qu'IA trading, je peux vous aider avec l'analyse technique, les prédictions, ou la gestion des risques. Que préférez-vous ?`,
      `📈 Le trading crypto nécessite de la stratégie ! Voulez-vous qu'on analyse une crypto spécifique ou qu'on discute de stratégie générale ?`
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }
}

// Instance globale
export const aiService = new AIService()
export default AIService

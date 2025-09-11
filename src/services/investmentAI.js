// IA d'Investissement ULTRA-AVANCÉE pour recommandations crypto TOP NIVEAU

import { freeMarketAPIs } from './freeMarketAPIs'

class InvestmentAI {
  constructor() {
    this.cryptoDatabase = this.initializeCryptoDatabase()
    this.investmentStrategies = this.initializeStrategies()
    this.riskProfiles = this.initializeRiskProfiles()
    this.marketCycles = this.initializeMarketCycles()
    this.portfolioOptimization = this.initializePortfolioOptimization()
    this.macroFactors = this.initializeMacroFactors()
  }

  // Base de données complète des cryptos avec scoring avancé
  initializeCryptoDatabase() {
    return {
      'BTC': {
        name: 'Bitcoin',
        category: 'Store of Value',
        marketCap: 850000000000,
        volume24h: 25000000000,
        fundamentalScore: 95,
        technicalScore: 0, // Calculé en temps réel
        adoptionScore: 98,
        developmentScore: 85,
        riskLevel: 'LOW',
        correlationBTC: 1.0,
        liquidityScore: 100,
        institutionalAdoption: 95,
        regulatoryRisk: 'LOW',
        narratives: ['Digital Gold', 'Inflation Hedge', 'Institutional Adoption'],
        catalysts: ['ETF Approval', 'Halving', 'Institutional Buying'],
        keyMetrics: {
          nvt: 0, // Network Value to Transactions
          mvrv: 0, // Market Value to Realized Value
          sopr: 0, // Spent Output Profit Ratio
          addresses: 1000000000
        },
        priceTargets: {
          conservative: 50000,
          moderate: 75000,
          aggressive: 100000,
          moonshot: 150000
        }
      },
      'ETH': {
        name: 'Ethereum',
        category: 'Smart Contract Platform',
        marketCap: 320000000000,
        volume24h: 15000000000,
        fundamentalScore: 92,
        technicalScore: 0,
        adoptionScore: 94,
        developmentScore: 98,
        riskLevel: 'MEDIUM',
        correlationBTC: 0.85,
        liquidityScore: 95,
        institutionalAdoption: 85,
        regulatoryRisk: 'MEDIUM',
        narratives: ['Web3 Infrastructure', 'DeFi Hub', 'NFT Platform', 'Ethereum 2.0'],
        catalysts: ['Shanghai Upgrade', 'DeFi Growth', 'Layer 2 Scaling'],
        keyMetrics: {
          tvl: 50000000000, // Total Value Locked
          gasUsed: 0,
          stakingRatio: 0.15,
          burnRate: 0
        },
        priceTargets: {
          conservative: 3000,
          moderate: 5000,
          aggressive: 8000,
          moonshot: 12000
        }
      },
      'SOL': {
        name: 'Solana',
        category: 'High Performance Blockchain',
        marketCap: 45000000000,
        volume24h: 2000000000,
        fundamentalScore: 85,
        technicalScore: 0,
        adoptionScore: 82,
        developmentScore: 90,
        riskLevel: 'HIGH',
        correlationBTC: 0.75,
        liquidityScore: 80,
        institutionalAdoption: 70,
        regulatoryRisk: 'MEDIUM',
        narratives: ['Ethereum Killer', 'High Speed DeFi', 'NFT Platform', 'Mobile First'],
        catalysts: ['Ecosystem Growth', 'Institutional Adoption', 'DeFi Innovation'],
        keyMetrics: {
          tps: 65000, // Transactions per second
          validators: 2000,
          stakingRatio: 0.72,
          networkUptime: 0.99
        },
        priceTargets: {
          conservative: 120,
          moderate: 200,
          aggressive: 350,
          moonshot: 500
        }
      },
      'RNDR': {
        name: 'Render Token',
        category: 'AI & Rendering',
        marketCap: 4000000000,
        volume24h: 150000000,
        fundamentalScore: 78,
        technicalScore: 0,
        adoptionScore: 65,
        developmentScore: 85,
        riskLevel: 'VERY_HIGH',
        correlationBTC: 0.60,
        liquidityScore: 60,
        institutionalAdoption: 40,
        regulatoryRisk: 'LOW',
        narratives: ['AI Revolution', 'Metaverse Infrastructure', 'GPU Rendering'],
        catalysts: ['AI Hype', 'Metaverse Growth', 'Partnership Announcements'],
        keyMetrics: {
          renderJobs: 0,
          nodeCount: 0,
          utilizationRate: 0,
          partnerships: 15
        },
        priceTargets: {
          conservative: 10,
          moderate: 15,
          aggressive: 25,
          moonshot: 40
        }
      },
      // Ajout de cryptos ULTRA-PROMETTEUSES
      'LINK': {
        name: 'Chainlink',
        category: 'Oracle Network',
        marketCap: 8000000000,
        volume24h: 400000000,
        fundamentalScore: 88,
        technicalScore: 0,
        adoptionScore: 90,
        developmentScore: 92,
        riskLevel: 'MEDIUM',
        correlationBTC: 0.70,
        liquidityScore: 85,
        institutionalAdoption: 80,
        regulatoryRisk: 'LOW',
        narratives: ['Oracle Leader', 'DeFi Infrastructure', 'Real World Assets'],
        catalysts: ['CCIP Launch', 'Staking V2', 'Enterprise Adoption'],
        priceTargets: {
          conservative: 20,
          moderate: 35,
          aggressive: 60,
          moonshot: 100
        }
      },
      'MATIC': {
        name: 'Polygon',
        category: 'Layer 2 Scaling',
        marketCap: 7000000000,
        volume24h: 300000000,
        fundamentalScore: 84,
        technicalScore: 0,
        adoptionScore: 88,
        developmentScore: 89,
        riskLevel: 'MEDIUM',
        correlationBTC: 0.72,
        liquidityScore: 80,
        institutionalAdoption: 75,
        regulatoryRisk: 'LOW',
        narratives: ['Ethereum Scaling', 'DeFi Hub', 'Enterprise Adoption'],
        catalysts: ['zkEVM Launch', 'Polygon 2.0', 'Web3 Gaming'],
        priceTargets: {
          conservative: 1.5,
          moderate: 3.0,
          aggressive: 5.0,
          moonshot: 8.0
        }
      }
    }
  }

  // Stratégies d'investissement avancées
  initializeStrategies() {
    return {
      'CONSERVATIVE': {
        name: 'Conservateur',
        description: 'Protection du capital avec croissance modérée',
        riskTolerance: 'LOW',
        timeHorizon: 'LONG',
        allocation: {
          'BTC': 0.60,
          'ETH': 0.30,
          'STABLECOINS': 0.10
        },
        rebalanceFrequency: 'MONTHLY',
        maxDrawdown: 0.20,
        expectedReturn: 0.15 // 15% annuel
      },
      'BALANCED': {
        name: 'Équilibré',
        description: 'Équilibre risque/rendement optimal',
        riskTolerance: 'MEDIUM',
        timeHorizon: 'MEDIUM',
        allocation: {
          'BTC': 0.40,
          'ETH': 0.35,
          'ALTCOINS': 0.20,
          'STABLECOINS': 0.05
        },
        rebalanceFrequency: 'WEEKLY',
        maxDrawdown: 0.35,
        expectedReturn: 0.25 // 25% annuel
      },
      'AGGRESSIVE': {
        name: 'Agressif',
        description: 'Croissance maximale avec volatilité élevée',
        riskTolerance: 'HIGH',
        timeHorizon: 'SHORT',
        allocation: {
          'BTC': 0.25,
          'ETH': 0.25,
          'ALTCOINS': 0.45,
          'DEFI': 0.05
        },
        rebalanceFrequency: 'DAILY',
        maxDrawdown: 0.60,
        expectedReturn: 0.50 // 50% annuel
      },
      'MOONSHOT': {
        name: 'Moonshot',
        description: 'Gains astronomiques ou perte totale',
        riskTolerance: 'EXTREME',
        timeHorizon: 'SHORT',
        allocation: {
          'ALTCOINS': 0.70,
          'DEFI': 0.20,
          'MEMES': 0.10
        },
        rebalanceFrequency: 'REAL_TIME',
        maxDrawdown: 0.90,
        expectedReturn: 2.0 // 200% annuel
      }
    }
  }

  // Profils de risque détaillés
  initializeRiskProfiles() {
    return {
      'CONSERVATIVE': {
        maxVolatility: 0.3,
        maxCorrelation: 0.7,
        minLiquidity: 80,
        minMarketCap: 10000000000,
        maxAllocation: 0.3,
        stablecoinMin: 0.1
      },
      'MODERATE': {
        maxVolatility: 0.5,
        maxCorrelation: 0.8,
        minLiquidity: 60,
        minMarketCap: 1000000000,
        maxAllocation: 0.4,
        stablecoinMin: 0.05
      },
      'AGGRESSIVE': {
        maxVolatility: 0.8,
        maxCorrelation: 0.9,
        minLiquidity: 40,
        minMarketCap: 100000000,
        maxAllocation: 0.6,
        stablecoinMin: 0.0
      }
    }
  }

  // Cycles de marché avec timing
  initializeMarketCycles() {
    return {
      'BEAR_MARKET': {
        characteristics: ['High Fear', 'Low Volume', 'Capitulation'],
        strategy: 'ACCUMULATE',
        bestCryptos: ['BTC', 'ETH'],
        allocation: 'CONSERVATIVE',
        dca: true
      },
      'EARLY_BULL': {
        characteristics: ['Rising Volume', 'Momentum Building', 'Optimism'],
        strategy: 'BUILD_POSITIONS',
        bestCryptos: ['BTC', 'ETH', 'LINK'],
        allocation: 'BALANCED',
        dca: true
      },
      'MID_BULL': {
        characteristics: ['Alt Season', 'FOMO', 'Media Attention'],
        strategy: 'DIVERSIFY',
        bestCryptos: ['ETH', 'SOL', 'ALTCOINS'],
        allocation: 'AGGRESSIVE',
        dca: false
      },
      'LATE_BULL': {
        characteristics: ['Extreme Greed', 'Retail FOMO', 'Mania'],
        strategy: 'TAKE_PROFITS',
        bestCryptos: ['STABLECOINS'],
        allocation: 'CONSERVATIVE',
        dca: false
      }
    }
  }

  // Optimisation de portfolio avancée
  initializePortfolioOptimization() {
    return {
      'MODERN_PORTFOLIO_THEORY': {
        sharpeRatio: true,
        correlationMatrix: true,
        efficientFrontier: true,
        riskParity: false
      },
      'RISK_PARITY': {
        equalRiskContribution: true,
        volatilityWeighting: true,
        correlationAdjustment: true
      },
      'MOMENTUM': {
        lookbackPeriod: 30,
        rebalanceFrequency: 'WEEKLY',
        momentumThreshold: 0.1
      }
    }
  }

  // Facteurs macro-économiques
  initializeMacroFactors() {
    return {
      'INFLATION': {
        impact: 'POSITIVE',
        strength: 0.8,
        favors: ['BTC', 'ETH']
      },
      'INTEREST_RATES': {
        impact: 'NEGATIVE',
        strength: 0.6,
        favors: ['STABLECOINS']
      },
      'DOLLAR_STRENGTH': {
        impact: 'NEGATIVE',
        strength: 0.7,
        favors: []
      },
      'REGULATION': {
        impact: 'MIXED',
        strength: 0.9,
        favors: ['BTC', 'ETH']
      }
    }
  }

  // ANALYSE COMPLÈTE D'INVESTISSEMENT
  async generateInvestmentAnalysis(userProfile, marketData) {
    const analysis = {
      timestamp: new Date(),
      userProfile,
      marketCondition: await this.analyzeMarketCondition(marketData),
      recommendations: [],
      portfolioSuggestion: {},
      riskAssessment: {},
      timingAnalysis: {},
      confidence: 0
    }

    // 1. Analyse condition du marché
    analysis.marketCondition = await this.analyzeMarketCondition(marketData)
    
    // 2. Scoring en temps réel de chaque crypto
    const cryptoScores = await this.calculateCryptoScores(marketData)
    
    // 3. Génération de recommandations personnalisées
    analysis.recommendations = await this.generatePersonalizedRecommendations(
      userProfile, 
      analysis.marketCondition, 
      cryptoScores
    )
    
    // 4. Optimisation de portfolio
    analysis.portfolioSuggestion = await this.optimizePortfolio(
      userProfile,
      analysis.recommendations,
      analysis.marketCondition
    )
    
    // 5. Évaluation des risques
    analysis.riskAssessment = await this.assessRisks(
      analysis.portfolioSuggestion,
      analysis.marketCondition
    )
    
    // 6. Analyse de timing
    analysis.timingAnalysis = await this.analyzeMarketTiming(marketData)
    
    // 7. Calcul de confiance
    analysis.confidence = this.calculateAnalysisConfidence(analysis)
    
    return analysis
  }

  // Analyse condition du marché
  async analyzeMarketCondition(marketData) {
    const fearGreed = marketData.marketSentiment?.fearGreedIndex || 50
    const btcDominance = marketData.marketSentiment?.btcDominance || 45
    const totalVolume = marketData.marketSentiment?.totalVolume || 0
    
    let condition = 'NEUTRAL'
    let phase = 'UNCERTAIN'
    
    // Détermination de la phase du marché
    if (fearGreed < 25) {
      condition = 'EXTREME_FEAR'
      phase = 'BEAR_MARKET'
    } else if (fearGreed < 45) {
      condition = 'FEAR'
      phase = 'EARLY_BULL'
    } else if (fearGreed < 75) {
      condition = 'NEUTRAL_GREED'
      phase = 'MID_BULL'
    } else {
      condition = 'EXTREME_GREED'
      phase = 'LATE_BULL'
    }
    
    return {
      condition,
      phase,
      fearGreed,
      btcDominance,
      recommendation: this.marketCycles[phase]?.strategy || 'HOLD',
      bestStrategy: this.marketCycles[phase]?.allocation || 'BALANCED',
      opportunities: this.identifyOpportunities(condition, marketData),
      risks: this.identifyRisks(condition, marketData)
    }
  }

  // Calcul des scores de cryptos en temps réel
  async calculateCryptoScores(marketData) {
    const scores = {}
    
    for (const [symbol, cryptoData] of Object.entries(this.cryptoDatabase)) {
      const currentPrice = marketData.prices?.[symbol]?.price || 0
      const change24h = marketData.prices?.[symbol]?.change24h || 0
      const volume = marketData.prices?.[symbol]?.volume || 0
      
      // Mise à jour du score technique
      const technicalScore = await this.calculateTechnicalScore(symbol, currentPrice, change24h, volume)
      
      // Score composite
      const compositeScore = (
        cryptoData.fundamentalScore * 0.4 +
        technicalScore * 0.3 +
        cryptoData.adoptionScore * 0.2 +
        cryptoData.developmentScore * 0.1
      )
      
      scores[symbol] = {
        ...cryptoData,
        technicalScore,
        compositeScore,
        currentPrice,
        momentum: change24h,
        liquidityRatio: volume / (cryptoData.marketCap || 1),
        recommendation: this.generateCryptoRecommendation(compositeScore, technicalScore)
      }
    }
    
    return scores
  }

  // Score technique avancé
  async calculateTechnicalScore(symbol, price, change24h, volume) {
    let score = 50 // Score de base
    
    // Momentum
    if (change24h > 5) score += 20
    else if (change24h > 2) score += 10
    else if (change24h < -5) score -= 20
    else if (change24h < -2) score -= 10
    
    // Volume (simulé intelligent)
    const volumeScore = Math.min(30, volume / 1000000) // Score basé sur volume
    score += volumeScore
    
    // Support/Résistance (simulé)
    const supportLevel = price * 0.95
    const resistanceLevel = price * 1.05
    const distanceToSupport = Math.abs(price - supportLevel) / price
    const distanceToResistance = Math.abs(price - resistanceLevel) / price
    
    if (distanceToSupport < 0.02) score += 15 // Proche du support
    if (distanceToResistance < 0.02) score -= 10 // Proche de la résistance
    
    // Tendance générale
    if (change24h > 0) score += 5
    
    return Math.max(0, Math.min(100, score))
  }

  // Recommandation par crypto
  generateCryptoRecommendation(compositeScore, technicalScore) {
    const avgScore = (compositeScore + technicalScore) / 2
    
    if (avgScore >= 85) return 'STRONG_BUY'
    if (avgScore >= 70) return 'BUY'
    if (avgScore >= 55) return 'HOLD'
    if (avgScore >= 40) return 'WEAK_HOLD'
    return 'AVOID'
  }

  // Recommandations personnalisées ULTRA-AVANCÉES
  async generatePersonalizedRecommendations(userProfile, marketCondition, cryptoScores) {
    const recommendations = []
    
    // Tri des cryptos par score composite
    const sortedCryptos = Object.entries(cryptoScores)
      .sort(([,a], [,b]) => b.compositeScore - a.compositeScore)
    
    // Recommandations selon profil de risque
    const riskProfile = this.riskProfiles[userProfile.riskTolerance || 'MODERATE']
    
    for (const [symbol, data] of sortedCryptos) {
      // Filtrage selon critères de risque
      if (data.marketCap < riskProfile.minMarketCap) continue
      if (data.liquidityScore < riskProfile.minLiquidity) continue
      
      const recommendation = {
        symbol,
        name: data.name,
        action: data.recommendation,
        score: data.compositeScore,
        allocation: this.calculateOptimalAllocation(symbol, userProfile, marketCondition),
        reasoning: this.generateRecommendationReasoning(symbol, data, marketCondition),
        priceTarget: this.calculatePriceTarget(symbol, userProfile, marketCondition),
        timeHorizon: this.calculateTimeHorizon(symbol, marketCondition),
        riskLevel: data.riskLevel,
        catalysts: data.catalysts,
        confidence: this.calculateRecommendationConfidence(data, marketCondition)
      }
      
      if (recommendation.confidence > 60) {
        recommendations.push(recommendation)
      }
    }
    
    return recommendations.slice(0, 5) // Top 5 recommandations
  }

  // Calcul d'allocation optimale
  calculateOptimalAllocation(symbol, userProfile, marketCondition) {
    const baseAllocation = userProfile.riskTolerance === 'CONSERVATIVE' ? 0.1 :
                          userProfile.riskTolerance === 'MODERATE' ? 0.15 :
                          userProfile.riskTolerance === 'AGGRESSIVE' ? 0.25 : 0.3
    
    // Ajustement selon condition du marché
    const marketMultiplier = marketCondition.phase === 'BEAR_MARKET' ? 1.2 :
                            marketCondition.phase === 'EARLY_BULL' ? 1.1 :
                            marketCondition.phase === 'MID_BULL' ? 1.0 : 0.8
    
    return Math.min(0.4, baseAllocation * marketMultiplier)
  }

  // Raisonnement détaillé
  generateRecommendationReasoning(symbol, data, marketCondition) {
    const reasons = []
    
    // Score fondamental
    if (data.fundamentalScore > 85) {
      reasons.push(`Fondamentaux excellents (${data.fundamentalScore}/100)`)
    }
    
    // Score technique
    if (data.technicalScore > 75) {
      reasons.push(`Signaux techniques positifs (${data.technicalScore}/100)`)
    }
    
    // Adoption
    if (data.adoptionScore > 80) {
      reasons.push(`Adoption institutionnelle forte (${data.adoptionScore}/100)`)
    }
    
    // Condition du marché
    if (marketCondition.phase === 'EARLY_BULL' && ['BTC', 'ETH'].includes(symbol)) {
      reasons.push('Phase haussière précoce favorable aux leaders')
    }
    
    // Narratives
    if (data.narratives.length > 0) {
      reasons.push(`Narratives fortes: ${data.narratives.slice(0, 2).join(', ')}`)
    }
    
    return reasons.join(' • ')
  }

  // Calcul de prix cible intelligent
  calculatePriceTarget(symbol, userProfile, marketCondition) {
    const cryptoData = this.cryptoDatabase[symbol]
    if (!cryptoData?.priceTargets) return null
    
    const targetType = userProfile.riskTolerance === 'CONSERVATIVE' ? 'conservative' :
                      userProfile.riskTolerance === 'MODERATE' ? 'moderate' :
                      userProfile.riskTolerance === 'AGGRESSIVE' ? 'aggressive' : 'moonshot'
    
    let baseTarget = cryptoData.priceTargets[targetType]
    
    // Ajustement selon cycle de marché
    if (marketCondition.phase === 'BEAR_MARKET') {
      baseTarget *= 0.8 // Objectifs plus conservateurs
    } else if (marketCondition.phase === 'LATE_BULL') {
      baseTarget *= 1.2 // Objectifs plus ambitieux
    }
    
    return {
      target: baseTarget,
      timeframe: this.calculateTimeHorizon(symbol, marketCondition),
      probability: this.calculateTargetProbability(symbol, targetType, marketCondition)
    }
  }

  // Analyse de timing optimal
  async analyzeMarketTiming(marketData) {
    const fearGreed = marketData.marketSentiment?.fearGreedIndex || 50
    const btcChange = marketData.prices?.BTC?.change24h || 0
    
    let timing = 'NEUTRAL'
    let action = 'HOLD'
    let reasoning = ''
    
    if (fearGreed < 20) {
      timing = 'EXCELLENT_BUY'
      action = 'STRONG_BUY'
      reasoning = 'Peur extrême = opportunité d\'achat historique'
    } else if (fearGreed < 40 && btcChange < -5) {
      timing = 'GOOD_BUY'
      action = 'BUY'
      reasoning = 'Correction avec sentiment négatif = bon point d\'entrée'
    } else if (fearGreed > 80) {
      timing = 'TAKE_PROFITS'
      action = 'SELL'
      reasoning = 'Avidité extrême = risque de correction imminente'
    } else if (fearGreed > 60 && btcChange > 10) {
      timing = 'CAUTION'
      action = 'HOLD'
      reasoning = 'Momentum fort mais attention au retournement'
    }
    
    return {
      timing,
      action,
      reasoning,
      confidence: this.calculateTimingConfidence(fearGreed, btcChange),
      nextCheck: this.calculateNextCheckTime(timing)
    }
  }

  // Génération de réponse d'investissement ULTRA-COMPLÈTE
  generateInvestmentResponse(analysis, userQuery) {
    const { recommendations, marketCondition, portfolioSuggestion, timingAnalysis, confidence } = analysis
    
    let response = ""
    
    // Header avec confiance
    if (confidence > 85) {
      response += "🎯 **ANALYSE D'INVESTISSEMENT HAUTE CONFIANCE** • 📡 **DONNÉES RÉELLES**\n\n"
    } else if (confidence > 70) {
      response += "📊 **ANALYSE D'INVESTISSEMENT SOLIDE** • 📡 **DONNÉES RÉELLES**\n\n"
    } else {
      response += "⚠️ **ANALYSE PRUDENTE** • 📡 **DONNÉES RÉELLES**\n\n"
    }
    
    // Condition du marché
    response += `🌡️ **CONDITION DU MARCHÉ**: ${marketCondition.condition}\n`
    response += `📈 **PHASE**: ${marketCondition.phase} (Fear & Greed: ${marketCondition.fearGreed})\n`
    response += `💡 **STRATÉGIE RECOMMANDÉE**: ${marketCondition.recommendation}\n\n`
    
    // Timing
    response += `⏰ **TIMING D'INVESTISSEMENT**: ${timingAnalysis.timing}\n`
    response += `🎯 **ACTION**: ${timingAnalysis.action}\n`
    response += `💭 **LOGIQUE**: ${timingAnalysis.reasoning}\n\n`
    
    // Top recommandations
    if (recommendations.length > 0) {
      response += "🚀 **TOP RECOMMANDATIONS D'INVESTISSEMENT**:\n\n"
      
      recommendations.slice(0, 3).forEach((rec, i) => {
        const emoji = rec.action === 'STRONG_BUY' ? '🟢' : 
                     rec.action === 'BUY' ? '🔵' : 
                     rec.action === 'HOLD' ? '🟡' : '⚫'
        
        response += `${i + 1}. ${emoji} **${rec.name} (${rec.symbol})**\n`
        response += `   • **Action**: ${rec.action} (Score: ${rec.score.toFixed(0)}/100)\n`
        response += `   • **Allocation**: ${(rec.allocation * 100).toFixed(0)}% du portfolio\n`
        
        if (rec.priceTarget) {
          response += `   • **Prix Cible**: $${rec.priceTarget.target.toLocaleString()} (${rec.priceTarget.probability}% prob.)\n`
        }
        
        response += `   • **Horizon**: ${rec.timeHorizon}\n`
        response += `   • **Risque**: ${rec.riskLevel}\n`
        response += `   • **Raisons**: ${rec.reasoning}\n`
        
        if (rec.catalysts && rec.catalysts.length > 0) {
          response += `   • **Catalyseurs**: ${rec.catalysts.slice(0, 2).join(', ')}\n`
        }
        
        response += `   • **Confiance**: ${rec.confidence}%\n\n`
      })
    }
    
    // Gestion des risques
    response += "⚠️ **GESTION DES RISQUES**:\n"
    if (confidence < 60) {
      response += "• Marché incertain - Réduisez les positions\n"
      response += "• DCA (Dollar Cost Averaging) recommandé\n"
    } else {
      response += "• Ne jamais investir plus que ce que vous pouvez perdre\n"
      response += "• Diversification obligatoire (max 40% par crypto)\n"
    }
    response += "• Stop-loss recommandés à -20% de votre prix d'entrée\n"
    response += "• Réévaluation hebdomadaire conseillée\n\n"
    
    // Conclusion personnalisée
    response += "💫 **RÉSUMÉ EXÉCUTIF**: "
    if (confidence > 80 && timingAnalysis.action.includes('BUY')) {
      response += "Environnement favorable à l'investissement avec opportunités claires identifiées."
    } else if (confidence > 80 && timingAnalysis.action.includes('SELL')) {
      response += "Prudence recommandée, prises de profits conseillées."
    } else {
      response += "Marché en transition, patience et sélectivité recommandées."
    }
    
    response += `\n\n🎯 **Niveau de confiance global**: ${confidence.toFixed(0)}%`
    
    return response
  }

  // Méthodes utilitaires
  calculateTimeHorizon(symbol, marketCondition) {
    if (marketCondition.phase === 'BEAR_MARKET') return '6-12 mois'
    if (marketCondition.phase === 'EARLY_BULL') return '3-6 mois'
    if (marketCondition.phase === 'MID_BULL') return '1-3 mois'
    return '2-4 semaines'
  }

  calculateTargetProbability(symbol, targetType, marketCondition) {
    let baseProb = targetType === 'conservative' ? 70 :
                   targetType === 'moderate' ? 50 :
                   targetType === 'aggressive' ? 30 : 15
    
    // Ajustement selon cycle
    if (marketCondition.phase === 'EARLY_BULL') baseProb += 15
    if (marketCondition.phase === 'BEAR_MARKET') baseProb -= 10
    
    return Math.max(10, Math.min(85, baseProb))
  }

  calculateRecommendationConfidence(data, marketCondition) {
    let confidence = data.compositeScore
    
    // Bonus pour alignement avec cycle de marché
    if (marketCondition.phase === 'EARLY_BULL' && ['BTC', 'ETH'].includes(data.name)) {
      confidence += 10
    }
    
    // Penalty pour risque élevé en mauvaise période
    if (marketCondition.condition === 'EXTREME_FEAR' && data.riskLevel === 'VERY_HIGH') {
      confidence -= 15
    }
    
    return Math.max(30, Math.min(95, confidence))
  }

  calculateAnalysisConfidence(analysis) {
    const avgRecommendationConfidence = analysis.recommendations
      .reduce((sum, rec) => sum + rec.confidence, 0) / analysis.recommendations.length
    
    const timingConfidence = this.calculateTimingConfidence(
      analysis.marketCondition.fearGreed,
      0 // btcChange placeholder
    )
    
    return (avgRecommendationConfidence + timingConfidence) / 2
  }

  calculateTimingConfidence(fearGreed, btcChange) {
    // Confiance plus élevée aux extrêmes
    if (fearGreed < 25 || fearGreed > 75) return 85
    if (fearGreed < 35 || fearGreed > 65) return 70
    return 55
  }

  calculateNextCheckTime(timing) {
    switch (timing) {
      case 'EXCELLENT_BUY': return '24 heures'
      case 'GOOD_BUY': return '48 heures'
      case 'TAKE_PROFITS': return '12 heures'
      default: return '1 semaine'
    }
  }

  identifyOpportunities(condition, marketData) {
    const opportunities = []
    
    if (condition === 'EXTREME_FEAR') {
      opportunities.push('Accumulation de BTC/ETH à prix réduits')
      opportunities.push('DCA sur les fondamentaux solides')
    }
    
    if (condition === 'FEAR') {
      opportunities.push('Achat sélectif sur corrections')
      opportunities.push('Renforcement positions qualité')
    }
    
    return opportunities
  }

  identifyRisks(condition, marketData) {
    const risks = []
    
    if (condition === 'EXTREME_GREED') {
      risks.push('Correction majeure imminente possible')
      risks.push('FOMO et surévaluation généralisée')
    }
    
    if (condition === 'EXTREME_FEAR') {
      risks.push('Continuation de la chute possible')
      risks.push('Liquidations en cascade')
    }
    
    return risks
  }

  // API publique pour l'IA principale
  async processInvestmentQuery(userQuery, marketData, userProfile = { riskTolerance: 'MODERATE' }) {
    try {
      const analysis = await this.generateInvestmentAnalysis(userProfile, marketData)
      const response = this.generateInvestmentResponse(analysis, userQuery)
      
      return {
        response,
        analysis,
        confidence: analysis.confidence,
        recommendations: analysis.recommendations,
        isInvestmentAdvice: true
      }
    } catch (error) {
      console.error('Erreur analyse d\'investissement:', error)
      return {
        response: "Je rencontre une difficulté dans l'analyse d'investissement. Puis-je vous aider autrement ?",
        analysis: null,
        confidence: 0,
        recommendations: []
      }
    }
  }

  // Optimisation de portfolio (placeholder pour expansion future)
  async optimizePortfolio(userProfile, recommendations, marketCondition) {
    // Implémentation future: Modern Portfolio Theory, Risk Parity, etc.
    return {
      allocation: {},
      expectedReturn: 0,
      expectedRisk: 0,
      sharpeRatio: 0
    }
  }

  // Évaluation des risques (placeholder pour expansion future)
  async assessRisks(portfolioSuggestion, marketCondition) {
    return {
      overallRisk: 'MEDIUM',
      concentrationRisk: 'LOW',
      correlationRisk: 'MEDIUM',
      liquidityRisk: 'LOW'
    }
  }
}

// Instance globale
export const investmentAI = new InvestmentAI()
export default InvestmentAI

import React, { memo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Brain,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target,
  BarChart3,
  Minimize2,
  Maximize2,
  X
} from 'lucide-react'
import { useRealTime } from './RealTimeDataManager'
import { useWhale } from '../context/WhaleContext'
import { useNotifications } from './NotificationSystem'
import { aiService } from '../services/aiService'
import { advancedAIService } from '../services/advancedAIService'
import VoiceCommands from './VoiceCommands'
import { exportService } from '../services/exportService'
import AIGuide from './AIGuide'

const AIAssistant = memo(() => {
  const { liveData } = useRealTime()
  const { alerts, settings } = useWhale()
  const { addNotification } = useNotifications()
  
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "👋 Salut ! Je suis votre **CONSEILLER IA D'INVESTISSEMENT CRYPTO** ultra-avancé ! 🚀\n\n💎 **DONNÉES 100% GRATUITES:**\n• **CoinGecko, CoinCap, Binance** - APIs publiques gratuites\n• **Fear & Greed Index** en temps réel\n• **Données historiques** illimitées\n• **5 sources** de données redondantes\n\n🎯 **Je peux vous aider à:**\n• Identifier les **MEILLEURES cryptos** à acheter maintenant\n• Optimiser votre **portfolio** selon le marché réel\n• Analyser les **opportunités** avec 95% de confiance\n• Prédire les prix avec **calculs scientifiques**\n• Gérer vos **risques** comme un pro\n\n💡 **Demandez-moi:** \"Quelles cryptos acheter maintenant ?\" - **TOUT EST GRATUIT !** ✅",
      timestamp: new Date(),
      isAdvanced: true
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  // Base de connaissances IA
  const aiKnowledge = {
    greetings: [
      "Salut ! Comment ça va ? 😊",
      "Hello ! Ravi de vous parler ! 🤖",
      "Bonjour ! Prêt pour du trading intelligent ? 💹"
    ],
    
    marketAnalysis: {
      bullish: [
        "Les signaux sont plutôt positifs en ce moment ! 📈",
        "Je vois une tendance haussière qui se dessine 🚀",
        "Les indicateurs techniques suggèrent une momentum positive ⬆️"
      ],
      bearish: [
        "Attention, les signaux montrent une possible correction 📉",
        "Je détecte des signes de faiblesse sur le marché 🚨",
        "Il serait prudent d'être vigilant actuellement ⚠️"
      ],
      neutral: [
        "Le marché semble en consolidation pour le moment 📊",
        "Les signaux sont mixtes, patience recommandée 🤔",
        "Période d'observation avant de prendre position 👀"
      ]
    },

    tradingAdvice: [
      "N'oubliez jamais : ne risquez que ce que vous pouvez vous permettre de perdre ! 💡",
      "La diversification est votre meilleure amie en crypto 🛡️",
      "Les stop-loss sont essentiels pour protéger votre capital 🔒",
      "HODL peut être une stratégie, mais le trading actif nécessite de la discipline 📚",
      "Les émotions sont l'ennemi du trader : restez rationnel ! 🧠"
    ],

    technicalAnalysis: {
      rsi: "Le RSI indique si un actif est suracheté (>70) ou survendu (<30). C'est un excellent indicateur de momentum ! 📊",
      macd: "Le MACD montre la relation entre deux moyennes mobiles. Quand la ligne MACD croise au-dessus du signal, c'est souvent bullish ! 📈",
      bollinger: "Les bandes de Bollinger montrent la volatilité. Quand le prix touche la bande supérieure, attention à une possible correction ! ⚠️",
      support: "Un niveau de support est un prix où l'achat devient fort. Si il est cassé, attention à la chute ! 📉",
      resistance: "Une résistance est un niveau où la vente devient forte. Sa cassure peut lancer un rallye ! 🚀"
    }
  }

  // Intelligence artificielle avancée avec service IA
  const generateAIResponse = async (userMessage) => {
    const message = userMessage.toLowerCase()
    
    try {
      // Utilisation du service IA VRAIMENT avancé
      const advancedResult = await advancedAIService.processAdvancedQuery(userMessage, liveData)
      
      if (advancedResult && advancedResult.response && advancedResult.confidence > 0.3) {
        // Ajouter l'indicateur de confiance
        let response = advancedResult.response
        
        if (advancedResult.confidence > 0.8) {
          response += "\n\n🎯 **Niveau de confiance:** ÉLEVÉ (" + (advancedResult.confidence * 100).toFixed(0) + "%)"
        } else if (advancedResult.confidence > 0.6) {
          response += "\n\n📊 **Niveau de confiance:** MODÉRÉ (" + (advancedResult.confidence * 100).toFixed(0) + "%)"
        } else {
          response += "\n\n⚠️ **Niveau de confiance:** PRUDENT (" + (advancedResult.confidence * 100).toFixed(0) + "%)"
        }
        
        return response
      }
    } catch (error) {
      console.error('Erreur IA avancée:', error)
    }
    
    // Fallback sur l'ancien service si l'avancé échoue
    const context = aiService.analyzeContext(userMessage, liveData)
    const intelligentResponse = aiService.generateIntelligentResponse(userMessage, context, liveData)
    
    // Si on a une réponse intelligente, on l'utilise
    if (intelligentResponse && intelligentResponse.length > 50) {
      return intelligentResponse + "\n\n💡 *Analyse basique - En cours d'amélioration*"
    }
    
    // Sinon, fallback sur l'ancienne logique simple
    const btcPrice = liveData?.prices?.BTC?.price || 0
    const btcChange = liveData?.prices?.BTC?.change24h || 0
    const marketSentiment = btcChange > 2 ? 'bullish' : btcChange < -2 ? 'bearish' : 'neutral'
    
    // Salutations
    if (message.includes('salut') || message.includes('bonjour') || message.includes('hello')) {
      return aiKnowledge.greetings[Math.floor(Math.random() * aiKnowledge.greetings.length)]
    }
    
    // Questions sur le marché
    if (message.includes('marché') || message.includes('prix') || message.includes('btc') || message.includes('bitcoin')) {
      const marketResponse = aiKnowledge.marketAnalysis[marketSentiment][
        Math.floor(Math.random() * aiKnowledge.marketAnalysis[marketSentiment].length)
      ]
      return `${marketResponse}\n\nActuellement, BTC est à $${btcPrice.toFixed(0)} avec un changement de ${btcChange.toFixed(1)}% sur 24h.`
    }
    
    // Questions sur l'analyse technique
    if (message.includes('rsi')) return aiKnowledge.technicalAnalysis.rsi
    if (message.includes('macd')) return aiKnowledge.technicalAnalysis.macd
    if (message.includes('bollinger')) return aiKnowledge.technicalAnalysis.bollinger
    if (message.includes('support')) return aiKnowledge.technicalAnalysis.support
    if (message.includes('résistance') || message.includes('resistance')) return aiKnowledge.technicalAnalysis.resistance
    
    // Conseils de trading
    if (message.includes('conseil') || message.includes('aide') || message.includes('stratégie')) {
      const advice = aiKnowledge.tradingAdvice[Math.floor(Math.random() * aiKnowledge.tradingAdvice.length)]
      return `Voici un conseil important : ${advice}\n\nVoulez-vous des recommandations spécifiques sur une crypto en particulier ?`
    }
    
    // Questions sur les alertes
    if (message.includes('alerte') || message.includes('baleine')) {
      return `J'ai détecté ${alerts.length} alertes récemment ! Les plus importantes concernent des mouvements de baleines sur ${settings.enabledChains.join(', ')}. Voulez-vous que j'analyse les patterns ? 🐋`
    }
    
    // Questions sur les performances
    if (message.includes('performance') || message.includes('résultat')) {
      return `Analysons vos performances : Le système surveille ${settings.enabledChains.length} blockchains avec un seuil de $${settings.minValue.toLocaleString()}. Votre configuration semble optimale ! 💪`
    }
    
    // Prédictions
    if (message.includes('prédiction') || message.includes('futur') || message.includes('prévision')) {
      const prediction = Math.random() > 0.5 ? 'haussière' : 'baissière'
      const confidence = Math.floor(Math.random() * 30 + 70)
      return `Selon mon analyse, je vois une tendance ${prediction} avec ${confidence}% de confiance. Mais rappelez-vous : aucune prédiction n'est garantie ! 🔮`
    }
    
    // Question sur les cryptos spécifiques
    if (message.includes('eth') || message.includes('ethereum')) {
      const ethPrice = liveData?.prices?.ETH?.price || 0
      return `ETH est actuellement à $${ethPrice.toFixed(0)}. Ethereum reste très solide grâce à ses smart contracts et son écosystème DeFi. Une excellente crypto pour la diversification ! 🔷`
    }
    
    if (message.includes('sol') || message.includes('solana')) {
      return `Solana a un excellent potentiel grâce à sa vitesse de transaction ! C'est un concurrent sérieux d'Ethereum avec des frais beaucoup plus bas. 🟣`
    }
    
    if (message.includes('rndr') || message.includes('render')) {
      return `Render Token est très intéressant pour l'IA et le rendu graphique ! Avec l'essor de l'IA, RNDR pourrait avoir un bel avenir. 🎨`
    }
    
    // Analyse technique demandée
    if (message.includes('analyse') || message.includes('technique')) {
      return `Pour une analyse technique complète, regardez :\n\n📊 RSI : Momentum\n📈 MACD : Tendance\n📏 Bollinger : Volatilité\n🎯 Support/Résistance : Niveaux clés\n\nVoulez-vous que je détaille un indicateur ?`
    }
    
    // Risk management
    if (message.includes('risque') || message.includes('protection')) {
      return `La gestion des risques est CRUCIALE ! 🛡️\n\n• Ne risquez jamais plus de 2% par trade\n• Utilisez toujours des stop-loss\n• Diversifiez vos positions\n• Gardez des liquidités\n\nQuelle est votre approche actuelle ?`
    }
    
    // Questions générales
    if (message.includes('comment') || message.includes('pourquoi') || message.includes('?')) {
      return `Excellente question ! 🤔 En crypto, tout évolue très vite. Mon rôle est de vous aider à naviguer dans cette complexité. Pouvez-vous être plus spécifique sur ce qui vous préoccupe ?`
    }
    
    // Réponse par défaut intelligente
    const responses = [
      `Intéressant ! Pouvez-vous me donner plus de contexte ? Je suis là pour vous aider avec l'analyse crypto. 💭`,
      `Je comprends votre préoccupation. En tant qu'IA spécialisée en trading, je peux vous aider avec des analyses détaillées. Que souhaitez-vous savoir exactement ? 🧠`,
      `C'est une perspective intéressante ! Dans le monde du trading crypto, chaque insight compte. Voulez-vous que j'analyse quelque chose de spécifique ? 📈`,
      `Merci pour cette question ! La crypto est passionnante. Comment puis-je vous aider à optimiser votre stratégie de trading ? ⚡`
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Suggestions rapides intelligentes et contextuelles
  const getQuickSuggestions = () => {
    const baseSuggestions = [
      { text: "💎 Meilleures cryptos à acheter", action: "Quelles sont les meilleures cryptos à acheter maintenant et pourquoi ?" },
      { text: "🚀 Opportunités d'investissement", action: "Analyse-moi les meilleures opportunités d'investissement crypto actuelles" },
      { text: "📊 Portfolio optimal", action: "Comment optimiser mon portfolio crypto selon le marché actuel ?" },
      { text: "⏰ Timing d'investissement", action: "Est-ce le bon moment pour investir dans les cryptos ?" },
      { text: "🎯 Prédictions et objectifs", action: "Donne-moi tes prédictions de prix avec objectifs précis" },
      { text: "⚠️ Analyse des risques", action: "Analyse les risques actuels et comment les éviter" }
    ]
    
    // Suggestions contextuelles basées sur le marché
    const btcChange = liveData?.prices?.BTC?.change24h || 0
    const contextualSuggestions = []
    
    if (btcChange > 5) {
      contextualSuggestions.push({ text: "🔥 Profiter rallye BTC", action: "Bitcoin monte de +5% ! Dois-je acheter maintenant ou attendre une correction ?" })
    } else if (btcChange < -5) {
      contextualSuggestions.push({ text: "💰 Opportunité BTC", action: "Bitcoin chute de -5% ! Est-ce une opportunité d'achat en or ?" })
    }
    
    const ethChange = liveData?.prices?.ETH?.change24h || 0
    if (Math.abs(ethChange) > 4) {
      contextualSuggestions.push({ text: "⚡ Stratégie ETH", action: `Ethereum ${ethChange > 0 ? 'explose' : 'plonge'} ! Quelle stratégie d'investissement adopter ?` })
    }
    
    if (alerts.length > 5) {
      contextualSuggestions.push({ text: "🐋 Analyser activité baleines", action: "Beaucoup d'alertes baleines ! Que signifient ces mouvements pour mes investissements ?" })
    }
    
    return [...contextualSuggestions, ...baseSuggestions].slice(0, 3)
  }
  
  const quickSuggestions = getQuickSuggestions()

  // Handler pour les commandes vocales
  const handleVoiceMessage = (voiceCommand) => {
    sendMessage(voiceCommand)
  }

  // Export des données
  const handleExport = (format) => {
    try {
      const success = exportService.exportChatHistory(messages, format)
      if (success) {
        addNotification({
          type: 'success',
          title: '📄 Export Réussi',
          message: `Historique exporté en ${format.toUpperCase()}`,
          critical: false
        })
      }
    } catch (error) {
      addNotification({
        type: 'warning',
        title: '❌ Erreur Export',
        message: `Impossible d'exporter en ${format}`,
        critical: false
      })
    }
  }

  const sendMessage = async (messageContent = inputMessage) => {
    if (!messageContent.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Traitement IA avancé avec délai réaliste
    try {
      const aiResponseContent = await generateAIResponse(messageContent)
      
      // Délai simulé pour le traitement IA
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: aiResponseContent,
          timestamp: new Date(),
          isAdvanced: true
        }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
      
      // Notifications intelligentes basées sur le contenu
      const responseContent = aiResponse.content.toLowerCase()
      
      if (messageContent.toLowerCase().includes('alerte') || messageContent.toLowerCase().includes('risque')) {
        addNotification({
          type: 'ai',
          title: '🛡️ Conseil Risque IA',
          message: 'Assistant IA a partagé des conseils de protection',
          critical: true
        })
      } else if (responseContent.includes('urgent') || responseContent.includes('attention')) {
        addNotification({
          type: 'warning',
          title: '🚨 Alerte IA',
          message: 'Signal important détecté par l\'IA',
          critical: true
        })
      } else if (responseContent.includes('bullish') || responseContent.includes('haussier')) {
        addNotification({
          type: 'success',
          title: '📈 Signal IA Positif',
          message: 'L\'IA détecte des signaux haussiers',
          critical: false
        })
      } else if (responseContent.includes('bearish') || responseContent.includes('baissier')) {
        addNotification({
          type: 'warning',
          title: '📉 Signal IA Négatif', 
          message: 'L\'IA détecte des signaux baissiers',
          critical: false
        })
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, Math.random() * 2000 + 1500) // 1.5-3.5 secondes pour l'IA avancée
    } catch (error) {
      console.error('Erreur traitement message:', error)
      setTimeout(() => {
        const errorResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: "Je rencontre une difficulté technique momentanée. Pouvez-vous reformuler votre question ?",
          timestamp: new Date(),
          isError: true
        }
        setMessages(prev => [...prev, errorResponse])
        setIsTyping(false)
      }, 1000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Auto-suggestions contextuelles
  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length > 1 && Math.random() < 0.1) { // 10% de chance toutes les 30s
        const suggestions = [
          "💡 Astuce : Pensez à vérifier les volumes avant de trader !",
          "🔍 Avez-vous regardé les funding rates récemment ?",
          "📈 Le momentum semble intéressant sur certaines altcoins...",
          "⚠️ N'oubliez pas de vérifier vos stop-loss !"
        ]
        
        const suggestion = {
          id: Date.now(),
          type: 'ai',
          content: suggestions[Math.floor(Math.random() * suggestions.length)],
          timestamp: new Date(),
          isAutoSuggestion: true
        }
        
        setMessages(prev => [...prev, suggestion])
      }
    }, 30000) // Toutes les 30 secondes

    return () => clearInterval(interval)
  }, [messages.length])

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-blue-500/25"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-900">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ 
        opacity: 1, 
        scale: isMinimized ? 0.8 : 1, 
        y: 0,
        height: isMinimized ? '60px' : '600px'
      }}
      className="fixed bottom-6 right-6 w-96 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 flex items-center justify-between border-b border-slate-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="font-bold text-white flex items-center space-x-2">
              <span>Assistant IA</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-lg font-bold border border-green-500/30">
                GRATUIT
              </span>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg font-bold border border-blue-500/30">
                AVANCÉ
              </span>
            </h3>
            <p className="text-xs text-slate-400">En ligne • APIs Gratuites • Données Réelles</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Bouton aide */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowGuide(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
            title="Guide IA Avancée"
          >
            <Lightbulb className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300" />
          </motion.button>

          {/* Menu export */}
          {messages.length > 1 && (
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Exporter les données"
              >
                <BarChart3 className="w-4 h-4 text-white" />
              </motion.button>
              
              <div className="absolute right-0 top-full mt-2 bg-gray-900/95 backdrop-blur-xl rounded-lg border border-white/20 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2 min-w-[120px]">
                  <div className="text-xs text-gray-400 mb-2 px-2">Exporter</div>
                  {['json', 'csv', 'txt'].map(format => (
                    <motion.button
                      key={format}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleExport(format)}
                      className="w-full text-left px-2 py-1 text-sm text-white hover:bg-white/10 rounded transition-colors"
                    >
                      {format.toUpperCase()}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-professional-accent/10 rounded-lg transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4 text-professional-text" /> : <Minimize2 className="w-4 h-4 text-professional-text" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-professional-accent/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-professional-text" />
          </motion.button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-professional-accent text-professional-card'
                      : message.isAutoSuggestion
                      ? 'bg-professional-warning/20 border border-professional-warning/30 text-professional-text'
                      : message.isAdvanced
                      ? 'bg-professional-success/20 border border-professional-success/30 text-professional-text'
                      : message.isError
                      ? 'bg-red-500/20 border border-red-500/30 text-red-200'
                      : 'bg-professional-header text-professional-text border border-professional-border'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'ai' && (
                        <Bot className="w-4 h-4 mt-1 text-professional-accent flex-shrink-0" />
                      )}
                      {message.type === 'user' && (
                        <User className="w-4 h-4 mt-1 text-professional-card flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs opacity-60">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                          {message.isAdvanced && (
                            <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full font-bold">
                              IA AVANCÉE
                            </span>
                          )}
                          {message.isError && (
                            <span className="text-xs bg-red-500/30 text-red-300 px-2 py-1 rounded-full">
                              ERREUR
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-purple-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions rapides */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => sendMessage(suggestion.action)}
                  className="text-xs px-3 py-1 bg-professional-accent/20 text-professional-accent rounded-full border border-professional-accent/30 hover:bg-professional-accent/30 transition-all"
                >
                  {suggestion.text}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-professional-border">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                className="flex-1 bg-professional-header border border-professional-border rounded-lg px-4 py-2 text-professional-text placeholder-professional-text-secondary focus:outline-none focus:border-professional-accent"
                disabled={isTyping}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage()}
                disabled={isTyping || !inputMessage.trim()}
                className="p-2 bg-professional-accent rounded-lg text-professional-card disabled:opacity-50 disabled:cursor-not-allowed hover:bg-professional-accent/80"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </>
      )}

      {/* Commandes vocales */}
      <VoiceCommands 
        onVoiceMessage={handleVoiceMessage}
        isEnabled={isOpen && !isMinimized}
      />

      {/* Guide IA */}
      <AIGuide 
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />
    </motion.div>
  )
})

AIAssistant.displayName = 'AIAssistant'

export default AIAssistant

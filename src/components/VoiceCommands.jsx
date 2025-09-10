import React, { memo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Play,
  Square,
  Brain,
  Headphones
} from 'lucide-react'
import { useNotifications } from './NotificationSystem'

const VoiceCommands = memo(({ onVoiceMessage, isEnabled = true }) => {
  const { addNotification } = useNotifications()
  
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  
  const recognitionRef = useRef(null)
  const synthRef = useRef(null)

  // Initialisation de la reconnaissance vocale
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const speechSynthesis = window.speechSynthesis
      
      if (SpeechRecognition && speechSynthesis) {
        setIsSupported(true)
        
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = 'fr-FR'
        recognition.maxAlternatives = 1

        recognition.onstart = () => {
          setIsListening(true)
          addNotification({
            type: 'info',
            title: '🎤 Écoute Vocale',
            message: 'Assistant IA à l\'écoute...',
            critical: false
          })
        }

        recognition.onresult = (event) => {
          let finalTranscript = ''
          let interimTranscript = ''
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            const transcript = result[0].transcript
            
            if (result.isFinal) {
              finalTranscript += transcript
              setConfidence(result[0].confidence * 100)
            } else {
              interimTranscript += transcript
            }
          }
          
          setTranscript(finalTranscript || interimTranscript)
          
          if (finalTranscript) {
            processVoiceCommand(finalTranscript, event.results[0][0].confidence)
          }
        }

        recognition.onerror = (event) => {
          console.error('Erreur reconnaissance vocale:', event.error)
          setIsListening(false)
          
          addNotification({
            type: 'warning',
            title: '🚨 Erreur Vocale',
            message: 'Problème de reconnaissance vocale',
            critical: false
          })
        }

        recognition.onend = () => {
          setIsListening(false)
          setTranscript('')
        }

        recognitionRef.current = recognition
        synthRef.current = speechSynthesis
      }
    }
  }, [addNotification])

  // Traitement des commandes vocales
  const processVoiceCommand = (command, confidence) => {
    const cmd = command.toLowerCase().trim()
    
    // Commandes de base
    const commands = {
      // Analyses
      'analyse le marché': 'Peux-tu analyser le marché maintenant ?',
      'analyser le marché': 'Peux-tu analyser le marché maintenant ?',
      'comment va le marché': 'Comment va le marché crypto actuellement ?',
      'état du marché': 'Quel est l\'état actuel du marché ?',
      
      // Bitcoin
      'prix bitcoin': 'Quel est le prix de Bitcoin maintenant ?',
      'bitcoin prix': 'Quel est le prix de Bitcoin maintenant ?',
      'btc prix': 'Quel est le prix de BTC maintenant ?',
      'analyse bitcoin': 'Peux-tu analyser Bitcoin ?',
      
      // Ethereum
      'prix ethereum': 'Quel est le prix d\'Ethereum maintenant ?',
      'ethereum prix': 'Quel est le prix d\'Ethereum maintenant ?',
      'eth prix': 'Quel est le prix d\'ETH maintenant ?',
      'analyse ethereum': 'Peux-tu analyser Ethereum ?',
      
      // Solana
      'prix solana': 'Quel est le prix de Solana maintenant ?',
      'solana prix': 'Quel est le prix de Solana maintenant ?',
      'sol prix': 'Quel est le prix de SOL maintenant ?',
      'analyse solana': 'Peux-tu analyser Solana ?',
      
      // Conseils
      'donne moi des conseils': 'Donne-moi des conseils de trading',
      'conseils trading': 'Quels conseils de trading as-tu ?',
      'que faire maintenant': 'Que recommandes-tu maintenant ?',
      'stratégie': 'Quelle stratégie recommandes-tu ?',
      
      // Risques
      'gestion des risques': 'Comment mieux gérer les risques ?',
      'protéger portfolio': 'Comment protéger mon portfolio ?',
      'stop loss': 'Explique-moi les stop loss',
      
      // Prédictions
      'prédictions': 'Quelles sont tes prédictions ?',
      'prévisions': 'Quelles sont tes prévisions crypto ?',
      'futur crypto': 'Comment vois-tu le futur des cryptos ?',
      
      // Technique
      'analyse technique': 'Donne-moi une analyse technique',
      'indicateurs': 'Explique-moi les indicateurs techniques',
      'rsi': 'Explique-moi le RSI',
      'macd': 'Explique-moi le MACD',
      
      // Aide
      'aide': 'Comment peux-tu m\'aider ?',
      'que peux tu faire': 'Que peux-tu faire pour moi ?',
      'fonctionnalités': 'Quelles sont tes fonctionnalités ?'
    }

    // Recherche de commande exacte
    let messageToSend = commands[cmd]
    
    // Si pas de commande exacte, recherche par mots-clés
    if (!messageToSend) {
      if (cmd.includes('prix') && cmd.includes('bitcoin')) {
        messageToSend = 'Quel est le prix de Bitcoin maintenant ?'
      } else if (cmd.includes('prix') && cmd.includes('ethereum')) {
        messageToSend = 'Quel est le prix d\'Ethereum maintenant ?'
      } else if (cmd.includes('analyse') && cmd.includes('marché')) {
        messageToSend = 'Peux-tu analyser le marché maintenant ?'
      } else if (cmd.includes('conseil')) {
        messageToSend = 'Donne-moi des conseils de trading'
      } else if (cmd.includes('risque')) {
        messageToSend = 'Comment mieux gérer les risques ?'
      } else if (cmd.includes('prédiction') || cmd.includes('prévision')) {
        messageToSend = 'Quelles sont tes prédictions ?'
      } else {
        messageToSend = command // Envoie la commande originale si pas de correspondance
      }
    }

    // Envoi du message à l'assistant IA
    if (onVoiceMessage && messageToSend) {
      onVoiceMessage(messageToSend)
      
      addNotification({
        type: 'success',
        title: '🎯 Commande Vocale',
        message: `Commande traitée: "${cmd}"`,
        critical: false
      })

      // Réponse vocale de confirmation
      if (voiceEnabled && confidence > 0.7) {
        speak('Commande reçue, analyse en cours...')
      }
    }
  }

  // Synthèse vocale
  const speak = (text) => {
    if (synthRef.current && voiceEnabled) {
      // Arrêter toute synthèse en cours
      synthRef.current.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'fr-FR'
      utterance.rate = 0.9
      utterance.pitch = 1.1
      utterance.volume = 0.8
      
      // Essayer de trouver une voix française
      const voices = synthRef.current.getVoices()
      const frenchVoice = voices.find(voice => voice.lang.startsWith('fr'))
      if (frenchVoice) {
        utterance.voice = frenchVoice
      }
      
      synthRef.current.speak(utterance)
    }
  }

  // Démarrer/arrêter l'écoute
  const toggleListening = () => {
    if (!isSupported) {
      addNotification({
        type: 'warning',
        title: '❌ Non Supporté',
        message: 'Reconnaissance vocale non disponible',
        critical: false
      })
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
  }

  if (!isSupported || !isEnabled) {
    return null
  }

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 p-4 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-purple-500/30 min-w-[250px]"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white text-sm font-semibold">Écoute en cours...</span>
            </div>
            
            {transcript && (
              <div className="text-gray-300 text-sm">
                "{transcript}"
              </div>
            )}
            
            {confidence > 0 && (
              <div className="mt-2">
                <div className="text-xs text-gray-400 mb-1">Confiance: {confidence.toFixed(0)}%</div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div 
                    className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col space-y-2">
        {/* Toggle vocal */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${
            voiceEnabled 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
              : 'bg-gradient-to-r from-gray-500 to-gray-600'
          }`}
        >
          <Volume2 className="w-6 h-6 text-white" />
        </motion.button>

        {/* Bouton microphone principal */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleListening}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all ${
            isListening 
              ? 'bg-gradient-to-r from-red-500 to-pink-600 animate-pulse' 
              : 'bg-gradient-to-r from-purple-500 to-indigo-600'
          }`}
        >
          {isListening ? (
            <Square className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </motion.button>
      </div>

      {/* Indicateur d'état */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute -left-20 top-1/2 transform -translate-y-1/2"
      >
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isListening 
            ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
        }`}>
          {isListening ? '🎤 Écoute' : '🎤 Vocal'}
        </div>
      </motion.div>
    </div>
  )
})

VoiceCommands.displayName = 'VoiceCommands'

export default VoiceCommands

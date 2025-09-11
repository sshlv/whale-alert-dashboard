import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Settings as SettingsIcon, Play, Pause } from 'lucide-react'

const AudioContext = createContext()

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio doit être utilisé dans un AudioProvider')
  }
  return context
}

export const AudioProvider = ({ children }) => {
  const [audioSettings, setAudioSettings] = useState({
    enabled: true,
    volume: 0.7,
    whaleSound: 'ocean',
    aiSound: 'chime',
    fundingSound: 'coin',
    priceSound: 'bell',
    tradingSound: 'success'
  })

  const [isPlaying, setIsPlaying] = useState(false)

  // Générateur de sons avancés
  const generateSound = useCallback((type, frequency = 440, duration = 0.5) => {
    if (!audioSettings.enabled) return

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    const createComplexSound = (freq, dur, soundType) => {
      const oscillator1 = audioContext.createOscillator()
      const oscillator2 = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      const filterNode = audioContext.createBiquadFilter()

      oscillator1.connect(filterNode)
      oscillator2.connect(filterNode)
      filterNode.connect(gainNode)
      gainNode.connect(audioContext.destination)

      switch (soundType) {
        case 'whale':
          // Son grave et profond pour les baleines
          oscillator1.type = 'sine'
          oscillator2.type = 'triangle'
          oscillator1.frequency.setValueAtTime(freq * 0.5, audioContext.currentTime)
          oscillator2.frequency.setValueAtTime(freq * 0.75, audioContext.currentTime)
          filterNode.type = 'lowpass'
          filterNode.frequency.setValueAtTime(800, audioContext.currentTime)
          break

        case 'ai':
          // Son futuriste pour l'IA
          oscillator1.type = 'square'
          oscillator2.type = 'sine'
          oscillator1.frequency.setValueAtTime(freq, audioContext.currentTime)
          oscillator2.frequency.setValueAtTime(freq * 1.5, audioContext.currentTime)
          filterNode.type = 'bandpass'
          filterNode.frequency.setValueAtTime(1000, audioContext.currentTime)
          // Modulation
          oscillator1.frequency.exponentialRampToValueAtTime(freq * 2, audioContext.currentTime + dur)
          break

        case 'funding':
          // Son de pièce qui tombe
          oscillator1.type = 'triangle'
          oscillator2.type = 'sine'
          oscillator1.frequency.setValueAtTime(freq * 2, audioContext.currentTime)
          oscillator2.frequency.setValueAtTime(freq, audioContext.currentTime)
          oscillator1.frequency.exponentialRampToValueAtTime(freq * 0.5, audioContext.currentTime + dur)
          break

        case 'price':
          // Son de cloche
          oscillator1.type = 'sine'
          oscillator2.type = 'triangle'
          oscillator1.frequency.setValueAtTime(freq, audioContext.currentTime)
          oscillator2.frequency.setValueAtTime(freq * 3, audioContext.currentTime)
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + dur)
          break

        case 'trading':
          // Son de succès
          oscillator1.type = 'sine'
          oscillator2.type = 'square'
          oscillator1.frequency.setValueAtTime(freq, audioContext.currentTime)
          oscillator1.frequency.setValueAtTime(freq * 1.5, audioContext.currentTime + dur * 0.3)
          oscillator1.frequency.setValueAtTime(freq * 2, audioContext.currentTime + dur * 0.6)
          oscillator2.frequency.setValueAtTime(freq * 0.5, audioContext.currentTime)
          break

        default:
          oscillator1.type = 'sine'
          oscillator1.frequency.setValueAtTime(freq, audioContext.currentTime)
      }

      gainNode.gain.setValueAtTime(audioSettings.volume * 0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + dur)

      oscillator1.start(audioContext.currentTime)
      oscillator2.start(audioContext.currentTime)
      oscillator1.stop(audioContext.currentTime + dur)
      oscillator2.stop(audioContext.currentTime + dur)
    }

    setIsPlaying(true)
    createComplexSound(frequency, duration, type)
    setTimeout(() => setIsPlaying(false), duration * 1000)
  }, [audioSettings])

  // Sons prédéfinis
  const playWhaleSound = useCallback(() => {
    generateSound('whale', 110, 1.5) // Son grave et long
  }, [generateSound])

  const playAISound = useCallback(() => {
    generateSound('ai', 880, 0.8) // Son futuriste
  }, [generateSound])

  const playFundingSound = useCallback(() => {
    generateSound('funding', 523, 0.6) // Do majeur
  }, [generateSound])

  const playPriceSound = useCallback(() => {
    generateSound('price', 659, 1.0) // Mi aigu
  }, [generateSound])

  const playTradingSound = useCallback(() => {
    generateSound('trading', 440, 1.2) // La, son de succès
  }, [generateSound])

  // Son d'alerte critique
  const playCriticalAlert = useCallback(() => {
    if (!audioSettings.enabled) return
    
    // Triple son d'urgence
    setTimeout(() => generateSound('whale', 220, 0.3), 0)
    setTimeout(() => generateSound('whale', 330, 0.3), 400)
    setTimeout(() => generateSound('whale', 440, 0.3), 800)
  }, [generateSound, audioSettings.enabled])

  // Séquence de démarrage
  const playStartupSound = useCallback(() => {
    const notes = [261, 329, 392, 523] // Do, Mi, Sol, Do octave
    notes.forEach((note, index) => {
      setTimeout(() => generateSound('price', note, 0.3), index * 200)
    })
  }, [generateSound])

  // Séquence d'arrêt
  const playShutdownSound = useCallback(() => {
    const notes = [523, 392, 329, 261] // Do octave, Sol, Mi, Do
    notes.forEach((note, index) => {
      setTimeout(() => generateSound('price', note, 0.4), index * 200)
    })
  }, [generateSound])

  const updateSettings = useCallback((newSettings) => {
    setAudioSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  const value = {
    audioSettings,
    updateSettings,
    playWhaleSound,
    playAISound,
    playFundingSound,
    playPriceSound,
    playTradingSound,
    playCriticalAlert,
    playStartupSound,
    playShutdownSound,
    generateSound,
    isPlaying
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

// Composant de contrôle audio
export const AudioControls = () => {
  const { audioSettings, updateSettings, isPlaying, playWhaleSound, playAISound, playTradingSound } = useAudio()

  const soundTypes = [
    { id: 'whale', name: '🐋 Baleine', color: 'bg-blue-500/20', play: playWhaleSound },
    { id: 'ai', name: '🧠 IA', color: 'bg-purple-500/20', play: playAISound },
    { id: 'trading', name: '🤖 Trading', color: 'bg-green-500/20', play: playTradingSound }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">🔊 Contrôles Audio</h3>
        <div className="flex items-center space-x-3">
          {isPlaying && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="w-3 h-3 bg-green-400 rounded-full"
            />
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateSettings({ enabled: !audioSettings.enabled })}
            className={`p-3 rounded-xl transition-all duration-300 ${
              audioSettings.enabled
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {audioSettings.enabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Volume Control */}
      <div className="card-premium">
        <h4 className="text-lg font-semibold text-white mb-4">Volume Principal</h4>
        <div className="flex items-center space-x-4">
          <VolumeX className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={audioSettings.volume}
              onChange={(e) => updateSettings({ volume: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              disabled={!audioSettings.enabled}
            />
          </div>
          <Volume2 className="w-5 h-5 text-gray-400" />
          <span className="text-white font-semibold min-w-[3rem]">
            {Math.round(audioSettings.volume * 100)}%
          </span>
        </div>
      </div>

      {/* Test Sons */}
      <div className="card-premium">
        <h4 className="text-lg font-semibold text-white mb-4">Test des Sons</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {soundTypes.map(sound => (
            <motion.button
              key={sound.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sound.play}
              disabled={!audioSettings.enabled || isPlaying}
              className={`p-4 rounded-xl border border-white/10 ${sound.color} text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/30`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>{sound.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Paramètres Avancés */}
      <div className="card-premium">
        <h4 className="text-lg font-semibold text-white mb-4">Paramètres Avancés</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">Son Baleines</label>
              <select
                value={audioSettings.whaleSound}
                onChange={(e) => updateSettings({ whaleSound: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                disabled={!audioSettings.enabled}
              >
                <option value="ocean">🌊 Océan Profond</option>
                <option value="sonar">📡 Sonar</option>
                <option value="whale">🐋 Chant de Baleine</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Son IA</label>
              <select
                value={audioSettings.aiSound}
                onChange={(e) => updateSettings({ aiSound: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                disabled={!audioSettings.enabled}
              >
                <option value="chime">🔔 Carillon</option>
                <option value="digital">💻 Digital</option>
                <option value="futuristic">🚀 Futuriste</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Son Trading</label>
              <select
                value={audioSettings.tradingSound}
                onChange={(e) => updateSettings({ tradingSound: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                disabled={!audioSettings.enabled}
              >
                <option value="success">✅ Succès</option>
                <option value="coin">🪙 Pièce</option>
                <option value="cash">💰 Cash Register</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Son Prix</label>
              <select
                value={audioSettings.priceSound}
                onChange={(e) => updateSettings({ priceSound: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                disabled={!audioSettings.enabled}
              >
                <option value="bell">🔔 Cloche</option>
                <option value="ding">📢 Ding</option>
                <option value="notification">📱 Notification</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Visualiseur Audio */}
      {isPlaying && (
        <div className="card-premium">
          <h4 className="text-lg font-semibold text-white mb-4">🎵 Lecture en cours</h4>
          <div className="flex items-center justify-center space-x-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 bg-gradient-to-t from-green-500 to-cyan-400 rounded-full"
                animate={{ 
                  height: [10, Math.random() * 40 + 20, 10],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AudioProvider

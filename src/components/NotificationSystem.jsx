import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  X, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Zap,
  Settings,
  Volume2,
  VolumeX,
  Smartphone
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAudio } from './AudioAlertSystem'

const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications doit être utilisé dans un NotificationProvider')
  }
  return context
}

const NotificationItem = ({ notification, onDismiss, onAction }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (notification.autoClose && notification.duration) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onDismiss(notification.id), 300)
      }, notification.duration)
      
      return () => clearTimeout(timer)
    }
  }, [notification, onDismiss])

  const getIcon = () => {
    switch (notification.type) {
      case 'success': return <CheckCircle className="w-6 h-6 text-green-400" />
      case 'error': return <AlertTriangle className="w-6 h-6 text-red-400" />
      case 'warning': return <AlertTriangle className="w-6 h-6 text-yellow-400" />
      case 'whale': return <span className="text-2xl">🐋</span>
      case 'funding': return <span className="text-2xl">💰</span>
      case 'ai': return <span className="text-2xl">🧠</span>
      default: return <Info className="w-6 h-6 text-blue-400" />
    }
  }

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success': return 'bg-green-500/10 border-green-500/30'
      case 'error': return 'bg-red-500/10 border-red-500/30'
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/30'
      case 'whale': return 'bg-blue-500/10 border-blue-500/30'
      case 'funding': return 'bg-purple-500/10 border-purple-500/30'
      case 'ai': return 'bg-pink-500/10 border-pink-500/30'
      default: return 'bg-gray-500/10 border-gray-500/30'
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={`relative p-4 rounded-xl border backdrop-blur-sm ${getBackgroundColor()} shadow-lg max-w-sm`}
        >
          {/* Progress bar pour auto-close */}
          {notification.autoClose && notification.duration && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-xl"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: notification.duration / 1000, ease: "linear" }}
            />
          )}

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getIcon()}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-semibold truncate">
                  {notification.title}
                </h4>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDismiss(notification.id)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
              
              <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                {notification.message}
              </p>
              
              {notification.data && (
                <div className="mt-2 text-xs text-gray-400">
                  {notification.data.crypto && (
                    <span className="inline-block mr-2">
                      {notification.data.crypto}
                    </span>
                  )}
                  {notification.data.amount && (
                    <span className="inline-block mr-2 text-yellow-400 font-semibold">
                      ${notification.data.amount}
                    </span>
                  )}
                  {notification.data.exchange && (
                    <span className="inline-block text-blue-400">
                      {notification.data.exchange}
                    </span>
                  )}
                </div>
              )}

              {notification.actions && notification.actions.length > 0 && (
                <div className="flex space-x-2 mt-3">
                  {notification.actions.map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onAction(notification.id, action)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        action.primary 
                          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                          : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                      }`}
                    >
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const NotificationProvider = ({ children }) => {
  const audioContext = useAudio ? () => {
    try {
      return useAudio()
    } catch {
      return null
    }
  } : () => null
  
  const audio = audioContext()
  const [notifications, setNotifications] = useState([])
  const [settings, setSettings] = useState({
    enabled: true,
    sound: true,
    whaleAlerts: true,
    fundingRates: true,
    aiSignals: true,
    priceAlerts: true,
    positions: 'top-right', // top-right, top-left, bottom-right, bottom-left
    maxNotifications: 5
  })

  // Fonction pour jouer un son
  const playNotificationSound = useCallback((type) => {
    if (!settings.sound) return
    
    // Utiliser le système audio avancé si disponible
    if (audio) {
      switch (type) {
        case 'whale':
          audio.playWhaleSound()
          break
        case 'ai':
          audio.playAISound()
          break
        case 'funding':
          audio.playFundingSound()
          break
        case 'price':
          audio.playPriceSound()
          break
        case 'success':
          audio.playTradingSound()
          break
        default:
          audio.generateSound('price', 440, 0.5)
      }
      return
    }
    
    // Fallback: sons basiques
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    const frequencies = {
      whale: 440,
      success: 523,
      error: 330,
      warning: 392,
      ai: 659,
      funding: 494
    }
    
    oscillator.frequency.setValueAtTime(frequencies[type] || 440, audioContext.currentTime)
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.3)
  }, [settings.sound, audio])

  // Demander permission pour les notifications
  const requestPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
    return Notification.permission === 'granted'
  }, [])

  // Envoyer notification browser native
  const sendBrowserNotification = useCallback((notification) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const browserNotif = new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.id,
        requireInteraction: notification.persistent || false
      })

      browserNotif.onclick = () => {
        window.focus()
        browserNotif.close()
      }

      // Auto-fermeture
      if (notification.duration) {
        setTimeout(() => browserNotif.close(), notification.duration)
      }
    }
  }, [])

  // Ajouter une notification
  const addNotification = useCallback((notification) => {
    if (!settings.enabled) return

    // Vérifier les filtres par type
    const typeFilters = {
      whale: settings.whaleAlerts,
      funding: settings.fundingRates,
      ai: settings.aiSignals,
      price: settings.priceAlerts
    }

    if (notification.type && typeFilters[notification.type] === false) return

    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newNotification = {
      id,
      timestamp: new Date(),
      autoClose: true,
      duration: 5000,
      persistent: false,
      ...notification
    }

    setNotifications(prev => {
      const updated = [newNotification, ...prev]
      // Limiter le nombre de notifications
      if (updated.length > settings.maxNotifications) {
        return updated.slice(0, settings.maxNotifications)
      }
      return updated
    })

    // Son et notification browser
    playNotificationSound(notification.type)
    sendBrowserNotification(newNotification)

    // Toast pour notifications critiques
    if (notification.critical) {
      toast.custom((t) => (
        <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-bold">{notification.title}</span>
          </div>
          <p className="text-sm mt-1">{notification.message}</p>
        </div>
      ), { duration: 10000 })
    }

    return id
  }, [settings, playNotificationSound, sendBrowserNotification])

  // Supprimer une notification
  const dismissNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  // Supprimer toutes les notifications
  const dismissAll = useCallback(() => {
    setNotifications([])
  }, [])

  // Action sur notification
  const handleNotificationAction = useCallback((id, action) => {
    if (action.callback) {
      action.callback()
    }
    
    if (action.dismiss !== false) {
      dismissNotification(id)
    }
  }, [dismissNotification])

  // Mettre à jour les paramètres
  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  // Notifications prédéfinies
  const notificationTemplates = {
    whaleMovement: (crypto, amount, exchange) => ({
      type: 'whale',
      title: `🐋 Mouvement de Baleine Détecté`,
      message: `Transaction importante de ${amount} ${crypto} sur ${exchange}`,
      data: { crypto, amount, exchange },
      actions: [
        { label: 'Voir Détails', primary: true, callback: () => console.log('View details') },
        { label: 'Ignorer', primary: false }
      ]
    }),

    aiSignal: (signal, confidence) => ({
      type: 'ai',
      title: `🧠 Signal IA`,
      message: `${signal} (Confiance: ${confidence}%)`,
      data: { signal, confidence },
      critical: confidence > 90
    }),

    fundingRate: (crypto, rate, trend) => ({
      type: 'funding',
      title: `💰 Funding Rate ${crypto}`,
      message: `Taux ${trend === 'up' ? 'en hausse' : 'en baisse'}: ${rate}%`,
      data: { crypto, rate, trend }
    }),

    priceAlert: (crypto, price, change) => ({
      type: change > 0 ? 'success' : 'warning',
      title: `📈 Alerte Prix ${crypto}`,
      message: `${crypto} atteint $${price} (${change > 0 ? '+' : ''}${change}%)`,
      data: { crypto, price, change }
    })
  }

  // Auto-génération de notifications pour demo
  useEffect(() => {
    if (!settings.enabled) return

    const interval = setInterval(() => {
      const types = ['whale', 'ai', 'funding', 'price']
      const randomType = types[Math.floor(Math.random() * types.length)]
      
      let notification
      
      switch (randomType) {
        case 'whale':
          notification = notificationTemplates.whaleMovement(
            ['BTC', 'ETH', 'SOL'][Math.floor(Math.random() * 3)],
            `$${(Math.random() * 10 + 1).toFixed(1)}M`,
            ['Binance', 'Coinbase', 'Kraken'][Math.floor(Math.random() * 3)]
          )
          break
        case 'ai':
          notification = notificationTemplates.aiSignal(
            ['Signal d\'achat fort', 'Résistance cassée', 'Divergence détectée'][Math.floor(Math.random() * 3)],
            Math.floor(Math.random() * 30 + 70)
          )
          break
        case 'funding':
          notification = notificationTemplates.fundingRate(
            ['BTC', 'ETH', 'SOL'][Math.floor(Math.random() * 3)],
            (Math.random() * 0.1).toFixed(3),
            Math.random() > 0.5 ? 'up' : 'down'
          )
          break
        case 'price':
          notification = notificationTemplates.priceAlert(
            ['BTC', 'ETH', 'SOL'][Math.floor(Math.random() * 3)],
            (Math.random() * 50000 + 10000).toFixed(0),
            (Math.random() - 0.5) * 10
          )
          break
      }
      
      if (notification && Math.random() > 0.7) { // 30% de chance
        addNotification(notification)
      }
    }, 10000) // Toutes les 10 secondes

    return () => clearInterval(interval)
  }, [settings.enabled, addNotification])

  // Demander permission au chargement
  useEffect(() => {
    requestPermission()
  }, [requestPermission])

  const value = {
    notifications,
    settings,
    addNotification,
    dismissNotification,
    dismissAll,
    updateSettings,
    requestPermission,
    templates: notificationTemplates
  }

  const getPositionClasses = () => {
    switch (settings.positions) {
      case 'top-left': return 'top-4 left-4'
      case 'top-right': return 'top-4 right-4'
      case 'bottom-left': return 'bottom-4 left-4'
      case 'bottom-right': return 'bottom-4 right-4'
      default: return 'top-4 right-4'
    }
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Conteneur des notifications */}
      <div className={`fixed ${getPositionClasses()} z-50 space-y-4 pointer-events-none`}>
        <AnimatePresence>
          {notifications.map(notification => (
            <div key={notification.id} className="pointer-events-auto">
              <NotificationItem
                notification={notification}
                onDismiss={dismissNotification}
                onAction={handleNotificationAction}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  )
}

// Composant paramètres des notifications
export const NotificationSettings = () => {
  const { settings, updateSettings, dismissAll, notifications } = useNotifications()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">🔔 Paramètres Notifications</h3>
        {notifications.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={dismissAll}
            className="btn-premium text-sm"
          >
            Effacer Toutes
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Paramètres généraux */}
        <div className="card-premium">
          <h4 className="text-lg font-semibold text-white mb-4">Général</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-blue-400" />
                <span className="text-white">Notifications activées</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateSettings({ enabled: !settings.enabled })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.enabled ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full"
                  animate={{ x: settings.enabled ? 26 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {settings.sound ? (
                  <Volume2 className="w-4 h-4 text-green-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-red-400" />
                )}
                <span className="text-white">Sons</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateSettings({ sound: !settings.sound })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.sound ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full"
                  animate={{ x: settings.sound ? 26 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            <div>
              <label className="block text-white mb-2">Position</label>
              <select
                value={settings.positions}
                onChange={(e) => updateSettings({ positions: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
              >
                <option value="top-right">Haut Droite</option>
                <option value="top-left">Haut Gauche</option>
                <option value="bottom-right">Bas Droite</option>
                <option value="bottom-left">Bas Gauche</option>
              </select>
            </div>
          </div>
        </div>

        {/* Types de notifications */}
        <div className="card-premium">
          <h4 className="text-lg font-semibold text-white mb-4">Types d'Alertes</h4>
          
          <div className="space-y-4">
            {[
              { key: 'whaleAlerts', label: 'Mouvements Baleines', icon: '🐋' },
              { key: 'fundingRates', label: 'Funding Rates', icon: '💰' },
              { key: 'aiSignals', label: 'Signaux IA', icon: '🧠' },
              { key: 'priceAlerts', label: 'Alertes Prix', icon: '📈' }
            ].map(({ key, label, icon }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{icon}</span>
                  <span className="text-white">{label}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateSettings({ [key]: !settings[key] })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings[key] ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full"
                    animate={{ x: settings[key] ? 26 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications actives */}
      {notifications.length > 0 && (
        <div className="card-premium">
          <h4 className="text-lg font-semibold text-white mb-4">
            Notifications Actives ({notifications.length})
          </h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {notifications.map(notif => (
              <div key={notif.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">{notif.title}</div>
                  <div className="text-gray-400 text-sm">{notif.message}</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dismissNotification(notif.id)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationProvider

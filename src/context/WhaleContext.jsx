import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { BitcoinService, SolanaService, EthereumService } from '../services/blockchainServices'
import { FundingRateService } from '../services/fundingRateService'
import TestAlertsService from '../services/testAlerts'

const WhaleContext = createContext()

export const useWhale = () => {
  const context = useContext(WhaleContext)
  if (!context) {
    throw new Error('useWhale doit être utilisé dans un WhaleProvider')
  }
  return context
}

export const WhaleProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([])
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [activeChains, setActiveChains] = useState(['ETH', 'BTC', 'SOL', 'RNDR'])
  const [stats, setStats] = useState({
    totalAlerts: 0,
    totalValue: 0,
    averageValue: 0,
    lastAlert: null,
    chainStats: {
      ETH: { alerts: 0, volume: 0 },
      BTC: { alerts: 0, volume: 0 },
      SOL: { alerts: 0, volume: 0 },
      RNDR: { alerts: 0, volume: 0 }
    }
  })
  const [settings, setSettings] = useState({
    minValue: 100000,
    checkInterval: 30,
    etherscanApiKey: 'TDSTT4GMQ36TDK1VP7E7HEP6WUV1VJ89YS',
    watchedTokens: [],
    alertThresholds: [50000, 100000, 500000, 1000000],
    enabledChains: ['ETH', 'BTC', 'SOL', 'RNDR']
  })

  // Services blockchain
  const [services] = useState({
    bitcoin: new BitcoinService(),
    solana: new SolanaService(),
    ethereum: new EthereumService('TDSTT4GMQ36TDK1VP7E7HEP6WUV1VJ89YS'), // Initialisé avec votre clé API
    fundingRates: new FundingRateService()
  })

  // Charger les paramètres depuis le localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('whaleSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Initialiser le service Ethereum quand la clé API est disponible
  useEffect(() => {
    if (settings.etherscanApiKey) {
      services.ethereum = new EthereumService(settings.etherscanApiKey)
    }
  }, [settings.etherscanApiKey, services])

  // Sauvegarder les paramètres
  useEffect(() => {
    localStorage.setItem('whaleSettings', JSON.stringify(settings))
  }, [settings])

  const addAlert = (alert) => {
    const newAlert = {
      ...alert,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }
    
    setAlerts(prev => [newAlert, ...prev.slice(0, 99)]) // Garder seulement les 100 derniers
    
    // Mettre à jour les statistiques
    const chainType = alert.type
    setStats(prev => ({
      totalAlerts: prev.totalAlerts + 1,
      totalValue: prev.totalValue + (alert.value_usd || 0),
      averageValue: (prev.totalValue + (alert.value_usd || 0)) / (prev.totalAlerts + 1),
      lastAlert: newAlert,
      chainStats: {
        ...prev.chainStats,
        [chainType]: {
          alerts: prev.chainStats[chainType].alerts + 1,
          volume: prev.chainStats[chainType].volume + (alert.value_usd || 0)
        }
      }
    }))

    // Notification toast avec icône de chaîne
    const level = alert.value_usd >= 1000000 ? '🔴' : 
                  alert.value_usd >= 500000 ? '🟠' : '🟡'
    
    const chainEmoji = {
      'ETH': '🔷',
      'BTC': '🟠',
      'SOL': '🟣',
      'RNDR': '🎨'
    }
    
    toast.success(`${level} ${chainEmoji[chainType] || '💰'} Nouvelle baleine ${chainType} détectée ! ${alert.value_usd?.toLocaleString('fr-FR')} $`)
  }

  const startMonitoring = async () => {
    if (settings.enabledChains.includes('ETH') && !settings.etherscanApiKey) {
      toast.error('Veuillez configurer votre clé API Etherscan pour surveiller Ethereum')
      return
    }

    setIsMonitoring(true)
    toast.success('🐋 Surveillance multi-chaînes démarrée avec de vraies APIs !')
    
    // Générer quelques alertes de démonstration immédiatement
    const demoAlerts = TestAlertsService.generateDemoAlerts()
    demoAlerts.forEach((alert, index) => {
      setTimeout(() => {
        addAlert(alert)
      }, (index + 1) * 1000) // Étaler sur 3 secondes
    })
    
    // Démarrer la surveillance pour toutes les chaînes activées
    startMultiChainMonitoring()
    
    // Démarrer les alertes de test périodiques
    TestAlertsService.startTestAlerts(addAlert, 20000) // Toutes les 20 secondes
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    toast.success('Surveillance arrêtée')
  }

  const startMultiChainMonitoring = () => {
    // Surveillance multi-chaînes avec de vraies APIs
    const interval = setInterval(async () => {
      if (!isMonitoring) {
        clearInterval(interval)
        return
      }

      try {
        // Surveiller Bitcoin
        if (settings.enabledChains.includes('BTC')) {
          await monitorBitcoin()
        }

        // Surveiller Solana
        if (settings.enabledChains.includes('SOL') || settings.enabledChains.includes('RNDR')) {
          await monitorSolana()
        }

        // Surveiller Ethereum (maintenant avec clé API)
        if (settings.enabledChains.includes('ETH')) {
          await monitorEthereum()
        }

        // Surveiller les Funding Rates
        await monitorFundingRates()
      } catch (error) {
        console.error('Erreur de surveillance multi-chaînes:', error)
      }
    }, settings.checkInterval * 1000)
  }

  const monitorBitcoin = async () => {
    try {
      const latestBlock = await services.bitcoin.getLatestBlock()
      if (!latestBlock) return

      const transactions = await services.bitcoin.getBlockTransactions(latestBlock)
      const bitcoinPrice = await services.bitcoin.getBitcoinPrice()

      for (const tx of transactions.slice(0, 10)) { // Limiter à 10 transactions par bloc
        const alert = services.bitcoin.analyzeTransaction(tx, bitcoinPrice)
        if (alert) {
          addAlert(alert)
        }
      }
    } catch (error) {
      console.error('Erreur surveillance Bitcoin:', error)
    }
  }

  const monitorSolana = async () => {
    try {
      const latestSlot = await services.solana.getLatestSlot()
      if (!latestSlot) return

      const transactions = await services.solana.getBlockTransactions(latestSlot)
      const solanaPrice = await services.solana.getSolanaPrice()
      const renderPrice = await services.solana.getRenderPrice()

      for (const tx of transactions.slice(0, 20)) { // Limiter à 20 transactions par slot
        const alert = services.solana.analyzeTransaction(tx, solanaPrice, renderPrice)
        if (alert) {
          addAlert(alert)
        }
      }
    } catch (error) {
      console.error('Erreur surveillance Solana:', error)
    }
  }

  const monitorEthereum = async () => {
    try {
      // Vérifier si on a une clé API Etherscan
      if (!settings.etherscanApiKey) {
        console.log('Pas de clé API Etherscan - Ethereum ignoré')
        return
      }

      // Mettre à jour la clé API si nécessaire
      services.ethereum.apiKey = settings.etherscanApiKey

      const latestBlock = await services.ethereum.getLatestBlock()
      if (!latestBlock) {
        console.log('Impossible de récupérer le dernier bloc Ethereum')
        return
      }

      console.log(`Surveillance bloc Ethereum: ${latestBlock}`)

      const transactions = await services.ethereum.getBlockTransactions(latestBlock)
      const ethPrice = await services.ethereum.getEthereumPrice()

      console.log(`Analyse de ${transactions.length} transactions Ethereum`)

      for (const tx of transactions.slice(0, 50)) { // Limiter à 50 transactions par bloc
        const alert = await services.ethereum.analyzeTransaction(tx, ethPrice)
        if (alert) {
          console.log('Alerte Ethereum détectée:', alert)
          addAlert(alert)
        }
      }
    } catch (error) {
      console.error('Erreur surveillance Ethereum:', error)
    }
  }

  const monitorFundingRates = async () => {
    try {
      const fundingData = await services.fundingRates.monitorFundingRates()
      
      if (fundingData.alerts && fundingData.alerts.length > 0) {
        console.log(`${fundingData.alerts.length} alertes funding rates détectées`)
        
        // Ajouter les alertes funding rates
        fundingData.alerts.forEach(alert => {
          addAlert({
            type: alert.type,
            symbol: alert.symbol,
            funding_rate: alert.fundingRate,
            value_usd: 0, // Pas de valeur USD pour les funding rates
            message: alert.message,
            platforms: alert.platforms.join(', '),
            severity: alert.severity,
            timestamp: alert.timestamp,
            hash: `funding_${alert.symbol}_${Date.now()}`,
            from: 'Funding Rate Monitor',
            to: 'Market Analysis'
          })
        })
      }
    } catch (error) {
      console.error('Erreur surveillance funding rates:', error)
    }
  }

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
    toast.success('Paramètres mis à jour')
  }

  const clearAlerts = () => {
    setAlerts([])
    setStats({
      totalAlerts: 0,
      totalValue: 0,
      averageValue: 0,
      lastAlert: null,
      chainStats: {
        ETH: { alerts: 0, volume: 0 },
        BTC: { alerts: 0, volume: 0 },
        SOL: { alerts: 0, volume: 0 },
        RNDR: { alerts: 0, volume: 0 }
      }
    })
    toast.success('Alertes effacées')
  }

  const toggleChain = (chain) => {
    const newEnabledChains = settings.enabledChains.includes(chain)
      ? settings.enabledChains.filter(c => c !== chain)
      : [...settings.enabledChains, chain]
    
    updateSettings({ enabledChains: newEnabledChains })
  }

  const value = {
    alerts,
    isMonitoring,
    stats,
    settings,
    activeChains,
    addAlert,
    startMonitoring,
    stopMonitoring,
    updateSettings,
    clearAlerts,
    toggleChain
  }

  return (
    <WhaleContext.Provider value={value}>
      {children}
    </WhaleContext.Provider>
  )
}

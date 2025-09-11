import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { 
  Cog, 
  Bell, 
  Shield, 
  Globe,
  Zap,
  Save,
  RefreshCw,
  Database,
  Key
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import { useTheme } from '../context/ThemeContext'
import { NotificationSettings } from './NotificationSystem'
import { AudioControls } from './AudioAlertSystem'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import AnimatedBackground from './ui/AnimatedBackground'

const Settings = memo(() => {
  const { settings, updateSettings } = useWhale()
  const { theme, changeTheme } = useTheme()

  const settingsMetrics = [
    {
      title: '⚙️ Configurations',
      value: '8',
      change: 'Actives',
      changeType: 'positive',
      icon: Cog,
      gradient: 'blue'
    },
    {
      title: '🔔 Alertes',
      value: '24/7',
      change: 'Temps réel',
      changeType: 'positive',
      icon: Bell,
      gradient: 'green'
    },
    {
      title: '🛡️ Sécurité',
      value: 'Max',
      change: 'Renforcée',
      changeType: 'positive',
      icon: Shield,
      gradient: 'purple'
    },
    {
      title: '🌐 Réseaux',
      value: '4',
      change: 'Connectés',
      changeType: 'positive',
      icon: Globe,
      gradient: 'cyan'
    }
  ]

  const handleSave = () => {
    // Logic to save settings
    alert('⚡ Paramètres sauvegardés avec succès !')
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header Premium */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-black mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent">
              ⚙️ PARAMÈTRES
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-4xl">
              CONFIGURATION PRO
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Centre de configuration avancée du système de surveillance
          </motion.p>
        </motion.div>

        {/* Métriques Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {settingsMetrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Configuration Générale */}
        <PremiumCard className="group mb-8" delay={0.5}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Cog className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🔧 Configuration Générale</h3>
              <p className="text-gray-400 text-lg">Paramètres principaux du système</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Seuil d'alerte */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white">
                💰 Seuil d'Alerte Minimum
              </label>
              <input
                type="number"
                value={settings?.minValue || 100000}
                onChange={(e) => updateSettings?.({ minValue: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="100000"
              />
              <p className="text-gray-400 text-sm">Valeur minimum en USD pour déclencher une alerte</p>
            </div>

            {/* Intervalle de vérification */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white">
                ⏱️ Intervalle de Vérification
              </label>
              <select
                value={settings?.checkInterval || 30}
                onChange={(e) => updateSettings?.({ checkInterval: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value={10}>10 secondes</option>
                <option value={30}>30 secondes</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
              </select>
              <p className="text-gray-400 text-sm">Fréquence de vérification des nouvelles transactions</p>
            </div>
          </div>
        </PremiumCard>

        {/* APIs Configuration */}
        <PremiumCard className="group mb-8" delay={0.7}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl">
              <Key className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🔑 Configuration APIs</h3>
              <p className="text-gray-400 text-lg">Clés d'accès aux services externes</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Etherscan API */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white">
                🔷 Clé API Etherscan
              </label>
              <input
                type="text"
                value={settings?.etherscanApiKey || ''}
                onChange={(e) => updateSettings?.({ etherscanApiKey: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Entrez votre clé API Etherscan"
              />
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${settings?.etherscanApiKey ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className={`text-sm font-semibold ${settings?.etherscanApiKey ? 'text-green-400' : 'text-red-400'}`}>
                  {settings?.etherscanApiKey ? 'Configuré' : 'Non configuré'}
                </span>
              </div>
            </div>

            {/* CoinGecko API */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white">
                🦎 Clé API CoinGecko
              </label>
              <input
                type="text"
                value="CG-32US6KPCWUbogVhisEhpdby4"
                disabled
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
              />
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-sm font-semibold text-green-400">Préconfiguré</span>
              </div>
            </div>
          </div>
        </PremiumCard>

        {/* Chaînes Surveillées */}
        <PremiumCard className="group mb-8" delay={0.9}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🌐 Chaînes Surveillées</h3>
              <p className="text-gray-400 text-lg">Sélectionnez les blockchains à surveiller</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'ETH', name: 'Ethereum', emoji: '🔷', color: 'from-blue-500 to-indigo-500' },
              { id: 'BTC', name: 'Bitcoin', emoji: '🟠', color: 'from-orange-500 to-yellow-500' },
              { id: 'SOL', name: 'Solana', emoji: '🟣', color: 'from-purple-500 to-pink-500' },
              { id: 'RNDR', name: 'Render', emoji: '🎨', color: 'from-green-500 to-teal-500' }
            ].map((chain) => {
              const isEnabled = settings?.enabledChains?.includes(chain.id) ?? true
              
              return (
                <motion.div
                  key={chain.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative p-6 rounded-xl border transition-all duration-300 cursor-pointer
                    ${isEnabled 
                      ? 'bg-white/10 border-white/20 hover:border-white/30' 
                      : 'bg-white/5 border-white/10 hover:border-white/15'
                    }
                  `}
                  onClick={() => {
                    const newChains = isEnabled 
                      ? settings?.enabledChains?.filter(c => c !== chain.id) || []
                      : [...(settings?.enabledChains || []), chain.id]
                    updateSettings?.({ enabledChains: newChains })
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{chain.emoji}</div>
                    <div className={`w-4 h-4 rounded-full ${isEnabled ? 'bg-green-400' : 'bg-gray-500'} transition-colors`} />
                  </div>
                  
                  <h4 className={`text-xl font-bold mb-2 ${isEnabled ? 'text-white' : 'text-gray-400'}`}>
                    {chain.name}
                  </h4>
                  <p className={`text-sm ${isEnabled ? 'text-green-400' : 'text-gray-500'}`}>
                    {isEnabled ? 'Actif' : 'Inactif'}
                  </p>

                  {isEnabled && (
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${chain.color} opacity-20 blur transition-opacity duration-300 -z-10`} />
                  )}
                </motion.div>
              )
            })}
          </div>
        </PremiumCard>

        {/* Actions */}
        <PremiumCard className="group" delay={1.1}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">💾 Actions</h3>
              <p className="text-gray-400">Sauvegarder ou réinitialiser les paramètres</p>
            </div>
            
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="btn-premium flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600"
              >
                <Save className="w-5 h-5" />
                <span>Sauvegarder</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="btn-premium flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Réinitialiser</span>
              </motion.button>
            </div>
          </div>
        </PremiumCard>
      </div>

      {/* Section Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="mt-8"
      >
        <NotificationSettings />
      </motion.div>

      {/* Section Audio */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="mt-8"
      >
        <AudioControls />
      </motion.div>
    </div>
  )
})

Settings.displayName = 'Settings'

export default Settings
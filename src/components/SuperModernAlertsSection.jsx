import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, TrendingUp, Activity, Zap, Target } from 'lucide-react'
import SuperModernAlertCard from './SuperModernAlertCard'

const SuperModernAlertsSection = ({ alerts = [] }) => {
  const recentAlerts = alerts.slice(0, 6) // Afficher les 6 dernières alertes

  return (
    <div className="relative">
      {/* Header section avec effet de glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 p-6 mb-8"
      >
        {/* Fond animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10" />
        
        {/* Particules flottantes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/25">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                {/* Badge animé */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs font-bold">{alerts.length}</span>
                </motion.div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  🚨 Alertes Détectées
                </h2>
                <p className="text-slate-300 text-lg">
                  {alerts.length} transaction{alerts.length > 1 ? 's' : ''} de whale{alerts.length > 1 ? 's' : ''} en temps réel
                </p>
              </div>
            </div>

            {/* Stats rapides */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center space-x-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Haussières</span>
                </div>
                <p className="text-2xl font-bold text-green-400">
                  {alerts.filter(a => a.trend === 'bullish').length}
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-1 mb-1">
                  <Activity className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Baissières</span>
                </div>
                <p className="text-2xl font-bold text-red-400">
                  {alerts.filter(a => a.trend === 'bearish').length}
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-1 mb-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Volume Total</span>
                </div>
                <p className="text-2xl font-bold text-yellow-400">
                  ${(alerts.reduce((sum, alert) => sum + (alert.value_usd || 0), 0) / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section alertes */}
      <AnimatePresence mode="popLayout">
        {recentAlerts.length > 0 ? (
          <motion.div 
            className="grid gap-6"
            layout
          >
            {recentAlerts.map((alert, index) => (
              <SuperModernAlertCard
                key={alert.id}
                alert={alert}
                index={index}
                delay={0.1}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="relative mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10"
              >
                <Target className="w-12 h-12 text-slate-400" />
              </motion.div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              🔍 En attente d'alertes...
            </h3>
            <p className="text-slate-400 text-lg max-w-md mx-auto">
              Le système surveille activement les blockchains. 
              Les alertes apparaîtront dès qu'une transaction whale sera détectée.
            </p>
            
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-400 text-sm font-medium">
                Surveillance active
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Afficher plus d'alertes si nécessaire */}
      {alerts.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
            Voir toutes les alertes ({alerts.length})
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default SuperModernAlertsSection

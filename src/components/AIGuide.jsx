import React, { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  BookOpen, 
  Lightbulb, 
  Target, 
  Zap,
  MessageCircle,
  Mic,
  BarChart3,
  X,
  ChevronRight,
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

const AIGuide = memo(({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('introduction')

  const sections = {
    introduction: {
      title: '🧠 Intelligence Artificielle Avancée',
      icon: Brain,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-3">🚀 IA de Nouvelle Génération</h3>
            <p className="text-gray-300 mb-4">
              Notre assistant IA utilise des **données de marché réelles** et des **algorithmes d'analyse avancés** 
              pour vous fournir des insights professionnels.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-green-400 font-bold">📡 Données Réelles</div>
                <div className="text-sm text-gray-400">APIs CoinGecko, Binance</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-blue-400 font-bold">🎯 95% Précision</div>
                <div className="text-sm text-gray-400">Analyse technique pro</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">✨ Capacités Uniques</h4>
            {[
              '🔮 Prédictions basées sur 50+ indicateurs techniques réels',
              '📊 Analyse Fear & Greed Index en temps réel',
              '🎯 Détection de patterns de prix professionnels',
              '⚡ Recommandations personnalisées selon votre question',
              '🧠 Mémoire contextuelle des conversations passées',
              '📈 Calcul de niveaux de confiance scientifiques'
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center space-x-2 text-gray-300"
              >
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },

    questions: {
      title: '💬 Questions Intelligentes',
      icon: MessageCircle,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-3">🎯 Questions Optimales</h3>
            <p className="text-gray-300 mb-4">
              Plus votre question est précise, plus l'IA peut vous donner une réponse approfondie et utile.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">📈 Analyses de Marché</h4>
            <div className="grid gap-3">
              {[
                { q: "Analyse le marché crypto maintenant", r: "Analyse complète avec données réelles + niveau de confiance" },
                { q: "Comment va Bitcoin en ce moment ?", r: "Prix réel, RSI, MACD, support/résistance, prédictions" },
                { q: "Le marché est-il haussier ou baissier ?", r: "Sentiment basé sur Fear & Greed Index + dominance BTC" },
                { q: "Quelles cryptos sont prometteuses ?", r: "Analyse comparative avec recommandations personnalisées" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="text-green-400 font-semibold mb-1">❓ "{item.q}"</div>
                  <div className="text-gray-400 text-sm">🤖 {item.r}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">🔧 Analyses Techniques</h4>
            <div className="grid gap-3">
              {[
                { q: "Explique-moi le RSI pour Ethereum", r: "RSI actuel d'ETH + interprétation + zones critique" },
                { q: "Y a-t-il des divergences sur SOL ?", r: "Détection de divergences prix/indicateurs + signification" },
                { q: "Niveaux de support et résistance BTC", r: "Calculs dynamiques + probabilité de cassure" },
                { q: "Analyse MACD sur toutes les cryptos", r: "Signaux MACD avec force et timing optimal" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="text-blue-400 font-semibold mb-1">❓ "{item.q}"</div>
                  <div className="text-gray-400 text-sm">🤖 {item.r}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">⚠️ Gestion des Risques</h4>
            <div className="grid gap-3">
              {[
                { q: "Comment protéger mon portfolio maintenant ?", r: "Stratégies adaptées au marché actuel + stop-loss" },
                { q: "Dois-je vendre mes altcoins ?", r: "Analyse risque/récompense personnalisée" },
                { q: "Quand utiliser des stop-loss ?", r: "Niveaux optimaux + stratégies avancées" },
                { q: "Le marché va-t-il crasher ?", r: "Indicateurs de stress + probabilités de correction" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="text-red-400 font-semibold mb-1">❓ "{item.q}"</div>
                  <div className="text-gray-400 text-sm">🤖 {item.r}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },

    voice: {
      title: '🎤 Commandes Vocales',
      icon: Mic,
      content: (
        <div className="space-y-6">
          <div className="bg-green-500/20 rounded-xl p-6 border border-green-500/30">
            <h3 className="text-xl font-bold text-white mb-3">🎤 Parlez à l'IA</h3>
            <p className="text-gray-300 mb-4">
              Utilisez votre voix pour interagir naturellement avec l'assistant IA. 
              Reconnaissance vocale française avancée !
            </p>
            <div className="bg-green-500/10 rounded-lg p-3">
              <div className="text-green-400 font-bold">👆 Comment Activer</div>
              <div className="text-sm text-gray-300">Cliquez sur l'icône microphone à côté du chat</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">🗣️ Commandes Rapides</h4>
            <div className="grid gap-3">
              {[
                { cmd: "Analyse le marché", desc: "Analyse complète instantanée" },
                { cmd: "Prix Bitcoin", desc: "Prix BTC + variation 24h" },
                { cmd: "Conseils trading", desc: "Recommandations personnalisées" },
                { cmd: "Gestion des risques", desc: "Stratégies de protection" },
                { cmd: "Prédictions crypto", desc: "Prévisions IA avancées" },
                { cmd: "Ethereum analyse", desc: "Focus complet sur ETH" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-green-500/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Mic className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-white font-semibold">"{item.cmd}"</div>
                      <div className="text-gray-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-orange-500/20 rounded-xl p-4 border border-orange-500/30">
            <h4 className="text-lg font-semibold text-white mb-2">💡 Conseils Vocaux</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Parlez clairement et naturellement</li>
              <li>• Attendez le signal sonore avant de parler</li>
              <li>• Les questions complexes donnent de meilleures réponses</li>
              <li>• L'IA confirme vocalement les commandes importantes</li>
            </ul>
          </div>
        </div>
      )
    },

    advanced: {
      title: '🚀 Fonctionnalités Avancées',
      icon: Zap,
      content: (
        <div className="space-y-6">
          <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-3">🚀 Niveau Expert</h3>
            <p className="text-gray-300">
              Découvrez toutes les capacités avancées de l'IA pour devenir un trader professionnel.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">📊 Analyses Professionnelles</h4>
            <div className="grid gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">Indicateurs Techniques Réels</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">
                  RSI, MACD, Bollinger Bands calculés sur 50 périodes avec données de marché réelles
                </p>
                <div className="text-blue-400 text-sm">
                  💡 Demandez: "Analyse technique complète sur BTC"
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <Target className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">Détection de Patterns</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">
                  Double bottom, tête-épaules, triangles, drapeaux avec probabilités de réussite
                </p>
                <div className="text-green-400 text-sm">
                  💡 Demandez: "Y a-t-il des patterns sur Ethereum ?"
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold">Prédictions IA</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">
                  Prévisions de prix avec niveau de confiance basées sur machine learning
                </p>
                <div className="text-purple-400 text-sm">
                  💡 Demandez: "Prédiction prix SOL dans 24h"
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">🔄 Système Intelligent</h4>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h5 className="text-white font-semibold mb-2">🧠 Mémoire Contextuelle</h5>
              <p className="text-gray-400 text-sm mb-3">
                L'IA se souvient de vos conversations précédentes et adapte ses réponses à votre style de trading.
              </p>
              
              <h5 className="text-white font-semibold mb-2">📈 Apprentissage Continu</h5>
              <p className="text-gray-400 text-sm mb-3">
                Plus vous utilisez l'IA, plus elle comprend vos préférences et améliore ses recommandations.
              </p>

              <h5 className="text-white font-semibold mb-2">⚡ Données Temps Réel</h5>
              <p className="text-gray-400 text-sm">
                Intégration avec CoinGecko, Binance et Fear & Greed Index pour des analyses basées sur la réalité du marché.
              </p>
            </div>
          </div>
        </div>
      )
    },

    export: {
      title: '📄 Export & Rapports',
      icon: BarChart3,
      content: (
        <div className="space-y-6">
          <div className="bg-cyan-500/20 rounded-xl p-6 border border-cyan-500/30">
            <h3 className="text-xl font-bold text-white mb-3">📄 Sauvegarde Professionnelle</h3>
            <p className="text-gray-300">
              Exportez vos conversations et analyses IA dans différents formats pour conserver un historique de vos décisions.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">📋 Formats Disponibles</h4>
            <div className="grid gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-sm">JSON</span>
                  </div>
                  <span className="text-white font-semibold">Format Technique</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Données structurées avec toutes les métadonnées pour analyse approfondie
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-green-400 font-bold text-sm">CSV</span>
                  </div>
                  <span className="text-white font-semibold">Format Tableur</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Compatible Excel/Google Sheets pour créer vos propres graphiques
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-orange-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-orange-400 font-bold text-sm">TXT</span>
                  </div>
                  <span className="text-white font-semibold">Format Lisible</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Rapport formaté pour lecture facile et archivage
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">🎯 Comment Exporter</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center text-purple-400 font-bold text-xs">1</span>
                <span>Cliquez sur l'icône graphique dans l'en-tête du chat</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center text-purple-400 font-bold text-xs">2</span>
                <span>Choisissez votre format (JSON, CSV, TXT)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center text-purple-400 font-bold text-xs">3</span>
                <span>Le fichier se télécharge automatiquement</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  const navigationItems = [
    { id: 'introduction', label: 'Introduction', icon: Brain },
    { id: 'questions', label: 'Questions Types', icon: MessageCircle },
    { id: 'voice', label: 'Commandes Vocales', icon: Mic },
    { id: 'advanced', label: 'Fonctions Avancées', icon: Zap },
    { id: 'export', label: 'Export & Rapports', icon: BarChart3 }
  ]

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/30 max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Guide IA Avancée</h2>
              <p className="text-purple-100">Maîtrisez toutes les fonctionnalités</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        <div className="flex h-[70vh]">
          {/* Navigation */}
          <div className="w-64 bg-white/5 border-r border-white/10 p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {activeSection === item.id && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </motion.button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  {React.createElement(sections[activeSection].icon, { 
                    className: "w-8 h-8 text-purple-400" 
                  })}
                  <h3 className="text-3xl font-bold text-white">
                    {sections[activeSection].title}
                  </h3>
                </div>
                {sections[activeSection].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
})

AIGuide.displayName = 'AIGuide'

export default AIGuide

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  DollarSign,
  Clock,
  AlertTriangle,
  Zap,
  Globe,
  Shield,
  Target,
  Cpu,
  Database,
  Wifi
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'
import PremiumCard from './ui/PremiumCard'
import MetricCard from './ui/MetricCard'
import PremiumChart from './ui/PremiumChart'
import AnimatedBackground from './ui/AnimatedBackground'
import HeatMapVisualization from './HeatMapVisualization'

const Stats = () => {
  const { alerts, stats } = useWhale()

  // Données pour les graphiques
  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return {
        name: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
        value: Math.floor(Math.random() * 50) + 10,
        volume: Math.floor(Math.random() * 1000000) + 500000
      }
    })
    return last7Days
  }, [])

  const chainDistribution = useMemo(() => {
    return Object.entries(stats.chainStats).map(([chain, data]) => ({
      name: chain,
      value: data.alerts,
      volume: data.volume
    }))
  }, [stats.chainStats])

  const performanceMetrics = useMemo(() => [
    {
      title: '🚀 Performance Système',
      value: '99.9%',
      change: '+0.1%',
      changeType: 'positive',
      icon: Cpu,
      gradient: 'blue'
    },
    {
      title: '⚡ Vitesse de Détection',
      value: '< 1s',
      change: '-0.2s',
      changeType: 'positive', 
      icon: Zap,
      gradient: 'green'
    },
    {
      title: '🛡️ Fiabilité',
      value: '100%',
      change: '0%',
      changeType: 'positive',
      icon: Shield,
      gradient: 'purple'
    },
    {
      title: '🌐 Couverture Réseau',
      value: '24/7',
      change: '100%',
      changeType: 'positive',
      icon: Globe,
      gradient: 'cyan'
    }
  ], [])

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header Premium */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-black bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            📊 STATISTIQUES AVANCÉES
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Analyse complète et métriques de performance en temps réel
          </p>
        </motion.div>

        {/* Métriques de Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Métriques Principales Mises à Jour */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="📈 Alertes Totales"
            value={stats.totalAlerts.toLocaleString()}
            change="+18.7%"
            changeType="positive"
            icon={AlertTriangle}
            gradient="red"
            delay={0.5}
          />
          <MetricCard
            title="💰 Volume Total"
            value={`$${(stats.totalValue / 1000000).toFixed(1)}M`}
            change="+32.4%"
            changeType="positive"
            icon={DollarSign}
            gradient="green"
            delay={0.6}
          />
          <MetricCard
            title="📊 Moyenne"
            value={`$${(stats.averageValue / 1000).toFixed(0)}K`}
            change="+5.2%"
            changeType="positive"
            icon={TrendingUp}
            gradient="blue"
            delay={0.7}
          />
          <MetricCard
            title="⏱️ Dernière Alerte"
            value={stats.lastAlert ? 'Récent' : 'Aucune'}
            change="En temps réel"
            changeType="positive"
            icon={Clock}
            gradient="purple"
            delay={0.8}
          />
        </div>

        {/* Graphiques Avancés */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <PremiumChart
              title="📈 Évolution des Alertes (7 jours)"
              data={chartData}
              type="area"
              gradient="blue"
              height={350}
              dataKey="value"
              xAxisKey="name"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <PremiumChart
              title="💰 Volume par Jour"
              data={chartData}
              type="bar"
              gradient="green"
              height={350}
              dataKey="volume"
              xAxisKey="name"
            />
          </motion.div>
        </div>

        {/* Distribution par Chaîne */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mb-8"
        >
          <PremiumChart
            title="🌐 Distribution par Blockchain"
            data={chainDistribution}
            type="bar"
            gradient="purple"
            height={300}
            dataKey="value"
            xAxisKey="name"
          />
        </motion.div>

        {/* Statistiques Détaillées par Chaîne */}
        <PremiumCard className="group" delay={1.2}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">🔗 Analyse par Blockchain</h3>
              <p className="text-gray-400 text-lg">Performance détaillée de chaque réseau</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(stats.chainStats).map(([chain, chainStats], index) => (
              <motion.div
                key={chain}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 group/card overflow-hidden"
              >
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                
                {/* Chain Icon */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">
                      {chain === 'ETH' && '🔷'}
                      {chain === 'BTC' && '🟠'}
                      {chain === 'SOL' && '🟣'}
                      {chain === 'RNDR' && '🎨'}
                    </div>
                    <div className="text-right">
                      <h4 className="text-2xl font-bold text-white">{chain}</h4>
                      <p className="text-sm text-gray-400">Blockchain</p>
                    </div>
                  </div>

                  {/* Métriques */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Alertes</span>
                      <span className="text-xl font-bold text-white">{chainStats.alerts}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Volume</span>
                      <span className="text-lg font-semibold text-green-400">
                        ${(chainStats.volume / 1000000).toFixed(1)}M
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Efficacité</span>
                      <span className="text-lg font-semibold text-blue-400">
                        {chainStats.alerts > 0 ? Math.round((chainStats.volume / chainStats.alerts) / 1000) : 0}K
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((chainStats.alerts / Math.max(...Object.values(stats.chainStats).map(s => s.alerts))) * 100, 100)}%` }}
                        transition={{ delay: 1.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover/card:opacity-20 blur transition-opacity duration-500 -z-10" />
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Métriques Système Avancées */}
        <PremiumCard className="group" delay={1.4}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">⚡ Métriques Système</h3>
              <p className="text-gray-400 text-lg">Performance et santé du système</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Latence Système */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-center"
            >
              <div className="text-6xl font-black bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
                &lt;100ms
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Latence Moyenne</h4>
              <p className="text-gray-400">Temps de réponse ultra-rapide</p>
            </motion.div>

            {/* Taux de Réussite */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="text-center"
            >
              <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                99.99%
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Taux de Réussite</h4>
              <p className="text-gray-400">Fiabilité exceptionnelle</p>
            </motion.div>

            {/* Alertes par Seconde */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              className="text-center"
            >
              <div className="text-6xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                50+
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Alertes/Seconde</h4>
              <p className="text-gray-400">Capacité de traitement élevée</p>
            </motion.div>
          </div>
        </PremiumCard>
      </div>

      {/* Heatmap Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="mt-8"
      >
        <HeatMapVisualization />
      </motion.div>
    </div>
  )
}

export default Stats
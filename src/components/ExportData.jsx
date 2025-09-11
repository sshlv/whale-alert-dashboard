import React from 'react'
import { Download, FileText, Database, Share2 } from 'lucide-react'
import { useWhale } from '../context/WhaleContext'

const ExportData = () => {
  const { alerts, stats } = useWhale()

  const exportToCSV = () => {
    if (alerts.length === 0) {
      alert('Aucune donnée à exporter')
      return
    }

    const headers = ['Type', 'Valeur USD', 'Valeur Crypto', 'Hash', 'Bloc', 'Timestamp', 'De', 'Vers']
    const csvContent = [
      headers.join(','),
      ...alerts.map(alert => [
        alert.type,
        alert.value_usd || 0,
        alert.value_eth || alert.value_btc || alert.value_sol || alert.value_rndr || 0,
        alert.hash,
        alert.block,
        alert.timestamp,
        alert.from || '',
        alert.to || ''
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `whale-alerts-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToJSON = () => {
    if (alerts.length === 0) {
      alert('Aucune donnée à exporter')
      return
    }

    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        totalAlerts: alerts.length,
        totalValue: stats.totalValue,
        averageValue: stats.averageValue
      },
      alerts: alerts,
      stats: stats
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `whale-data-${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generateReport = () => {
    if (alerts.length === 0) {
      alert('Aucune donnée pour générer un rapport')
      return
    }

    const report = `
# 🐋 Rapport de Surveillance des Baleines Crypto

**Date de génération:** ${new Date().toLocaleDateString('fr-FR')}
**Période:** ${alerts.length > 0 ? new Date(alerts[alerts.length - 1].timestamp).toLocaleDateString('fr-FR') : 'N/A'} - ${alerts.length > 0 ? new Date(alerts[0].timestamp).toLocaleDateString('fr-FR') : 'N/A'}

## 📊 Résumé Exécutif

- **Total d'alertes:** ${stats.totalAlerts}
- **Valeur totale surveillée:** $${stats.totalValue.toLocaleString('fr-FR')}
- **Valeur moyenne par alerte:** $${stats.averageValue.toLocaleString('fr-FR')}

## 🔗 Répartition par Chaîne

${Object.entries(stats.chainStats).map(([chain, data]) => `
### ${chain}
- Alertes: ${data.alerts}
- Volume: $${data.volume.toLocaleString('fr-FR')}
`).join('')}

## 🚨 Top 10 des Plus Grosses Transactions

${alerts.slice(0, 10).map((alert, index) => `
${index + 1}. **${alert.type}** - $${alert.value_usd?.toLocaleString('fr-FR')}
   - Hash: \`${alert.hash}\`
   - Bloc: ${alert.block}
   - Date: ${new Date(alert.timestamp).toLocaleString('fr-FR')}
`).join('')}

## 📈 Analyse des Tendances

- **Plus grosse transaction:** $${Math.max(...alerts.map(a => a.value_usd || 0)).toLocaleString('fr-FR')}
- **Transaction moyenne:** $${stats.averageValue.toLocaleString('fr-FR')}
- **Activité totale:** ${alerts.length} transactions surveillées

---
*Rapport généré automatiquement par Whale Alert Dashboard*
    `.trim()

    const blob = new Blob([report], { type: 'text/markdown' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `whale-report-${new Date().toISOString().split('T')[0]}.md`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const shareData = () => {
    if (alerts.length === 0) {
      alert('Aucune donnée à partager')
      return
    }

    const shareText = `🐋 Whale Alert Dashboard - ${stats.totalAlerts} alertes détectées pour un total de $${stats.totalValue.toLocaleString('fr-FR')}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Whale Alert Dashboard',
        text: shareText,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Texte copié dans le presse-papiers !')
    }
  }

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Export des Données
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <FileText className="h-6 w-6 text-green-600" />
          <div className="text-left">
            <p className="font-medium text-gray-900 dark:text-white">Export CSV</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Données tabulaires pour Excel
            </p>
          </div>
        </button>

        <button
          onClick={exportToJSON}
          className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Database className="h-6 w-6 text-blue-600" />
          <div className="text-left">
            <p className="font-medium text-gray-900 dark:text-white">Export JSON</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Données complètes avec métadonnées
            </p>
          </div>
        </button>

        <button
          onClick={generateReport}
          className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <FileText className="h-6 w-6 text-purple-600" />
          <div className="text-left">
            <p className="font-medium text-gray-900 dark:text-white">Rapport Markdown</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Rapport détaillé formaté
            </p>
          </div>
        </button>

        <button
          onClick={shareData}
          className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Share2 className="h-6 w-6 text-orange-600" />
          <div className="text-left">
            <p className="font-medium text-gray-900 dark:text-white">Partager</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Résumé pour réseaux sociaux
            </p>
          </div>
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-blue-700 dark:text-blue-300">
          <Database className="h-4 w-4" />
          <span>
            {alerts.length} alertes disponibles pour l'export
          </span>
        </div>
      </div>
    </div>
  )
}

export default ExportData

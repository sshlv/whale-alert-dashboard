// Service d'export pour les analyses IA et les données crypto

class ExportService {
  constructor() {
    this.formats = ['json', 'csv', 'pdf', 'txt']
  }

  // Export des messages de chat IA
  exportChatHistory(messages, format = 'json') {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const filename = `ai-chat-history-${timestamp}`

    switch (format.toLowerCase()) {
      case 'json':
        return this.exportAsJSON(messages, filename)
      case 'csv':
        return this.exportChatAsCSV(messages, filename)
      case 'txt':
        return this.exportChatAsTXT(messages, filename)
      default:
        throw new Error(`Format ${format} non supporté`)
    }
  }

  // Export des signaux IA
  exportSignals(signals, format = 'json') {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const filename = `ai-signals-${timestamp}`

    switch (format.toLowerCase()) {
      case 'json':
        return this.exportAsJSON(signals, filename)
      case 'csv':
        return this.exportSignalsAsCSV(signals, filename)
      case 'txt':
        return this.exportSignalsAsTXT(signals, filename)
      default:
        throw new Error(`Format ${format} non supporté`)
    }
  }

  // Export d'analyse de marché
  exportMarketAnalysis(analysis, predictions, format = 'json') {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const filename = `market-analysis-${timestamp}`
    
    const data = {
      analysis,
      predictions,
      timestamp: new Date().toISOString(),
      metadata: {
        exported_by: 'WhaleAlert AI Assistant',
        version: '1.0.0'
      }
    }

    switch (format.toLowerCase()) {
      case 'json':
        return this.exportAsJSON(data, filename)
      case 'csv':
        return this.exportAnalysisAsCSV(data, filename)
      case 'txt':
        return this.exportAnalysisAsTXT(data, filename)
      default:
        throw new Error(`Format ${format} non supporté`)
    }
  }

  // Export JSON générique
  exportAsJSON(data, filename) {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    this.downloadFile(blob, `${filename}.json`)
    return true
  }

  // Export CSV pour les messages de chat
  exportChatAsCSV(messages, filename) {
    const headers = ['Timestamp', 'Type', 'Message', 'ID']
    const rows = messages.map(msg => [
      msg.timestamp?.toISOString() || '',
      msg.type || 'unknown',
      `"${(msg.content || '').replace(/"/g, '""')}"`, // Escape quotes
      msg.id || ''
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    this.downloadFile(blob, `${filename}.csv`)
    return true
  }

  // Export CSV pour les signaux
  exportSignalsAsCSV(signals, filename) {
    const headers = [
      'Timestamp', 'Crypto', 'Type', 'Action', 'Strength', 'Confidence',
      'Current_Price', 'Predicted_Price', 'Price_Change', 'Risk', 'Timeframe', 'Reasons'
    ]
    
    const rows = signals.map(signal => [
      signal.timestamp?.toISOString() || '',
      signal.crypto || '',
      signal.type || '',
      signal.action || '',
      signal.strength || '',
      signal.confidence || '',
      signal.currentPrice || '',
      signal.predictedPrice || '',
      signal.priceChange || '',
      signal.risk || '',
      signal.timeframe || '',
      `"${(signal.reasons || []).join('; ').replace(/"/g, '""')}"`
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    this.downloadFile(blob, `${filename}.csv`)
    return true
  }

  // Export CSV pour l'analyse de marché
  exportAnalysisAsCSV(data, filename) {
    const headers = ['Metric', 'Value', 'Timestamp']
    const rows = []

    // Analysis data
    if (data.analysis) {
      Object.entries(data.analysis).forEach(([key, value]) => {
        if (typeof value === 'object') {
          rows.push([key, JSON.stringify(value), data.timestamp])
        } else {
          rows.push([key, String(value), data.timestamp])
        }
      })
    }

    // Predictions data
    if (data.predictions && Array.isArray(data.predictions)) {
      data.predictions.forEach((pred, index) => {
        rows.push([`prediction_${index}_crypto`, pred.crypto || '', data.timestamp])
        rows.push([`prediction_${index}_current_price`, pred.currentPrice || '', data.timestamp])
        rows.push([`prediction_${index}_predicted_price`, pred.predictedPrice || '', data.timestamp])
        rows.push([`prediction_${index}_confidence`, pred.confidence || '', data.timestamp])
      })
    }

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    this.downloadFile(blob, `${filename}.csv`)
    return true
  }

  // Export TXT pour les messages de chat
  exportChatAsTXT(messages, filename) {
    const content = messages.map(msg => {
      const timestamp = msg.timestamp?.toLocaleString() || 'Unknown time'
      const type = msg.type === 'user' ? '👤 VOUS' : '🤖 IA'
      const content = msg.content || ''
      
      return `[${timestamp}] ${type}:\n${content}\n${'='.repeat(50)}\n`
    }).join('\n')

    const header = `📊 HISTORIQUE DE CONVERSATION IA
Exporté le: ${new Date().toLocaleString()}
Nombre de messages: ${messages.length}
${'='.repeat(80)}\n\n`

    const fullContent = header + content

    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8;' })
    this.downloadFile(blob, `${filename}.txt`)
    return true
  }

  // Export TXT pour les signaux
  exportSignalsAsTXT(signals, filename) {
    const content = signals.map((signal, index) => {
      const timestamp = signal.timestamp?.toLocaleString() || 'Unknown time'
      const emoji = signal.type === 'bullish' ? '📈' : signal.type === 'bearish' ? '📉' : '📊'
      
      return `${emoji} SIGNAL #${index + 1}
Time: ${timestamp}
Crypto: ${signal.crypto}
Action: ${signal.action}
Type: ${signal.type?.toUpperCase()}
Strength: ${signal.strength?.toUpperCase()}
Confidence: ${signal.confidence}%
Current Price: $${signal.currentPrice}
Predicted Price: $${signal.predictedPrice}
Price Change: ${signal.priceChange}%
Risk Level: ${signal.risk?.toUpperCase()}
Timeframe: ${signal.timeframe}

Reasons:
${(signal.reasons || []).map(r => `• ${r}`).join('\n')}

${'='.repeat(60)}\n`
    }).join('\n')

    const header = `🧠 SIGNAUX IA EXPORTÉS
Exporté le: ${new Date().toLocaleString()}
Nombre de signaux: ${signals.length}
${'='.repeat(80)}\n\n`

    const fullContent = header + content

    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8;' })
    this.downloadFile(blob, `${filename}.txt`)
    return true
  }

  // Export TXT pour l'analyse de marché
  exportAnalysisAsTXT(data, filename) {
    let content = `📊 ANALYSE DE MARCHÉ IA
Exporté le: ${new Date().toLocaleString()}
${'='.repeat(80)}\n\n`

    // Analysis section
    if (data.analysis) {
      content += `🔍 ANALYSE GÉNÉRALE\n`
      content += `${'─'.repeat(40)}\n`
      
      Object.entries(data.analysis).forEach(([key, value]) => {
        const label = key.replace(/_/g, ' ').toUpperCase()
        if (typeof value === 'object') {
          content += `${label}: ${JSON.stringify(value, null, 2)}\n`
        } else {
          content += `${label}: ${value}\n`
        }
      })
      content += '\n'
    }

    // Predictions section
    if (data.predictions && Array.isArray(data.predictions)) {
      content += `🔮 PRÉDICTIONS IA\n`
      content += `${'─'.repeat(40)}\n`
      
      data.predictions.forEach((pred, index) => {
        const emoji = pred.signal === 'bullish' ? '📈' : pred.signal === 'bearish' ? '📉' : '📊'
        content += `\n${emoji} ${pred.crypto} PREDICTION\n`
        content += `Current Price: $${pred.currentPrice?.toFixed(2) || 'N/A'}\n`
        content += `Predicted Price: $${pred.predictedPrice?.toFixed(2) || 'N/A'}\n`
        content += `Change: ${pred.change?.toFixed(1) || 'N/A'}%\n`
        content += `Confidence: ${pred.confidence?.toFixed(1) || 'N/A'}%\n`
        content += `Timeframe: ${pred.timeframe || 'N/A'}\n`
        content += `Signal: ${pred.signal?.toUpperCase() || 'NEUTRAL'}\n`
        
        if (pred.factors && Array.isArray(pred.factors)) {
          content += `Factors:\n${pred.factors.map(f => `• ${f}`).join('\n')}\n`
        }
        content += '\n'
      })
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' })
    this.downloadFile(blob, `${filename}.txt`)
    return true
  }

  // Utilitaire pour télécharger un fichier
  downloadFile(blob, filename) {
    if (typeof window !== 'undefined') {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Cleanup
      setTimeout(() => URL.revokeObjectURL(url), 100)
    }
  }

  // Génération de rapport complet
  generateFullReport(chatHistory, signals, analysis, predictions, format = 'json') {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const filename = `whale-alert-ai-report-${timestamp}`
    
    const report = {
      metadata: {
        generated_at: new Date().toISOString(),
        generated_by: 'WhaleAlert AI Assistant',
        version: '1.0.0',
        report_type: 'Full AI Analysis Report'
      },
      chat_history: {
        total_messages: chatHistory?.length || 0,
        messages: chatHistory || []
      },
      signals: {
        total_signals: signals?.length || 0,
        signals: signals || []
      },
      market_analysis: analysis || {},
      predictions: predictions || [],
      summary: this.generateSummary(chatHistory, signals, analysis, predictions)
    }

    switch (format.toLowerCase()) {
      case 'json':
        return this.exportAsJSON(report, filename)
      case 'txt':
        return this.exportReportAsTXT(report, filename)
      default:
        throw new Error(`Format ${format} non supporté pour le rapport complet`)
    }
  }

  // Génération du résumé
  generateSummary(chatHistory, signals, analysis, predictions) {
    const totalMessages = chatHistory?.length || 0
    const totalSignals = signals?.length || 0
    const bullishSignals = signals?.filter(s => s.type === 'bullish').length || 0
    const bearishSignals = signals?.filter(s => s.type === 'bearish').length || 0
    const avgConfidence = signals?.length > 0 
      ? (signals.reduce((sum, s) => sum + parseFloat(s.confidence || 0), 0) / signals.length).toFixed(1)
      : 0

    return {
      total_interactions: totalMessages,
      total_signals_generated: totalSignals,
      bullish_signals: bullishSignals,
      bearish_signals: bearishSignals,
      neutral_signals: totalSignals - bullishSignals - bearishSignals,
      average_confidence: `${avgConfidence}%`,
      market_sentiment: analysis?.sentiment || 'unknown',
      report_period: `${new Date().toLocaleDateString()}`,
      ai_recommendations: [
        totalSignals > 0 ? `${totalSignals} signaux générés avec ${avgConfidence}% de confiance moyenne` : 'Aucun signal généré',
        bullishSignals > bearishSignals ? 'Sentiment majoritairement haussier' : 
        bearishSignals > bullishSignals ? 'Sentiment majoritairement baissier' : 'Sentiment neutre',
        totalMessages > 10 ? 'Session interactive riche' : 'Session d\'analyse courte'
      ]
    }
  }

  // Export du rapport complet en TXT
  exportReportAsTXT(report, filename) {
    let content = `🐋 WHALE ALERT - RAPPORT COMPLET IA
${'='.repeat(80)}
Généré le: ${new Date().toLocaleString()}
Version: ${report.metadata.version}
Type: ${report.metadata.report_type}
${'='.repeat(80)}\n\n`

    // Summary
    content += `📊 RÉSUMÉ EXÉCUTIF\n`
    content += `${'─'.repeat(40)}\n`
    Object.entries(report.summary).forEach(([key, value]) => {
      const label = key.replace(/_/g, ' ').toUpperCase()
      if (Array.isArray(value)) {
        content += `${label}:\n${value.map(v => `• ${v}`).join('\n')}\n`
      } else {
        content += `${label}: ${value}\n`
      }
    })
    content += '\n'

    // Signals Summary
    if (report.signals.total_signals > 0) {
      content += `🧠 SIGNAUX IA (${report.signals.total_signals} total)\n`
      content += `${'─'.repeat(40)}\n`
      
      report.signals.signals.slice(0, 5).forEach((signal, index) => {
        const emoji = signal.type === 'bullish' ? '📈' : signal.type === 'bearish' ? '📉' : '📊'
        content += `${emoji} ${signal.crypto} - ${signal.action} (${signal.confidence}%)\n`
      })
      
      if (report.signals.total_signals > 5) {
        content += `... et ${report.signals.total_signals - 5} autres signaux\n`
      }
      content += '\n'
    }

    // Predictions Summary
    if (report.predictions.length > 0) {
      content += `🔮 PRÉDICTIONS IA\n`
      content += `${'─'.repeat(40)}\n`
      
      report.predictions.forEach(pred => {
        const change = pred.change || 0
        const arrow = change > 0 ? '↗️' : change < 0 ? '↘️' : '➡️'
        content += `${arrow} ${pred.crypto}: ${change > 0 ? '+' : ''}${change.toFixed(1)}% (${pred.confidence?.toFixed(1)}%)\n`
      })
      content += '\n'
    }

    // Chat Summary
    if (report.chat_history.total_messages > 0) {
      content += `💬 HISTORIQUE DES INTERACTIONS (${report.chat_history.total_messages} messages)\n`
      content += `${'─'.repeat(40)}\n`
      content += `Session interactive avec l'assistant IA\n`
      content += `Dernière interaction: ${report.chat_history.messages[0]?.timestamp?.toLocaleString() || 'N/A'}\n\n`
    }

    content += `${'='.repeat(80)}\n`
    content += `Rapport généré par WhaleAlert AI Assistant\n`
    content += `Pour plus de détails, exportez les données en format JSON\n`

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' })
    this.downloadFile(blob, `${filename}.txt`)
    return true
  }
}

// Instance globale
export const exportService = new ExportService()
export default ExportService

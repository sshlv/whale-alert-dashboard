import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import './styles/modern.css'
import ModernHeader from './components/ModernHeader'
import ModernDashboard from './components/ModernDashboard'
import Dashboard from './components/Dashboard'
import WhaleAlerts from './components/WhaleAlerts'
import Settings from './components/Settings'
import Stats from './components/Stats'
import FundingRates from './components/FundingRates'
import OpenInterest from './components/OpenInterest'
import BitcoinMonitor from './components/BitcoinMonitor'
import EthereumMonitor from './components/EthereumMonitor'
import SolanaMonitor from './components/SolanaMonitor'
import RenderMonitor from './components/RenderMonitor'
import AIInsights from './components/AIInsights'
import Portfolio from './components/Portfolio'
import TradingBot from './components/TradingBot'
import TechnicalAnalysis from './components/TechnicalAnalysis'
import AdvancedNotification from './components/AdvancedNotification'
import ParticleEffect from './components/ParticleEffect'
import KeyboardShortcuts from './components/KeyboardShortcuts'
import HelpModal from './components/HelpModal'
import AIAssistant from './components/AIAssistant'
import { WhaleProvider, useWhale } from './context/WhaleContext'
import { ThemeProvider } from './context/ThemeContext'
import { RealTimeProvider } from './components/RealTimeDataManager'
import { NotificationProvider } from './components/NotificationSystem'
import { AudioProvider } from './components/AudioAlertSystem'

// Component principal avec contexte
function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showParticles, setShowParticles] = useState(false)
  const [particleType, setParticleType] = useState('whale')
  
  // Accès au contexte Whale pour les vraies fonctions
  const { isMonitoring, startMonitoring, stopMonitoring } = useWhale()

  const handleToggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring()
    } else {
      startMonitoring()
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <ModernDashboard />
      case 'alerts': return <WhaleAlerts />
      case 'stats': return <Stats />
      case 'btc': return <BitcoinMonitor />
      case 'eth': return <EthereumMonitor />
      case 'sol': return <SolanaMonitor />
      case 'rndr': return <RenderMonitor />
      case 'funding': return <FundingRates />
      case 'openinterest': return <OpenInterest />
      case 'ai': return <AIInsights />
      case 'portfolio': return <Portfolio />
      case 'trading': return <TradingBot />
      case 'technical': return <TechnicalAnalysis />
      case 'settings': return <Settings />
      default: return <ModernDashboard />
    }
  }

  return (
    <div className="min-h-screen modern-layout">
      <ModernHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onToggleMonitoring={handleToggleMonitoring}
        isMonitoring={isMonitoring}
      />
      <main>
        {renderContent()}
      </main>
      
      {/* Composants avancés */}
      <AdvancedNotification />
      <ParticleEffect isActive={showParticles} type={particleType} />
      <KeyboardShortcuts setActiveTab={setActiveTab} />
      <HelpModal />
      <AIAssistant />
      
      <Toaster 
        position="top-left"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#374151',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500'
          },
        }}
      />
    </div>
  )
}

// Wrapper App avec les providers
function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <NotificationProvider>
          <RealTimeProvider>
            <WhaleProvider>
              <AppContent />
            </WhaleProvider>
          </RealTimeProvider>
        </NotificationProvider>
      </AudioProvider>
    </ThemeProvider>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const DebugPanel = () => {
  const [binanceData, setBinanceData] = useState(null)
  const [coinGeckoData, setCoinGeckoData] = useState(null)
  const [errors, setErrors] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  // Test direct des APIs
  const testBinanceAPI = async () => {
    console.log('🧪 [DEBUG] Testing Binance API...')
    try {
      const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT')
      const data = await response.json()
      console.log('✅ [DEBUG] Binance Raw Data:', data)
      setBinanceData(data)
      return data
    } catch (error) {
      console.error('❌ [DEBUG] Binance Error:', error)
      setErrors(prev => [...prev, `Binance: ${error.message}`])
      return null
    }
  }

  const testCoinGeckoAPI = async () => {
    console.log('🧪 [DEBUG] Testing CoinGecko API...')
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true')
      const data = await response.json()
      console.log('✅ [DEBUG] CoinGecko Raw Data:', data)
      setCoinGeckoData(data)
      return data
    } catch (error) {
      console.error('❌ [DEBUG] CoinGecko Error:', error)
      setErrors(prev => [...prev, `CoinGecko: ${error.message}`])
      return null
    }
  }

  const runTests = async () => {
    setErrors([])
    console.log('🚀 [DEBUG] Starting API tests...')
    
    await Promise.all([
      testBinanceAPI(),
      testCoinGeckoAPI()
    ])
    
    console.log('🏁 [DEBUG] Tests completed!')
  }

  useEffect(() => {
    runTests()
  }, [])

  if (!isVisible) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600"
        >
          🐛 Debug APIs
        </button>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-96 bg-black/90 text-white p-4 rounded-lg border border-red-500/50 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-red-400 font-bold">🐛 DEBUG PANEL</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-red-400"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4 text-xs">
        {/* Test Binance */}
        <div className="bg-gray-800 p-3 rounded">
          <div className="flex items-center justify-between mb-2">
            <span className="text-orange-400 font-bold">BINANCE TEST</span>
            <button
              onClick={testBinanceAPI}
              className="text-blue-400 hover:text-blue-300 text-xs"
            >
              🔄 Retry
            </button>
          </div>
          {binanceData ? (
            <div className="space-y-1">
              <div className="text-green-400">✅ Connecté</div>
              <div>Prix: ${parseFloat(binanceData.lastPrice).toLocaleString()}</div>
              <div>Change: {parseFloat(binanceData.priceChangePercent).toFixed(2)}%</div>
              <div>Volume: ${(parseFloat(binanceData.quoteVolume) / 1e9).toFixed(1)}B</div>
            </div>
          ) : (
            <div className="text-red-400">❌ Échec</div>
          )}
        </div>

        {/* Test CoinGecko */}
        <div className="bg-gray-800 p-3 rounded">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-400 font-bold">COINGECKO TEST</span>
            <button
              onClick={testCoinGeckoAPI}
              className="text-blue-400 hover:text-blue-300 text-xs"
            >
              🔄 Retry
            </button>
          </div>
          {coinGeckoData ? (
            <div className="space-y-1">
              <div className="text-green-400">✅ Connecté</div>
              <div>Prix: ${coinGeckoData.bitcoin?.usd?.toLocaleString()}</div>
              <div>Change: {coinGeckoData.bitcoin?.usd_24h_change?.toFixed(2)}%</div>
            </div>
          ) : (
            <div className="text-red-400">❌ Échec</div>
          )}
        </div>

        {/* Erreurs */}
        {errors.length > 0 && (
          <div className="bg-red-900/50 p-3 rounded">
            <div className="text-red-400 font-bold mb-2">ERREURS:</div>
            {errors.map((error, index) => (
              <div key={index} className="text-red-300 text-xs">
                {error}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={runTests}
            className="flex-1 bg-blue-500/20 border border-blue-500/50 text-blue-400 py-2 px-3 rounded text-xs hover:bg-blue-500/30"
          >
            🔄 Test Tout
          </button>
          <button
            onClick={() => {
              console.clear()
              runTests()
            }}
            className="flex-1 bg-purple-500/20 border border-purple-500/50 text-purple-400 py-2 px-3 rounded text-xs hover:bg-purple-500/30"
          >
            🧹 Clear & Test
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-900/30 p-2 rounded border border-yellow-500/30">
          <div className="text-yellow-400 text-xs">
            💡 <strong>Instructions:</strong><br/>
            1. Ouvrez la console (F12)<br/>
            2. Regardez les logs détaillés<br/>
            3. Comparez les prix réels vs affichés
          </div>
        </div>
      </div>
    </div>
  )
}

export default DebugPanel

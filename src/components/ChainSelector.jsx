import React from 'react'
import { 
  Bitcoin, 
  Zap, 
  Palette, 
  Coins,
  Check,
  X
} from 'lucide-react'
import { useWhale } from '../context/WhaleContext'

const ChainSelector = () => {
  const { settings, toggleChain } = useWhale()

  const chains = [
    {
      id: 'ETH',
      name: 'Ethereum',
      icon: Coins,
      color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
      description: 'Transactions ETH et tokens ERC-20'
    },
    {
      id: 'BTC',
      name: 'Bitcoin',
      icon: Bitcoin,
      color: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
      description: 'Transactions BTC principales'
    },
    {
      id: 'SOL',
      name: 'Solana',
      icon: Zap,
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
      description: 'Transactions SOL natives'
    },
    {
      id: 'RNDR',
      name: 'Render Token',
      icon: Palette,
      color: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400',
      description: 'Transactions RNDR (ETH & SOL)'
    }
  ]

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Chaînes Surveillées
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Sélectionnez les blockchains à surveiller pour les baleines
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chains.map((chain) => {
          const Icon = chain.icon
          const isEnabled = settings.enabledChains.includes(chain.id)
          
          return (
            <div
              key={chain.id}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                isEnabled
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => toggleChain(chain.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${chain.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {chain.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {chain.description}
                    </p>
                  </div>
                </div>
                
                <div className={`p-1 rounded-full ${
                  isEnabled 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                }`}>
                  {isEnabled ? (
                    <Check size={16} />
                  ) : (
                    <X size={16} />
                  )}
                </div>
              </div>

              {/* Indicateur de statut */}
              <div className="mt-3 flex items-center justify-between">
                <div className={`flex items-center space-x-2 text-xs ${
                  isEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isEnabled ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <span>{isEnabled ? 'Actif' : 'Inactif'}</span>
                </div>
                
                {chain.id === 'ETH' && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Nécessite clé API
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Résumé */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Chaînes actives :
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {settings.enabledChains.length} / {chains.length}
          </span>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {settings.enabledChains.map((chainId) => {
            const chain = chains.find(c => c.id === chainId)
            return (
              <span
                key={chainId}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
              >
                <chain.icon size={12} />
                <span>{chain.name}</span>
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ChainSelector

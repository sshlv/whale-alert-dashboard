// Services blockchain avec fetch() natif - Aucune dépendance externe requise

// Configuration des APIs publiques
const API_ENDPOINTS = {
  etherscan: 'https://api.etherscan.io/api',
  blockstream: 'https://blockstream.info/api',
  solanaRPC: 'https://api.mainnet-beta.solana.com',
  coingecko: 'https://api.coingecko.com/api/v3'
}

// Clé API CoinGecko pour éviter les limites de taux
const COINGECKO_API_KEY = 'CG-32US6KPCWUbogVhisEhpdby4'

// Service pour Ethereum avec Etherscan
export class EthereumService {
  constructor(apiKey = '') {
    this.apiKey = apiKey
  }

  async getLatestBlock() {
    try {
      const url = `${API_ENDPOINTS.etherscan}?module=proxy&action=eth_blockNumber&apikey=${this.apiKey}`
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.result) {
        return parseInt(data.result, 16)
      }
      return null
    } catch (error) {
      console.error('Erreur Ethereum API:', error)
      return null
    }
  }

  async getBlockTransactions(blockNumber) {
    try {
      const url = `${API_ENDPOINTS.etherscan}?module=proxy&action=eth_getBlockByNumber&tag=0x${blockNumber.toString(16)}&boolean=true&apikey=${this.apiKey}`
      const response = await fetch(url)
      const data = await response.json()
      
      return data.result?.transactions || []
    } catch (error) {
      console.error('Erreur récupération transactions Ethereum:', error)
      return []
    }
  }

  async getEthereumPrice() {
    try {
      const url = `${API_ENDPOINTS.coingecko}/simple/price?ids=ethereum&vs_currencies=usd&x_cg_demo_api_key=${COINGECKO_API_KEY}`
      const response = await fetch(url)
      const data = await response.json()
      
      return data.ethereum?.usd || 2000
    } catch (error) {
      return 2000 // Prix par défaut
    }
  }

  async analyzeTransaction(tx, ethPrice) {
    try {
      // Transaction ETH simple
      if (tx.input === '0x' && tx.value !== '0x0') {
        const valueWei = parseInt(tx.value, 16)
        const valueEth = valueWei / 1e18
        const valueUSD = valueEth * ethPrice

        if (valueUSD >= 100000) {
          return {
            type: 'ETH',
            value_eth: valueEth,
            value_usd: valueUSD,
            from: tx.from,
            to: tx.to,
            hash: tx.hash,
            block: parseInt(tx.blockNumber, 16),
            timestamp: new Date().toISOString()
          }
        }
      }

      // Tokens ERC-20 (simplifié)
      if (tx.input && tx.input.startsWith('0xa9059cbb')) {
        const valueHex = tx.input.slice(74, 138)
        const valueTokens = parseInt(valueHex, 16)
        
        // Pour RNDR sur Ethereum
        if (tx.to?.toLowerCase() === '0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24') {
          const renderPrice = await this.getRenderPrice()
          const valueUSD = (valueTokens / 1e18) * renderPrice

          if (valueUSD >= 100000) {
            return {
              type: 'RNDR',
              value_rndr: valueTokens / 1e18,
              value_usd: valueUSD,
              from: tx.from,
              to: tx.to,
              hash: tx.hash,
              block: parseInt(tx.blockNumber, 16),
              timestamp: new Date().toISOString()
            }
          }
        }
      }

      return null
    } catch (error) {
      console.error('Erreur analyse transaction Ethereum:', error)
      return null
    }
  }

  async getRenderPrice() {
    try {
      const url = `${API_ENDPOINTS.coingecko}/simple/price?ids=render-token&vs_currencies=usd&x_cg_demo_api_key=${COINGECKO_API_KEY}`
      const response = await fetch(url)
      const data = await response.json()
      
      return data['render-token']?.usd || 5
    } catch (error) {
      return 5
    }
  }
}

// Service pour Bitcoin avec Blockstream
export class BitcoinService {
  async getLatestBlock() {
    try {
      const url = `${API_ENDPOINTS.blockstream}/blocks/tip/height`
      const response = await fetch(url)
      const height = await response.text()
      
      return parseInt(height)
    } catch (error) {
      console.error('Erreur Bitcoin API:', error)
      return null
    }
  }

  async getBlockTransactions(blockHeight) {
    try {
      const url = `${API_ENDPOINTS.blockstream}/block-height/${blockHeight}`
      const blockHashResponse = await fetch(url)
      const blockHash = await blockHashResponse.text()
      
      const blockUrl = `${API_ENDPOINTS.blockstream}/block/${blockHash}`
      const blockResponse = await fetch(blockUrl)
      const block = await blockResponse.json()
      
      return block.tx || []
    } catch (error) {
      console.error('Erreur récupération transactions Bitcoin:', error)
      return []
    }
  }

  async getBitcoinPrice() {
    try {
      const url = `${API_ENDPOINTS.coingecko}/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${COINGECKO_API_KEY}`
      const response = await fetch(url)
      const data = await response.json()
      
      return data.bitcoin?.usd || 45000
    } catch (error) {
      return 45000
    }
  }

  analyzeTransaction(tx, bitcoinPrice) {
    try {
      // Calculer la valeur totale de sortie en BTC
      const totalOutput = tx.vout.reduce((sum, output) => {
        return sum + (output.value / 100000000) // Convertir satoshis en BTC
      }, 0)

      const valueUSD = totalOutput * bitcoinPrice

      if (valueUSD >= 100000) {
        return {
          type: 'BTC',
          value_btc: totalOutput,
          value_usd: valueUSD,
          hash: tx.txid,
          block: tx.status?.block_height || 0,
          timestamp: new Date().toISOString()
        }
      }
      return null
    } catch (error) {
      console.error('Erreur analyse transaction Bitcoin:', error)
      return null
    }
  }
}

// Service pour Solana avec RPC public
export class SolanaService {
  async getLatestSlot() {
    try {
      const response = await fetch(API_ENDPOINTS.solanaRPC, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getSlot'
        })
      })
      
      const data = await response.json()
      return data.result
    } catch (error) {
      console.error('Erreur Solana RPC:', error)
      return null
    }
  }

  async getBlockTransactions(slot) {
    try {
      const response = await fetch(API_ENDPOINTS.solanaRPC, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBlock',
          params: [slot, { encoding: 'json', transactionDetails: 'full' }]
        })
      })
      
      const data = await response.json()
      
      if (data.result && data.result.transactions) {
        return data.result.transactions.map(tx => ({
          ...tx,
          slot: slot
        }))
      }
      return []
    } catch (error) {
      console.error('Erreur récupération transactions Solana:', error)
      return []
    }
  }

  async getSolanaPrice() {
    try {
      const url = `${API_ENDPOINTS.coingecko}/simple/price?ids=solana&vs_currencies=usd&x_cg_demo_api_key=${COINGECKO_API_KEY}`
      const response = await fetch(url)
      const data = await response.json()
      
      return data.solana?.usd || 100
    } catch (error) {
      return 100
    }
  }

  async getRenderPrice() {
    try {
      const url = `${API_ENDPOINTS.coingecko}/simple/price?ids=render-token&vs_currencies=usd&x_cg_demo_api_key=${COINGECKO_API_KEY}`
      const response = await fetch(url)
      const data = await response.json()
      
      return data['render-token']?.usd || 5
    } catch (error) {
      return 5
    }
  }

  analyzeTransaction(tx, solanaPrice, renderPrice) {
    try {
      if (!tx.transaction || !tx.transaction.message) return null

      const message = tx.transaction.message
      const instructions = message.instructions || []
      
      // Analyser les instructions de transfert
      for (const instruction of instructions) {
        if (instruction.programId === '11111111111111111111111111111111') { // System Program
          // Transfert SOL
          const preBalances = tx.meta?.preBalances || []
          const postBalances = tx.meta?.postBalances || []
          
          let totalTransfer = 0
          for (let i = 0; i < preBalances.length; i++) {
            const diff = (preBalances[i] - postBalances[i]) / 1e9 // Convertir lamports en SOL
            if (diff > 0) totalTransfer += diff
          }

          const valueUSD = totalTransfer * solanaPrice

          if (valueUSD >= 100000) {
            return {
              type: 'SOL',
              value_sol: totalTransfer,
              value_usd: valueUSD,
              hash: tx.transaction.signatures[0],
              block: tx.slot,
              timestamp: new Date().toISOString()
            }
          }
        }
        
        // Vérifier les transferts de tokens SPL (comme RNDR)
        if (instruction.programId === 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') {
          const preTokenBalances = tx.meta?.preTokenBalances || []
          const postTokenBalances = tx.meta?.postTokenBalances || []
          
          for (let i = 0; i < preTokenBalances.length; i++) {
            const preBalance = preTokenBalances[i]
            const postBalance = postTokenBalances[i]
            
            if (preBalance && postBalance) {
              const diff = (preBalance.uiTokenAmount.uiAmount || 0) - (postBalance.uiTokenAmount.uiAmount || 0)
              
              if (diff > 0) {
                // Vérifier si c'est RNDR
                if (preBalance.mint === 'RNDR') {
                  const valueUSD = diff * renderPrice
                  
                  if (valueUSD >= 100000) {
                    return {
                      type: 'RNDR',
                      value_rndr: diff,
                      value_usd: valueUSD,
                      hash: tx.transaction.signatures[0],
                      block: tx.slot,
                      timestamp: new Date().toISOString()
                    }
                  }
                }
              }
            }
          }
        }
      }

      return null
    } catch (error) {
      console.error('Erreur analyse transaction Solana:', error)
      return null
    }
  }
}

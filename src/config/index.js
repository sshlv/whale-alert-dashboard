// Configuration simple pour éviter les erreurs
export const CONFIG = {
  API_ENDPOINTS: {
    etherscan: 'https://api.etherscan.io/api',
    blockstream: 'https://blockstream.info/api',
    solanaRPC: 'https://api.mainnet-beta.solana.com',
    coingecko: 'https://api.coingecko.com/api/v3'
  },
  COINGECKO_API_KEY: 'CG-32US6KPCWUbogVhisEhpdby4',
  DEFAULT_THRESHOLDS: {
    whale: 1000000,    // $1M
    large: 500000,     // $500K
    medium: 100000     // $100K
  },
  REFRESH_INTERVALS: {
    prices: 30000,     // 30 secondes
    blocks: 15000,     // 15 secondes
    alerts: 10000      // 10 secondes
  }
}

# 🐋 Whale Alert Dashboard

Une application React moderne pour surveiller les grosses transactions crypto (baleines) sur **Ethereum**, **Bitcoin**, **Solana** et **Render Token** en temps réel.

## ✨ Fonctionnalités

### 🔍 **Surveillance Multi-Chaînes**
- **🔷 Ethereum** : Transactions ETH et tokens ERC-20 (USDC, USDT, DAI, etc.)
- **🟠 Bitcoin** : Transactions BTC principales via Blockstream API
- **🟣 Solana** : Transactions SOL natives et tokens SPL
- **🎨 Render Token** : Surveillance RNDR sur Ethereum et Solana
- Analyse en temps réel des nouveaux blocs/slots
- Seuils d'alerte personnalisables par chaîne

### 📊 **Dashboard Complet**
- **Dashboard** : Vue d'ensemble multi-chaînes avec métriques en temps réel
- **Alertes** : Historique détaillé des transactions de baleines par blockchain
- **Statistiques** : Graphiques et analyses avancées par chaîne
- **Paramètres** : Configuration flexible de la surveillance multi-chaînes

### 🚨 **Système d'Alertes Multi-niveaux**
- **🟡 Jaune** : Transactions moyennes (≥ $100k)
- **🟠 Orange** : Grosses transactions (≥ $500k)  
- **🔴 Rouge** : Transactions de baleines (≥ $1M)
- **Icônes par chaîne** : 🔷 ETH, 🟠 BTC, 🟣 SOL, 🎨 RNDR

### 🎨 **Interface Moderne**
- Design responsive et accessible
- Mode sombre/clair
- Notifications toast en temps réel avec icônes de chaînes
- Interface intuitive avec navigation par onglets
- Sélecteur de chaînes interactif

## 🚀 Installation

### Prérequis
- Node.js 16+ 
- npm ou yarn
- Clé API Etherscan (gratuite) - uniquement pour Ethereum

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd whale-alert-dashboard
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Obtenir une clé API Etherscan**
- Allez sur [etherscan.io/apis](https://etherscan.io/apis)
- Créez un compte gratuit
- Générez une clé API

4. **Configurer l'application**
- Ouvrez l'onglet "Paramètres" dans l'application
- Sélectionnez les chaînes à surveiller (ETH, BTC, SOL, RNDR)
- Entrez votre clé API Etherscan (pour Ethereum uniquement)
- Configurez vos seuils de surveillance

5. **Lancer l'application**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## ⚙️ Configuration

### Paramètres Disponibles

- **Chaînes surveillées** : Sélection des blockchains à surveiller
- **Clé API Etherscan** : Obligatoire pour la surveillance Ethereum
- **Valeur minimum** : Seuil minimum pour déclencher une alerte (défaut: $100,000)
- **Intervalle de vérification** : Fréquence de vérification en secondes (défaut: 30s)
- **Seuils d'alerte** : Niveaux personnalisés pour les alertes
- **Tokens surveillés** : Adresses de contrats ERC-20 à surveiller

### Blockchains Supportées

- **🔷 Ethereum** : ETH natif + tokens ERC-20 (USDC, USDT, DAI, etc.)
- **🟠 Bitcoin** : Transactions BTC principales (pas de clé API requise)
- **🟣 Solana** : SOL natif + tokens SPL (pas de clé API requise)
- **🎨 Render Token** : RNDR sur Ethereum et Solana

### Exemples de Tokens Surveillés

```
Ethereum:
- USDC: 0xA0b86a33E6441b8c4C8C0e4B8b8c4C8C0e4B8b8c4
- USDT: 0xdAC17F958D2ee523a2206206994597C13D831ec7
- DAI: 0x6B175474E89094C44Da98b954EedeAC495271d0F
- RNDR: 0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24

Solana:
- RNDR: RNDR (mint address)
```

## 🛠️ Technologies Utilisées

- **React 18** - Framework frontend
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Recharts** - Bibliothèque de graphiques
- **Lucide React** - Icônes modernes
- **React Hot Toast** - Notifications
- **Axios** - Client HTTP
- **Date-fns** - Manipulation des dates
- **@solana/web3.js** - Intégration Solana
- **bitcoin-core** - Support Bitcoin
- **crypto-js** - Utilitaires crypto

## 📱 Fonctionnalités Avancées

### Surveillance Multi-Chaînes en Temps Réel
- Vérification automatique des nouveaux blocs Ethereum
- Surveillance des slots Solana en temps réel
- Analyse des transactions Bitcoin via Blockstream
- Détection instantanée des grosses transactions sur toutes les chaînes
- Notifications push dans le navigateur avec identification de chaîne

### Analyse des Données Multi-Chaînes
- Graphiques d'activité par heure et par jour par blockchain
- Distribution des types de transactions par chaîne
- Top des adresses les plus actives par blockchain
- Métriques de performance et volume par chaîne
- Statistiques comparatives entre blockchains

### Interface Utilisateur Multi-Chaînes
- Mode sombre/clair automatique
- Design responsive pour mobile et desktop
- Navigation intuitive par onglets
- Sélecteur de chaînes interactif
- Copie d'adresses en un clic
- Affichage des icônes de chaînes dans les alertes

## 🔧 Scripts Disponibles

```bash
npm run dev      # Lancer en mode développement
npm run build    # Construire pour la production
npm run preview  # Prévisualiser la build de production
npm run lint     # Vérifier le code avec ESLint
```

## 📊 APIs Utilisées

- **Etherscan API** : Récupération des données blockchain Ethereum
- **Blockstream API** : Données Bitcoin (gratuit, pas de clé requise)
- **Solana RPC** : Données Solana (gratuit, pas de clé requise)
- **CoinGecko API** : Prix des cryptomonnaies en temps réel

## 🚨 Limitations Actuelles

- Simulation des alertes en mode démo (nécessite intégration backend complet)
- Limitation des requêtes API Etherscan (gratuit: 5 req/sec)
- Pas de support pour les transactions privées (Monero, etc.)
- Surveillance limitée aux transactions publiques

## 🔮 Améliorations Futures

- [x] Support multi-chaînes (Bitcoin, Solana, Render Token)
- [ ] Intégration WebSocket pour temps réel
- [ ] Support pour BSC, Polygon, Avalanche
- [ ] Notifications Discord/Slack
- [ ] Export des données en CSV/PDF
- [ ] Alertes par email
- [ ] Dashboard mobile natif
- [ ] Support des transactions privées

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Soumettre des pull requests

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez l'équipe de développement

---

**🐋 Happy Whale Hunting! 🐋**

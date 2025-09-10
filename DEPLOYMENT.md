# 🚀 Guide de Déploiement

## 📋 Pré-requis
- ✅ Build testé et fonctionnel
- ✅ Fichiers de configuration créés (.gitignore, vercel.json)
- ✅ Variables d'environnement configurées

## 🌐 Option 1 : Déploiement via Vercel CLI

### 1. Installer Vercel CLI
```bash
npm install -g vercel
```

### 2. Login Vercel
```bash
vercel login
```

### 3. Déployer
```bash
vercel --prod
```

## 🐙 Option 2 : Via GitHub + Vercel

### 1. Installer Git et GitHub Desktop
- Git : https://git-scm.com/download/win
- GitHub Desktop : https://desktop.github.com/

### 2. Créer le repository
```bash
git init
git add .
git commit -m "🐋 Initial commit - Whale Alert Dashboard"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/whale-alert-dashboard.git
git push -u origin main
```

### 3. Connecter à Vercel
1. Allez sur https://vercel.com
2. "Import Git Repository"
3. Sélectionnez votre repo GitHub
4. Configurez les variables d'environnement
5. Déployez !

## 🌍 Option 3 : Upload manuel sur GitHub

1. Créez un repository sur https://github.com/new
2. Nom : `whale-alert-dashboard`
3. Description : `🐋 Tableau de bord moderne pour surveiller les transactions crypto des baleines`
4. Public ou Private selon vos préférences
5. Uploadez tous les fichiers du projet
6. Connectez à Vercel

## ⚙️ Variables d'environnement Vercel

Dans l'interface Vercel, ajoutez :
- `NODE_ENV` = `production`
- `VITE_APP_NAME` = `Whale Alert Dashboard`
- `VITE_APP_VERSION` = `1.0.0`

(Les API keys sont optionnelles - l'app fonctionne avec des APIs gratuites)

## 🎯 URL finale
Votre app sera disponible sur : `https://whale-alert-dashboard-USERNAME.vercel.app`

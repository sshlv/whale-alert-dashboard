#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bot de surveillance des baleines crypto
Surveille les grosses transactions sur Ethereum et envoie des alertes
"""

import os
import time
import json
import requests
from datetime import datetime
from dotenv import load_dotenv
from colorama import init, Fore, Style
import logging

# Initialiser colorama pour Windows
init(autoreset=True)

class WhaleAlertBot:
    def __init__(self):
        # Charger les variables d'environnement
        load_dotenv()
        
        # Configuration
        self.api_key = os.getenv("ETHERSCAN_API_KEY")
        self.min_value_usd = int(os.getenv("MIN_TRANSACTION_VALUE_USD", "100000"))
        self.check_interval = int(os.getenv("CHECK_INTERVAL_SECONDS", "30"))
        self.log_file = os.getenv("LOG_FILE", "whale_alerts.log")
        self.discord_webhook = os.getenv("DISCORD_WEBHOOK_URL", "")
        
        # Tokens surveillés
        watched_tokens_str = os.getenv("WATCHED_TOKENS", "")
        self.watched_tokens = [token.strip() for token in watched_tokens_str.split(",") if token.strip()]
        
        # Seuils d'alerte
        thresholds_str = os.getenv("ALERT_THRESHOLDS", "50000,100000,500000,1000000")
        self.alert_thresholds = [int(t.strip()) for t in thresholds_str.split(",")]
        
        # Vérifier la clé API
        if not self.api_key:
            print(f"{Fore.RED}❌ Erreur : clé API Etherscan introuvable dans .env")
            exit()
        
        # Configuration du logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(self.log_file),
                logging.StreamHandler()
            ]
        )
        
        self.logger = logging.getLogger(__name__)
        self.last_block = None
        
        print(f"{Fore.GREEN}🐋 Bot de surveillance des baleines crypto démarré !")
        print(f"{Fore.CYAN}📊 Seuil minimum : ${self.min_value_usd:,}")
        print(f"{Fore.CYAN}⏱️  Intervalle de vérification : {self.check_interval}s")
        print(f"{Fore.CYAN}🎯 Tokens surveillés : {len(self.watched_tokens)}")
    
    def get_latest_block(self):
        """Récupère le numéro du dernier bloc"""
        url = f"https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey={self.api_key}"
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return int(data["result"], 16)
            else:
                self.logger.error(f"Erreur API Etherscan : {response.text}")
                return None
        except Exception as e:
            self.logger.error(f"Erreur lors de la récupération du bloc : {e}")
            return None
    
    def get_block_transactions(self, block_number):
        """Récupère les transactions d'un bloc"""
        url = f"https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x{block_number:x}&boolean=true&apikey={self.api_key}"
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return data.get("result", {}).get("transactions", [])
            else:
                self.logger.error(f"Erreur API Etherscan : {response.text}")
                return []
        except Exception as e:
            self.logger.error(f"Erreur lors de la récupération des transactions : {e}")
            return []
    
    def get_eth_price(self):
        """Récupère le prix actuel d'ETH en USD"""
        url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return data["ethereum"]["usd"]
            else:
                return 2000  # Prix par défaut
        except:
            return 2000  # Prix par défaut
    
    def analyze_transaction(self, tx):
        """Analyse une transaction pour détecter les baleines"""
        try:
            # Vérifier si c'est une transaction ETH simple
            if tx.get("input") == "0x" and tx.get("value", "0x0") != "0x0":
                value_wei = int(tx["value"], 16)
                value_eth = value_wei / 10**18
                
                # Obtenir le prix ETH
                eth_price = self.get_eth_price()
                value_usd = value_eth * eth_price
                
                if value_usd >= self.min_value_usd:
                    return {
                        "type": "ETH",
                        "value_eth": value_eth,
                        "value_usd": value_usd,
                        "from": tx["from"],
                        "to": tx["to"],
                        "hash": tx["hash"],
                        "block": tx.get("blockNumber", "unknown")
                    }
            
            # Vérifier les tokens ERC-20 surveillés
            if tx.get("input", "").startswith("0xa9059cbb"):  # transfer
                to_address = tx.get("to", "").lower()
                if to_address in [token.lower() for token in self.watched_tokens]:
                    # Décoder le transfer (simplifié)
                    try:
                        value_hex = tx["input"][74:138]  # Extraire la valeur du transfer
                        value_tokens = int(value_hex, 16)
                        # Note: Pour une analyse précise, il faudrait récupérer les decimals du token
                        return {
                            "type": "TOKEN",
                            "token_address": to_address,
                            "value_tokens": value_tokens,
                            "from": tx["from"],
                            "to": tx["to"],
                            "hash": tx["hash"],
                            "block": tx.get("blockNumber", "unknown")
                        }
                    except:
                        pass
            
            return None
        except Exception as e:
            self.logger.error(f"Erreur lors de l'analyse de la transaction : {e}")
            return None
    
    def send_alert(self, whale_data):
        """Envoie une alerte pour une transaction de baleine"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Déterminer le niveau d'alerte
        alert_level = "🟡"
        if whale_data["value_usd"] >= 1000000:
            alert_level = "🔴"
        elif whale_data["value_usd"] >= 500000:
            alert_level = "🟠"
        
        # Message d'alerte
        if whale_data["type"] == "ETH":
            message = f"""
{alert_level} **ALERTE BALEINE ETH** {alert_level}
💰 Valeur : ${whale_data['value_usd']:,.2f} ({whale_data['value_eth']:.4f} ETH)
📤 De : `{whale_data['from'][:10]}...{whale_data['from'][-6:]}`
📥 Vers : `{whale_data['to'][:10]}...{whale_data['to'][-6:]}`
🔗 Hash : `{whale_data['hash'][:20]}...`
📦 Bloc : {whale_data['block']}
⏰ {timestamp}
"""
        else:
            message = f"""
{alert_level} **ALERTE BALEINE TOKEN** {alert_level}
🪙 Token : `{whale_data['token_address'][:10]}...`
💰 Valeur : {whale_data['value_tokens']:,} tokens
📤 De : `{whale_data['from'][:10]}...{whale_data['from'][-6:]}`
📥 Vers : `{whale_data['to'][:10]}...{whale_data['to'][-6:]}`
🔗 Hash : `{whale_data['hash'][:20]}...`
📦 Bloc : {whale_data['block']}
⏰ {timestamp}
"""
        
        # Affichage console
        print(f"{Fore.YELLOW}{'='*60}")
        print(f"{Fore.YELLOW}{message}")
        print(f"{Fore.YELLOW}{'='*60}")
        
        # Logging
        self.logger.info(f"Baleine détectée : {whale_data}")
        
        # Envoi Discord (si webhook configuré)
        if self.discord_webhook:
            self.send_discord_alert(message)
    
    def send_discord_alert(self, message):
        """Envoie une alerte sur Discord"""
        try:
            payload = {
                "content": message,
                "username": "🐋 Whale Alert Bot"
            }
            response = requests.post(self.discord_webhook, json=payload, timeout=10)
            if response.status_code == 204:
                self.logger.info("Alerte Discord envoyée avec succès")
            else:
                self.logger.error(f"Erreur envoi Discord : {response.status_code}")
        except Exception as e:
            self.logger.error(f"Erreur envoi Discord : {e}")
    
    def run(self):
        """Boucle principale du bot"""
        print(f"{Fore.GREEN}🚀 Démarrage de la surveillance...")
        
        # Initialiser le dernier bloc
        self.last_block = self.get_latest_block()
        if self.last_block is None:
            print(f"{Fore.RED}❌ Impossible de récupérer le dernier bloc")
            return
        
        print(f"{Fore.CYAN}📦 Bloc de départ : {self.last_block}")
        
        while True:
            try:
                # Récupérer le bloc actuel
                current_block = self.get_latest_block()
                if current_block is None:
                    time.sleep(self.check_interval)
                    continue
                
                # Vérifier les nouveaux blocs
                if current_block > self.last_block:
                    print(f"{Fore.BLUE}🔍 Vérification des blocs {self.last_block + 1} à {current_block}")
                    
                    for block_num in range(self.last_block + 1, current_block + 1):
                        transactions = self.get_block_transactions(block_num)
                        
                        for tx in transactions:
                            whale_data = self.analyze_transaction(tx)
                            if whale_data:
                                self.send_alert(whale_data)
                    
                    self.last_block = current_block
                else:
                    print(f"{Fore.GRAY}⏳ En attente de nouveaux blocs... (dernier: {current_block})")
                
                time.sleep(self.check_interval)
                
            except KeyboardInterrupt:
                print(f"\n{Fore.YELLOW}🛑 Arrêt du bot demandé par l'utilisateur")
                break
            except Exception as e:
                self.logger.error(f"Erreur dans la boucle principale : {e}")
                time.sleep(self.check_interval)

def main():
    """Fonction principale"""
    print(f"{Fore.CYAN}{'='*60}")
    print(f"{Fore.CYAN}🐋 BOT DE SURVEILLANCE DES BALEINES CRYPTO 🐋")
    print(f"{Fore.CYAN}{'='*60}")
    
    bot = WhaleAlertBot()
    bot.run()

if __name__ == "__main__":
    main()

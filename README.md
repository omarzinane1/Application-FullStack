# Application Full-Stack - Centre d'Appels

Ce projet est une application web Full-Stack permettant la gestion d'appels et de tickets, avec deux types d’utilisateurs : **agents** et **superviseurs**.

## Technologies utilisées

- **Frontend** : React.js (Axios, Context API)
- **Backend** : Laravel 10 (API REST, JWT)
- **Base de données** : SQLite

---

## ✅ Fonctionnalités

### Agents
- Connexion
- Saisie des appels
- Création et mise à jour des tickets liés
- Visualisation de ses propres tickets

### Superviseurs
- Connexion
- Création de comptes agents
- Liste et suppression des utilisateurs agents
- Vue globale des appels et des tickets

---

## Authentification

- Basée sur JWT 
- Les rôles sont protégés par des middlewares `agent` et `superviseur`

---

## 🚀 Installation locale

### 1. Cloner le repo


git clone https://github.com/omarzinane1/Application-FullStack.git
cd Application-FullStack

### 2. Lancer le backend Laravel

cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

### 3. Lancer le frontend React

cd frontend
npm install
npm run dev

🔗 Accès
Frontend : http://localhost:3000

Backend API : http://localhost:8000/api



# Centre d’Appels – Backend (Laravel 10)

Ce projet est le backend d'une application web de gestion de centre d’appels. Il fournit une API RESTful développée avec Laravel 10. Il prend en charge l’authentification avec rôles, la gestion des appels et des tickets.

## Fonctionnalités

- Authentification avec jetons JWT
- Gestion des rôles : agent et superviseur
- Création et consultation des appels
- Création, mise à jour et suivi des tickets


## Technologies utilisées

- Laravel 10
- JWT
- SQLite

## Installation

### 1. Cloner le projet

git clone https://github.com/ton-utilisateur/centre-appels-backend.git
cd callcenter-backend

### 2. Installer les dépendances
composer install
## 3. Copier le fichier d’environnement
cp .env.example .env
php artisan key:generate

### 4. Configurer la base de données
SQLite :
Créer un fichier vide database/database.sqlite
Modifier .env :

DB_CONNECTION=sqlite
DB_DATABASE=/chemin/vers/le/projet/database/database.sqlite

### 5. Exécuter les migrations et les seeders
php artisan migrate
### 6. Démarrer le serveur
php artisan serve
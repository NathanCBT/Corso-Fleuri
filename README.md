# Architecture MVC - Corso Fleuri

## 📁 Structure du Projet

```
Corso-Fleuri/
│
├── 📁 src/                          # Tout le code source
│   ├── 📁 models/                   # Modèles (accès BDD, logique métier)
│   │   ├── userModel.js
│   │   └── ...
│   │
│   ├── 📁 views/                    # Vues (réponses JSON ou templates)
│   │   └── ...
│   │
│   ├── 📁 controllers/              # Contrôleurs (logique des routes)
│   │   ├── userController.js
│   │   └── ...
│   │
│   ├── 📁 routes/                   # Définition des routes Express
│   │   ├── userRoutes.js
│   │   └── ...
│   │
│   ├── 📁 classes/                  # Classes réutilisables (Product, Menu...)
│   │   ├── Product.js
│   │   ├── Menu.js
│   │   └── ...
│   │
│   ├── 📁 pages/                    # Pages (vues HTML ou templates)
│   │   ├── adminMenu/
│   │   ├── cashierMenu/
│   │   └── ...
│   │
│   ├── 📁 middlewares/              # Middlewares (auth, erreurs, validation...)
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── 📁 config/                   # Configuration (BDD, env, constantes)
│   │   └── db.js
│   │
│   └── 📁 utils/                    # Fonctions utilitaires réutilisables
│       └── helpers.js
│
├── 📁 public/                       # Fichiers statiques (CSS, JS, images...)
│
├── 📄 server.js                     # Point d'entrée de l'application
├── 📄 .env                          # Variables d'environnement (créer depuis .env.example)
├── 📄 .env.example                  # Template des variables d'environnement
├── 📄 .gitignore
├── 📄 package.json
└── 📄 README.md
```

## 🏗️ Principes MVC

### Models (`src/models/`)
- **Responsabilité**: Accès à la base de données, logique métier
- **Exemple**: `userModel.js` gère les requêtes SQL pour les utilisateurs
- **Utilise**: `src/config/db.js` pour la connexion

### Controllers (`src/controllers/`)
- **Responsabilité**: Logique des requêtes HTTP, validation
- **Exemple**: `userController.js` traite les requêtes GET, POST, PUT, DELETE
- **Utilise**: Les Models pour récupérer les données

### Routes (`src/routes/`)
- **Responsabilité**: Définir les endpoints Express
- **Exemple**: `userRoutes.js` mappe les URLs aux Controllers
- **Utilise**: Les Controllers pour traiter les requêtes

### Middlewares (`src/middlewares/`)
- **Responsabilité**: Authentification, gestion des erreurs, validation
- **Exemple**: `authMiddleware.js` vérifie les tokens JWT

### Config (`src/config/`)
- **Responsabilité**: Configuration de la base de données et variables globales
- **Exemple**: `db.js` crée le pool de connexions MySQL

### Utils (`src/utils/`)
- **Responsabilité**: Fonctions utilitaires réutilisables
- **Exemple**: `helpers.js` contient des fonctions de validation, formatage, etc.

### Views (`src/views/`)
- **Responsabilité**: Formatage des réponses JSON (si nécessaire)
- **Exemple**: Retourner des données formatées aux clients

### Pages (`src/pages/`)
- **Responsabilité**: Pages HTML et leurs scripts côté client
- **Structure**: Organisé par fonctionnalité (adminMenu, cashierMenu, etc.)

### Classes (`src/classes/`)
- **Responsabilité**: Classes réutilisables pour la logique métier
- **Exemple**: `Product.js`, `Menu.js`

## 🚀 Démarrage

### 1. Créer le fichier `.env`
```bash
cp .env.example .env
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Démarrer le serveur
```bash
node server.js
```

## 📝 Exemple d'Utilisation

### 1. Créer un Model
```javascript
// src/models/productModel.js
const db = require('../config/db');

class ProductModel {
  static async getAll() {
    const [products] = await db.query('SELECT * FROM products');
    return products;
  }
}
```

### 2. Créer un Controller
```javascript
// src/controllers/productController.js
const ProductModel = require('../models/productModel');

class ProductController {
  static async getProducts(req, res) {
    const products = await ProductModel.getAll();
    res.json({ success: true, data: products });
  }
}
```

### 3. Créer une Route
```javascript
// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.get('/', ProductController.getProducts);

module.exports = router;
```

### 4. Ajouter la Route au Server
```javascript
// server.js
app.use('/api/products', require('./src/routes/productRoutes'));
```

## 📚 Resources
- [Express.js Documentation](https://expressjs.com/)
- [MVC Architecture](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
- [RESTful API Design](https://restfulapi.net/)

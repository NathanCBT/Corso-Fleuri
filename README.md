# Corso Fleuri - Backend Database

Architecture MVC avec Sequelize connectée à HeidiSQL (Laragon)

## Structure des dossiers

```
DB/
├── config/
│   └── database.js          # Configuration Sequelize
├── models/
│   ├── User.js              # Modèle utilisateur
│   ├── Product.js           # Modèle produit
│   ├── Commande.js          # Modèle commande
│   ├── Menu.js              # Modèle menu
│   └── index.js             # Export des modèles
├── controllers/
│   ├── userController.js    # Logique métier utilisateur
│   ├── productController.js # Logique métier produit
│   ├── commandeController.js# Logique métier commande
│   └── menuController.js    # Logique métier menu
├── routes/
│   ├── userRoutes.js        # Routes utilisateur
│   ├── productRoutes.js     # Routes produit
│   ├── commandeRoutes.js    # Routes commande
│   ├── menuRoutes.js        # Routes menu
│   └── index.js             # Routes principales
├── middlewares/
│   ├── authMiddleware.js    # Authentification
│   └── errorMiddleware.js   # Gestion erreurs
├── .env                     # Variables d'environnement
├── server.js                # Point d'entrée
└── package.json             # Dépendances
```

## Installation

1. Installer les dépendances:
```bash
npm install
```

2. Configurer le fichier `.env` avec vos paramètres Laragon

3. Démarrer le serveur:
```bash
npm start
```

## API Endpoints

### Users
- `GET /api/users` - Récupérer tous les utilisateurs
- `GET /api/users/:id` - Récupérer un utilisateur
- `POST /api/users` - Créer un utilisateur
- `PUT /api/users/:id` - Mettre à jour un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

### Products
- `GET /api/products` - Récupérer tous les produits
- `GET /api/products/:id` - Récupérer un produit
- `POST /api/products` - Créer un produit
- `PUT /api/products/:id` - Mettre à jour un produit
- `DELETE /api/products/:id` - Supprimer un produit

### Commandes
- `GET /api/commandes` - Récupérer toutes les commandes
- `GET /api/commandes/:id` - Récupérer une commande
- `POST /api/commandes` - Créer une commande
- `PUT /api/commandes/:id` - Mettre à jour une commande
- `DELETE /api/commandes/:id` - Supprimer une commande

### Menus
- `GET /api/menus` - Récupérer tous les menus
- `GET /api/menus/:id` - Récupérer un menu
- `POST /api/menus` - Créer un menu
- `PUT /api/menus/:id` - Mettre à jour un menu
- `DELETE /api/menus/:id` - Supprimer un menu

## Configuration Laragon

Base de données: `CorsoFleuri`
User: `root`
Password: (vide)
Port: `3306`

Le serveur créera automatiquement les tables lors du premier démarrage.

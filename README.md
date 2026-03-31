# Corso Fleuri - Backend Database

Architecture MVC avec Sequelize connectée à MySQL (corsofleuri)

## Structure des dossiers

```
DB/
├── config/
│   └── database.js               # Configuration Sequelize
├── models/
│   ├── User.js                   # Modèle utilisateur
│   ├── Article.js                # Modèle article/produit
│   ├── Category.js               # Modèle catégorie
│   ├── Commande.js               # Modèle commande (order)
│   ├── Menu.js                   # Modèle menu
│   ├── ArticleMenu.js            # Relation article-menu
│   ├── OrderArticle.js           # Relation commande-article
│   ├── OrderMenu.js              # Relation commande-menu
│   └── index.js                  # Export des modèles
├── controllers/
│   ├── userController.js         # Logique métier utilisateur
│   ├── articleController.js      # Logique métier article
│   ├── commandeController.js     # Logique métier commande
│   └── menuController.js         # Logique métier menu
├── routes/
│   ├── userRoutes.js             # Routes utilisateur
│   ├── articleRoutes.js          # Routes article
│   ├── commandeRoutes.js         # Routes commande
│   ├── menuRoutes.js             # Routes menu
│   └── index.js                  # Routes principales
├── middlewares/
│   ├── authMiddleware.js         # Authentification
│   └── errorMiddleware.js        # Gestion erreurs
├── .env                          # Variables d'environnement
├── server.js                     # Point d'entrée
└── package.json                  # Dépendances
```

## Installation

1. Installer les dépendances:
```bash
npm install
```

2. Configurer le fichier `.env` avec vos paramètres MySQL:
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=corsofleuri
DB_USER=root
DB_PASSWORD=
```

3. Démarrer le serveur:
```bash
npm start
```

## API Endpoints

### User
- `GET /api/user` - Récupérer tous les utilisateurs
- `GET /api/user/:id` - Récupérer un utilisateur
- `POST /api/user` - Créer un utilisateur
- `PUT /api/user/:id` - Mettre à jour un utilisateur
- `DELETE /api/user/:id` - Supprimer un utilisateur

### Article
- `GET /api/article` - Récupérer tous les articles
- `GET /api/article/:id` - Récupérer un article
- `POST /api/article` - Créer un article
- `PUT /api/article/:id` - Mettre à jour un article
- `DELETE /api/article/:id` - Supprimer un article

### Order (Commandes)
- `GET /api/order` - Récupérer toutes les commandes
- `GET /api/order/:id` - Récupérer une commande
- `POST /api/order` - Créer une commande
- `PUT /api/order/:id` - Mettre à jour une commande
- `DELETE /api/order/:id` - Supprimer une commande

### Menu
- `GET /api/menu` - Récupérer tous les menus
- `GET /api/menu/:id` - Récupérer un menu
- `POST /api/menu` - Créer un menu
- `PUT /api/menu/:id` - Mettre à jour un menu
- `DELETE /api/menu/:id` - Supprimer un menu

## Configuration MySQL

Base de données: `CorsoFleuri`
User: `root`
Password: (vide)
Port: `3306`

Le serveur créera automatiquement les tables lors du premier démarrage.

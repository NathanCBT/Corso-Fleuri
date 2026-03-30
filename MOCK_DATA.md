# 📊 Données Mock - Corso-Fleuri

## 🎯 Objectif

Remplacer temporairement la base de données MySQL par des données statiques en JavaScript/JSON.

**⚠️ ATTENTION:** Ces données sont statiques et ne persisteront PAS après le redémarrage du serveur!

---

## 📁 Structure des Données

### 1. **Products** (Produits Individuels)

```javascript
{
  id: 1,
  nom: "Espresso",
  prix: 2.50,
  quantite: 45,              // Stock actuel
  type: "chaud",             // chaud, froid
  categorie: "Boisson",      // Boisson, Pâtisserie, Dessert, Sandwich, Salade
  description: "Café espresso court et serré",
  isActive: true,            // Produit actif en vente
  stock: 45,
  image: "espresso.jpg"
}
```

**Fichier:** `src/config/mockData.js` → `products[]`

**Types disponibles:**
- ✅ `chaud` - Produits chauds (café, thé, croissants, etc.)
- ✅ `froid` - Produits froids (café froid, thé glacé, desserts froids, etc.)
- ✅ `dessert` - Catégorie de desserts

---

### 2. **Menus** (Combinaisons de Produits)

```javascript
{
  id: 101,
  nom: "Menu Petit Déjeuner Classique",
  prix: 9.50,
  quantite: 8,               // Menus disponibles
  types: ["chaud", "froid"], // Types inclus dans le menu
  categorie: "Menu",
  description: "Croissant + Espresso + Jus d'orange",
  produits: [7, 1],          // IDs des produits inclus
  isActive: true,
  stock: 8,
  reduction: 5               // 5% de réduction vs prix individuel
}
```

**Fichier:** `src/config/mockData.js` → `menus[]`

---

### 3. **Commandes** (Historique des Ventes)

```javascript
{
  id: 1001,
  numero: "CMD001",
  client: "Alice Martin",
  dateCommande: "2026-03-28T10:30:00",
  produits: [
    {
      id: 1,
      nom: "Espresso",
      quantite: 2,
      prixUnitaire: 2.50,
      sousTotal: 5.00
    }
  ],
  montantTotal: 7.80,
  etat: "livré",             // livré, en_cours_de_préparation, en_attente_de_paiement
  type: "sur_place"          // sur_place, à_emporter, livraison
}
```

**Fichier:** `src/config/mockData.js` → `commandes[]`

**États disponibles:**
- 🟢 `livré` - Commande complétée
- 🟡 `en_cours_de_préparation` - En cuisine
- 🔵 `en_attente_de_paiement` - Pas encore payée

---

### 4. **Utilisateurs**

```javascript
{
  id: 1,
  nom: "Alice Martin",
  email: "alice.martin@email.com",
  role: "client",            // client, caissier, cuisine, admin
  telephone: "06 12 34 56 78",
  adresse: "123 Rue de Paris, 75001 Paris",
  dateInscription: "2025-01-15",
  nombreCommandes: 12,       // Historique des commandes
  montantTotal: 125.50,      // Total dépensé
  isActive: true
}
```

**Fichier:** `src/config/mockData.js` → `utilisateurs[]`

**Rôles disponibles:**
- 👤 `client` - Client standard
- 💳 `caissier` - Personnel caisse
- 👨‍🍳 `cuisine` - Personnel cuisine
- 🔑 `admin` - Administrateur système

---

## 🔧 Fonctions Utilitaires

Les fonctions utilitaires disponibles dans `mockData.js`:

```javascript
// Produits
getProductById(id)           // Récupérer un produit par ID
getProductsByType(type)      // Récupérer tous les produits d'un type
getProductsByCategory(cat)   // Récupérer tous les produits d'une catégorie
getActiveProducts()          // Récupérer les produits actifs

// Menus
getMenuById(id)              // Récupérer un menu par ID
getActiveMenus()             // Récupérer les menus actifs

// Commandes
getCommandeById(id)          // Récupérer une commande par ID
getCommandesByClient(nom)    // Récupérer les commandes d'un client
getCommandesByState(etat)    // Récupérer les commandes par état
getTotalRevenue()            // Revenu total de toutes les commandes
getTotalCommandes()          // Nombre total de commandes
getAverageOrderValue()       // Valeur moyenne des commandes

// Utilisateurs
getUserById(id)              // Récupérer un utilisateur par ID
```

---

## 🚀 Utilisation dans les Models

### Exemple: ProductModel

```javascript
const mockData = require('../config/mockData');

class ProductModel {
  static async getAll() {
    return mockData.getActiveProducts();
  }

  static async getById(id) {
    return mockData.getProductById(id);
  }

  static async getByType(type) {
    return mockData.getProductsByType(type);
  }
}

module.exports = ProductModel;
```

---

## 📡 Endpoints API Disponibles

### Produits
```
GET  /api/products                 # Tous les produits
GET  /api/products/:id             # Un produit par ID
GET  /api/products/type/:type      # Produits par type (chaud/froid)
GET  /api/products/category/:cat   # Produits par catégorie
POST /api/products                 # Créer un produit
```

### Menus
```
GET  /api/menus                    # Tous les menus
GET  /api/menus/:id                # Un menu par ID
GET  /api/menus/type/:type         # Menus par type
POST /api/menus                    # Créer un menu
```

### Commandes
```
GET  /api/commandes                # Toutes les commandes
GET  /api/commandes/:id            # Une commande par ID
GET  /api/commandes/stats          # Statistiques de ventes
GET  /api/commandes/client/:name   # Commandes d'un client
GET  /api/commandes/state/:etat    # Commandes par état
POST /api/commandes                # Créer une commande
PUT  /api/commandes/:id/state      # Mettre à jour l'état
```

### Utilisateurs
```
GET  /api/users                    # Tous les utilisateurs
GET  /api/users/:id                # Un utilisateur par ID
POST /api/users                    # Créer un utilisateur
```

---

## 🔄 Migration vers une Vraie BD

Quand vous êtes prêt à utiliser MySQL:

1. **Décommenter le code dans `src/config/db.js`**
2. **Adapter les models** pour utiliser les requêtes SQL
3. **Garder la structure des données** (mêmes champs)
4. **Supprimer `src/config/mockData.js`**

---

## 📝 Exemple de Test avec cURL

```bash
# Récupérer tous les produits
curl http://localhost:3000/api/products

# Récupérer les produits chauds
curl http://localhost:3000/api/products/type/chaud

# Récupérer un produit spécifique
curl http://localhost:3000/api/products/1

# Créer une commande
curl -X POST http://localhost:3000/api/commandes \
  -H "Content-Type: application/json" \
  -d '{
    "client": "Jean Dupont",
    "produits": [
      {"id": 1, "nom": "Espresso", "quantite": 2, "prixUnitaire": 2.50, "sousTotal": 5.00}
    ],
    "montantTotal": 5.00,
    "type": "à_emporter"
  }'

# Récupérer les statistiques
curl http://localhost:3000/api/commandes/stats
```

---

## 🎨 Ajouter Vos Propres Données

Éditez simplement `src/config/mockData.js`:

```javascript
const products = [
  // Vos produits ici...
  {
    id: 15,
    nom: "Votre Produit",
    prix: 9.99,
    quantite: 50,
    type: "chaud",
    categorie: "Boisson",
    description: "Description de votre produit",
    isActive: true,
    stock: 50,
    image: "votre_image.jpg"
  }
];
```

---

## ⚡ Performance & Limitations

✅ **Avantages des Mock Data:**
- Aucune installation de BD requise
- Tests rapides et faciles
- Pas de configuration SQL

❌ **Limitations:**
- Les données ne persistent PAS après redémarrage
- Pas de synchronisation multi-utilisateurs
- Performance limitée avec beaucoup de données

**➡️ À utiliser pour:** Développement, tests, prototypage

**❌ Ne pas utiliser pour:** Production, applications réelles

---

## 📚 Fichiers Associés

- `src/config/mockData.js` - Données statiques
- `src/config/db.js` - Configuration BD (actuellement commentée)
- `src/models/` - Models utilisant mockData
- `src/controllers/` - Controllers accédant aux models
- `src/routes/` - Routes API

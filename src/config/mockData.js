/**
 * Données Mock - Remplace temporairement la base de données
 * À supprimer une fois la vraie BD en place
 */

// ============================================
// PRODUITS INDIVIDUELS (PRODUIT UNITAIRE)
// ============================================

const products = [
  {
    id: 1,
    nom: "Espresso",
    prix: 2.50,
    quantite: 45,
    type: "chaud",
    categorie: "Boisson",
    description: "Café espresso court et serré",
    isActive: true,
    stock: 45,
    image: "espresso.jpg"
  },
  {
    id: 2,
    nom: "Cappuccino",
    prix: 3.50,
    quantite: 38,
    type: "chaud",
    categorie: "Boisson",
    description: "Espresso avec mousse de lait",
    isActive: true,
    stock: 38,
    image: "cappuccino.jpg"
  },
  {
    id: 3,
    nom: "Latte Macchiato",
    prix: 4.00,
    quantite: 42,
    type: "chaud",
    categorie: "Boisson",
    description: "Lait chaud avec espresso",
    isActive: true,
    stock: 42,
    image: "latte.jpg"
  },
  {
    id: 4,
    nom: "Café Froid",
    prix: 3.00,
    quantite: 50,
    type: "froid",
    categorie: "Boisson",
    description: "Café français refroidi avec glaçons",
    isActive: true,
    stock: 50,
    image: "cold_coffee.jpg"
  },
  {
    id: 5,
    nom: "Frappuccino Caramel",
    prix: 5.00,
    quantite: 35,
    type: "froid",
    categorie: "Boisson",
    description: "Café frappé avec caramel et glaçons",
    isActive: true,
    stock: 35,
    image: "frappuccino.jpg"
  },
  {
    id: 6,
    nom: "Thé Glacé Menthe",
    prix: 3.50,
    quantite: 48,
    type: "froid",
    categorie: "Boisson",
    description: "Thé menthe frais avec glaçons",
    isActive: true,
    stock: 48,
    image: "iced_tea.jpg"
  },
  {
    id: 7,
    nom: "Croissant Beurre",
    prix: 2.80,
    quantite: 25,
    type: "chaud",
    categorie: "Pâtisserie",
    description: "Croissant français feuilleté au beurre",
    isActive: true,
    stock: 25,
    image: "croissant.jpg"
  },
  {
    id: 8,
    nom: "Pain au Chocolat",
    prix: 3.00,
    quantite: 30,
    type: "chaud",
    categorie: "Pâtisserie",
    description: "Pain au chocolat français chaud",
    isActive: true,
    stock: 30,
    image: "pain_chocolat.jpg"
  },
  {
    id: 9,
    nom: "Tarte aux Fraises",
    prix: 5.50,
    quantite: 15,
    type: "froid",
    categorie: "Dessert",
    description: "Tarte aux fraises fraîches",
    isActive: true,
    stock: 15,
    image: "tarte_fraises.jpg"
  },
  {
    id: 10,
    nom: "Tiramisu",
    prix: 6.00,
    quantite: 20,
    type: "froid",
    categorie: "Dessert",
    description: "Dessert italien traditionnel",
    isActive: true,
    stock: 20,
    image: "tiramisu.jpg"
  },
  {
    id: 11,
    nom: "Panna Cotta",
    prix: 5.50,
    quantite: 18,
    type: "froid",
    categorie: "Dessert",
    description: "Crème italienne légère à la vanille",
    isActive: true,
    stock: 18,
    image: "panna_cotta.jpg"
  },
  {
    id: 12,
    nom: "Muffin Myrtille",
    prix: 4.00,
    quantite: 22,
    type: "chaud",
    categorie: "Pâtisserie",
    description: "Muffin américain aux myrtilles",
    isActive: true,
    stock: 22,
    image: "muffin.jpg"
  },
  {
    id: 13,
    nom: "Sandwich Fromage Jambon",
    prix: 7.50,
    quantite: 12,
    type: "chaud",
    categorie: "Sandwich",
    description: "Sandwich classique fromage et jambon",
    isActive: true,
    stock: 12,
    image: "sandwich.jpg"
  },
  {
    id: 14,
    nom: "Salade Grecque",
    prix: 8.50,
    quantite: 10,
    type: "froid",
    categorie: "Salade",
    description: "Salade fraîche à la grecque",
    isActive: true,
    stock: 10,
    image: "salade_grecque.jpg"
  }
];

// ============================================
// MENUS (COMBINAISONS DE PRODUITS)
// ============================================

const menus = [
  {
    id: 101,
    nom: "Menu Petit Déjeuner Classique",
    prix: 9.50,
    quantite: 8,
    types: ["chaud", "froid"],
    categorie: "Menu",
    description: "Croissant + Espresso + Jus d'orange",
    produits: [7, 1], // Croissant + Espresso
    isActive: true,
    stock: 8,
    reduction: 5 // 5% de réduction par rapport au prix individuel
  },
  {
    id: 102,
    nom: "Menu Business Déjeuner",
    prix: 14.50,
    quantite: 15,
    types: ["chaud", "froid"],
    categorie: "Menu",
    description: "Sandwich + Salade + Boisson chaude",
    produits: [13, 14, 3], // Sandwich + Salade + Latte
    isActive: true,
    stock: 15,
    reduction: 8
  },
  {
    id: 103,
    nom: "Menu Gourmand Dessert",
    prix: 12.00,
    quantite: 6,
    types: ["froid", "dessert"],
    categorie: "Menu",
    description: "Tiramisu + Café Froid + Panna Cotta",
    produits: [10, 4, 11], // Tiramisu + Café Froid + Panna Cotta
    isActive: true,
    stock: 6,
    reduction: 3
  },
  {
    id: 104,
    nom: "Menu Pause Café",
    prix: 7.00,
    quantite: 20,
    types: ["chaud"],
    categorie: "Menu",
    description: "Cappuccino + Pain au Chocolat",
    produits: [2, 8], // Cappuccino + Pain au Chocolat
    isActive: true,
    stock: 20,
    reduction: 4
  },
  {
    id: 105,
    nom: "Menu Rafraîchissement",
    prix: 8.50,
    quantite: 12,
    types: ["froid"],
    categorie: "Menu",
    description: "Frappuccino + Thé Menthe + Muffin",
    produits: [5, 6, 12], // Frappuccino + Thé Menthe + Muffin
    isActive: true,
    stock: 12,
    reduction: 6
  }
];

// ============================================
// COMMANDES (HISTORIQUE)
// ============================================

const commandes = [
  {
    id: 1001,
    numero: "CMD001",
    client: "Alice Martin",
    dateCommande: "2026-03-28T10:30:00",
    produits: [
      { id: 1, nom: "Espresso", quantite: 2, prixUnitaire: 2.50, sousTotal: 5.00 },
      { id: 7, nom: "Croissant Beurre", quantite: 1, prixUnitaire: 2.80, sousTotal: 2.80 }
    ],
    montantTotal: 7.80,
    etat: "livré",
    type: "sur_place"
  },
  {
    id: 1002,
    numero: "CMD002",
    client: "Bob Dupont",
    dateCommande: "2026-03-28T12:15:00",
    produits: [
      { id: 13, nom: "Sandwich Fromage Jambon", quantite: 1, prixUnitaire: 7.50, sousTotal: 7.50 },
      { id: 4, nom: "Café Froid", quantite: 1, prixUnitaire: 3.00, sousTotal: 3.00 }
    ],
    montantTotal: 10.50,
    etat: "livré",
    type: "à_emporter"
  },
  {
    id: 1003,
    numero: "CMD003",
    client: "Claire Rossi",
    dateCommande: "2026-03-28T15:45:00",
    produits: [
      { id: 10, nom: "Tiramisu", quantite: 2, prixUnitaire: 6.00, sousTotal: 12.00 },
      { id: 3, nom: "Latte Macchiato", quantite: 2, prixUnitaire: 4.00, sousTotal: 8.00 }
    ],
    montantTotal: 20.00,
    etat: "en_attente_de_paiement",
    type: "sur_place"
  },
  {
    id: 1004,
    numero: "CMD004",
    client: "David Chen",
    dateCommande: "2026-03-29T09:00:00",
    produits: [
      { id: 5, nom: "Frappuccino Caramel", quantite: 3, prixUnitaire: 5.00, sousTotal: 15.00 },
      { id: 9, nom: "Tarte aux Fraises", quantite: 1, prixUnitaire: 5.50, sousTotal: 5.50 }
    ],
    montantTotal: 20.50,
    etat: "en_cours_de_préparation",
    type: "à_emporter"
  },
  {
    id: 1005,
    numero: "CMD005",
    client: "Emma Laurent",
    dateCommande: "2026-03-29T11:20:00",
    produits: [
      { id: 102, nom: "Menu Business Déjeuner", quantite: 1, prixUnitaire: 14.50, sousTotal: 14.50 }
    ],
    montantTotal: 14.50,
    etat: "livré",
    type: "livraison"
  }
];

// ============================================
// UTILISATEURS / CLIENTS
// ============================================

const utilisateurs = [
  {
    id: 1,
    nom: "Alice Martin",
    email: "alice.martin@email.com",
    role: "client",
    telephone: "06 12 34 56 78",
    adresse: "123 Rue de Paris, 75001 Paris",
    dateInscription: "2025-01-15",
    nombreCommandes: 12,
    montantTotal: 125.50,
    isActive: true
  },
  {
    id: 2,
    nom: "Bob Dupont",
    email: "bob.dupont@email.com",
    role: "client",
    telephone: "06 98 76 54 32",
    adresse: "45 Avenue Montaigne, 75008 Paris",
    dateInscription: "2025-06-20",
    nombreCommandes: 8,
    montantTotal: 89.75,
    isActive: true
  },
  {
    id: 3,
    nom: "Caissier Admin",
    email: "caissier@corso-fleuri.com",
    role: "caissier",
    telephone: "01 23 45 67 89",
    adresse: "456 Boulevard Saint-Germain, 75005 Paris",
    dateInscription: "2024-01-01",
    nombreCommandes: null,
    montantTotal: null,
    isActive: true
  },
  {
    id: 4,
    nom: "Chef Cuisine",
    email: "chef@corso-fleuri.com",
    role: "cuisine",
    telephone: "01 98 76 54 32",
    adresse: "456 Boulevard Saint-Germain, 75005 Paris",
    dateInscription: "2024-01-01",
    nombreCommandes: null,
    montantTotal: null,
    isActive: true
  },
  {
    id: 5,
    nom: "Admin Système",
    email: "admin@corso-fleuri.com",
    role: "admin",
    telephone: "01 11 22 33 44",
    adresse: "456 Boulevard Saint-Germain, 75005 Paris",
    dateInscription: "2023-12-01",
    nombreCommandes: null,
    montantTotal: null,
    isActive: true
  }
];

// ============================================
// EXPORTS
// ============================================

module.exports = {
  products,
  menus,
  commandes,
  utilisateurs,
  
  // Fonctions utilitaires
  getProductById: (id) => products.find(p => p.id === id),
  getMenuById: (id) => menus.find(m => m.id === id),
  getCommandeById: (id) => commandes.find(c => c.id === id),
  getUserById: (id) => utilisateurs.find(u => u.id === id),
  
  getProductsByType: (type) => products.filter(p => p.type === type),
  getProductsByCategory: (category) => products.filter(p => p.categorie === category),
  
  getCommandesByClient: (nomClient) => commandes.filter(c => c.client === nomClient),
  getCommandesByState: (etat) => commandes.filter(c => c.etat === etat),
  
  getActiveProducts: () => products.filter(p => p.isActive),
  getActiveMenus: () => menus.filter(m => m.isActive),
  
  getTotalRevenue: () => commandes.reduce((sum, cmd) => sum + cmd.montantTotal, 0),
  getTotalCommandes: () => commandes.length,
  getAverageOrderValue: () => {
    if (commandes.length === 0) return 0;
    return (commandes.reduce((sum, cmd) => sum + cmd.montantTotal, 0) / commandes.length).toFixed(2);
  }
};

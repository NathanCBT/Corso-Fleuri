/**
 * Example Model utilisant MockData
 * Remplace le modèle avec accès à la vraie BD
 */

const mockData = require('../config/mockData');

class ProductModel {
  
  // Récupérer tous les produits
  static async getAll() {
    return mockData.getActiveProducts();
  }

  // Récupérer un produit par ID
  static async getById(id) {
    return mockData.getProductById(id);
  }

  // Récupérer les produits par type (chaud, froid, dessert)
  static async getByType(type) {
    return mockData.getProductsByType(type);
  }

  // Récupérer les produits par catégorie
  static async getByCategory(category) {
    return mockData.getProductsByCategory(category);
  }

  // Créer un nouveau produit (mock)
  static async create(productData) {
    const newProduct = {
      id: mockData.products.length + 1,
      ...productData,
      isActive: true,
      stock: productData.quantite || 0
    };
    mockData.products.push(newProduct);
    return newProduct;
  }

  // Mettre à jour un produit (mock)
  static async update(id, productData) {
    const product = mockData.getProductById(id);
    if (product) {
      Object.assign(product, productData);
    }
    return product;
  }

  // Supprimer un produit (mock)
  static async delete(id) {
    const index = mockData.products.findIndex(p => p.id === id);
    if (index > -1) {
      mockData.products.splice(index, 1);
      return true;
    }
    return false;
  }

}

module.exports = ProductModel;

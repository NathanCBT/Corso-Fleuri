/**
 * Controller pour les Produits
 * Utilise le MockData
 */

const ProductModel = require('../models/productModel');

class ProductController {

  // Récupérer tous les produits
  static async getAll(req, res) {
    try {
      const products = await ProductModel.getAll();
      res.json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Récupérer un produit par ID
  static async getById(req, res) {
    try {
      const product = await ProductModel.getById(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Récupérer les produits par type (chaud, froid, dessert)
  static async getByType(req, res) {
    try {
      const type = req.params.type;
      const products = await ProductModel.getByType(type);
      res.json({
        success: true,
        type: type,
        count: products.length,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Récupérer les produits par catégorie
  static async getByCategory(req, res) {
    try {
      const category = req.params.category;
      const products = await ProductModel.getByCategory(category);
      res.json({
        success: true,
        category: category,
        count: products.length,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Créer un produit
  static async create(req, res) {
    try {
      const product = await ProductModel.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

}

module.exports = ProductController;

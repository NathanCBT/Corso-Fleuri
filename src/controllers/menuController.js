/**
 * Controller pour les Menus
 * Utilise le MockData
 */

const MenuModel = require('../models/menuModel');

class MenuController {

  // Récupérer tous les menus
  static async getAll(req, res) {
    try {
      const menus = await MenuModel.getAll();
      res.json({
        success: true,
        count: menus.length,
        data: menus
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Récupérer un menu par ID
  static async getById(req, res) {
    try {
      const menu = await MenuModel.getById(parseInt(req.params.id));
      if (!menu) {
        return res.status(404).json({
          success: false,
          message: 'Menu not found'
        });
      }
      res.json({
        success: true,
        data: menu
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Récupérer les menus par type
  static async getByType(req, res) {
    try {
      const type = req.params.type;
      const menus = await MenuModel.getByType(type);
      res.json({
        success: true,
        type: type,
        count: menus.length,
        data: menus
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Créer un menu
  static async create(req, res) {
    try {
      const menu = await MenuModel.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Menu created successfully',
        data: menu
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

}

module.exports = MenuController;

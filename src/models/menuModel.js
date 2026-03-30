/**
 * Example Model pour les Menus
 */

const mockData = require('../config/mockData');

class MenuModel {
  
  // Récupérer tous les menus
  static async getAll() {
    return mockData.getActiveMenus();
  }

  // Récupérer un menu par ID
  static async getById(id) {
    return mockData.getMenuById(id);
  }

  // Créer un nouveau menu
  static async create(menuData) {
    const newMenu = {
      id: mockData.menus.length + 101,
      ...menuData,
      isActive: true,
      stock: menuData.quantite || 0
    };
    mockData.menus.push(newMenu);
    return newMenu;
  }

  // Récupérer les menus par type
  static async getByType(type) {
    return mockData.menus.filter(m => m.types.includes(type));
  }

}

module.exports = MenuModel;

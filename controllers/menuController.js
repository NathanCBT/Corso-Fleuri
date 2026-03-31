const { Menu } = require('../models');

// Récupérer tous les menus
const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un menu par ID
const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu non trouvé' });
    }
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un menu
const createMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un menu
const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu non trouvé' });
    }
    await menu.update(req.body);
    res.json(menu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un menu
const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu non trouvé' });
    }
    await menu.destroy();
    res.json({ message: 'Menu supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
};

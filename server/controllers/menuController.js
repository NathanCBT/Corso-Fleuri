import { MenuRepository } from "../repositories/MenuRepository.js";
const menuRepo = new MenuRepository();

export const getAllMenus = async (req, res) => {
  try {
    const menus = await menuRepo.findAll();
    res.json(menus);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const createMenu = async (req, res) => {
  const { name, price, articles } = req.body;
  try {
    await menuRepo.create(name, price, articles);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    await menuRepo.delete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const updateMenu = async (req, res) => {
  const { id } = req.params;
  const { name, price, articles } = req.body;
  try {
    await menuRepo.update(id, name, price, articles);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

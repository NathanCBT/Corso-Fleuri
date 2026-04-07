import { ProductRepository } from "../repositories/ProductRepository.js";
const productRepo = new ProductRepository();

export const getAllProducts = async (req, res) => {
  try {
    const products = await productRepo.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    await productRepo.create(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    await productRepo.update(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productRepo.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addStock = async (req, res) => {
  try {
    await productRepo.addStock(req.body.id, req.body.quantity);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

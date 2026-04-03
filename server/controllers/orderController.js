import { OrderRepository } from "../repositories/OrderRepository.js";
const orderRepo = new OrderRepository();

export const createOrder = async (req, res) => {
  const { seller, price, articles, menus } = req.body;
  try {
    const orderId = await orderRepo.create(
      seller,
      price,
      articles || [],
      menus || [],
    );
    res.json({ success: true, orderId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderRepo.findAllWithDetails();
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

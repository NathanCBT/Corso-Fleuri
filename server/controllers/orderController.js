import { OrderRepository } from "../repositories/OrderRepository.js";
import { printOrderTicket } from "../services/printService.js";

const orderRepo = new OrderRepository();

export const createOrder = async (req, res) => {
  const { seller, price, articles, menus, paymentMethod } = req.body;
  try {
    const orderId = await orderRepo.create(
      seller,
      price,
      articles || [],
      menus || [],
      paymentMethod,
    );

    // Impression du ticket — non bloquant : une erreur imprimante ne fait pas échouer la commande
    const printItems = [
      ...(articles || []).map((a) => ({ name: a.name, quantity: a.quantity, menuGroup: a.menuGroup || null, menuInstance: a.menuInstance ?? null, category: a.category || "" })),
      ...(menus   || []).map((m) => ({ name: m.name, quantity: m.quantity || 1, menuGroup: null, menuInstance: null, category: "" })),
    ];
    printOrderTicket(printItems).catch((err) =>
      console.error('[Impression] Erreur :', err.message),
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

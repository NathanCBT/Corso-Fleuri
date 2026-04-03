import pool from "../config/db.js";

export class OrderRepository {
  async create(seller, price, articles, menus, paymentMethod) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        "INSERT INTO `order` (Seller, Price, PaymentMethod) VALUES (?, ?, ?)",
        [seller, price, paymentMethod || null],
      );
      const orderId = result.insertId;

      for (const art of articles) {
        await connection.query(
          "INSERT INTO orderarticle (IdOrder, IdArticle, Quantity) VALUES (?, ?, ?)",
          [orderId, art.id, art.quantity],
        );
        await connection.query(
          "UPDATE article SET Stock = Stock - ? WHERE Id = ?",
          [art.quantity, art.id],
        );
      }

      for (const menu of menus) {
        await connection.query(
          "INSERT INTO ordermenu (IdOrder, IdMenu) VALUES (?, ?)",
          [orderId, menu.id],
        );
      }

      await connection.commit();
      return orderId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async findAll() {
    const [rows] = await pool.query(
      "SELECT * FROM `order` ORDER BY IdOrder DESC",
    );
    return rows;
  }

  async findAllWithDetails() {
    const [orders] = await pool.query(
      "SELECT * FROM `order` ORDER BY IdOrder DESC",
    );

    for (const order of orders) {
      const [articles] = await pool.query(
        `SELECT oa.IdArticle, oa.Quantity, a.Name, a.Price, c.Name as CategoryName
         FROM orderarticle oa
         JOIN article a ON oa.IdArticle = a.Id
         JOIN category c ON a.IdCategory = c.id
         WHERE oa.IdOrder = ?`,
        [order.IdOrder],
      );
      const [menus] = await pool.query(
        `SELECT om.IdMenu, m.Name, m.Price
         FROM ordermenu om
         JOIN menu m ON om.IdMenu = m.IdMenu
         WHERE om.IdOrder = ?`,
        [order.IdOrder],
      );
      order.articles = articles;
      order.menus = menus;
    }

    return orders;
  }
}

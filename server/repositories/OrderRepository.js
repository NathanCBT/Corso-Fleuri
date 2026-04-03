import pool from "../config/db.js";

export class OrderRepository {
  async create(seller, price, articles, menus) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        "INSERT INTO `order` (Seller, Price) VALUES (?, ?)",
        [seller, price],
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
        `SELECT oa.*, a.Name FROM orderarticle oa
         JOIN article a ON oa.IdArticle = a.Id
         WHERE oa.IdOrder = ?`,
        [order.IdOrder],
      );
      const [menus] = await pool.query(
        `SELECT om.*, m.Name FROM ordermenu om
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

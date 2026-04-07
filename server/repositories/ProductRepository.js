import pool from "../config/db.js";

export class ProductRepository {
  async findAll() {
    const [rows] = await pool.query(`
      SELECT a.*, c.Name as CategoryName 
      FROM article a 
      JOIN category c ON a.IdCategory = c.id
    `);
    return rows;
  }

  async create(productData) {
    const { name, price, stock, quantityMin, idCategory, hot } = productData;
    const [result] = await pool.query(
      "INSERT INTO article (IdCategory, Name, Price, Stock, QuantityMin, Hot) VALUES (?, ?, ?, ?, ?, ?)",
      [idCategory, name, price, stock, quantityMin, hot],
    );

    return result.insertId;
  }

  async update(id, data) {
    await pool.query(
      "UPDATE article SET Name=?, Price=?, Stock=?, QuantityMin=?, IdCategory=?, Hot=? WHERE Id=?",
      [
        data.name,
        data.price,
        data.stock,
        data.quantityMin,
        data.idCategory,
        data.hot,
        id,
      ],
    );
  }

  async delete(id) {
    await pool.query("DELETE FROM article WHERE Id = ?", [id]);
  }

  async addStock(id, quantity) {
    await pool.query("UPDATE article SET Stock = Stock + ? WHERE Id = ?", [
      quantity,
      id,
    ]);
  }
}

import pool from "../config/db.js";

export class MenuRepository {
  async findAll() {
    const [rows] = await pool.query(`
            SELECT m.*, am.IdArticle, am.Quantity, a.Name as ProductName
            FROM menu m
            LEFT JOIN articlemenu am ON m.IdMenu = am.IdMenu
            LEFT JOIN article a ON am.IdArticle = a.Id
        `);

    const menus = {};
    rows.forEach((row) => {
      if (!menus[row.IdMenu]) {
        menus[row.IdMenu] = {
          id: row.IdMenu,
          name: row.Name,
          price: row.Price,
          articles: [],
        };
      }
      if (row.IdArticle) {
        menus[row.IdMenu].articles.push({
          id: row.IdArticle,
          name: row.ProductName,
          quantity: row.Quantity,
        });
      }
    });
    return Object.values(menus);
  }

  async create(name, price, articles) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        "INSERT INTO menu (Name, Price) VALUES (?, ?)",
        [name, price],
      );

      const newMenuId = result.insertId;

      for (const artId of articles) {
        await connection.query(
          "INSERT INTO articlemenu (IdArticle, IdMenu, Quantity) VALUES (?, ?, ?)",
          [artId, newMenuId, 1],
        );
      }

      await connection.commit();
      return newMenuId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async delete(id) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query("DELETE FROM articlemenu WHERE IdMenu = ?", [id]);
      await connection.query("DELETE FROM menu WHERE IdMenu = ?", [id]);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

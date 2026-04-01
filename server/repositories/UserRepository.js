import pool from "../config/db.js";
import { User } from "../models/User.js";

export class UserRepository {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM user");
    return rows.map((row) => User.fromRow(row));
  }

  async create(name, password, rule) {
    const id = Math.floor(Math.random() * 10000);
    await pool.query(
      "INSERT INTO user (IdUnique, Name, Password, Rule) VALUES (?, ?, ?, ?)",
      [id, name, password, rule],
    );
    return id;
  }

  async delete(id) {
    await pool.query("DELETE FROM user WHERE IdUnique = ?", [id]);
  }

  async findByPassword(password) {
    const [rows] = await pool.query("SELECT * FROM user WHERE Password = ?", [
      password,
    ]);

    if (rows.length === 0) return null;

    return User.fromRow(rows[0]);
  }
}

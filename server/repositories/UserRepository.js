import pool from "../config/db.js";
import { User } from "../models/User.js";

export class UserRepository {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM user");
    return rows.map((row) => User.fromRow(row));
  }

  async create(name, password, rule) {
    const [result] = await pool.query(
      "INSERT INTO user (Name, Password, Rule) VALUES (?, ?, ?)",
      [name, password, rule],
    );
    return result.insertId;
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

import pool from "../config/db.js";
import { User } from "../models/User.js";

export class UserRepository {
  async findByPassword(password) {
    const [rows] = await pool.query("SELECT * FROM user WHERE Password = ?", [
      password,
    ]);

    if (rows.length === 0) return null;

    return User.fromRow(rows[0]);
  }
}

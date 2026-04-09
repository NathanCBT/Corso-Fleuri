import pool from "../config/db.js";
import { User } from "../models/User.js";
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(inputPassword, storedValue) {
  // Nouveau format : "salt:hash"
  if (storedValue.includes(":")) {
    const [salt, hash] = storedValue.split(":");
    const hashBuffer = Buffer.from(hash, "hex");
    const derived = scryptSync(inputPassword, salt, 32);
    return timingSafeEqual(hashBuffer, derived);
  }
  // Ancien format : mot de passe en clair (rétrocompatibilité)
  return inputPassword === storedValue;
}

export class UserRepository {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM user");
    return rows.map((row) => User.fromRow(row));
  }

  async create(name, password, rule) {
    const hashed = hashPassword(password);
    const [result] = await pool.query(
      "INSERT INTO user (Name, Password, Rule) VALUES (?, ?, ?)",
      [name, hashed, rule],
    );
    return result.insertId;
  }

  async delete(id) {
    await pool.query("DELETE FROM user WHERE IdUnique = ?", [id]);
  }

  async findByPassword(password) {
    const [rows] = await pool.query("SELECT * FROM user");

    for (const row of rows) {
      if (verifyPassword(password, row.Password)) {
        return User.fromRow(row);
      }
    }
    return null;
  }
}

/**
 * Example Model - Accès à la base de données et logique métier
 * 
 * Utilise: db.js pour les opérations de base de données
 */

const db = require('../config/db');

class UserModel {
  
  static async getAllUsers() {
    try {
      const [users] = await db.query('SELECT * FROM users');
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  static async createUser(userData) {
    try {
      const [result] = await db.query('INSERT INTO users SET ?', userData);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = UserModel;

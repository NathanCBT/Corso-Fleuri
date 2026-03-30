/**
 * Example Controller - Gère la logique des routes
 * 
 * Utilise: Models pour accéder aux données
 * Utilise: Views pour formater les réponses
 */

const UserModel = require('../models/userModel');

class UserController {

  static async getUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserModel.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async createUser(req, res) {
    try {
      const result = await UserModel.createUser(req.body);
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        userId: result.insertId
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

}

module.exports = UserController;

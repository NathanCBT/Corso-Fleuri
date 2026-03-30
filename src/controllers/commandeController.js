/**
 * Controller pour les Commandes
 * Utilise le MockData
 */

const CommandeModel = require('../models/commandeModel');

class CommandeController {

  // Récupérer toutes les commandes
  static async getAll(req, res) {
    try {
      const commandes = await CommandeModel.getAll();
      res.json({
        success: true,
        count: commandes.length,
        data: commandes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Récupérer une commande par ID
  static async getById(req, res) {
    try {
      const commande = await CommandeModel.getById(parseInt(req.params.id));
      if (!commande) {
        return res.status(404).json({
          success: false,
          message: 'Commande not found'
        });
      }
      res.json({
        success: true,
        data: commande
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Récupérer les commandes par client
  static async getByClient(req, res) {
    try {
      const nomClient = req.params.client;
      const commandes = await CommandeModel.getByClient(nomClient);
      res.json({
        success: true,
        client: nomClient,
        count: commandes.length,
        data: commandes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Récupérer les commandes par état
  static async getByState(req, res) {
    try {
      const etat = req.params.etat;
      const commandes = await CommandeModel.getByState(etat);
      res.json({
        success: true,
        etat: etat,
        count: commandes.length,
        data: commandes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Créer une commande
  static async create(req, res) {
    try {
      const commande = await CommandeModel.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Commande created successfully',
        data: commande
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Mettre à jour l'état d'une commande
  static async updateState(req, res) {
    try {
      const { etat } = req.body;
      const commande = await CommandeModel.updateState(parseInt(req.params.id), etat);
      if (!commande) {
        return res.status(404).json({
          success: false,
          message: 'Commande not found'
        });
      }
      res.json({
        success: true,
        message: 'Commande state updated',
        data: commande
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Récupérer les statistiques
  static async getStats(req, res) {
    try {
      const stats = await CommandeModel.getStats();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

}

module.exports = CommandeController;

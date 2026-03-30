/**
 * Example Model pour les Commandes
 */

const mockData = require('../config/mockData');

class CommandeModel {
  
  // Récupérer toutes les commandes
  static async getAll() {
    return mockData.commandes;
  }

  // Récupérer une commande par ID
  static async getById(id) {
    return mockData.getCommandeById(id);
  }

  // Récupérer les commandes par client
  static async getByClient(nomClient) {
    return mockData.getCommandesByClient(nomClient);
  }

  // Récupérer les commandes par état
  static async getByState(etat) {
    return mockData.getCommandesByState(etat);
  }

  // Créer une nouvelle commande
  static async create(commandeData) {
    const newCommande = {
      id: mockData.commandes.length + 1001,
      numero: `CMD${String(mockData.commandes.length + 1).padStart(3, '0')}`,
      dateCommande: new Date().toISOString(),
      etat: 'en_cours_de_préparation',
      ...commandeData
    };
    mockData.commandes.push(newCommande);
    return newCommande;
  }

  // Mettre à jour l'état d'une commande
  static async updateState(id, etat) {
    const commande = mockData.getCommandeById(id);
    if (commande) {
      commande.etat = etat;
    }
    return commande;
  }

  // Récupérer statistiques
  static async getStats() {
    return {
      totalCommandes: mockData.getTotalCommandes(),
      totalRevenue: mockData.getTotalRevenue(),
      averageOrderValue: mockData.getAverageOrderValue(),
      commandesPending: mockData.getCommandesByState('en_cours_de_préparation').length,
      commandesCompleted: mockData.getCommandesByState('livré').length
    };
  }

}

module.exports = CommandeModel;

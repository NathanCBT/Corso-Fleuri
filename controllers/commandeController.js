const { Commande } = require('../models');

// Récupérer toutes les commandes
const getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.findAll();
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une commande par ID
const getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findByPk(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.json(commande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une commande
const createCommande = async (req, res) => {
  try {
    const commande = await Commande.create(req.body);
    res.status(201).json(commande);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour une commande
const updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findByPk(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    await commande.update(req.body);
    res.json(commande);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une commande
const deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByPk(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    await commande.destroy();
    res.json({ message: 'Commande supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande,
};

/**
 * Example Utilities - Fonctions utilitaires réutilisables
 */

const helpers = {
  
  /**
   * Formate une réponse d'erreur
   */
  formatError: (message, status = 500) => {
    return {
      success: false,
      message,
      status
    };
  },

  /**
   * Formate une réponse de succès
   */
  formatSuccess: (data, message = 'Success') => {
    return {
      success: true,
      message,
      data
    };
  },

  /**
   * Valide une adresse email
   */
  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /**
   * Génère un ID unique
   */
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

};

module.exports = helpers;

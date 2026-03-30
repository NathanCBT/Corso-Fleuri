/**
 * Example View - Formatage des réponses
 * 
 * Utilisé pour formater les réponses JSON de manière cohérente
 */

const UserView = {

  /**
   * Affiche la liste des utilisateurs
   */
  showAll: (users) => {
    return {
      success: true,
      count: users.length,
      data: users
    };
  },

  /**
   * Affiche un utilisateur
   */
  show: (user) => {
    return {
      success: true,
      data: user
    };
  },

  /**
   * Affiche le message de création
   */
  created: (userId) => {
    return {
      success: true,
      message: 'User created successfully',
      userId
    };
  },

  /**
   * Affiche le message de suppression
   */
  deleted: () => {
    return {
      success: true,
      message: 'User deleted successfully'
    };
  },

  /**
   * Affiche une erreur
   */
  error: (message, status = 500) => {
    return {
      success: false,
      message,
      status
    };
  }

};

module.exports = UserView;

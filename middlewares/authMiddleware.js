// Middleware d'authentification (placeholder)
const authMiddleware = (req, res, next) => {
  // À implémenter selon vos besoins
  // Vérifier le token JWT, les sessions, etc.
  next();
};

module.exports = authMiddleware;

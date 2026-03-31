// Middleware d'erreur global
const errorHandler = (err, req, res, next) => {
  console.error('Erreur:', err);
  
  const status = err.status || 500;
  const message = err.message || 'Erreur serveur';
  
  res.status(status).json({
    error: {
      status,
      message,
    },
  });
};

module.exports = errorHandler;

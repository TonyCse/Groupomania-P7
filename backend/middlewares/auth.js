 // ajout de jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // récupère le token dans le header de la requête authorization
    const token = req.headers.authorization.split(' ')[1];
    // vérifie le token avec la clé secrète
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Utilisateur non autorisé';
    } else {
      // si tout est bon on execute le middleware suivant en fonction de l'action utilisateur
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
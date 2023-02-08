const jwt = require("jsonwebtoken");
// Importer le package pour utiliser les variables d'environnement
const dotenv = require('dotenv');

const result = dotenv.config();

// Vérification du token pour avoir accès aux fonctionnalitées du site
const verifyToken = (req, res, next) => {
      const authHeader = req.headers.token;
      if(authHeader){
            const token = authHeader;
            jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, user) => {
                  if(err) return res.status(400).json("Une erreur est survenue !");
                  req.user = user;
                  next();
            })
      } else {
            return res.status(400).json("Token non valide")
      }
}

module.exports = { verifyToken };
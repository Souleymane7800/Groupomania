// Importer le package pour utiliser les variables d'environnement
const dotenv = require('dotenv');
const result = dotenv.config();

// Importer mongoose pour me connecter à la base de donnée mongoDB
const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => {
    console.log("Connexion à MongoDB réussie ! Groupomania-api");
});

module.exports = mongoose;
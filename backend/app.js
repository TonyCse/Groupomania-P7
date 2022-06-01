const express = require("express");
const app = express();
const cors = require('cors')
const path =  require('path');
require('dotenv').config();
const Sequelize = require('sequelize');

const userRoutes = require("./routes/user");
const articleRoutes = require("./routes/article");

// ajout du middleware express.json afin d'extraire le corps JSON pour la requête POST
app.use(express.json());

app.use(cors())

// Contourner les erreurs de CORS
app.use((req, res, next) => {
    // autoriser l'accès à l'API depuis n'importe quel port
    res.setHeader('Access-Control-Allow-Origin', '*');
    // ajout des headers aux requêtes envoyées à l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // ajout des méthodes pour envoyer des requêtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/user", userRoutes);
app.use('/api/article', articleRoutes);

module.exports = app;
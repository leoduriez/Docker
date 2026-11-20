// server.js
const express = require('express');
const mongoose = require('mongoose');
const booksRouter = require('./src/routes/books');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI =
    process.env.MONGO_URI || 'mongodb://localhost:27017/bibliotheque';

// route racine
app.get('/', (req, res) => {
    res.json({ message: 'API Livres', endpoints: '/api/books' });
});

// routes de l'API
app.use('/api/books', booksRouter);

// gestion des erreurs (id invalide, erreur mongoose, ...)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Identifiant invalide' });
    }
    res.status(500).json({ message: 'Erreur interne du serveur' });
});

// connexion à MongoDB puis démarrage du serveur
mongoose
    .connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () =>
            console.log(`API livres démarrée sur le port ${PORT}`)
        );
    })
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB :', err.message);
        process.exit(1);
    });

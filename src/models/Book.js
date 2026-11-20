// src/models/Book.js
const mongoose = require('mongoose');

// schéma d'un livre
const bookSchema = new mongoose.Schema(
    {
        titre: { type: String, required: true },
        auteur: { type: String, required: true },
        annee: { type: Number },
        genre: { type: String },
        isbn: { type: String, unique: true, sparse: true },
        pages: { type: Number },
        disponible: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);

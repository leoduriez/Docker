// src/models/Book.js
const mongoose = require('mongoose');

// schéma d'un livre
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    page: { type: Number },
});

module.exports = mongoose.model('Book', bookSchema);

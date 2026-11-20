// src/routes/books.js
const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// GET /api/books -> liste tous les livres
router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// GET /api/books/:id -> récupère un livre par son id
router.get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).json({ message: 'Livre introuvable' });
    }
    res.json(book);
});

// POST /api/books -> crée un nouveau livre
router.post('/', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/books/:id -> met à jour un livre
router.put('/:id', async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!book) {
        return res.status(404).json({ message: 'Livre introuvable' });
    }
    res.json(book);
});

// DELETE /api/books/:id -> supprime un livre
router.delete('/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        return res.status(404).json({ message: 'Livre introuvable' });
    }
    res.status(204).end();
});

module.exports = router;

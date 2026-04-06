const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { getAll, getById, create, update, remove, getSummary, getByCategory } = require('../models/transactionModel');

router.get('/', authenticate, (req, res) => {
  const transactions = getAll(req.user.id, req.user.role);
  res.json(transactions);
});

router.get('/analytics/summary', authenticate, authorize('admin', 'analyst'), (req, res) => {
  const summary = getSummary();
  const byCategory = getByCategory();
  res.json({ summary, byCategory });
});

router.get('/:id', authenticate, (req, res) => {
  const transaction = getById(req.params.id);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  res.json(transaction);
});

router.post('/', authenticate, authorize('admin', 'analyst'), (req, res) => {
  const { title, amount, type, category } = req.body;

  if (!title || !amount || !type || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!['income', 'expense'].includes(type)) {
    return res.status(400).json({ error: 'Type must be income or expense' });
  }

  try {
    const result = create(title, amount, type, category, req.user.id);
    res.status(201).json({ message: 'Transaction created', id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticate, authorize('admin'), (req, res) => {
  const { title, amount, type, category } = req.body;

  if (!title || !amount || !type || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    update(req.params.id, title, amount, type, category);
    res.json({ message: 'Transaction updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, authorize('admin'), (req, res) => {
  try {
    remove(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
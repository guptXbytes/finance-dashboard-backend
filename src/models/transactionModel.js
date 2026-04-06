const db = require('../db/database');

const getAll = (userId, role) => {
  if (role === 'admin' || role === 'analyst') {
    return db.prepare('SELECT * FROM transactions ORDER BY created_at DESC').all();
  }
  return db.prepare('SELECT * FROM transactions WHERE created_by = ? ORDER BY created_at DESC').all(userId);
};

const getById = (id) => {
  return db.prepare('SELECT * FROM transactions WHERE id = ?').get(id);
};

const create = (title, amount, type, category, userId) => {
  return db.prepare('INSERT INTO transactions (title, amount, type, category, created_by) VALUES (?, ?, ?, ?, ?)').run(title, amount, type, category, userId);
};

const update = (id, title, amount, type, category) => {
  return db.prepare('UPDATE transactions SET title = ?, amount = ?, type = ?, category = ? WHERE id = ?').run(title, amount, type, category, id);
};

const remove = (id) => {
  return db.prepare('DELETE FROM transactions WHERE id = ?').run(id);
};

const getSummary = () => {
  return db.prepare(`
    SELECT 
      type,
      SUM(amount) as total,
      COUNT(*) as count
    FROM transactions
    GROUP BY type
  `).all();
};

const getByCategory = () => {
  return db.prepare(`
    SELECT 
      category,
      SUM(amount) as total,
      COUNT(*) as count
    FROM transactions
    GROUP BY category
  `).all();
};

module.exports = { getAll, getById, create, update, remove, getSummary, getByCategory };
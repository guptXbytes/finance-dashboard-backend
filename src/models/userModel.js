const db = require('../db/database');

const findByEmail = (email) => {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
};

const createUser = (name, email, password, role) => {
  return db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(name, email, password, role);
};

const findById = (id) => {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
};

module.exports = { findByEmail, createUser, findById };
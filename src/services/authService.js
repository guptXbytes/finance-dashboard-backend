const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByEmail, createUser } = require('../models/userModel');

const register = (name, email, password, role = 'viewer') => {
  const existing = findByEmail(email);
  if (existing) {
    throw new Error('Email already exists');
  }

  const hashed = bcrypt.hashSync(password, 10);
  const result = createUser(name, email, hashed, role);
  return { id: result.lastInsertRowid, name, email, role };
};

const login = (email, password) => {
  const user = findByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

module.exports = { register, login };
const jwt = require('jsonwebtoken');

exports.generateToken = (userId) => {
  return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '100h' });
};

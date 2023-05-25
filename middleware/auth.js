const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).send('Missing token');
    return;
  }
  try {
    const userId = jwt.verify(token, 'your-secret-key').userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).send('Invalid token');
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

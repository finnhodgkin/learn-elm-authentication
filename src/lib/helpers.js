const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');
const db = require('./../database/db_connection');

const secret = process.env.SECRET_KEY;

const createToken = user => {
  return jwt.sign({ id: user.id, username: user.username }, secret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};

const verifyToken = token => {
  const decoded = jwt.verify(token, secret);
  console.log(decoded);
  return decoded.id;
};

module.exports = { createToken, verifyToken };

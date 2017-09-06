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

module.exports = { createToken };

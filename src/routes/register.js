const bcrypt = require('bcrypt');
const connection = require('../database/db_connection.js');
const { createToken } = require('./../lib/helpers');

module.exports = {
  method: 'POST',
  path: '/register',
  handler: async (req, reply) => {
    const { username, password } = req.payload;
    try {
      const hash = await bcrypt.hash(password, 10);

      try {
        const {
          rows: [id],
        } = await connection.query(
          'INSERT INTO users(username, password) VALUES ($1, $2) RETURNING ID',
          [username, hash]
        );

        const user = {
          id,
          username,
        };

        const token = await createToken(user);
        reply({ auth: token });
      } catch (e) {
        console.log('Error inserting user into the database');
        reply({ error: 'no' });
      }
    } catch (e) {
      console.log('Error hashing password');
      reply({ error: 'no' });
    }
  },
};

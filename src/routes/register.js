const bcrypt = require('bcrypt');
const connection = require('../database/db_connection.js');
const { sign } = require('../lib/jwt-helpers');

module.exports = {
  method: 'POST',
  path: '/register',
  handler: async (/*{ payload: { username, password } }*/ req, reply) => {
    const { username, password } = req.payload;
    try {
      const hash = await bcrypt.hash(password, 10);
      await connection.query(
        'INSERT INTO users(username, password) VALUES ($1, $2)',
        [username, hash]
      );
      reply({ auth: sign({ username }) });
    } catch (e) {
      console.log(e);
      reply({ auth: 'no' });
    }
  },
};

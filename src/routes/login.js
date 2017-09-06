const bcrypt = require('bcrypt');
const connection = require('../database/db_connection.js');
const { createToken } = require('./../lib/helpers');

module.exports = {
  method: 'POST',
  path: '/login',
  handler: async ({ payload: { username, password } }, reply) => {
    try {
      const userRows = await connection.query(
        'SELECT id, password FROM users WHERE username = $1',
        [username]
      );

      const validated = await bcrypt.compare(
        password,
        userRows.rows[0].password
      );

      const user = { id: userRows.rows[0].id, username };

      if (validated) {
        const token = await createToken(user);
        reply({ auth: token });
      } else {
        reply({ error: 'no' });
      }
    } catch (err) {
      console.log(err);
      reply({ error: 'bad' });
    }
  },
};

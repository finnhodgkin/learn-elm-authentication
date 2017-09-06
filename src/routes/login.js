const bcrypt = require('bcrypt');
const connection = require('../database/db_connection.js');
const { createToken } = require('./../lib/helpers');

module.exports = {
  method: 'POST',
  path: '/login',
  handler: async ({ payload: { username, password } }, reply) => {
    try {
      const userRows = await connection.query(
        'SELECT password FROM users WHERE username = $1',
        [username]
      );

      const validated = await bcrypt.compare(
        password,
        userRows.rows[0].password
      );

      if (validated) {
        const token = await createToken(user);
        reply({ auth: token });
      } else {
        reply({ auth: 'no' });
      }
    } catch (err) {
      console.log(err);
      reply({ auth: 'bad' });
    }
  },
};

const bcrypt = require('bcrypt');
const connection = require('../database/db_connection.js');

module.exports = {
  method: 'POST',
  path: '/login',
  handler: async ({ payload: { username, password } }, reply) => {
    try {
      const {
        rows: [{ password: hash }],
      } = await connection.query(
        'SELECT password FROM users WHERE username = $1',
        [username]
      );
      const isValid = await bcrypt.compare(password, hash);
      isValid ? reply({ auth: 'yes' }) : reply({ auth: 'no' });
    } catch (e) {
      console.log(e);
      reply({ auth: 'bad' });
    }
  },
};

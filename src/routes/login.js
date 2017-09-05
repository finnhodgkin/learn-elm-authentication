const bcrypt = require('bcrypt');
const connection = require('../database/db_connection.js');

module.exports = {
  method: 'POST',
  path: '/login',
  handler: ({ payload: { username, password } }, reply) => {
    connection.query(
      'SELECT password FROM users WHERE username = $1',
      [username],
      (err, res) => {
        if (err) console.log(err);

        bcrypt
          .compare(password, res.rows[0].password)
          .then(res => (res ? reply({ auth: 'yes' }) : reply({ auth: 'no' })))
          .catch(err => reply('bad'));
      }
    );
  },
};

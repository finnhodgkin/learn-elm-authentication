const bcrypt = require('bcrypt');
const connection = require('../database/db_connection.js');

module.exports = {
  method: 'POST',
  path: '/register',
  handler: (/*{ payload: { username, password } }*/ req, reply) => {
    const { username, password } = req.payload;
    bcrypt.hash(password, 10).then(hash => {
      connection.query(
        'INSERT INTO users(username, password) VALUES ($1, $2)',
        [username, hash],
        (err, res) => {
          if (err) {
            reply({ auth: 'no' });
          } else {
            reply({ auth: 'yes' });
          }
        }
      );
    });
  },
};

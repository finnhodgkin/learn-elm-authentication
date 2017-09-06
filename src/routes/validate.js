const { verify } = require('../lib/jwt-helpers');

module.exports = {
  method: 'POST',
  path: '/validate',
  handler: (req, reply) => {
    try {
      const { token } = req.payload;
      verify(token)
        ? reply({ secretStuff: 'omg special secret' })
        : reply({ error: 'auth failed' });
    } catch (e) {
      reply({
        message: 'something went wrong',
        error: 'problem with token',
      });
    }
  },
};

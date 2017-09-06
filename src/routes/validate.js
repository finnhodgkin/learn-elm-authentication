const { verifyToken } = require('./../lib/helpers');

module.exports = {
  method: 'POST',
  path: '/validate',
  handler: (req, reply) => {
    verifyToken(req.payload.token);
    //@TODO ADD AUTH CHECK ON TOKEN
    reply({ auth: req.payload.token });
  },
};

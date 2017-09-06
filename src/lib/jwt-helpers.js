const jwt = require('jsonwebtoken');
const secret = process.env.SECRET; //shhhhhhh

const sign = data => jwt.sign(data, secret, { expiresIn: '1d' });

const verify = token => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  sign,
  verify,
};

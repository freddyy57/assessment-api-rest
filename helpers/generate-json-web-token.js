const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
  
    jwt.sign(payload, process.env.PRIVATE_KEY, {
      expiresIn: '5h'
    }, (err, token) => {
      if (err) {
        reject('Unable to generate JWT', err);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  generateJWT
};
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
  const apiKeyId = req.cookies.apiKey;

  if (!apiKeyId) {
    return res.status(401).json({
      msg: 'missing apiKey you have to log in'
    });
  }

  try {
    const { uid } = jwt.verify(apiKeyId, process.env.PRIVATE_KEY);

    if (uid) {
      next();
    } else {
      return res.status(401).json({
        msg: 'Unauthorized!'
      });
    }
  } catch (error) {
    return res.status(401).json({
      msg: 'invalid apiKeyId'
    });
  }
};

module.exports = {
  validateJWT
};
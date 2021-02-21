const { response, request } = require('express');
const { generateJWT } = require('../helpers/generate-json-web-token');

const loginOauth = async (req = request, res = response) => {
  const { token } = req.data;

  if (!token) {
    res.status(400).json({
      msg: 'Unauthorized!'
    });
  }

  try {
    const apiToken = await generateJWT(req.body);
  
    res.status(200).json({
      msg: 'Login Success!',
      apiToken
    });
  }
  catch( error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk with administator',
      apiToken
    });
  }

};

module.exports = {
  loginOauth
};
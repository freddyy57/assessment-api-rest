const { response, request } = require('express');
const { generateJWT } = require('../helpers/generate-json-web-token');

const loginOauth = async (req = request, res = response) => {

  try {
    const apiKeyId = await generateJWT(req.body);

    res.cookie('apiKey',apiKeyId,{
      maxAge:9000000,
      httpOnly:true,
      overwrite: true
    })

    res.status(200).json({
      msg: 'Login Success!'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'An error has occurred, please contact your administartor'
    });
  }
};

module.exports = {
  loginOauth
};
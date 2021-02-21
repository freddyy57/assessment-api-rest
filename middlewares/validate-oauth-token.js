const axios = require('axios');

const oauthTokenVerification = async (req, res, next) => {
  const { clientID, clientSecret } = req.body;

  if (!clientID || !clientSecret) {
    return res.status(400).json({
      msg: 'Missing data on body request',
    });
  }

  const data = {
    'client_id': clientID,
    'client_secret': clientSecret
  };
  const url = process.env.AUTH_URI;

  try {
    const oauthReasponse = await axios({
      method: 'post',
      url,
      data
    });
    const { token, type } = oauthReasponse.data;

    if (token && type === 'Bearer') {
      req.data = oauthReasponse.data;
      req.body = clientID;
      next();
    } else {
      return res.status(403).json({
        msg: 'access denied, please verify your credentials'
      });
    }

  } catch (err) {
    return res.status(500).json({
      msg: 'something went wrong, please try later or contact your administartor',
      err
    })
  }
};

module.exports = {
  oauthTokenVerification
};
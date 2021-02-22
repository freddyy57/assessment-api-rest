const axios = require('axios');

const renewOauthToken = async (res) => {
  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const url = process.env.AUTH_URI + '/login';

  const data = {
    'client_id': clientID,
    'client_secret': clientSecret
  };

  try {
    const oauthReasponse = await axios({
      method: 'post',
      url,
      data
    });

    const { token, type } = oauthReasponse.data;

    if (token && type === 'Bearer') {
      // Store token on cookie
      // Store token on a cookie
      res.cookie('oauthCookie',token,{
        maxAge:'9000000',
        httpOnly:true,
        overwrite: true
      });

      return true;

    } else {
      return res.status(403).json({
        msg: 'access denied, please verify your credentials'
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: 'something went wrong, please try later or contact your administartor',
      err
    });
  }
};

module.exports = {
  renewOauthToken,
};
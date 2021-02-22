const axios = require('axios');

const requestApiClient = async (req, res, endPoint) => {
  const oauthCookie = req.cookies.oauthCookie;

  if (!oauthCookie) {
    return res.status(401).json({
      msg: 'Invalid Accesss, you must have to log In'
    })
  }

  const url = process.env.AUTH_URI;
  const urlEndPoint = `${url}${endPoint}`;
  const headers = {
    'Authorization': 'Bearer ' + oauthCookie
  }

  try {
    let oauthReasponse = await axios.get(urlEndPoint, {headers: headers});
    
    if (oauthReasponse.data) {
      return oauthReasponse;
    } 

  } catch (err) {
    req.error = err;
  }
};

module.exports = {
  requestApiClient,
};


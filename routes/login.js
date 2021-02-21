const { Router } = require('express');
const { check } = require('express-validator');
const { loginOauth } = require('../controllers/login');
const { validateFields } = require('../middlewares/validate-fields');
const { oauthTokenVerification } = require('../middlewares/validate-oauth-token');
const router = Router();

router.post('/', [
  check('clientID', 'You must provide clientID').not().isEmpty(),
  check('clientSecret', 'You must provide clientSecret').not().isEmpty(),
  validateFields,
  oauthTokenVerification
], loginOauth);

module.exports = router;
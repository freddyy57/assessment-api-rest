const { Router } = require('express');
const { 
  clientsController,
  clientsDetail,
  policiesClientsDetail,
  clientsByName
} = require('../controllers/clients');
const { validateJWT } = require('../middlewares/vallidate-jwt');
const router = Router();
// All Clients
router.get('/', [
  validateJWT
], clientsController);
// Clients detail by ID
router.get('/:id', [
  validateJWT
], clientsDetail);
// Clients By Name
router.get('/:name', [
  validateJWT
], clientsByName);
// Clients Policies
router.get('/:id/policies', [
  validateJWT
], policiesClientsDetail);


module.exports = router;
const expect = require('chai').expect;
const sinon = require('sinon');
const { 
  clientsController,
  clientsDetail,
  policiesClientsDetail,
  clientsByName
} = require('../controllers/clients');
const dependencyModule = require('../helpers/request-api-client');

describe('Validate clients controller', function() {
    const dataClients = [
      {
          "id": "8fa5fe43-339d-4671-a024-d423f480c333",
          "name": "Pacheco",
          "email": "pachecoblankenship@quotezart.com",
          "role": "user"
      },
      {
          "id": "8c6f51ee-089b-413d-9fa0-71741c8089d8",
          "name": "Mae",
          "email": "maeblankenship@quotezart.com",
          "role": "admin"
      },
      {
          "id": "31cdee85-d0d1-43c1-9d87-9390dc4c445d",
          "name": "Morris",
          "email": "morrisblankenship@quotezart.com",
          "role": "admin"
      },
      {
          "id": "38d9da1a-35f8-4924-8480-c8f4db7fdd96",
          "name": "Singleton",
          "email": "singletonblankenship@quotezart.com",
          "role": "admin"
      },
      {
          "id": "50769e92-42c1-423d-9892-443daa57f8b0",
          "name": "Deana",
          "email": "deanablankenship@quotezart.com",
          "role": "user"
      },
      {
          "id": "474b95f1-4b6f-43b7-807e-50b7ea8cc150",
          "name": "Maxwell",
          "email": "maxwellblankenship@quotezart.com",
          "role": "user"
      },
      {
          "id": "400e895c-8341-4aee-a609-e42ba7a3c54a",
          "name": "Barker",
          "email": "barkerblankenship@quotezart.com",
          "role": "user"
      },
      {
          "id": "017761e7-fa66-4cb9-834a-56bcfead1fd8",
          "name": "Sims",
          "email": "simsblankenship@quotezart.com",
          "role": "admin"
      },
      {
          "id": "f4a86b31-0ff4-4b78-bc99-f2d8c46d5a0e",
          "name": "Elisa",
          "email": "elisablankenship@quotezart.com",
          "role": "admin"
      },
      {
          "id": "7c669276-b8a1-44ff-88d9-7a88a2bbfe94",
          "name": "Claudette",
          "email": "claudetteblankenship@quotezart.com",
          "role": "admin"
      }
    ];

    const policiesData = [
      {
          "id": "64cceef9-3a01-49ae-a23b-3761b604800b",
          "amountInsured": "1825.89",
          "email": "inesblankenship@quotezart.com",
          "inceptionDate": "2016-06-01T03:33:32Z",
          "installmentPayment": true,
          "clientId": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
      },
      {
          "id": "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
          "amountInsured": "399.89",
          "email": "inesblankenship@quotezart.com",
          "inceptionDate": "2015-07-06T06:55:49Z",
          "installmentPayment": true,
          "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
      },
      {
          "id": "56b415d6-53ee-4481-994f-4bffa47b5239",
          "amountInsured": "2301.98",
          "email": "inesblankenship@quotezart.com",
          "inceptionDate": "2014-12-01T05:53:13Z",
          "installmentPayment": false,
          "clientId": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
      },
      {
          "id": "6f514ec4-1726-4628-974d-20afe4da130c",
          "amountInsured": "697.04",
          "email": "inesblankenship@quotezart.com",
          "inceptionDate": "2014-09-12T12:10:23Z",
          "installmentPayment": false,
          "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
      },
      {
          "id": "25202f31-fff0-481c-acfd-1f3ff2a9bcbe",
          "amountInsured": "2579.16",
          "email": "inesblankenship@quotezart.com",
          "inceptionDate": "2016-05-03T04:58:48Z",
          "installmentPayment": false,
          "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
      },
      {
          "id": "15b4430d-96f8-468e-98c0-3caaf8b0b3b6",
          "amountInsured": "645.65",
          "email": "inesblankenship@quotezart.com",
          "inceptionDate": "2016-01-15T02:56:48Z",
          "installmentPayment": true,
          "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
      }
    ];

    let getClientsData;
    const req = {};
    req.params = {};
    req.params.id = '8c6f51ee-089b-413d-9fa0-71741c8089d8';
    req.params.name = "Claudette";
    const res = {
      send: function(){},
      json: function(d) {
          console.log("\n : " + d);
      },
      status: function(s) {
          this.statusCode = s;
          return this;
      }
    };

    beforeEach(function () {
      getClientsData = sinon.stub(dependencyModule, "requestApiClient");
    });

    afterEach(function () {
      getClientsData.restore();
    });

   it('should return 200 status', async function() {
    getClientsData.returns(Promise.resolve(dataClients));

    clientsController(req, res, {}, () => {}).then(result => {
        expect(result).to.have.property('status').to.equal(200);
        done();
    })
  });

  it('should return 200 status searching client by id', async function() {
    getClientsData.returns(Promise.resolve(dataClients));

    clientsDetail(req, res, {}, () => {}).then(result => {
        expect(result).to.have.property('status').to.equal(200);
        done();
    })
  });

  it('should return 200 status searching client by name', async function() {
    getClientsData.returns(Promise.resolve(dataClients));

    clientsByName(req, res, {}, () => {}).then(result => {
        expect(result).to.have.property('status').to.equal(200);
        done();
    })
  });

  it('should return 200 status searching policies by client id', async function() {
    getClientsData.returns(Promise.resolve(policiesData));

    policiesClientsDetail(req, res, {}, () => {}).then(result => {
        expect(result).to.have.property('status').to.equal(200);
        done();
    })
  });
  
});
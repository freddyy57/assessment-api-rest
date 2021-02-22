const { response, request } = require('express');
const { paginatedData } = require('../helpers/paginated-data');
const { requestApiClient } = require('../helpers/request-api-client');
const { renewOauthToken } = require('../helpers/renew-oauth-token');

const clientsController = async (req = request, res = response) => {
  let clientsData = null;
  let oauthToken = null;

  try {
    clientsData = await requestApiClient(req, res, '/clients');

    if (!clientsData && req.error) {
      oauthToken = await renewOauthToken(res);
    }

    if (oauthToken) {
      clientsData = await requestApiClient(req, res, '/clients');
    }

    if (clientsData.data.length > 0) {
      const results = paginatedData(clientsData.data, req);

      return res.status(200).json({
        results
      });
    }
    return res.status(204).json({
      msg: 'There are no clients in your records'
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error has occurred, please contact your administartor'
    });
  }
};

const clientsDetail = async (req = request, res = response) => {
  const { id } = req.params;
  let clientsData = null;
  let results = null;
  let oauthToken = null;

  try {
    clientsData = await requestApiClient(req, res, '/clients');

    if (!clientsData && req.error) {
      oauthToken = await renewOauthToken(res);
    }

    if (oauthToken) {
      clientsData = await requestApiClient(req, res, '/clients');
    }

    if (clientsData.data.length > 0) {
      const clientsRecords = clientsData.data;

      results = clientsRecords.filter((client) => client.id === id);

      return res.status(200).json({
        results
      });
    }

    return res.status(204).json({
      msg: 'There are no clients in your records'
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error has occurred, please contact your administartor'
    });
  }
};

const policiesClientsDetail = async (req = request, res = response) => {
  const { id } = req.params;
  let policiesClientsData = null;
  let results = null;
  let oauthToken = null;

  try {
    policiesClientsData = await requestApiClient(req, res, '/policies');

    if (!policiesClientsData && req.error) {
      oauthToken = await renewOauthToken(res);
    }

    if (oauthToken) {
      policiesClientsData = await requestApiClient(req, res, '/policies');
    }

    if (policiesClientsData.data.length > 0) {
      const policiesClientsRecords = policiesClientsData.data;
      results = policiesClientsRecords.filter((policies) => policies.clientId === id);

      return res.status(200).json({
        results
      });
    }

    return res.status(204).json({
      msg: 'There are not policies for this client in your records'
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error has occurred, please contact your administartor'
    });
  }
};

const clientsByName = async (req = request, res = response) => {
  const { name } = req.params;
  console.log('name', name);
  let clientsData = null;
  let results = null;
  let oauthToken = null;

  try {
    clientsData = await requestApiClient(req, res, '/clients');

    if (!clientsData && req.error) {
      oauthToken = await renewOauthToken(res);
    }

    if (oauthToken) {
      clientsData = await requestApiClient(req, res, '/clients');
    }

    if (clientsData.data.length > 0) {
      const clientsRecords = clientsData.data;

      results = clientsRecords.filter((client) => client.name === name);

      return res.status(200).json({
        results
      });
    }

    return res.status(204).json({
      msg: 'There are no clients in your records'
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error has occurred, please contact your administartor'
    });
  }
};

module.exports = {
  clientsController,
  clientsDetail,
  policiesClientsDetail,
  clientsByName
};
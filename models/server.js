const express = require('express');
const cors = require('cors');
const loginRoute = require('../routes/login');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.login = '/login';
    this.policies = '/policies';
    this.clients = '/clients';

    // Midlewares
    this.middlewares();

    // API Routes
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Read and Body Parser
    this.app.use(express.json());
    // Public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.login, loginRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port:', this.port);
    });
  }
}

module.exports = Server;

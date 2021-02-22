const express = require('express');
const cors = require('cors');
const loginRoute = require('../routes/login');
const clientsRoute = require('../routes/clients');
const cookieParser  = require('cookie-parser');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.login = '/login';
    this.clients = '/clients';
    this.policies = '/policies';

    // Midlewares
    this.middlewares();

    // API Routes
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors({
      origin: [
        'http://localhost:3000'
      ]
    }));
    // Read and Body Parser
    this.app.use(express.json());
    // Public directory
    this.app.use(express.static('public'));
    // Cookie Parser
    this.app.use(cookieParser());
  }

  routes() {
    this.app.use(this.login, loginRoute);
    this.app.use(this.clients, clientsRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port:', this.port);
    });
  }
}

module.exports = Server;

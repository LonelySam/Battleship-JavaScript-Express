const express = require('express');
const app = express()

class Server {
  static init({port = 3000}) {
    return app.listen(port)
  }
}

module.exports = Server;

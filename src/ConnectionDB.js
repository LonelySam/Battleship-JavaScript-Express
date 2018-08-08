const Sequelize = require('sequelize');

const connectionDB = new Sequelize('Battleship', 'sa', '123', {
  host: 'localhost',
  port: '1433',
  dialect: 'mssql',
  dialectOptions: {
    instanceName: 'MSSQLSERVER',
    encrypt: true
  },
  operatorsAliases: false
});

module.exports = connectionDB;

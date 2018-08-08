const Sequelize = require('sequelize');

function connectDB() {
    const sequelize = new Sequelize('Battleship', 'sa', '123', {
      host: 'localhost',
      port: '1433',
      dialect: 'mssql',
      dialectOptions: {
        instanceName: 'MSSQLSERVER',
        encrypt: true
      },
      operatorsAliases: false
    });
    return sequelize;
}

module.exports = connectDB;

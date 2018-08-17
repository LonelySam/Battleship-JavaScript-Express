const Sequelize = require('sequelize');

function generateGameSchema(sequelizeInstance) {
  return sequelizeInstance.define('Game', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rows: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cols: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    max_ships: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },
  {
    timestamps: false,
    tableName: 'Game',
    freezeTableName: true,
  });
}

module.exports = generateGameSchema;

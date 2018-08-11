const Sequelize = require('sequelize');

function generateGameSchema(sequelizeInstance) {
  return sequelizeInstance.define('Game', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    challenger: {
      type: Sequelize.STRING,
      allowNull: false
    },
    adversary: {
      type: Sequelize.STRING,
      allowNull: true
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'Game',
    freezeTableName: true,
  });
}

module.exports = generateGameSchema;

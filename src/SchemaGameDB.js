const Sequelize = require('sequelize');

function generateSchemaGame(instanceSequalize) {
    const sequelize = instanceSequalize;

    const Game = sequelize.define('Game', {
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

    return Game;
}

module.exports = generateSchemaGame;

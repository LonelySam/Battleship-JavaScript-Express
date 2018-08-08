const Sequelize = require('sequelize');

function generateSchemaGame(instance, dropTable) {
    const sequelize = instance;

    const Game = sequelize.define('Game', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
      tableName: 'Game',
    });

    // force: true will drop the table if it already exists
    Game.sync({force: dropTable})
      .then(() => console.log("Creation of table Game succesful"))
      .catch(error => console.log(error))

    return Game;
}

module.exports = generateSchemaGame;

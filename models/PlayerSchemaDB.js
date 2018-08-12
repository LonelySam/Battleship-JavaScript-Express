const Sequelize = require('sequelize');
const generateGameSchema = require('./GameSchemaDB.js');

function generatePlayerSchema(sequelizeInstance) {
  return Player = sequelizeInstance.define('Player', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    game_id: {
      type: Sequelize.INTEGER,
      references: {
        model: generateGameSchema(sequelizeInstance),
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    tableName: 'Player',
    freezeTableName: true,
  });
}

module.exports = generatePlayerSchema;

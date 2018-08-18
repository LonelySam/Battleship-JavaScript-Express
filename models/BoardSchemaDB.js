const Sequelize = require('sequelize');

const generatePlayerSchema = require('./PlayerSchemaDB.js');

function generateBoardSchema(sequelizeInstance) {
  return sequelizeInstance.define('Board', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    player_id: {
      type: Sequelize.STRING,
      references: {
        model: generatePlayerSchema(sequelizeInstance),
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    tableName: 'Board',
    freezeTableName: true,
  })
}

module.exports = generateBoardSchema;

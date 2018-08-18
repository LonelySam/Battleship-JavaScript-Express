const Sequelize = require('sequelize');

function generateShipSchema(sequelizeInstance) {
  return sequelizeInstance.define('Ship', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    size: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'Ship',
    freezeTableName: true,
  });
}

module.exports = generateShipSchema;

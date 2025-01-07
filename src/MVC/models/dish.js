  const { DataTypes, Model } = require("sequelize");
  let dbConnect = require("../dbConnect");
  const sequelizeInstance = dbConnect.Sequelize;
  class Dish extends Model {}
  // Sequelize will create this table if it doesn't exist on startup
  Dish.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Image: {
        type: DataTypes.STRING,
        allowNull: true,
        required: false,
        unique: false,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: true,
        required: false,
        unique: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: true,
        required: false,
        unique: false,
      },
      Price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        required: false,
        unique: false,
      }
    },
    {
      sequelize: sequelizeInstance,
      modelName: "dishes", // use lowercase plural format
      timestamps: true,
      freezeTableName: true,
    }
  );
  
  module.exports = Dish;

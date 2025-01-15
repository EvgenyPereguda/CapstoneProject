const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class Place extends Model {}
// Sequelize will create this table if it doesn't exist on startup
Place.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: false,
      unique: true
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: "places", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Place;
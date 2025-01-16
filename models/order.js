const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class Order extends Model {}
// Sequelize will create this table if it doesn't exist on startup
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "orders", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Order;


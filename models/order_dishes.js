const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class Order_Dish extends Model {}
// Sequelize will create this table if it doesn't exist on startup
Order_Dish.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
    },
    // DishId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   autoIncrement: false,
    //   primaryKey: false,
    // },

    // selfGranted: DataTypes.BOOLEAN
  },
  {
    sequelize: sequelizeInstance,
    modelName: "order_dishes", // use lowercase plural format
    timestamps: false,
  }
);

module.exports = Order_Dish;
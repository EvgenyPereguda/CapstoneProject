"use strict";
const Customer = require("./customer"); //require the model
const Dish = require("./dish")
const Place = require("./place")
const Order = require("./order")
const Order_Dish = require("./order_dishes")


async function init() {
  await Customer.sync(); // sync the model
  await Dish.sync();
  await Place.sync();
  await Order.sync();
  await Order_Dish.sync();
  // also sync any extra models here
 
}

init();


Order.belongsTo(Customer);
Order.belongsTo(Place);

// const Order_Dish = sequelizeInstance.define('order_dishes', {
//   selfGranted: DataTypes.BOOLEAN
// }, { timestamps: false });

Dish.belongsToMany(Order, {through: Order_Dish});
Order.belongsToMany(Dish, {through: Order_Dish});

// Dish.belongsToMany(Order, {
//   through: "order_dish",
//   as: "orders",
//   foreignKey: "dishId"
// });

// Order.belongsToMany(Dish, {
//   through: "order_dish",
//   as: "dishes",
//   foreignKey: "orderId"
// });


module.exports = {
  Customer, // export the model
  Dish,
  Place,
  Order
  // also export any extra models here
};


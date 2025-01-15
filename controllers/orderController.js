"use strict";
const Models = require("../models");


const getOrders = (req, res) => {
  
  if (req.query.hasOwnProperty("join")){  
    Models.Order.read("join")
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  }
  else{   
  
    Models.Order.findAll({})
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  }
}


const getOrderQuery = (req, res) => {
  
  if (req.query.hasOwnProperty("join")){  
    
      Models.Order.findAll({
        include: [{
          model: Models.Place,
          required: true
         }],
        where: { id: req.params.id } })
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  }
  else if (req.query.hasOwnProperty("dishes")){  
    
    Models.Order_Dish.findAll({
      include: [{
        model: Models.Dish,
        required: true
       }],
      where: { OrderId: req.params.id }
    })
    .then((order_dishes) => {        

      res.send({ result: 200, data: order_dishes });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
}
else{   
  
    Models.Order.read()
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  }
}


const createOrder = (req, res) => {

  if (req.query.hasOwnProperty("dishList")){ 
    
    const dishIDList = req.query.dishList.split(",");

    
      Models.Order.create(req.body)
      .then(async (data) => {

        dishIDList.forEach(async (dishID)=>{          

          let lOrder_Dish = {"OrderId": data.id, "dishId": dishID};

          await Models.Order_Dish.create(lOrder_Dish);

        })    

        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  }
}


const deleteOrder = (req, res) => {    
    Models.Order.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });

    Models.Order_Dish.destroy({ where: { OrderId: req.params.id } })
}


module.exports = {
  getOrders,
  getOrderQuery,
  createOrder,
  deleteOrder
};
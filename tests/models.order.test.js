import { describe, it, expect, assert } from 'vitest'
require("dotenv").config();

const Models = require("../src/MVC/models");
 
describe('Orders', async () => {

    let data = {};

    let orderID = 0;

    let placeID = 0;

    let customerID = 0;

    let dish1ID = 0;
    
  it('Init', async () => {


    let placeJSON = {"Number":"110"};        
    const place = await Models.Place.create(placeJSON);
  
    
    let customerJSON = {"Email":"john@gmail.com"};        
    const customer = await Models.Customer.create(customerJSON);


    let dish1JSON = {"Image":"none", "Name":"Dish1", "Description":"Description", "Price":"25"};

    const dish1 = await Models.Dish.create(dish1JSON);


    data = {"customerId":`${customer.id}`, "placeId":`${place.id}`};   

    placeID = place.id;

    customerID = customer.id;

    dish1ID = dish1.id;

  })


  it('Create order', async () => {

    const order = await Models.Order.create(data);

    orderID = order.id;

  })

  
  it('Add dish', async () => {

    const order = await Models.Order.findByPk(orderID);

    const dish1 = Models.Dish.findByPk(dish1ID);

    order.addDish(dish1.id);
  })

  


  
    it('Delete order', async () => {
      await Models.Order.destroy({ where: { id: orderID } });
    })



    
    it('Clear', async () => {
           
        await Models.Place.destroy({ where: { id: placeID } });

        await Models.Customer.destroy({ where: { id: customerID } });

        await Models.Dish.destroy({ where: { id: dish1ID } });
    
      })
})

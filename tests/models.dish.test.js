import { describe, it, expect, assert } from 'vitest'
require("dotenv").config();

const Models = require("../src/MVC/models");
 
describe('Dishes', () => {

  let data = {"Image":"none", "Name":"Dish1", "Description":"Description", "Price":"25"};

  it('Create dish', async () => {

    await Models.Dish.create(data);

  })

  let placeId = 0;

  it('Get dish', async () => {

    const place = await Models.Dish.findAll({attributes: ["id","Name"] })
        
    placeId = place[0].id;   

  })

  
  it('Update dish', async () => {

    let newDescription = "NewDescription";

    let newData = {"Description":`${newDescription}`};

    await Models.Dish.update(newData, {
      where: { id: placeId },
      returning: true,
    });
   
    const place = await Models.Dish.findAll({where: { id: placeId }, attributes: ["id","Description"] })
        
    const Description = place[0].Description;   

    assert.isTrue(Description == newDescription, `${Description} != ${newDescription}`)
  })

  
  it('Delete dish', async () => {
    await Models.Dish.destroy({ where: { id: placeId } });
  })
  
})

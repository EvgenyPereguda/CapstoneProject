import { describe, it, expect, assert } from 'vitest'
require("dotenv").config();

const Models = require("../src/MVC/models");


 
describe('Places', () => {

  let data = {"Number":"10"};

  it('Create place', async () => {

    await Models.Place.create(data);

  })

  let placeId = 0;

  it('Get place', async () => {

    const place = await Models.Place.findAll({where: { Number: data.Number }, attributes: ["id","Number"] })
        
    placeId = place[0].id;   

  })

  
  it('Update place', async () => {

    let newNumber = 20;

    let newData = {"Number":`${newNumber}`};

    await Models.Place.update(newData, {
      where: { id: placeId },
      returning: true,
    });
   
    const place = await Models.Place.findAll({where: { id: placeId }, attributes: ["id","Number"] })
        
    const Number = place[0].Number;   

    assert.isTrue(Number == newNumber, `${Number} != ${newNumber}`)

    newNumber = newNumber + 1;

    assert.isTrue(Number != newNumber, `${Number} != ${newNumber}`)
  })

  
  it('Delete place', async () => {
    await Models.Place.destroy({ where: { id: placeId } });
  })
  
})



const request = require("supertest");

const app = require("../app");

describe("Place Routes", () => {


  test("POST /api/places/create => Create", async() => {

    const payload = {Number: '1' };

    return request(app)
      .post('/api/places/create')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ result: number1 + number2 });
      });
  });


});

const request = require("supertest");

const app = require("../app");

require("dotenv").config();

let dbConnect = require("../dbConnect");

describe("Place Routes", () => {


  test("POST /api/places/create => Create", () => {

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


//   const payload = {name: 'john', email: 'xyz@sadfjak.com', password: '2342388' };
// const res = await request(app)
            // .post('/api/register')
            // .send(payload)
            // .set('Content-Type', 'application/json')
            // .set('Accept', 'application/json')


  // let number1 = Math.floor(Math.random() * 1_000_000);
  // let number2 = Math.floor(Math.random() * 1_000_000);

  // test("GET /calculator/add => Add", () => {
  //   return request(app)
  //     .get(`/calculator/add?num1=${number1}&num2=${number2}`)
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).toEqual({ result: number1 + number2 });
  //     });
  // });

  // test("GET /calculator/sub => Sub", () => {
  //   return request(app)
  //     .get(`/calculator/sub?num1=${number1}&num2=${number2}`)
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).toEqual({ result: number1 - number2 });
  //     });
  // });

  // test("GET /calculator/div => Div", () => {
  //   return request(app)
  //     .get(`/calculator/div?num1=${number1}&num2=${number2}`)
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).toEqual({ result: (number1 / number2).toString() });
  //     });
  // });

  // test("GET /calculator/mult => Mult", () => {
  //   return request(app)
  //     .get(`/calculator/mult?num1=${number1}&num2=${number2}`)
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).toEqual({ result: (number1 * number2) });
  //     });
  // });
});

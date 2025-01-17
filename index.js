
const app = require('./app');
const stripe = require('./stripe');
const port = 3000; // change this to run the app on a different port - usually a 4 digit number


stripe.init();


// starts the backend app on the given port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(`Example app listening at http://localhost:${port}/managment.html`);
});
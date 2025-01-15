
const app = require('./app');
const port = 3000; // change this to run the app on a different port - usually a 4 digit number


// const swaggerUi = require('swagger-ui-express');
// swaggerDocument = require('./swagger.json');
// app.use('/api-docs',  swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// starts the backend app on the given port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(`Example app listening at http://localhost:${port}/managment.html`);
});
const express = require("express");
const router = require('./routes/root');
const ErrorHandling = require('./error-handling/middleware');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1' , router);

app.use(ErrorHandling);

app.listen(3002, () => {
  console.log("Listening on port 3002");
});

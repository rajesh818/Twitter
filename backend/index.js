const express = require("express");
const { prisma } = require("./db-client");
const routes = require('./routes/root');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1' , routes);

app.get("/", async (req, res) => {
  const newUser = await prisma.user.findMany();
  res.status(201).json(newUser);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(3002, () => {
  console.log("Listening on port 3002");
});

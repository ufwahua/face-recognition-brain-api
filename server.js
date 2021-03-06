const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { register } = require("./controllers/register");
const signin = require("./controllers/signin");
const { profile } = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  // Enter your own database information here based on what you created
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "1234",
    database: "smart_brain",
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) => {
  register(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleImageApi(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

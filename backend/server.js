const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const RegisterController = require("./controllers/RegisterController");

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "Production") {
  require("dotenv").config();
}

app.use(cors());
app.use(express.json()); //helps us for json response

app.get("/", (req, res) => {
  res.send("Hello from nodemon");
});

app.post("/register", RegisterController.store);

try {
  mongoose
    .connect(process.env.mongo_DB_Connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("MongoDB connected..."));
} catch (error) {
  console.log(error);
}

app.listen(PORT, (res) => console.log(`Listening on port: ${PORT}`));

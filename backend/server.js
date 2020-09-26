const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

// Add JWT Token(DONE)
// Return token when login(OK)
// Send token on request(OK)
// Create function to to protect routers
// Add function/middleware to routers
// Modify response to decode the token

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

try {
  mongoose.connect(process.env.mongo_DB_Connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDb connected successfully!");
} catch (error) {
  console.log(error);
}

app.use("/files", express.static(path.resolve(__dirname, "..", "files")));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

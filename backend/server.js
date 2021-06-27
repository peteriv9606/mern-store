var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
const app = express();
var bodyParser = require("body-parser");

require("dotenv/config");

const MONGO_URI =
  "mongodb+srv://admin:admin@maincluster.xxs1n.mongodb.net/mern-store?retryWrites=true&w=majority";
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  (err) => {
    if (!err) console.log("Connection to db successful!");
  }
);
//API
require("./routes/user")(app);
require("./routes/dashboard")(app);
require("./routes/login")(app);
require("./routes/register")(app);
require("./routes/products")(app);
require("./routes/product")(app);
require("./routes/message")(app);

// Accessing the path module
const path = require("path");
//Stuff from tutorials to try to connect to heroku
// Step 1:

/* 
app.use(express.static(path.resolve(__dirname, "../frontend/build")));
// Step 2:
app.get("*", function (request, response) {
  console.log("SERVER REQUEST FROM FRONTEND *");
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
}); */

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

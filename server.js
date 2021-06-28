var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
const app = express();
var bodyParser = require("body-parser");

require("dotenv/config");

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (!err) console.log("Connection to db successful!");
  }
);
//API
require("./routes/login")(app);
require("./routes/register")(app);
require("./routes/user")(app);
require("./routes/dashboard")(app);
require("./routes/products")(app);
require("./routes/message")(app);

// Accessing the path module
const path = require("path");

//Stuff from tutorials to try to connect to heroku
// Step 1:

app.use(express.static(path.resolve(__dirname, "./frontend/build")));
// Step 2:
app.get("*", function (request, response) {
  console.log("SERVER REQUEST FROM FRONTEND *");
  response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

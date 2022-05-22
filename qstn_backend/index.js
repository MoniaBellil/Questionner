const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const cookieParser = require('cookie-parser');
// Bring in the app constants
const { DB, PORT } = require("./config");
const mongoose = require('./loaders/mongoose');
// Initialize the application
const app = exp();
// Import Routes
var users = require('./routes/users')
var questions = require('./services/questions');
var Survey = require('./services/Survey');
var nfts = require('./routes/nfts');
var userSur = require('./routes/UserSur');
// Middlewares
app.use(cors());
app.use(bp.json({limit:'50mb'}));
app.use(passport.initialize());
app.use(bp.urlencoded({limit:'50mb'}));
app.use(cookieParser());
require("./middlewares/passport")(passport);

// User Router Middleware
app.use("/users/",users);
app.use("/questions/", questions);
app.use("/Surveys/", Survey);
app.use("/nfts/", nfts);
app.use("/userSur/", userSur);

const startApp = async () => {
  try {
    // Connection With DB
    await mongoose();

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true
    });

    // Start Listenting for the server on PORT
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true
    });
    startApp();
  }
};

startApp();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const { SECRET } = require("../config");
const passportSetup = require('../config/passport-setup');
const userRegister = async (userDets, role, res) => {
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    // create a new user
    const newUser = new User({
      ...userDets,
      password,
      role
    });

    await newUser.save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login.",
      success: true
    });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};
const userLogin = async (userCreds, res) => {
  let { username, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({$or: [{'email': username}, {'username': username}]}).select('+password');
  
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false
    });
  }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        email: user.email
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      point: user.point,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};

const updateFirstLogin = async (req, res) => {
  await User.findOneAndUpdate({
    _id: req.body.idUser
  },{
      $set: {
        firstLogin: false
      }
  },{
      upsert: true
  },async function(err, newUser){
      if(err) {
          res.status(500).json({'error':"error updating User"});
      } else {
          res.status(200).json({'success':"User Updated"});
      }
  });
}

const updatePoint = async (req, res) => {
  const user = await User.findById(req.body.idUser);
  await User.findOneAndUpdate({
    _id: req.body.idUser
},{
    $set: {
      point: req.body.totalPoint
    }
},{
    upsert: true
},async function(err, newUser){
    if(err) {
        return res.send('error updating User');
    } else {
        const userUpdate = await User.findById(req.body.idUser);
        const reslt=userUpdate.point
        return res.status(200).send(reslt.toString());
    }
});

};
const updateUser = async (req, res) => {
  await User.findOneAndUpdate({
    _id: req.body.id
},{
    $set: {
      phone: req.body.phone,
      country: req.body.country,
      bio: req.body.bio,
      username: req.body.name,
      displayPicture: req.body.displayPicture
    }
},{
    upsert: true
},async function(err, newUser){
    if(err) {
        return res.send('error updating User');
    } else {
        const userUpdate = await User.findById(req.body.id);
        return res.status(200).send(userUpdate.toString());
    }
});

};
const getPoint = async (req, res) => {
  const user = await User.findById(req.body.idUser);
  return res.status(200).send(user.point.toString());
};
const validateUsername = async username => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const userAuth = passport.authenticate("jwt", { session: false });

const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

const validateEmail = async email => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = user => {
  return {
    username: user.username,
    email: user.email,
    _id: user._id,
    point:user.point,
    role:user.role,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};
const getUserByToken=async (req, res) => {
  const id= serializeUser(req.user)._id;
  const user = await User.findById(id);
  return user;
};
const googleLogin = passport.authenticate('google', {
  session: false,
  scope: ["profile", "email"],
  accessType: "offline",
  approvalPrompt: "force"
});
const googlecallBack = passport.authenticate('google', { session: false });

const gooleToken=async function(req, res) {
  // Validate the username
  let usernameNotTaken = await validateUsername(req.user.displayName);
  // validate the email
  let emailNotRegistered = await validateEmail(req.user.emails[0].value);
  if (!usernameNotTaken || !emailNotRegistered) {
    const user = await User.findOne({$or: [{'email': req.user.emails[0].value}, {'username': req.user.displayName}]});
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false
    });
  }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(req.user.id, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        email: user.email
        
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    res.cookie('token', `Bearer ${token}`);
  // Successful authentication, redirect home.
  return res.redirect("http://localhost:3001/Terms-conditions");
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
  }

  
  // Get the hashed password
  const password = await bcrypt.hash(req.user.id, 12);
  const role="user";
  // create a new user
  const newUser = new User({
    "email":req.user.emails[0].value,
    
    password,
    role
  });

  const user=await newUser.save();
  let token = jwt.sign(
      {
        user_id: user._id,
        role: role,
        email: req.user.emails[0].value
      },
      SECRET,
      { expiresIn: "7 days" }
    );
    res.cookie('token', `Bearer ${token}`);
  // Successful authentication, redirect home.
  return res.redirect("http://localhost:3001/Terms-conditions");
}
module.exports = {
  userAuth,
  checkRole,
  userLogin,
  userRegister,
  serializeUser,
  updatePoint,
  googleLogin,
  googlecallBack,
  gooleToken,
  getPoint,
  getUserByToken,
  updateUser
};

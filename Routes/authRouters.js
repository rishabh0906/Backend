const express = require("express");
const userRouter = express.Router();
const userModel = require("../Models/usermodel");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_Key } = require("../config");
const sendMail = require("../Services/SignUpMail");
const sendTokenMail = require("../Services/ResetMail");

//----------routes-----------
authRouter.route("/signup").post(setCreatedAt, signupUser);
// to do ResetPassword
authRouter.route("/forgetPassword").post(forgetPassword);
authRouter.route("/resetPassword").post(CheckToken,resetPassword);

authRouter.route("/login").post(loginUser);

//---------functions----------------

async function CheckToken(req, res, next) {
  let { token } = req.body;
  try {
    let user = await userModel.findOne({ token });
    if (user) {
      next();
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
}
async function resetPassword(req, res) {}
async function forgetPassword(req, res, next) {
  let { email } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (user) {
      let token = Math.floor(Math.random() * 100000) + 100000;
      await sendTokenMail(email, token);
      let NewUser = await userModel.findOne({ email });
      console.log(NewUser);
      res.status(200).send({ message: "token sent to your mail" });
    } else {
      res.send({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Error Occurred" });
  }
}

function setCreatedAt(req, res, next) {
  let obj = req.body;
  //keys ka arr -> uska length
  let length = Object.keys(obj).length;
  if (length == 0) {
    return res
      .status(400)
      .json({ message: "cannot create user if req.body is empty" });
  }
  req.body.createdAt = new Date().toISOString();
  next();
}

async function signupUser(req, res) {
  // let userDetails=req.body;
  // let name=userDetails.name;
  // let email=userDetails.email;
  // let password=userDetails.password;
  try {
    let userObj = req.body;
    await sendMail(userObj);
    // user.push({email,name,password});
    //put all data in mongo db
    // create document in userModel
    let user = await userModel.create(userObj);
    console.log("user", user);
    res.json({
      message: "user signedUp",
      user: userObj,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
}

function validateEmail(req, res) {
  console.log("in validateEmail function");
  console.log(req.body);
  //hw to check if email is correct or not -> @ , .
  //indexOf
  res.json({
    message: "data received",
    data: req.body,
  });
}

async function loginUser(req, res) {
  try {
    //email password
    if (req.body.email) {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        if (req.body.password == user.password) {
          let payload = user["_id"];
          let token = jwt.sign({ id: payload }, JWT_Key);
          res.cookie("login", token, { httpOnly: true });
          return res.json({
            message: "user loged in",
          });
        } else {
          return res.json({
            message: "email or password is wrong",
          });
        }
      } else {
        return res.json({
          message: "User not Found",
        });
      }
    } else {
      return res.json({
        message: "user is not present",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = authRouter;

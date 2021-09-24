const express = require("express");
const userModel = require("../Models/usermodel");
const userRouter = express.Router();
const protectRoute = require("../Routes/protectRoute");

userRouter
  .route("/")
  .get(protectRoute, getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);
function getUserById(req, res) {
  console.log(req.params);
  res.json(req.params.id);
}

async function getUser(req, res) {
  console.log("get User Called");
  try {
    let users = await userModel.find();
    if (users) return res.json(users);
    else return res.json({ message: "Users Not Found" });
  } catch (err) {
    return res.json({ message: err.message });
  }
}

function createUser(req, res) {
  user = req.body;
  // console.log(req.body);
  res.send("data has been added succesfully");
}

function updateUser(req, res) {
  let obj = req.body;
  for (let key in obj) {
    user[key] = obj[key];
  }
  res.json(user);
}

function deleteUser(req, res) {
  user = {};
  res.json(user);
  // res.send('ussr has been deleted');
}

module.exports = userRouter;

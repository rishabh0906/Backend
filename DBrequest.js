const express = require("express");
let app = express();

const port = 5000;
app.listen(port, () => {
  console.log("Server Listening at 5000");
});

app.use(express.static("public", { root: __dirname }));

app.use(express.json());

const authRouter = express.Router();

app.route("/auth", authRouter);

authRouter.route("/signup").post(setCreatedAt, signupUser);

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
const {userModel} = require("./models/userModel");
async function signupUser(req, res) {
  // let userDetails=req.body;
  // let name=userDetails.name;
  // let email=userDetails.email;
  // let password=userDetails.password;
  try {
    let userObj = req.body;
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

const express = require("express");
const app = express();
const path=require("path")

const userRouter = express.Router();
const authRouter = express.Router();
app.listen("5000", function () {
  console.log("server listening on port 5000");
});

app.use((req, res, next) => {
  console.log("middleware1");
  next();
});
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use(express.static(path.join("public/forget.html",__dirname)));

//mounting in express
userRouter
  .route("/")
  .get(getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);


authRouter.route("/signup").post(signupUser);

authRouter.route("/forgetPwd").get(ForgetPage);

authRouter.route("/newpwd").post(ForgotPwdEmail);

function ForgetPage(req,res){
  
  res.sendFile("public",{root:__dirname});
}

function ForgotPwdEmail(req, res) {
  console.log(req.body);
}

// Redirect route
app.get("/user-all", (req, res) => {
  res.redirect("/user");
});

userRouter.route("/:id").get(getUserById);
// 404 page   -- Page Not Found
app.use((req, res) => {
  res.sendFile("public/404.html", { root: __dirname });
});

let User = [];
function signupUser(req, res) {
  let { email, name, password } = req.body;
  User.push({ email, name, password });
  console.log("user", req.body);
  res.json({
    message: "user signedUp",
    User: req.body,
  });
}

let user = {};
// client <- server
//crud- create read update delete
//read
// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

app.get("/user", getUser);

function getUser(req, res) {
  res.json(user);
}

//post request
// client-> server
//create
app.post("/user", createUser);

function createUser(req, res) {
  user = req.body;
  // console.log(req.body);
  res.send("data has been added succesfully");
}
//update
app.patch("/user", updateUser);

function updateUser(req, res) {
  let obj = req.body;
  for (let key in obj) {
    user[key] = obj[key];
  }
  res.json(user);
}
//delete
app.delete("/user", deleteUser);

function deleteUser(req, res) {
  user = {};
  res.json(user);
  // res.send('ussr has been deleted');
}
//param route
app.get("/user/:id");
function getUserById(req, res) {
  console.log(req.params);
  res.json(req.params.id);
}

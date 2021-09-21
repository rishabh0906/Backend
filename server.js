const express = require("express");
const CookieParser=require("cookie-parser");
const app = express();
const path=require("path")
const userRouter = require("./Routes/userRouters");
const authRouter = express.Router();
app.listen("5000", function () {
  console.log("server listening on port 5000");
});

app.use(CookieParser());
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use(express.static(path.join("public/forget.html",__dirname)));

//mounting in express


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

// app.get("/user", getUser);



//post request
// client-> server
//create
// app.post("/user", createUser);


//update
// app.patch("/user", updateUser);


//delete
// app.delete("/user", deleteUser);


//param route
// app.get("/user/:id");

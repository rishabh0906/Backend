const express = require("express");
const CookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const userRouter = require("./Routes/userRouters");
const authRouter = require("./Routes/authRouters");
const planRouter = require("./Routes/planRouters");
const ReviewRouter = require("./Routes/reviewRouters");
app.listen("5000", function () {
  console.log("server listening on port 5000");
});

app.use(express.static(path.join("public", __dirname)));
app.use(CookieParser());
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/plans", planRouter);
app.use("/reviews", ReviewRouter);

//mounting in express

// Redirect route
// app.get("/user-all", (req, res) => {
//   res.redirect("/user");
// });

// // 404 page   -- Page Not Found
// app.use((req, res) => {
//   res.sendFile("public/404.html", { root: __dirname });
// });

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

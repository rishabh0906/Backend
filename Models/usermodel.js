const mongoose = require("mongoose");
const password = "4XfeGGJF5rA5jLGC";
const user = "rishabh_0906";

const validator = require("email-validator");

mongoose
  .connect(
    `mongodb+srv://${user}:${password}@cluster0.nzlxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then((db) => {
    console.log(db);
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    validate: function () {
      return validator.validate(this.email);
    },
  },
  pwd: {
    type: String,
    required: true,
    min: 8,
  },
  confirmPwd: {
    type: String,
    required: true,
    min: 8,
    validate: function () {
      return this.confirmPwd == this.pwd;
    },
  },
});

const userModel = mongoose.model("userModel", userSchema);

(async function create() {
  let user = {
    name: "Rishabh",
    age: "20",
    email: "ac@gmail.com",
    pwd: "12345678",
    confirmPwd: "12345678",
  };

  let userdata = await userModel.create(user);

  console.log(userdata);
})();

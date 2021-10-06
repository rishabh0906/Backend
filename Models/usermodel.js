const mongoose = require("mongoose");
const { db_link } = require("../config");

const validator = require("email-validator");

mongoose
  .connect(db_link)
  .then((db) => {
    console.log("db Connected")
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
    unique: true,
    validate: function () {
      return validator.validate(this.email);
    },
  },
  pwd: {
    type: String,
    required: true,
    min: 8,
  },

  createdAt: {
    type: String,
  },
  confirmPwd: {
    type: String,
    required: true,
    min: 8,
    validate: function () {
      return this.confirmPwd == this.pwd;
    },
  },
  token:{
    type:String
  }
});

userSchema.pre("save", function () {
  return (this.confirmPwd = undefined);
});

userSchema.methods.resetHandler=function (){
    this.token=undefined;
}

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;

// (async function create() {
//   let user = {
//     name: "Rishabh",
//     age: "20",
//     email: "ac@gmail.com",
//     pwd: "12345678",
//     confirmPwd: "12345678",
//   };

//   let userdata = await userModel.create(user);

//   console.log(userdata);
// })();

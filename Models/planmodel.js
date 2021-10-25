const mongoose = require("mongoose");
let { db_link } = require("../config");
const validator = require("email-validator");
mongoose
  .connect(db_link)
  .then(function (connection) {
    console.log("db has been conncetd");
  })
  .catch(function (error) {
    console.log("err", error);
  });
//mongoose -> data -> exact -> data -> that is required to form an entity
//  data completness , data validation
// name ,email,password,confirmPassword-> min ,max,confirmPassword,required ,unique
const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "kindly pass the name"],
    unique: [true, "plan name should be unique"],
    // errors
    maxlength: [40, "Your plan length is more than 40 characters"],
  },
  duration: {
    type: Number,
    required: [true, "You Need to provide duration"],
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    validate: {
      validator: function () {
        return this.discount < this.price;
      },
      message: "Discount must be less than actual price",
    },
  },
  planImages: {
    type: [String],
  },
  // reviews, averagerating
  reviews: {
    //   array of object id
    type: [mongoose.Schema.ObjectId],
    ref: "reviewModel",
  },
  averageRating: Number,
});
// model
let planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;

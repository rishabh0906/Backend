const schema = {
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  delivery: {
    type: Boolean,
    required: true,
  },
  meal: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
};

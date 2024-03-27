const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    prodName: {
      type: String,
      required: [true, "mimetype must be a string"],
    },
    prodPrice: {
      type: String,
      required: [true, "price type must be a number"],
    },
    prodSnippet: {
      type: String,
      required: [true, "expects string type"],
    },
    prodDetails: {
      type: String,
      required: [true, "expects string type"],
    },
    prodImg_url: {
      type: String,
      required: [true, "expects string type"],
    },
    prodImg_id: {
      type: String,
      required: [true, "expects string type"],
    },
    prodLikes: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("Ecomprod", productSchema);
module.exports = {
  product,
};

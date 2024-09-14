import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  productdescription: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  }
});

const Product = mongoose.model("Product", productSchema);
export default Product;

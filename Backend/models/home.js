import mongoose from "mongoose";

const Imageschema = new mongoose.Schema({
  homeImage:{
    type: String,
  },
})

export const Homeimages = mongoose.model("imageschema",Imageschema)
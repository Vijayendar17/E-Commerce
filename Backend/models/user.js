import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username:{
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  image:{
      type: String,
      default: "data:image/png;base64,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"
  },
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    }
  ],
  Admin:{
    type: String,
    default: "Buyer",
  },
  orders:[
    
  ]
})

const User = mongoose.model("User",userSchema)

export default  User;
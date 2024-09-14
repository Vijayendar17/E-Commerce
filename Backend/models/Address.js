import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
  },
  number: { 
    type: Number,
    required: true,
  },
  state: { 
    type: String, 
    required: true,
  },
  address: { 
    type: String, 
    required: true,
  },
  pincode: { 
    type: Number, 
    required: true,
  },
  district: { 
    type: String, 
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;

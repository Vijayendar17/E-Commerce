import jwt from 'jsonwebtoken';
import Address from '../models/Address.js';
import User from '../models/user.js';

export const addressroute = async (req, res) => {
  try {
    const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).send({ success: false, message: 'Authorization required' });
    }

    const decodedData = jwt.verify(token, process.env.jwt_Token_Secret);
    const realuser = decodedData.email;

    const userdata = await User.findOne({ email: realuser });

    if (!userdata) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    const { district, address, state, pincode, number, name } = req.body;

    
    const newAddress = await Address.create({
      district,
      address,
      state,
      pincode,
      number,
      name,
      user: userdata._id, 
    });

    userdata.address.push(newAddress._id);
    await userdata.save();

    res.status(201).send({
      success: true,
      message: 'Address is saved',
      Address: newAddress,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'An error occurred while saving the address.',
    });
  }
};

export const Addressdelete = async(req,res)=>{
  try {
    const addressId = req.params.id;
    
    const address = await Address.findById(addressId)
   
    const userbyaddress = await User.findById(address.user);

    if (userbyaddress) {
      
      userbyaddress.address.pull(addressId);
      await userbyaddress.save();
    }
      const datatosave= await Address.findByIdAndDelete(addressId)
      
    
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Server error, unable to delete address' });
  }
}
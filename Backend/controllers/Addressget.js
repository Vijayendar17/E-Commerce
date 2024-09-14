import Address from '../models/Address.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const getUserAddress = async (req, res) => {
  try {
    const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

    if (!token) return res.status(401).send({ success: false, message: 'Authorization required' });

    const decodedData = jwt.verify(token, process.env.jwt_Token_Secret);
    const realuser = decodedData.email;

    const userdata = await User.findOne({ email: realuser }).populate('address');
    if (!userdata) return res.status(404).send({ success: false, message: 'User not found' });

    res.status(200).send({
      success: true,
      address: userdata.address,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'An error occurred while fetching address.' });
  }
};

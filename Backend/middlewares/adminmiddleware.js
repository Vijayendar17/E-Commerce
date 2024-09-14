import jwt from 'jsonwebtoken'
import User from '../models/user.js';

export const adminUser = async(req,res,next)=>{
  try {
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').replace('Bearer ', ''));
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    
      const decode = jwt.verify(token,process.env.jwt_Token_Secret)
      const useremail = decode.email;
      
      const user = await User.findOne({email:useremail})
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
        
      }
      res.send({
        user: user.Admin,
        success: true,
      })
  } catch (error) {
      console.log(error);
  }
}
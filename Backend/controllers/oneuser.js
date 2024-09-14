import User from "../models/user.js";
import jwt from 'jsonwebtoken'
export const getoneuser = async(req,res)=>{
  try {
    const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

    const data = jwt.verify(token,process.env.jwt_Token_Secret)
    
     const user = await User.findOne({email: data.email})
     res.send({
      user,
     })
    
  } catch (error) {
    console.error(error)
  }
}
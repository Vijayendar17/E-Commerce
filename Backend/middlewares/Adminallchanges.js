import User from "../models/user.js";
import jwt from 'jsonwebtoken'

export const OpAddress = async(req,res)=>{
  const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').replace('Bearer ', ''));
  const decode = jwt.verify(token,process.env.jwt_Token_Secret)
  const allusers = await User.find()
  res.send({
    allusers: allusers,
    succes: true,
  })
}
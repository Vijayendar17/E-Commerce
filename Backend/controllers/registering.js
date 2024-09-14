import User from "../models/user.js";
import bcryptjs from 'bcryptjs'


 export const registerController = async(req,res)=>{
  const {email,password,username} = req.body;
  if(!email){
    return res.send({error: "email is required"})
  }
  if(!password){
    return res.send({error: "password is required"})
  }
  if(!username){
    return res.send({error: "username is required"})
  }
  const user = await User.findOne({email})
  if(user){
    return res.status(400).json({ error: "User already exists" });
  }
  const saltpassword =  bcryptjs.genSaltSync(10)
  const hashpassword = await bcryptjs.hash(password,saltpassword)

  const userdata = await User({
    email,
    password:hashpassword,
    username,
  })
  const data= await userdata.save()

    

  res.status(201).send({
    success: true,
    message: "user is sussusfully registered",
    user:{
      username: data.username,
      email: data.email
    }
  })
}


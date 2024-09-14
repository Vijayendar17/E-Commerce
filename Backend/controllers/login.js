import User from "../models/user.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Please signup first" });
    }

    const realPassword = await bcryptjs.compare(password, user.password);
    if (!realPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email,username: user.username}, process.env.JWT_TOKEN_SECRET, { expiresIn: "12d" });

   
  res.cookie('token', token, {
    httpOnly: true,
    secure: true, 
  });

    return res.status(200).send({
      message: "User is logged in",
      user: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

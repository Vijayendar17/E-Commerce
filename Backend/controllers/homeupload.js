import { Homeimages } from "../models/home.js";
import cloudinary from "../helper/cloudinary.js";
export const imageUpload = async (req,res)=>{
  const {imageurl} =req.body;
  try {
    const uploadimage = await cloudinary.uploader.upload(imageurl,{folder: "ecommerce-home"})
    const imagehome = await Homeimages({
      homeImage: uploadimage.url,
    })
     await imagehome.save()
  } catch (error) {
    res.send(error)
  }
}
export const getImage = async(req,res)=>{
  const Homeimg = await Homeimages.find()
  res.send({Homeimg})
}

export const deleteHomeimg = async(req,res)=>{
  const id = req.params.id;
  const home = await Homeimages.findByIdAndDelete(id)
}

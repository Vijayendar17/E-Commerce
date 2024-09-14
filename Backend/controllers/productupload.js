import Product from "../models/Product.js";
import cloudinary from '../helper/cloudinary.js'

export const uploadfiles = async(req,res)=>{
  
  try {
    const {productName,productDescription,price,previewimg} = req.body;
     const urlimg = await cloudinary.uploader.upload(previewimg,{folder: "/images-ecommerce"});
    const productdata = await Product({
      productname: productName,
      price: price,
      productdescription: productDescription,
      image: urlimg.url,
    })
    const productdatasave = await productdata.save()

  } catch (error) {
    console.error(error)
  }
}

export const getproduct = async(req,res)=>{
  const productdata = await Product.find()
  res.send({
    productdata,
    success: true,
  })
}
import Product from "../models/Product.js"
export const getproductone = async(req,res)=>{
  const {id} = req.params;
  const productdata = await Product.findById(id)

  res.send({
    productdata,
  })
}
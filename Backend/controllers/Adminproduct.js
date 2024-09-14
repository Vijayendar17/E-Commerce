import Product from "../models/Product.js";

export const productdelete = async(req,res)=>{
  const productid = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(productid);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({message: "product deleted"})
  } catch (error) {
    console.error(error)
  }
}


export const productupdatedata =async(req,res)=>{
  const productId = req.params;
  const updateData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData, 
    { new: true, runValidators: true } 
  );
 await updatedProduct.save()
} 
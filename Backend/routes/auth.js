import express from 'express';
import { registerController } from '../controllers/registering.js';
import { login } from '../controllers/login.js';
import { adminUser } from '../middlewares/adminmiddleware.js';
import {addressroute,Addressdelete} from '../controllers/address.js'
import { getUserAddress } from '../controllers/Addressget.js';
import {OpAddress} from '../middlewares/Adminallchanges.js'
import { getproduct, uploadfiles } from '../controllers/productupload.js';
import {productdelete, productupdatedata} from '../controllers/Adminproduct.js'
import multer from 'multer';
import { imageUpload,getImage,deleteHomeimg } from '../controllers/homeupload.js';
import { getproductone } from '../controllers/product.js';
import {getoneuser} from '../controllers/oneuser.js'
const storage = multer.memoryStorage(); 
const upload = multer({ storage });
const router = express.Router();

router.post("/signup", registerController);
router.post("/login", login);
router.post("/address", addressroute);
router.get("/admin", adminUser);
router.get("/adminusers",OpAddress)
router.get("/address",getUserAddress)
router.delete("/address/:id",Addressdelete)
router.post("/uploadproduct",upload.single("previewimg"),uploadfiles)
router.get("/getadminproductdata",getproduct)
router.delete("/deleteadminproductdata/:id",productdelete)
router.delete("/updateadminproductdata/:id",productupdatedata)
router.post("/uploadhomeimage",upload.single("imageurl"),imageUpload)
router.get("/gethomeimage",getImage)
router.get("/product/:id",getproductone)
router.get("/user",getoneuser)
router.delete("/deletehomeimage/:id",deleteHomeimg)

export default router;


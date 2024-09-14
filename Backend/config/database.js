import mongoose from "mongoose";

function connect(){
try {
  mongoose.connect(process.env.Mongo_db).then(()=>{
    console.log("database is connected");
    
  })
} catch (error) {
  console.log(error);
}
}

export default connect
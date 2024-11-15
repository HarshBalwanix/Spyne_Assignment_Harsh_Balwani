const mongoose=require("mongoose");
require("dotenv").config();

exports.connect = ()=>{
  mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("Database connected successfully.")
    }).catch((error)=>{
        console.log("SomeError in database connection " + error.message );
        process.exit(1);
    })
}
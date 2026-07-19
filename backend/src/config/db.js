const mongoose = require('mongoose')
require('dotenv').config();


async function main(){
  try{
      await mongoose.connect(process.env.MONGO_URI);
  }catch(err){
     throw new Error("Db connection error : "+err.message)
  }
}

module.exports=main;
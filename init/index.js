const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// for calling main function
main().then(() =>{
    console.log("Connected to DB ");
}).catch((err)=>{
    console.log(err);
});

//for create a db in mongodb 
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
};

const initDb = async (req,res) =>{
   await  Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({...obj, owner: "67dbafa957026cbcc823dab7"})); // har ek listing ka owner set kar diya
   await Listing.insertMany(initData.data);
   console.log("Data was Initialized");
}

initDb();

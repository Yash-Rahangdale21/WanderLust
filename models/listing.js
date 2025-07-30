const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type:String,
        required:true,
    },
    description : String,
    image: {
        filename:String,
        url: {
            type: String,
            default: "https://unsplash.com/photos/a-wooden-table-topped-with-vases-filled-with-flowers-QeVMDp0wohM",
        },
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]

});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;

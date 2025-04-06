const mongoose=require("mongoose");
const Schema= mongoose.Schema;
const Review=require("./review")

const listingSchema=new Schema({
    title:{
        type: String,
        required: true,
    }, 
    description: String,
    image: {
        type: String,
        default:
            "https://unsplash.com/photos/canalside-houses-and-boat-in-amsterdam-qNFktabs9R4",
        set:(v)=>
            v==="" ? "https://unsplash.com/photos/canalside-houses-and-boat-in-amsterdam-qNFktabs9R4"
                   :  v,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})
//Mongoose middleware
listingSchema.post("findOneAndDelete",async (listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
})

const Listing= mongoose.model("Listing", listingSchema);
module.exports=Listing;
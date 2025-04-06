const Listing=require("./models/listing");
const Review=require("./models/review");
const ExpressError=require("./utils/ExpressError");
const {listingSchema,reviewSchema} = require("./schema.js");
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must login before creating a listing!");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;        
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
let { id } = req.params;
let listing=await Listing.findById(id);
if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","Sorry! You are not owner of this listing");
    return res.redirect(`/listings/${id}`);
}
next(); 
}
//Middleware for server side validation using joi
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
        if(error){
            throw new ExpressError(400,error);
        }
        else{
            next();
        }
}
module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }
    else {
        next();
    }
}
module.exports.isReviewAuthor=async(req,res,next)=>{
    let { id,ReviewId } = req.params;
    let listing=await Review.findById(ReviewId);
    if(!listing.author.equals(res.locals.currUser._id)){
        req.flash("error","Sorry! You are not author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next(); 
    }

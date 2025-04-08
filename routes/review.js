const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

//Reviews route(post)
router.post("/",isLoggedIn,isReviewAuthor,validateReview,wrapAsync(reviewController.createReview))
//Reviews route(delete)
router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;
const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");

const {storage}=require("../cloudConfig.js");
const multer=require("multer");
const upload=multer({storage});

//The router.route() method in Express.js allows you to chain multiple HTTP method handlers (like GET, POST, PUT, DELETE) for the same path.
router 
    .route("/")
    .get (wrapAsync(listingController.index))//Index route
    .post(//Create Route
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
    wrapAsync(listingController.createListing)
    );

//New route
router.get("/new",isLoggedIn,listingController.renderNewForm)

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))//Show route
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))//Update Route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))//Delete route

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))

module.exports = router;
var express = require('express');
var router = express.Router();
var Camp = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

//campground routes start
router.get("/", (req, res)=>{
    Camp.find({}, (err, campgrounds)=>{
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
    
});

router.get("/new", middleware.isLoggedIn, (req, res)=>{
    res.render("campgrounds/new");
});
router.post("/", (req, res)=>{
    var campground = {name: req.body.name, image: req.body.image, desc: req.body.description, author: { id: req.user._id, username: req.user.username} };
    Camp.create(campground, (err, camp)=>{
        if(err){
            console.log("Something went wrong");
            console.log(err);
        }else{
            console.log(camp);
        }
    });
    res.redirect("/campgrounds");
});

router.get("/:id",(req,res)=>{
    Camp.findById(req.params.id).populate("comments").exec((err, campground)=>{
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/show", { campground:campground, date: new Date() });
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, (req,res)=>{
    Camp.findById(req.params.id, (err, campground)=>{

            res.render("campgrounds/edit", {campground:campground});
    });
});

router.put("/:id", middleware.checkCampgroundOwnership, (req,res)=>{
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, (err, campground)=>{
        
            res.redirect("/campgrounds/"+req.params.id);
        
    });
});

router.delete("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
    Camp.findByIdAndRemove(req.params.id, (err)=>{
        
            res.redirect("/campgrounds");
        
    });
});
//campground routes end


module.exports = router;
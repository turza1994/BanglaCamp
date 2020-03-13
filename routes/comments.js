var express = require('express');
var router = express.Router({ mergeParams: true });
var Comment = require("../models/comment");
var Camp = require("../models/campground");
var User= require("../models/user");
var middleware = require("../middleware/index.js");

//comment routes start
router.get("/new", middleware.isLoggedIn, (req, res)=>{
    Camp.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground:campground});
        }
    });
});

// router.post("/", isLoggedIn, (req, res)=>{
//     Comment.create(req.body.cmnt, (err, comment)=>{
//         if(err){
//             console.log(err);
//         } else{
//             Camp.findById(req.params.id, (err, campground)=>{
//                 campground.comments.push(comment);
//                 campground.save();
                
//                 res.redirect("/campgrounds/"+req.params.id);
                
//             });
//         }
//     });
// });

router.post("/", middleware.isLoggedIn, (req, res)=>{
    User.findById(req.user._id, (err, user)=>{
        Camp.findById(req.params.id, (err, camp)=>{
            Comment.create({
                text: req.body.text,
                author: {
                    id: user._id,
                    username: user.username
                }
            }, (err, comment)=>{
                camp.comments.push(comment);
                camp.save();
                
                res.redirect("/campgrounds/"+req.params.id);
            });
        });
    });
});

router.get("/:commentId/edit", middleware.checkCommentOwnership, (req,res)=>{
    Camp.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
        } else{
            Comment.findById(req.params.commentId, (err, comment)=>{
                if(err){
                    req.flash("error", "Something went wrong");
                } else{
                    res.render("comments/edit", {campground: campground, comment: comment});
                }
            });
        }
    });
});

router.put("/:commentId", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, (err, comment)=>{
        if(err){
            req.flash("error", "Something went wrong");
        } else{
            req.flash("success", "Successfully added comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:commentId", middleware.checkCommentOwnership, (req,res)=>{
    Comment.findByIdAndRemove(req.params.commentId, (err)=>{
        if(err){
            req.flash("error", "Something went wrong");
        } else{
            req.flash("success", "Successfully deleted comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


//comment routes end
module.exports = router;
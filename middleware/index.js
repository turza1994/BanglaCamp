var Camp = require("../models/campground.js");
var Comment = require("../models/comment.js");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first !!!");
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Camp.findById(req.params.id, (err, campground)=>{
            if(err){
                req.flash("error", "Something went wrong");
                res.redirect("back");
            } else{
                if(campground.author.id.equals(req.user._id)){
                    return next();
                }
                req.flash("error", "You do not have permission to do that");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "Please login first !!!");
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, (err, comment)=>{
            if(err){
                req.flash("error", "Something went wrong");
                res.redirect("back");
            } else{
                if(comment.author.id.equals(req.user._id)){
                    return next();
                }
                req.flash("error", "You do not have permission to do that");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "Please login first !!!");
        res.redirect("back")
    }
}

module.exports = middlewareObj;
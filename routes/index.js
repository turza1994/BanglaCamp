var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get("/", (req, res)=>{
    res.render("landing");
});

//=============================
//authentication routes starts
//=============================
router.get("/register", (req,res)=>{
    res.render("register");
});

router.post("/register", (req, res)=>{
    User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash("success", "Welcome to the Yelp-camp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res)=>{

});

router.get("/logout", (req, res)=>{
    req.logOut();
    req.flash("success", "Logged you out !!!");
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//=============================
//authentication routes ends
//=============================

module.exports = router;
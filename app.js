//=========================================
//Configuring express and mongoose starts
//=========================================
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var flash           = require("connect-flash");
var passport        = require('passport');
var LocalStrategy   = require('passport-local');
var methodOverride  = require('method-override');
var seedDB          = require('./seeds');

var Comment         = require("./models/comment");
var Camp            = require("./models/campground");
var User            = require("./models/user");

var indexRoutes     = require("./routes/index");
var campgroundRoutes= require("./routes/campgrounds");
var commentRoutes   = require("./routes/comments");
//  seedDB();

// mongoose.connect("mongodb://localhost/yelp-camp");

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://turza:1234@yelpcamp-usdgg.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.connect("mongodb+srv://turza:1234@yelpcamp-usdgg.mongodb.net/test?retryWrites=true&w=majority");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
//=========================================
//Configuring express and mongoose ends
//=========================================


//=============================
//passport configuration starts
//=============================
app.use(require('express-session')({
    secret: "i love gixxer",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//===========================
//passport configuration ends
//===========================


app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, ()=>{
    console.log("server has been started");
});
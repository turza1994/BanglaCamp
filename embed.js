var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/data_model");

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model('Post',postSchema);

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema]
});
var User = mongoose.model('User',userSchema);

User.findById("5de38dc19326df22c847ea85", (err, user)=>{
    if(err){
        console.log(err);
    } else{
        // console.log(user);
        user.posts.push({
            title: "Turza's bike",
            content: "He loves yamaha fz-s"
        });
        user.save((err, user)=>{
            if(err){
                console.log(err);
            } else{
                console.log(user);
            }
        });
    }
});

// var newUser = new User({
//     name: "Turza",
//     email: "turza@yahoo.com"
// });
// newUser.posts.push({
//     title: "Turzas pen",
//     content: "Turza had a very beautiful pen"
// });
// newUser.save((err, user)=>{
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });


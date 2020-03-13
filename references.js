var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/data_model2");

var Post = require("./models/post");
var User = require("./models/user");

User.findById("5de4b8c24cdb1f0be0799b99").populate("posts").exec((err, user)=>{
    if(err){
        console.log(err);
    } else{
        console.log(user);
    }
});

// Post.create({
//    title: "Bobs car",
//    content: "Bob has a mountain car"
// }, (err, post)=>{
//     User.findById("5de4b8c24cdb1f0be0799b99", (err, user)=>{
//         user.posts.push(post);
//         user.save((err, data)=>{
//             if(err){
//                 console.log(err);
//             } else{
//                 console.log(data);
//             }
//         });
//     });
// });

// User.create({
//     name: "Bob barchar",
//     email: "bob@gmail.com"
// });
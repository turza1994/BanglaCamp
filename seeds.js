// var mongoose = require('mongoose')
// var Camp = require('./models/campground')
// var Comment = require('./models/comment')
// var User = require('./models/user')
// mongoose.connect("mongodb://localhost/yelp-camp");

// var campgrounds=[
//     {name: "Salmon Creek",image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuCIo7r6KxZ9KYuNx0NbZ7AyMQLvvm2ceBM0f4D25PiaimxdmBQ&s", description: "bla bla bla bla"},
//     {name: "Granite Hill",image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYD-2vv7f-RR6HAzcCC-ltjsoLkkeeUHM_D8V7BF9Tx5nL_sGpYg&s", description: "bla bla bla bla"},
//     {name: "Mountain Goat's Rest",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDtA9Z10grCtlNyjetjxMnRsdG7tFA6g7oSnF0MZA8RG-9QNN4&s", description: "bla bla bla bla" },
//     {name: "Salmon Creek",image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8bgDlBpsn7p6Fwt3VnyZdeIjMjtGsOHm3PjDBLabQDzkC11P6&s", description: "bla bla bla bla"},
//     {name: "Granite Hill",image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ31kJ26GAmdS_Fo33hWd7Vs2_6-h96TR9y3EE6H0ss_9Y-J2_c&s", description: "bla bla bla bla"},
//     {name: "Mountain Goat's Rest",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJfXgj9qRJ226s89LDtoTK3F54I2qvr-RuRHm4Cr84Qfv_WAGW&s", description: "bla bla bla bla" }
// ];
// var commentDemo={author: "unknown", text: "It was a very nice and mindblowing place"};

//remove everything
// function seedDB(){
// Camp.remove({},(err)=>{
// if(err){
//     console.log(err);
// } else{
//     console.log("removed successfully");
//     //adding campground
//     campgrounds.forEach((i)=>{
//         Camp.create(i,(err, camp)=>{
//             if(err){
//                 console.log(err);
//             } else{
//                 console.log(camp);
//                 //creating comment
//                 Comment.create({author: "unknown", text: "It was a very nice and mindblowing place"}, (err, comment)=>{
//                     if(err){
//                         console.log(err);
//                     } else{
//                         camp.comments.push(comment);
//                         camp.save();
//                         console.log(comment);
//                     }
//                 });
//             }
//         });
//     });
// }
// });

// Comment.remove({}, (err)=>{});
// User.remove({}, (err)=>{});

// }
// module.exports = seedDB

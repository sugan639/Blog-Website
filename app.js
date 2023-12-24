//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to Sugan Blogs! Immerse yourself in the captivating tales of globetrotters as we explore the world's most enchanting destinations. From hidden gems to iconic landmarks, our blog is your go-to guide for travel inspiration, insider tips, and unforgettable experiences. Join us on a journey to discover the beauty of diverse cultures, savor mouthwatering cuisines, and uncover the secrets of each corner of the globe. Let the wanderlust begin – your next extraordinary adventure awaits!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("views"));

app.get("/",function(req,res){
    res.render('home',{home : "Welcome Home" , c1 : homeStartingContent , newPost : posts });
    
})



app.get("/about",function(req,res){
  res.render('about',{home : "About" , c2 : aboutContent });
})


app.get("/contact",function(req,res){
  res.render('contact',{home : "Contact" , c3 : contactContent });
})

app.get("/compose",function(req,res){
  res.render('compose',{home : "Compose"  });
})

app.post("/compose",function(req,res){
  const post = {
    title : req.body.postTitle,
    body : req.body.postBody
  }
  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:request",function(req,res){
  const query = _.lowerCase( req.params.request) ;
  posts.forEach(function(element){
    if(element.title == query){
    console.log("Match found!");
    }
    else{
      console.log("Match Not found!");
    }
  })
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});

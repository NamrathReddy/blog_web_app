//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const fs = require("fs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let postsArray = [];

app.set('view engine', 'ejs');

app.get("/", function(req, res){
  res.render("home",{cntnt1: homeStartingContent,postsArray: postsArray});

});

app.get("/about", function(req, res){
  res.render("about",{cntnt2: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact",{cntnt3: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
const post1 = {
  title1: req.body.postTitle,
  body1: req.body.postBody
};
// experimenting-start
fs.appendFile( __dirname +"/views/testfile.ejs","<h3>"+ post1.title1 +"</h3>"+"<p style='text-overflow: ellipsis; overflow: hidden; white-space: nowrap'>"+ post1.body1 +"</p>"+"<a href= /posts/"+ post1.title1+ ">Read more</a>",(err) => {
  if(err){
    console.log(err);
  }
});
// experimenting-end

postsArray.push(post1);
res.redirect("/");

});

app.get("/posts/:pathname",function(req, res){
  const requestedTitle = _.lowerCase(req.params.pathname);

  postsArray.forEach(function(posts){
    const storedTitle = _.lowerCase(posts.title1);

    if(storedTitle === requestedTitle){
      res.render("post",{posts: posts});
    }
    });

});

// <p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap">

// <% postsArray.forEach(function(pst){ %>
// <div>
//     <h3><%=  pst.title1 %></h3>
//   <p>
//     <%= pst.body1.substring(0,100) + "..." %>
//     <a href="/posts/<%=pst.title1%>">Read more</a>
//   </p>
// </div>
// <% }); %>


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

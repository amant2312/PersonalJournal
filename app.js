
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

let posts=[];
const homeStartingContent = "Welcome, This is your personal Notebook. Here you can take notes, write journals, write observations & if later you want to visit and check on to it, then you can search post of your choice also. Below you can find your posts & the UI of the Webapp is very simple, all the functionalities are there on the Nav Bar. In case there are alot of emotions wanting to find expression, You can check out the STRESS BURSTER Section of the header";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/posts/:value",(req,res)=>{
  const param=_.lowerCase(req.params.value);
  //console.log(param, _.lowerCase(posts[i].tittle))
  for(let i=0;i<posts.length;i++){
    if(_.lowerCase(posts[i].tittle) === param){
      res.render("post", {tittle: posts[i].tittle, content: posts[i].content});
      
    }
  }
  
})






app.get("/",(req,res)=>{
    res.render("home",{startingContent:homeStartingContent , posts:posts});
    
})


app.get("/about", (req,res)=>{
  res.render("about",{aboutContent: aboutContent});
});

app.post("/about", (req,res)=>{
  console.log(req.body.search);
  res.render("search", {input:req.body.search , posts:posts});
});

app.get("/contact", (req,res)=>{
  res.render("contact",{contactContent: contactContent});
  
});

app.get("/search",(req,res)=>{
  res.render("search",{input:req.body.search , posts:posts});
})

app.get("/compose", (req,res)=>{
  res.render("compose");
});



app.post("/compose",(req,res)=>{

    const post={tittle : req.body.postTittle, content: req.body.postBody};
    posts.push(post);
    res.redirect("/");
});













app.listen(3000, function() {
  console.log("Server started on port 3000");
});

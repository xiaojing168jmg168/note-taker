const express = require("express");
const { get } = require("http");
const app = express();
const path = require('path');
const port = 3001;


//Get Route for homepage
app.get("/",(req,res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);


//Get notes route
app.get("/notes",(req,res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);



//Get wildcard route for homepage
app.get("*",(req,res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.listen(port, ()=>{
console.log(`Sever is running at localhost: ${port}`);
})
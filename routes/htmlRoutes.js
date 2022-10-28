const path = require('path');

//routing
module.exports = (app) =>{
//Get routes should return the notes.js file
app.get("/notes",(req,res) => 
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

//Get routes should return the index.js file
app.get("*",(req,res) => 
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

}
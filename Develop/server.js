const express = require("express");
const { get } = require("http");
const app = express();
const path = require('path');
const fs = require('fs');
const { uuid } = require('uuidv4');


const port = 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Get Route for homepage
app.get("/",(req,res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);


//Get notes route
app.get("/notes",(req,res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Display notes on api/notes route
app.get('/api/notes',(req,res) =>{
fs.readFile('./db/db.json',(err,data) =>{
if(err){
console.log(err);
}else{
const parsedData = JSON.parse(data);
res.json(parsedData);
}
});

})

//Create new note, save to db.json
app.post('/api/notes',(req,res) =>{
//create id
let id = uuid();
let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
let newNode = {
id:id,
title:req.body.title,
text:req.body.text,
};
noteList.push(newNode);
//Convert notes to string then write to db.json
const stringifyNotes = JSON.stringify(noteList);
fs.writeFile('./db/db.json', stringifyNotes,(err) => {
    if (err) console.log(err);
    else {
      console.log("Note successfully saved to db.json");
    }
  });
}
)


//Get wildcard route for homepage
app.get("*",(req,res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(port, ()=>{
console.log(`Sever is running at localhost: ${port}`);
})
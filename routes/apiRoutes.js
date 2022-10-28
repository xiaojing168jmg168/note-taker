const path = require('path');
const fs = require('fs');
var uniqid = require('uniqid');


module.exports = (app) =>{

//Display notes on api/notes route
app.get('/api/notes',(req,res) =>{
  fs.readFile('db/db.json',(err,data) =>{
    if(err){
      console.log(err);
    }else{
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    }
  });
});

//Create new note, save to db.json
app.post('/api/notes',(req,res) =>{
   let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);
   let id = uniqid();
    // creating body for note

    let newNote = {
       // creating unique id for each note
      id: id,
      title: req.body.title,
      text: req.body.text,
    };
    // pushing created note to be written in the db.json file
    db.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
  });



//Delete note from db.json
app.delete('/api/notes/:id', (req,res) =>{
  fs.readFile('db/db.json',(err,data) =>{
    if(err) throw err;
    
      let notes = JSON.parse(data);
      const newNotes = notes.filter(note => note.id !== req.params.id);

    fs.writeFile('db/db.json',JSON.stringify(newNotes),(err,data) =>{
       res.json({msg: 'successfully'});
     });
  });
});

}
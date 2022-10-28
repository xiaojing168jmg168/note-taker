const express = require("express");
const { get } = require("http");
const app = express();

const PORT = process.env.PORT || 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//routes to route files
require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes')(app);


app.listen(PORT, ()=>{
  console.log(`Sever is running at localhost: ${PORT}`);
})
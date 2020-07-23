//create dependencies with const's
const express = require("express");
const app = express(); //start an express app
const path = require("path"); // relate paths windows or mac
//const bodyParser = require("body-parser");
const fs = require("fs");
const PORT = process.env.PORT || 8000;
//const router = express.Router(); //always needs further configuration

// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/Develop/public")));
//app.use(bodyParser);

let dBase = fs.readFileSync("./Develop/db/db.json","utf-8");
console.log("database:", dBase)
dBase ? dBase = JSON.parse(dBase) : dBase = [];


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
    
      console.log("index:", __dirname);
  });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
    
      console.log("index:", __dirname);
  });

// set API Routes
app.get('/api/notes', (req, res) => {
  return res.send(dBase);
})

// post user notes that are new and handle the data
app.post("/api/notes", (req, res) => {
  let body = req.body;
  let uniqueId = {"id":Math.round(Math.random()* 999)};
  
  console.log("id:", uniqueId)
  console.log("request:", body)
  
  body = {...uniqueId, ...body};
  dBase.push(body);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(dBase), "utf-8");
  res.json(true);
  console.log("post data:", dBase)
});

app.delete("/api/notes/:id", (req,res) => {
  const noteId = dBase.find(note => note.id === parseInt(req.params.id));
  const index = dBase.indexOf(noteId);
  if(!noteId) 
  return res.status(404).send("Note not available!");
  
  dBase.splice(index,1);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(dBase), "utf-8");
  return res.json(true);
});

//My '404' response if indes page not found
app.get("*", (req, res) => {
    res.json ("Page not found, SAVE FERRIS");
});

app.listen(PORT, () => {
    console.log ("app is working at port:", PORT);
});



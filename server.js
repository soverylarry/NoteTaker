//create dependencies with const's
const express = require("express");
const app = express(); //start an express app
const path = require("path"); // relate paths windows or mac
const bodyParser = require("body-parser");
const fs = require("fs");
const PORT = process.env.PORT || 8000;
//const router = express.Router(); //always needs further configuration

// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/Develop/public")));



//Get Static files on server like: HTML, CSS, JS, etc.
// app.get("/index", (req, res) => {
//     res.json("you are viewing Express");
// })

// app.post('/index', (req, res)=>{
//     console.log("Req: ", req);
//     //req to receive stuff from the client/browser
//     res.json({ msg:""});
//     //res to send from Server to Client
// })

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
    
      console.log("index:", __dirname);
  });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
    
      console.log("index:", __dirname);
  });


app.get("*", (req, res) => {
    res.json ("Page not found, SAVE FERRIS");
});


app.listen(PORT, () => {
    console.log ("app is working at port:", PORT);
});

//router.get()
//router.post()


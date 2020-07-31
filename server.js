//create dependencies with const's
const express = require("express");
const app = express(); //start an express app
const path = require("path"); // relate paths windows or mac
const PORT = process.env.PORT || 8000;
const apiroutes = require('./backend/routes/apiroutes');
const htmlroutes = require('./backend/routes/htmlroutes')
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/Develop/public")));
app.use(apiroutes);
app.use(htmlroutes)

//create PORT on server
app.listen(PORT, () => {
  console.log("app is working at port:", PORT);
});



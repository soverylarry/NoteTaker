const router = require('express').Router();
const path = require('path')

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Develop/public/index.html"));
});

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Develop/public/notes.html"));
});

//My '404' response if index page not found
router.get("*", (req, res) => {
    res.json("Page not found, SAVE FERRIS");
  });

module.exports = router;


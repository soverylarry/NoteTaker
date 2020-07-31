const router = require('express').Router();
const fs = require("fs");
let dbase = fs.readFileSync("./Develop/db/db.json","utf-8");

let dBase = JSON.parse(dbase)

router.get('/api/notes', (req, res) => {
    return res.send(dBase);
})

router.post("/api/notes", (req, res) => {
    let body = req.body;
    let uniqueId = { "id": Math.round(Math.random() * 99999) };
    body = { ...uniqueId, ...body };
    dBase.push(body);
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(dBase), "utf-8");
    res.json(true)
});

router.delete("/api/notes/:id", (req, res) => {
    const noteId = dBase.find(note => note.id === parseInt(req.params.id));
    const index = dBase.indexOf(noteId);
    if (!noteId)
        return res.status(404).send("D'oh! No Note for YOU!");
    dBase.splice(index, 1);
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(dBase), "utf-8");
    return res.json(true);
});

module.exports = router 
const express = require("express");
const router = express.Router(); // to segragigate routes

router.get("/", (req, res) => {
    res.send("Get for posts");
});

router.get("/:id", (req, res) => {
    res.send(`Get for post with id ${req.params.id}`);
});
router.post("/", (req, res) => {
    res.send("Post for posts");
});
router.delete("/:id", (req, res) => {
    res.send(`Delete for post with id ${req.params.id}`);
});
module.exports = router;
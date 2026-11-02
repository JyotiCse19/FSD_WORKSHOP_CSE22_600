const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "home.html"));
});

app.get("/menu", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "menu.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "contact.html"));
});

app.listen(3000, () => {
    console.log("Bakery website running at http://localhost:3000");
});
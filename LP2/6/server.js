const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/lp2_practical")
    .then(() => console.log("MongoDB Connected"));

// Event Model
const Event = mongoose.model("Event", new mongoose.Schema({
    title: String,
    category: String,
    date: String,
    venue: String
}));

// Admin Login Route
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin123") {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials!" });
    }
});

// CRUD Routes for Events
app.get("/events", async (req, res) => res.json(await Event.find()));
app.post("/events", async (req, res) => res.json(await Event.create(req.body)));
app.put("/events/:id", async (req, res) => res.json(await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/events/:id", async (req, res) => res.json(await Event.findByIdAndDelete(req.params.id)));

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
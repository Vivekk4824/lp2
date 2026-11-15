const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// 1. Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/lp2_practical")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

// 2. Define Schema & Model
const User = mongoose.model("User", new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    track: String
}));

// 3. POST Route: Save Form Data
app.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ success: true, message: "Saved to MongoDB!", user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Database error" });
    }
});

// 4. GET Route: Fetch Saved Users (Great for showing DB data in viva)
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
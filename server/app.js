const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let profiles = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://via.placeholder.com/100",
    description: "Software Engineer",
    address: "1600 Amphitheatre Parkway, Mountain View, CA"
  }
];

// Get all profiles
app.get("/api/profiles", (req, res) => res.json(profiles));

// Add a profile
app.post("/api/profiles", (req, res) => {
  const newProfile = { id: Date.now(), ...req.body };
  profiles.push(newProfile);
  res.status(201).json(newProfile);
});

// Update a profile
app.put("/api/profiles/:id", (req, res) => {
  const { id } = req.params;
  profiles = profiles.map(p => (p.id === +id ? { ...p, ...req.body } : p));
  res.json({ message: "Profile updated" });
});

// Delete a profile
app.delete("/api/profiles/:id", (req, res) => {
  profiles = profiles.filter(p => p.id !== +req.params.id);
  res.json({ message: "Profile deleted" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

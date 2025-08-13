import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let users = []; // In-memory storage
let driverPosts = []; // For driver posts

// Signup route
app.post("/api/signup", (req, res) => {
  const { role, name, email, password } = req.body;

  if (!role || !name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if email already exists
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const newUser = { role, name, email, password };
  users.push(newUser);

  res.status(201).json({ message: "Signup successful" });
});

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.json({ message: "Login successful", role: user.role });
});

// Driver post creation
app.post("/api/driver/posts", (req, res) => {
  const { name, location, fare } = req.body;

  if (!name || !location || !fare) {
    return res.status(400).json({ error: "Name, location, and fare are required" });
  }

  const newPost = {
    id: driverPosts.length + 1,
    name,
    location,
    fare,
    createdAt: new Date(),
  };

  driverPosts.push(newPost);
  res.status(201).json(newPost);
});

// Get all driver posts
app.get("/api/driver/posts", (req, res) => {
  res.json(driverPosts);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

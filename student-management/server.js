import express from "express";
import taskRoutes from "./routes/taskRouters.js";

const app = express();

// Middleware to read JSON
app.use(express.json());

// Connect task routes
app.use("/tasks", taskRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Task Manager API");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
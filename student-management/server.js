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

// Handle unknown routes
app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        message: err.message || "Internal Server Error"
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
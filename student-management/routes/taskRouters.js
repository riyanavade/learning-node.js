import express from "express";

const router = express.Router();

// Temporary in-memory tasks
let tasks = [
    { id: 1, title: "Learn Node.js", completed: false },
    { id: 2, title: "Learn Express", completed: true },
    { id: 3, title: "Practice routing", completed: false }
];

// Helper function to create errors
const createError = (message, status) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

// Route-specific middleware
const logTaskRequest = (req, res, next) => {
    console.log("Task route accessed");
    next();
};

// GET - Fetch all tasks
router.get("/", (req, res, next) => {
    try {
        const status = req.query.status;

        if (status && !["completed", "pending"].includes(status)) {
            throw createError("Invalid status value", 400);
        }

        if (status === "completed") {
            return res.json(tasks.filter(task => task.completed));
        }

        if (status === "pending") {
            return res.json(tasks.filter(task => !task.completed));
        }

        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

// GET - Fetch task by ID
router.get("/:id", logTaskRequest, (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw createError("Invalid task ID", 400);
        }

        const task = tasks.find(task => task.id === id);

        if (!task) {
            throw createError("Task not found", 404);
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
});

// POST - Create a task
router.post("/", (req, res, next) => {
    try {
        const { title } = req.body ?? {};

        // Validation
        if (typeof title !== "string" || title.trim().length < 3) {
            throw createError(
                "Title must be at least 3 characters long",
                400
            );
        }

        const newTask = {
            id: tasks.length
                ? Math.max(...tasks.map(task => task.id)) + 1
                : 1,
            title: title.trim(),
            completed: false
        };

        tasks.push(newTask);

        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

// PUT - Update a task
router.put("/:id", (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { title, completed } = req.body ?? {};

        if (!Number.isInteger(id) || id <= 0) {
            throw createError("Invalid task ID", 400);
        }

        const task = tasks.find(task => task.id === id);

        if (!task) {
            throw createError("Task not found", 404);
        }

        // Validate title if provided
        if (title !== undefined) {
            if (typeof title !== "string" || title.trim().length < 3) {
                throw createError(
                    "Title must be at least 3 characters long",
                    400
                );
            }
        }

        // Validate completed if provided
        if (completed !== undefined && typeof completed !== "boolean") {
            throw createError(
                "Completed must be true or false",
                400
            );
        }

        // Update task
        if (title !== undefined) {
            task.title = title.trim();
        }

        if (completed !== undefined) {
            task.completed = completed;
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
});

// DELETE - Delete a task
router.delete("/:id", (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw createError("Invalid task ID", 400);
        }

        const taskExists = tasks.some(task => task.id === id);

        if (!taskExists) {
            throw createError("Task not found", 404);
        }

        tasks = tasks.filter(task => task.id !== id);

        res.json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

export default router;
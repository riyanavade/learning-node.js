import express from "express";

const router = express.Router();

// Temporary in-memory tasks
let tasks = [
    { id: 1, title: "Learn Node.js", completed: false },
    { id: 2, title: "Learn Express", completed: true },
    { id: 3, title: "Practice routing", completed: false }
];

// Route-specific middleware
const logTaskRequest = (req, res, next) => {
    console.log("Task route accessed");

    next();
};

// GET - Fetch all tasks
router.get("/", (req, res) => {
    const status = req.query.status;

    if (status === "completed") {
        return res.json(tasks.filter(task => task.completed));
    }

    if (status === "pending") {
        return res.json(tasks.filter(task => !task.completed));
    }

    res.json(tasks);
});

// GET - Fetch task by ID
router.get("/:id", logTaskRequest, (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
});

// POST - Create a task
router.post("/", (req, res) => {
    const newTask = {
        id: tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
        title: req.body.title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// PUT - Update a task
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;

    res.json(task);
});

// DELETE - Delete a task
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const taskExists = tasks.some(task => task.id === id);

    if (!taskExists) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks = tasks.filter(task => task.id !== id);

    res.json({
        message: "Task deleted successfully"
    });
});

export default router;
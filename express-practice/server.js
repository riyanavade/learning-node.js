import express from "express";

const app = express();

app.use(express.json());

// Initial student data
let students = [
    { id: 1, name: "Riya", course: "MCA" },
    { id: 2, name: "Sonu", course: "MCA" },
    { id: 3, name: "Sangeeta", course: "MCA" }
];

// GET - Get all students
app.get("/students", (req, res) => {
    res.status(200).json(students);
});

// GET - Get student by ID
app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});

// POST - Add a new student
app.post("/students", (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Name and course are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map((s) => s.id)) + 1
            : 1,
        name,
        course
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// PUT - Replace a student
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Name and course are required"
        });
    }

    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students[index] = { id, name, course };

    res.status(200).json(students[index]);
});

// PATCH - Update selected fields
app.patch("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, course } = req.body;

    if (name === undefined && course === undefined) {
        return res.status(400).json({
            message: "Provide at least one field to update"
        });
    }

    if (name !== undefined) student.name = name;
    if (course !== undefined) student.course = course;

    res.status(200).json(student);
});

// DELETE - Delete a student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students = students.filter((s) => s.id !== id);

    res.status(200).json({
        message: "Student deleted successfully"
    });
});

// Start server
app.listen(3000, () => {
    console.log("Student API running on port 3000");
});
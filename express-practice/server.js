import express from "express";

const app = express();

const myMiddleware = (req, res, next) => {
    console.log("Middleware executed");

    next();
};

app.use(myMiddleware);

app.get("/", (req, res) => {
    res.send("Welcome to my Express server!");
});

app.get("/about", (req, res) => {
    res.send("About page");
});

app.get("/students", (req, res) => {
    res.json([
        { name: "Riya", course: "MCA" },
        { name: "Sangeeta", course: "MCA" },
        { name: "Sonu", course: "MCA" }
    ]);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
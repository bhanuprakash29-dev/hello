
const express = require('express');

const app = express();

// Middleware to read JSON data
app.use(express.json());

// Root route for localhost
app.get('/', (req, res) => {
    res.json({
        message: 'Student API is running',
        endpoints: {
            students: '/students',
            studentById: '/students/:id'
        }
    });
});

// Sample student data
let students = [
    { id: 1, name: "Bhanu", age: 20, branch: "CSE" },
    { id: 2, name: "Rahul", age: 21, branch: "ECE" }
];

// 1. GET - Retrieve all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET - Retrieve student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// 2. POST - Add a new student
app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name: req.body.name,
        age: req.body.age,
        branch: req.body.branch
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// 3. PUT - Update complete student details
app.put('/students/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students[index] = {
        id: id,
        name: req.body.name,
        age: req.body.age,
        branch: req.body.branch
    };

    res.json({
        message: "Student updated successfully",
        student: students[index]
    });
});

// 4. PATCH - Update specific student details
app.patch('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    Object.assign(student, req.body);

    res.json({
        message: "Student partially updated",
        student: student
    });
});

// 5. DELETE - Delete a student
app.delete('/students/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);

    res.json({ message: "Student deleted successfully" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

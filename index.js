const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Lisatud staatiliste failide serveerimine

let tasks = [];

// API Endpointid
app.get('/tasks', (req, res) => res.json(tasks));
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Task title is required' });

    const newTask = { id: tasks.length + 1, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.completed = !task.completed;
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

app.listen(port, () => console.log(`To-Do List app running at http://localhost:${port}`));

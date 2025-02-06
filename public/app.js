async function fetchTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
            <button onclick="toggleTask(${task.id})">${task.completed ? 'Tagasi' : 'Tehtud'}</button>
            <button onclick="deleteTask(${task.id})">❌</button>
        `;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const title = taskInput.value.trim();
    if (!title) return alert('Palun sisesta ülesande nimi');

    await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    taskInput.value = '';
    fetchTasks();
}

async function toggleTask(id) {
    await fetch(`/tasks/${id}`, { method: 'PATCH' });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
}

// Laadi ülesanded esimesel lehel laadimisel
fetchTasks();

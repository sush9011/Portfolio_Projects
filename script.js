document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        saveTask(taskText);
        taskInput.value = "";
    } else {
        alert("Please enter a task!");
    }
});

function addTask(taskText, isCompleted = false) {
    const li = document.createElement('li');
    li.textContent = taskText;

    if (isCompleted) li.classList.add('completed');

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.style.marginLeft = '10px';
    completeButton.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateTaskStatus(taskText);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', () => {
        li.remove();
        deleteTask(taskText);
    });

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

function updateTaskStatus(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function deleteTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

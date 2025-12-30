const API_URL = window.location.origin;

let todos = [];
let currentFilter = 'all';

const todoForm = document.getElementById('todoForm');
const todoTitle = document.getElementById('todoTitle');
const todoDescription = document.getElementById('todoDescription');
const todoPriority = document.getElementById('todoPriority');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');

async function fetchTodos() {
    try {
        const response = await fetch(`${API_URL}/api/todos`);
        if (!response.ok) throw new Error('Failed to fetch todos');
        todos = await response.json();
        renderTodos();
    } catch (error) {
        console.error('Error fetching todos:', error);
        todoList.innerHTML = '<div class="empty-state"><h3>Failed to load tasks</h3><p>Please try again later</p></div>';
    }
}

async function addTodo(title, description, priority) {
    try {
        const response = await fetch(`${API_URL}/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, priority })
        });

        if (!response.ok) throw new Error('Failed to add todo');

        const newTodo = await response.json();
        todos.unshift(newTodo);
        renderTodos();
        return newTodo;
    } catch (error) {
        console.error('Error adding todo:', error);
        alert('Failed to add task. Please try again.');
    }
}

async function toggleTodo(id, completed) {
    try {
        const response = await fetch(`${API_URL}/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });

        if (!response.ok) throw new Error('Failed to update todo');

        const updatedTodo = await response.json();
        const index = todos.findIndex(t => t.id === id);
        if (index !== -1) {
            todos[index] = updatedTodo;
            renderTodos();
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        alert('Failed to update task. Please try again.');
    }
}

async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/api/todos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete todo');

        todos = todos.filter(t => t.id !== id);
        renderTodos();
    } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Failed to delete task. Please try again.');
    }
}

function getFilteredTodos() {
    if (currentFilter === 'active') {
        return todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        return todos.filter(t => t.completed);
    }
    return todos;
}

function renderTodos() {
    const filteredTodos = getFilteredTodos();

    if (filteredTodos.length === 0) {
        const emptyMessage = currentFilter === 'completed'
            ? 'No completed tasks yet'
            : currentFilter === 'active'
            ? 'No active tasks'
            : 'No tasks yet';

        todoList.innerHTML = `
            <div class="empty-state">
                <h3>${emptyMessage}</h3>
                <p>${currentFilter === 'all' ? 'Add your first task to get started!' : ''}</p>
            </div>
        `;
        return;
    }

    todoList.innerHTML = filteredTodos.map(todo => {
        const createdDate = new Date(todo.created_at).toLocaleDateString();
        return `
            <div class="todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''}">
                <input
                    type="checkbox"
                    class="todo-checkbox"
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id}, this.checked)"
                >
                <div class="todo-content">
                    <h3>${escapeHtml(todo.title)}</h3>
                    ${todo.description ? `<p>${escapeHtml(todo.description)}</p>` : ''}
                    <div class="todo-meta">
                        <span class="priority-badge ${todo.priority}">${todo.priority}</span>
                        <span>${createdDate}</span>
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="btn-delete" onclick="deleteTodo(${todo.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = todoTitle.value.trim();
    const description = todoDescription.value.trim();
    const priority = todoPriority.value;

    if (!title) return;

    await addTodo(title, description, priority);

    todoTitle.value = '';
    todoDescription.value = '';
    todoPriority.value = 'medium';
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

fetchTodos();

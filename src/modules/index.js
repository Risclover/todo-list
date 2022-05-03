const text = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit');
const saveInd = document.getElementById('saveIndex');
const listBox = document.getElementById('todo-list');

let todoArray = [];

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoArray.push(todo);
    renderTodo(todo);
}

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const task = text.value.trim();
    if(task !== '') {
        addTodo(task);
        text.value = '';
        text.focus();
    }
})

function renderTodo(todo) {
    localStorage.setItem('todo', JSON.stringify(todoArray));
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if(todo.deleted) {
        item.remove();
        return;
    }

    const isChecked = todo.checked ? 'done' : '';
    const node = document.createElement('li');

    node.setAttribute('data-key', todo.id);
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.innerHTML = `
        <input id="${todo.id}" type="checkbox" />
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
    `;

    if(item) {
        listBox.replaceChild(node, item);
    } else {
        listBox.append(node);
    }
}

listBox.addEventListener('click', event => {
    if(event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if(event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

function toggleDone(key) {
    const index = todoArray.findIndex(item => item.id === Number(key));

    todoArray[index].checked = !todoArray[index].checked;
    renderTodo(todoArray[index]);
}

function deleteTodo(key) {
    const index = todoArray.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoArray[index]
    };
    todoArray = todoArray.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todo');
    if(ref) {
        todoArray = JSON.parse(ref);
        todoArray.forEach(t => {
            renderTodo(t);
        })
    }
})
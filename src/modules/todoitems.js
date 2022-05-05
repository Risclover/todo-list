import * as domElement from './domCollection';

const tasks = (() => {
    let todoArray = [];

    function createTodo(text) {
        const todo = {
            text,
            checked: false,
            dueDate: "",
            priority: null,
            notes: "",
            project: "Default",
            id: Date.now(),
        };
        todoArray.push(todo);
        renderTodo(todo);
    }

    function addTodo() {
        const task = domElement.todoInput.value.trim();
        if(task !== '') {
            createTodo(task);
            domElement.todoInput.value = '';
            domElement.todoInput.focus();
        }
    }

    function deleteTodo(key) {
        const index = todoArray.findIndex(item => item.id === Number(key));
        const todo = {
            deleted: true,
            ...todoArray[index]
        };
        if(confirm("Are you sure you want to delete this todo item?")) {
            todoArray = todoArray.filter(item => item.id !== Number(key));
            renderTodo(todo);
        }
    }

    function toggleDone(key) {
        const index = todoArray.findIndex(item => item.id === Number(key));

        todoArray[index].checked = !todoArray[index].checked;
        renderTodo(todoArray[index]);
    }

    return {
        todoArray,
        createTodo,
        addTodo,
        deleteTodo,
        toggleDone,
    }
})();

export default tasks;
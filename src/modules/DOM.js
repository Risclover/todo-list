import tasks from './todoitems'
import * as domElement from './domCollection';
import projects from './projects';

const dom = (() => {
    let colorsObj = {
        bgColor: '#ffffff',
        fontCol: '#000000',
        projectName: 'Default'
    }

    function renderTodo(todo) {
        localStorage.setItem('todo', JSON.stringify(tasks.todoArray));
        projects.project1.todo = JSON.parse(localStorage.getItem('todo'))

        const item = document.querySelector(`[data-key='${todo.id}']`);
    
        if(todo.deleted) {
            item.remove();
            return;
        }
    
        const isChecked = todo.checked ? 'done' : '';
        const node = document.createElement('li');
        const todoExtras = document.querySelectorAll('.todo-extras');

        node.setAttribute('data-key', todo.id);
        node.setAttribute('class', `flag-high todo-item ${isChecked}`);
        node.innerHTML = `
        <div class="total-todo">
            <div class="todo-one">
                <input id="${todo.id}" type="checkbox" />
                <label for="${todo.id}" class="tick js-tick"></label>
                <span class="js-todo">${todo.text}</span>
                <input id="${todo.id}" type="hidden" />
            </div>
            <div class="todo-two">
                <button class="js-delete-todo icon"><i class="fa-regular fa-trash-can js-delete-todo"></i></button>
                <button class="js-edit icon"><i class="fa-solid fa-pen-to-square fa-1x"></i></button>
            </div>
        </div>
        <div class="todo-extras"></div>
        `;

        if(item) {
            domElement.todoList.replaceChild(node, item);
        } else {
            domElement.todoList.append(node);
        }

        todoExtras.forEach((extra) => {
            const itemKey = extra.parentElement.dataset.key;
            const index = tasks.todoArray.findIndex(item => item.id === Number (itemKey));
            extra.innerHTML = `<span>${tasks.todoArray[index].notes}</span>`;
        })
    }


    function titleClick() {
        domElement.projectNameModal.value = '';
    }
    
    return {
        colorsObj,
        renderTodo,
        titleClick
    }

})();

export default dom;
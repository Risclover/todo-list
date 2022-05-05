import {projectList, setFirstProject} from './projects';

const todoItems = (() => {
    const text = document.getElementById('todo-input');
    const submitBtn = document.getElementById('submit');
    const listBox = document.querySelector('.todo-list');
    const projectMenu = document.getElementById('project-menu');
    const projectTitle = document.querySelector('.project-name');
    const appTitle = document.querySelector('.app-title');
    const firstProject = document.getElementById('first-project');
    
    projectMenu.addEventListener('click', projectSettings);
    projectTitle.addEventListener('click', changeName);
    submitBtn.addEventListener('click', submitClick);
    text.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            submitClick();
        }
    });
    
    let todoArray = [];
    let projectName = "";

    
    function projectSettings() {
        $("#default").dialog({
            buttons: [
                {
                    text: "Restore default",
                    click: function() {
                        $("#default-check").dialog({
                            buttons: [
                                {
                                    text: "Continue",
                                    click: function() {
                                        $(this).dialog("close");
                                        localStorage.clear();
                                    }
                                },
                                {
                                    text: "Nevermind",
                                    click: function() {
                                        $(this).dialog("close");
                                    }
                                }
                            ]
                        })
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Change project theme",
                    click: function() {
                        $(this).dialog("close");
                        $("#theme").dialog({
    
                        })
                    }
                },
                {
                    text: "Save changes",
                    click: function() {
                        $(this).dialog("close");
                        renderChanges();
                    }
                }
            ]
        })
    }
    
    function changeName() {
        const newTitle = document.getElementById('new-title');
        newTitle.style.display = 'block';
        appTitle.style.display = 'none';
        newTitle.value = appTitle.textContent;
        newTitle.focus();
    
        newTitle.addEventListener('blur', function() {
            appTitle.textContent = newTitle.value;
            appTitle.style.display = 'block';
            newTitle.style.display = 'none';
            renderName();
        })
    
        newTitle.addEventListener('keydown', function(e) {
            if(e.key === 'Enter') {
                appTitle.textContent = newTitle.value;
                appTitle.style.display = 'block';
                newTitle.style.display = 'none';
                renderName();
            }
        })
    }
    
    function defaultCheck() {
        $("#default-check").dialog({
            buttons: [
                {
                    text: "I'm sure",
                    click: function() {
                        $(this).dialog("close");
                        localStorage.clear();
                        listBox.innerHTML = "";
                        todoArray = [];
                    }
                },
                {
                    text: "Cancel",
                    click: function() {
                        $(this).dialog("close");
                    }
                }
            ]
        })
    }
    function addTodo(text) {
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
    
    function submitClick() {
        const task = text.value.trim();
        if(task !== '') {
            addTodo(task);
            text.value = '';
            text.focus();
        }
        console.log(todoArray);
    }
    
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
        node.setAttribute('class', `flag-high todo-item ${isChecked}`);
        node.innerHTML = `
        <div class="total-todo">
            <div class="left-side">
                <div class="checkbox">
                    <input id="${todo.id}" type="checkbox" />
                    <label for="${todo.id}" class="tick js-tick"></label>
                </div>
                <div class="todo-main">
                    <span class="js-todo">${todo.text}</span>
                    <input id="${todo.id}" type="hidden" />
                    <div class="todo-extras"></div>
                </div>
            </div>
            <div class="end-buttons">
                <div class="todo-btns">
                    <button class="js-delete-todo icon"><i class="fa-regular fa-trash-can js-delete-todo"></i></button>
                    <button class="js-edit icon"><i class="fa-solid fa-pen-to-square fa-1x"></i></button>
                </div>
                <div class="todo-date">${todo.dueDate}</div>
            </div>
        </div>
        `;
    
        if(item) {
            listBox.replaceChild(node, item);
        } else {
            listBox.append(node);
        }
    
        const todoExtras = document.querySelectorAll('.todo-extras');
    
        todoExtras.forEach((extra) => {
            const itemKey = extra.parentElement.parentElement.parentElement.parentElement.dataset.key;
            const index = todoArray.findIndex(item => item.id === Number (itemKey));
            extra.innerHTML = `<span>${todoArray[index].notes}</span>`;
            if(todoArray[index].notes === '') {
                extra.classList.add('hide');
            } else {
                extra.classList.remove('hide');
            }
        })
        
    }
    
    listBox.addEventListener('click', event => {
        if(event.target.classList.contains('js-tick')) {
            const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.dataset.key;
            toggleDone(itemKey);
        }
    
        if(event.target.classList.contains('js-delete-todo')) {
            const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
    
        if(event.target.classList.contains('todo-main')) {
            const totalTodo = event.target.parentElement.parentElement;
            if(event.target.children[1].focus()) {
                totalTodo.style.backgroundColor = '#f0f0f0d7';
            }
            const itemKey = event.target.parentElement.parentElement.parentElement.dataset.key;
            const newInput = event.target.children[1];
            const oldSpan = event.target.children[0];
            newInput.addEventListener('focus', (e) => {
                e.target.parentElement.parentElement.parentElement.style.backgroundColor = '#f7f7f7d7';
            })
            oldSpan.classList.add('hide');
            newInput.classList.add('newinput');
            newInput.classList.add('show');
            newInput.classList.remove('hide');
            newInput.setAttribute('type', 'text');
            newInput.focus();
            newInput.value = oldSpan.textContent;
            newInput.addEventListener('keydown', function(e) {
                if(e.key === 'Enter') {
                    const index = todoArray.findIndex(item => item.id === Number (itemKey));
                    oldSpan.textContent = newInput.value;
                    todoArray[index].text = newInput.value;
                    newInput.classList.remove('show');
                    newInput.classList.add('hide');
                    oldSpan.classList.remove('hide');
                    renderTodo(todoArray[index]);
                }
            })
            newInput.addEventListener('blur', function(e) {
                const index = todoArray.findIndex(item => item.id === Number(itemKey));
                oldSpan.textContent = newInput.value;
                todoArray[index].text = newInput.value;
                newInput.classList.remove('show');
                newInput.classList.add('hide');
                oldSpan.classList.remove('hide');
                renderTodo(todoArray[index]);
            })
        }
    
        if(event.target.classList.contains('js-edit')) {
            const todoText = document.querySelector('#todo-text');
            const inValid = document.createElement('span');
            inValid.classList.add('invalid-red');
            $(".invalid-red").text("");
            const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.dataset.key;
            const index = todoArray.findIndex(item => item.id === Number(itemKey));
            const todoNotes = document.getElementById('todo-notes');
            const datePicker = document.getElementById('datepicker');
            const todoTitle = document.getElementById('todo-text');
            const selected = document.getElementById('todo-priority');
            const oldSpan = event.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[1].children[0];
            todoTitle.value = oldSpan.textContent;
            selected.value = todoArray[index].priority;
            datePicker.value = todoArray[index].dueDate;
            todoNotes.value = todoArray[index].notes;
            console.log(todoArray[index])
            $("#dialog").dialog({
                buttons: [
                    {
                        text: 'Save',
                        click: function() {
                            $(".invalid-red").remove();
                            $(".ui-dialog-buttonpane").append(inValid);
                            oldSpan.textContent = todoTitle.value;
                            todoArray[index].text = oldSpan.textContent;
                            todoArray[index].priority = selected.value;
                            todoArray[index].dueDate = datePicker.value;
                            todoArray[index].notes = todoNotes.value;
                            const todoExtras = event.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[1].children[2];
                            todoExtras.innerHTML = `<span>${todoArray[index].notes}</span>`;
                            if(todoNotes.value === '') {
                                todoExtras.classList.add('hide');
                            } else {
                                todoExtras.classList.remove('hide');
                            }
                            renderTodo(todoArray[index]);
                            if(todoText.value === "") {
                                $(".invalid-red").text("Error: Can't leave title blank.");
                            } else if (todoText.value !== "") {
                                $(".invalid-red").remove();
                                $(this).dialog("close");
                            }
                        }
                    }
                ]
            });
        }
    });
    $("#datepicker").datepicker();
    $(".sortable").sortable();
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
        console.log(todo);
        if(confirm("Are you sure you want to delete this todo item?")) {
            todoArray = todoArray.filter(item => item.id !== Number(key));
            renderTodo(todo);
        }
    }
    
    
    document.addEventListener('DOMContentLoaded', function(){
        const ref = localStorage.getItem('todo');
        if (ref) {
            todoArray = JSON.parse(ref);
            todoArray.forEach((t) => {
                renderTodo(t);
            })
        }
    
        const ref2 = localStorage.getItem('project-name');
        if(ref2) {
            projectName = JSON.parse(ref2);
            console.log(projectName);
            appTitle.textContent = projectName;
            renderName();
        }
    
    
    })
    
    function renderName() {
        projectName = appTitle.textContent;
        firstProject.textContent = projectName;
        localStorage.setItem('project-name', JSON.stringify(projectName));
    }
    
    return {
        renderName,
        addTodo,
        renderTodo,
        deleteTodo,
        submitClick,
        toggleDone,
        defaultCheck
    }
})();

export default todoItems;
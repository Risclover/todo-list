const todoItem = (() => {
    const text = document.getElementById('todo-input');
    const submitBtn = document.getElementById('submit');
    const listBox = document.querySelector('.todo-list');
    const defaultIcon = document.getElementById('default-icon');
    const bgColor = document.getElementById('bg-color');
    const todoBody = document.querySelector('.todo-body');
    const title = document.querySelector('.app-title');
    const fontColor = document.getElementById('font-color');
    const headerBg = document.getElementById('header-bg');
    const headerFont = document.getElementById('header-font');
    const icons = document.querySelectorAll('button');
    const appTitle = document.querySelector('.app-title');
    const projectName = document.getElementById('project-name');
    const header = document.querySelector('.header');
    const headerTop = document.querySelector('.header-top');
    const firstProject = document.getElementById('first-project');

    defaultIcon.addEventListener('click', defaultMenu);
    submitBtn.addEventListener('click', submitClick);
    text.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            submitClick();
        }
    });

    let todoArray = [];
    let colorsObj = {
        bgCol: '#ffffff',
        fontCol: '#000000',
        headerFontCol: '#000000',
        headerCol: '#ffffff',
        projectName: 'Default'
    };

    let bgColorVal = "";
    let fontColorVal = "";
    let headerBgVal = "";
    let headerFontVal = "";
    
    function defaultMenu() {
        $("#default").dialog({
            buttons: [
                {
                    text: 'Clear Items',
                    click: function() {
                        $(this).dialog("close");
                        defaultCheck();
                    }
                },
                {
                    text: 'Save',
                    click: function() {
                        $( this ).dialog( "close" );
                        const newTitle = projectName.value;
                        todoBody.style.backgroundColor = `${bgColor.value}`;
                        console.log(bgColor.value);
                        header.style.backgroundColor = `${headerBg.value}`;
                        headerTop.style.color = `${headerFont.value}`;
                        todoBody.style.color = `${fontColor.value}`;
                        title.style.color = `${fontColor.value}`;
                        icons.forEach(icon => {
                            icon.style.color = `${fontColor.value}`;
                        })
                        bgColorVal = `${bgColor.value}`;
                        fontColorVal = `${fontColor.value}`;
                        headerFontVal = `${headerFont.value}`;
                        headerBgVal = `${headerBg.value}`;
                        colorsObj = {
                            bgCol: bgColorVal,
                            fontCol: fontColorVal,
                            headerFontCol: headerFontVal,
                            headerCol: headerBgVal,
                            projectName: newTitle
                        }
                        appTitle.textContent = colorsObj.projectName;
                        firstProject.textContent = colorsObj.projectName;
                        renderColor();
                    }
                }
            ]
        });
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
            listBox.replaceChild(node, item);
        } else {
            listBox.append(node);
        }

        const todoExtras = document.querySelectorAll('.todo-extras');

        todoExtras.forEach((extra) => {
            const itemKey = extra.parentElement.dataset.key;
            const index = todoArray.findIndex(item => item.id === Number (itemKey));
            extra.innerHTML = `<span>${todoArray[index].notes}</span>`;
        })
    }

    function renderColor() {
        localStorage.setItem('colors', JSON.stringify(colorsObj));
        appTitle.textContent = colorsObj.projectName;
        firstProject.textContent = colorsObj.projectName;
        console.log(colorsObj);
        todoBody.style.backgroundColor = colorsObj.bgCol;
        console.log(bgColor.value);
        header.style.backgroundColor = colorsObj.headerCol;
        headerTop.style.color = colorsObj.headerFontCol;
        todoBody.style.color = colorsObj.fontCol;
        title.style.color = colorsObj.fontCol;
        icons.forEach(icon => {
            icon.style.color = colorsObj.fontCol;
        })
        fontColor.value = colorsObj.fontCol;
        bgColor.value = colorsObj.bgCol;
        headerBg.value = colorsObj.headerCol;
        headerFont.value = colorsObj.headerFontCol;
        projectName.value = colorsObj.projectName;
    }

    listBox.addEventListener('click', event => {
        if(event.target.classList.contains('js-tick')) {
            const itemKey = event.target.parentElement.parentElement.parentElement.dataset.key;
            toggleDone(itemKey);
        }
    
        if(event.target.classList.contains('js-delete-todo')) {
            const itemKey = event.target.parentElement.parentElement.parentElement.dataset.key;
            deleteTodo(itemKey);
        }

        if(event.target.classList.contains('js-todo')) {
            const itemKey = event.target.parentElement.parentElement.parentElement.dataset.key;
            const newInput = event.target.parentElement.children[3];
            const oldSpan = event.target.parentElement.children[2];
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
            const itemKey = event.target.parentElement.parentElement.parentElement.dataset.key;
            const index = todoArray.findIndex(item => item.id === Number(itemKey));
            const todoNotes = document.getElementById('todo-notes');
            const datePicker = document.getElementById('datepicker');
            const todoTitle = document.getElementById('todo-text');
            const selected = document.getElementById('todo-priority');
            const oldSpan = event.target.parentElement.parentElement.children[0].children[2];
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
                            oldSpan.textContent = todoTitle.value;
                            $( this ).dialog( "close" );
                            todoArray[index].text = oldSpan.textContent;
                            todoArray[index].priority = selected.value;
                            todoArray[index].dueDate = datePicker.value;
                            todoArray[index].notes = todoNotes.value;
                            const todoExtras = event.target.parentElement.parentElement.parentElement.children[1];
                            todoExtras.innerHTML = `<span>${todoArray[index].notes}</span>`;
                            console.log(todoArray[index]);
                            renderTodo(todoArray[index]);
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
        const ref2 = localStorage.getItem('colors');
        if(ref2) {
            colorsObj = JSON.parse(ref2);
            renderColor();
        }
    })

    
});

export default todoItem;
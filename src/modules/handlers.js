import * as domElement from './domCollection';
import dom from './dom';
import tasks from './todoitems';

const handlers = (() => {
    function listenClicks() {
        domElement.projectSettings.addEventListener('click', defaultMenu);
        domElement.submitBtn.addEventListener('click', tasks.addTodo);
        domElement.projectNameModal.addEventListener('click', dom.titleClick);
        domElement.todoInput.addEventListener('keydown', submitShortcut);
        domElement.todoList.addEventListener('click', event => {
            if(event.target.classList.contains('js-tick')) {
                const itemKey = event.target.parentElement.parentElement.parentElement.dataset.key;
                tasks.toggleDone(itemKey);
            }
        
            if(event.target.classList.contains('js-delete-todo')) {
                const itemKey = event.target.parentElement.parentElement.parentElement.dataset.key;
                tasks.deleteTodo(itemKey);
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
                        const index = tasks.todoArray.findIndex(item => item.id === Number (itemKey));
                        oldSpan.textContent = newInput.value;
                        tasks.todoArray[index].text = newInput.value;
                        newInput.classList.remove('show');
                        newInput.classList.add('hide');
                        oldSpan.classList.remove('hide');
                        dom.renderTodo(tasks.todoArray[index]);
                    }
                })
                newInput.addEventListener('blur', function() {
                    const index = tasks.todoArray.findIndex(item => item.id === Number(itemKey));
                    oldSpan.textContent = newInput.value;
                    tasks.todoArray[index].text = newInput.value;
                    newInput.classList.remove('show');
                    newInput.classList.add('hide');
                    oldSpan.classList.remove('hide');
                    dom.renderTodo(tasks.todoArray[index]);
                })
            }
    
            if(event.target.classList.contains('js-edit')) {
                const itemKey = event.target.parentElement.parentElement.parentElement.dataset.key;
                const index = tasks.todoArray.findIndex(item => item.id === Number(itemKey));
                const oldSpan = event.target.parentElement.parentElement.children[0].children[2];
    
                domElement.todoTitleModal.value = oldSpan.textContent;
                domElement.todoPriorityModal.value = tasks.todoArray[index].priority;
                domElement.datepickerModal.value = tasks.todoArray[index].dueDate;
                domElement.notesModal.value = tasks.todoArray[index].notes;
    
                $("#todo-modal").dialog({
                    buttons: [
                        {
                            text: 'Save',
                            click: function() {
                                oldSpan.textContent = domElement.todoTitleModal.value;
                                $( this ).dialog( "close" );
                                tasks.todoArray[index].text = oldSpan.textContent;
                                tasks.todoArray[index].priority = domElement.todoPriorityModal.value;
                                tasks.todoArray[index].dueDate = domElement.datepickerModal.value;
                                tasks.todoArray[index].notes = domElement.notesModal.value;
    
                                const todoExtras = event.target.parentElement.parentElement.parentElement.children[1];
                                todoExtras.innerHTML = `<span>${tasks.todoArray[index].notes}</span>`;
                                dom.renderTodo(tasks.todoArray[index]);
                            }
                        }
                    ]
                });
            }
        });
    }
    
    function submitShortcut(e) {
        if(e.key === 'Enter') {
            tasks.addTodo();
        }
    };


    function defaultMenu() {
        $("#delete-check").dialog({
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
                        let bgColorVal = "";
                        let fontColorVal = "";
                        $( this ).dialog( "close" );
                        const newTitle = domElement.projectNameModal.value;
                        if(domElement.projectNameModal.value === '') {
                            domElement.projectNameModal.value = domElement.projectTitle.textContent;
                        } else {
                            domElement.projectNameModal.value = dom.colorsObj.projectName;
                        }
                        domElement.mainBox.style.backgroundColor = `${domElement.bgColorModal.value}`;
                        domElement.mainBox.style.color = `${domElement.fontColorModal.value}`;
                        domElement.projectTitle.style.color = `${domElement.fontColorModal.value}`;
                        bgColorVal = `${domElement.bgColorModal.value}`;
                        fontColorVal = `${domElement.fontColorModal.value}`;
                        dom.colorsObj = {
                            bgCol: bgColorVal,
                            fontCol: fontColorVal,
                            projectName: newTitle
                        }
                        domElement.projectTitle.textContent = dom.colorsObj.projectName;
                        domElement.firstProjectNav.textContent = dom.colorsObj.projectName;
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
                        domElement.todoList.innerHTML = "";
                        tasks.todoArray = [];
                        domElement.projectTitle.textContent = 'Default';
                        domElement.mainBox.style.backgroundColor = '#FFFFFF';
                        domElement.projectTitle.style.color = '#000000';
                        dom.colorsObj.bgCol = '#FFFFFF';
                        dom.colorsObj.fontCol = '#000000';
                        dom.colorsObj.projectName = 'Default';
                        localStorage.clear();
                        
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
    return {
        listenClicks,
        defaultCheck,
        defaultMenu,
        submitShortcut
    }
})();

export default handlers;
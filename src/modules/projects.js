import todoItems from './todoitem';

let projectList = [];

const newProjectBtn = document.getElementById('new-project-btn');
const appTitle = document.querySelector('.app-title');

newProjectBtn.addEventListener('click', addProject);
if(projectList.length === 0) {
    setFirstProject();
}
function setFirstProject() {
    const defaultProject = {
        name: appTitle.textContent,
        id: 1,
        active: true,
        theme: {
            id: 'Default',
            bgColor: '#FFFFFF',
            fontColor: '#000000'
        },
        todoArray: []
    };
    const todos = JSON.parse(localStorage.getItem('todo'));
    defaultProject.todoArray.push(todos);
    projectList.push(defaultProject);
    console.log(projectList);
}

function addProject(name) {
    const num = document.getElementById("project-nav").getElementsByTagName("li").length + 1;
    const project = {
        name: name,
        id: num,
        active: false,
        theme: {
            id: '',
            bgColor: '',
            fontColor: ''
        },
        todoArray: []
    };
    console.log(project);
    projectList.push(project);
    renderProject(project);
}

function renderProject(project) {
    localStorage.setItem('project-list', JSON.stringify(projectList));
    const projectNav = document.getElementById('project-nav');
    const projectLi = document.createElement('li');
    projectLi.setAttribute('data-key', `project-${project.id}`);
    projectLi.innerHTML = `
    <div class="project-nav-name">#<span class="project-num">${project.id}</span>:
        <span id="project-${project.id}"></span>
        <input type="text" id="project-${project.id}-input">
    </div>
    `;
    projectNav.append(projectLi);
    const liInput = document.getElementById(`project-${project.id}-input`);
    const liSpan = document.getElementById(`project-${project.id}`);
    liInput.classList.add('nav-input');
    liInput.style.display = 'inline-block';
    liSpan.style.display = 'none';
    liInput.focus();

    liInput.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            liSpan.textContent = liInput.value;
            project.name = liInput.value;
            liInput.style.display = 'none';
            liSpan.style.display = 'inline-block';
            switchProject(project);
        }
    })
}

function switchProject(project) {
    const appTitle = document.querySelector('.app-title');

}



/*
const projects = (() => {
    let projectCount = 0;
    let projectInfo = [];
    const newProjectBtn = document.getElementById('new-project-btn');
    const inputText = document.querySelector('#project-1-input');
    
    newProjectBtn.addEventListener('click', submitProject);
    
    // Initial 'New Project' click
    function submitProject() {
        const title = inputText.value;
        if(title!=='') {
            addProject(title);
        }
    }

    projectList.project[index].theme.id
    projectList.project[index].todoArray[index]
    // Creates the project object and pushes it to the projectInfo array
    function addProject(name) {
        projectCount = projectInfo.length - 1;

        const project = {
            name: name,
            bgColor: '#000000',
            fontColor: '#FFFFFF',
            id: projectCount,
            theme: {
                id,
                bgColor,
                fontColor
            }
        };
        projectInfo.push(project);
        renderProject(project);
    }
    
    // Renders the project array (meaning visually) and saves it to localStorage
    function renderProject(project) {
        localStorage.setItem('project', JSON.stringify(projectInfo));
        const projectNav = document.querySelector('#project-nav');
        const newLi = document.createElement('li');
        projectNav.appendChild(newLi);
        newLi.setAttribute('data-key', `project-${project.id}`)
        newLi.innerHTML = `
        <div class="project-nav-name">#<span class="project-num">${project.id}</span>:
            <span id="project-${project.id}"></span>
            <input type="text" id="project-${project.id}-input">
        </div>
        `;
    
        const hiddenInput = document.getElementById(`project-${project.id}-input`);
        const titleSpan = document.getElementById(`project-${project.id}`);
    
        hiddenInput.style.display = "block";
        titleSpan.style.display = "none";
    
        hiddenInput.value = "Testing";

    }
*/

export default {projectList, addProject, renderProject, setFirstProject};
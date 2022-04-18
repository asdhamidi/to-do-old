// Module Import
import './style.css';
import { Manager } from './manager';

// Icon Import
import submitButton from './assets/submit.svg';
import cancelButton from './assets/cancel.svg';
import deleteButton from './assets/delete.svg';
import editButton from './assets/edit.svg';
import github from './assets/github.svg';

// Main DOM Elements
let projectPane = document.querySelector(".project-pane");
let projectButtons = projectPane.querySelector(".buttons");
let projectTiles = projectPane.querySelector(".project-tiles");
let taskPane = document.querySelector(".task-pane");
let taskButtons = taskPane.querySelector(".buttons");
let taskTiles = taskPane.querySelector(".task-tiles");

// Display module for rendering all the UI.
let display = (() => {

    //************************ Loading Base UI Fn and the helper functions ************************
    function begin() {
        loadTopBar();
        loadHeading();

        createProjectModal();
        createProjectAddButton();
        createProjectEditModal();

        createTaskModal();
        createTaskAddButton();
        createTaskEditModal();

        addBlurBg();
    };

    // Top Bar Loader Fn.
    function loadTopBar() {
        let nav = document.querySelector("nav");

        // Sandwich Icon for collapsing Project Pane
        let sandwich = document.createElement("div");
        sandwich.className = "sandwich";
        for (let i = 0; i < 3; i++) {
            let bar = document.createElement("div");
            bar.className = "bar";
            sandwich.appendChild(bar);
        }
        sandwich.onclick = () => projectPane.classList.toggle("hidden");
        nav.appendChild(sandwich);

        // Title
        let title = document.createElement("div");
        title.className = "title";
        title.textContent = "KaamKarle";
        nav.appendChild(title);

        // Github icon and link
        let githubLink = document.createElement("a");
        githubLink.className = "github";
        let icon = new Image();
        icon.src = github;
        githubLink.href = "https://www.github.com/asdhamidi/to-do"
        githubLink.appendChild(icon);
        nav.appendChild(githubLink);
    };

    // Panes Headings Loader Fn.
    function loadHeading() {
        let projectHeading = document.createElement("h1");
        projectHeading.textContent = "Projects";
        projectTiles.appendChild(projectHeading);

        let taskHeading = document.createElement("h1");
        taskHeading.textContent = "Your Tasks";
        taskTiles.appendChild(taskHeading);
    };

    // Generic Modal Template Creator.
    function createModal(label, sublabel, clsName, submitfn, cancelfn) {
        let modal = document.createElement("div");
        modal.className = clsName;

        let data = document.createElement("div");
        data.className = "modal-data";

        let heading = document.createElement("h1");
        heading.textContent = `${sublabel} ${label}`;
        modal.appendChild(heading);

        let name = document.createElement("INPUT");
        name.setAttribute("type", "text");
        name.placeholder = `Enter ${label} Name:`
        data.appendChild(name);

        let buttons = document.createElement("div");
        buttons.className = "modal-buttons";
        let submit = new Image();
        submit.className = "tick";
        submit.src = submitButton;
        submit.onclick = submitfn;


        let cancel = new Image();
        cancel.className = "cross";
        cancel.src = cancelButton;
        cancel.onclick = cancelfn;

        buttons.appendChild(submit);
        buttons.appendChild(cancel);

        modal.appendChild(data);
        modal.appendChild(buttons);

        return modal;
    };

    // Project Adding Modal Creator Fn using generic modal creator..
    function createProjectModal() {
        let modal = createModal("Project", "New", "project-modal", submitProject, closeModal);
        projectButtons.appendChild(modal);
    }

    // Project Modal Opener Fn.
    function openProjectModal() {
        document.querySelector(".project-modal").classList.toggle("modal-active");
    }

    // Task Adding Modal Creator Fn using generic modal creator..
    function createTaskModal() {
        let modal = createModal("Task", "New", "task-modal", submitTask, closeModal);
        
        taskButtons.appendChild(taskModalModifications(modal));
    }

    // Adds needed input fields to the template modal.
    function taskModalModifications(modal) {
        let notes = document.createElement("div");
        notes.className = "notes";
        let notesInput = document.createElement("textarea");
        notesInput.className ="notes-input-field";
        notesInput.placeholder = "Notes:"
        notesInput.setAttribute("type", "text");
        notes.appendChild(notesInput);
        
        let priority = document.createElement("div");
        priority.className = "priority";
        let head = document.createElement ("p");
        head.textContent = "Priority: ";
        let high = document.createElement("div");
        high.textContent = "High";
        high.className = "red";
        let medium = document.createElement("div");
        medium.textContent = "Medium";
        medium.className = "orange";
        let low = document.createElement("div");
        low.textContent = "Low";
        low.className = "green";
        
        priority.appendChild(head);
        priority.appendChild(low);
        priority.appendChild(medium);
        priority.appendChild(high);
        
        modal.querySelector(".modal-data").appendChild(notes);
        modal.querySelector(".modal-data").appendChild(priority);

        return modal;
    }

    // Task Modal Opener Fn.
    function openTaskModal() {
        document.querySelector(".task-modal").classList.toggle("modal-active");
        dynamicEventListeners();
    }
    
    // Closes All Active Modal.
    function closeModal() {
        clearForm()
        document.querySelector(".task-modal").classList.remove("modal-active");
        document.querySelector(".project-modal").classList.remove("modal-active");
        document.querySelector(".edit-project-modal").classList.remove("edit-modal-active");
        document.querySelector(".edit-task-modal").classList.remove("edit-modal-active");
    }

    // Add Button Template Creator.
    function createAddButton(modalOpener) {
        let projButton = document.createElement("button");
        projButton.className = "add-button";
        projButton.onclick = modalOpener;
        projButton.textContent = "+ Add";

        return projButton;
    }

    // Adds Project Adding Button.
    function createProjectAddButton() {
        let btn = createAddButton(openProjectModal);
        projectButtons.appendChild(btn);
    }

    // Adds Task Adding Button.
    function createTaskAddButton() {
        let btn = createAddButton(openTaskModal);
        taskButtons.appendChild(btn);
    }

    // Creates Project Edit Modal using generic modal creator.
    function createProjectEditModal() {
        let modal = createModal("Project", "Edit", "edit-project-modal", null, closeProjectEditor);
        document.body.appendChild(modal);
    };

    // Open Project Edit Modal.
    function openProjectEditModal() {
        document.querySelector(".edit-project-modal").classList.toggle("edit-modal-active");
        document.querySelector(".blur-bg").classList.toggle("blur-active");
    }

    // Project Editor Closer.
    function closeProjectEditor() {
        document.querySelector(".edit-project-modal").classList.remove("edit-modal-active");
        document.querySelector(".blur-bg").classList.remove("blur-active");
    }
    
    // Creates Task Edit Modal using generic modal creator.
    function createTaskEditModal() {
        let modal = taskModalModifications(createModal("Task", "Edit", "edit-task-modal", null, closeTaskEditor));
        document.body.appendChild(modal);
    };
    
    // Open Task Edit Modal.
    function openTaskEditModal() {
        document.querySelector(".edit-task-modal").classList.toggle("edit-modal-active");
        document.querySelector(".blur-bg").classList.toggle("blur-active");
    }

    // Task Editor closer.
    function closeTaskEditor() {
        document.querySelector(".edit-task-modal").classList.remove("edit-modal-active");
        document.querySelector(".blur-bg").classList.remove("blur-active");
    }
    
    // Closes all editor.
    function closeEditors() {
        closeProjectEditor();
        closeTaskEditor();
        clearButtons();
        document.querySelector(".blur-bg").classList.remove("blur-active");
    }

    // Adds the blur background used during editor popups.
    function addBlurBg() {
        let blur = document.createElement("div");
        blur.className = "blur-bg";
        blur.onclick = () => closeEditors();
        document.body.appendChild(blur);
    }


    // ********************************************************************************************
    //*********************************Element Creators Functions.*********************************

    // Project Tile Creating Fn.
    function newProjectTile(project) {
        let tile = document.createElement("div");
        tile.className = "project-tile";
        tile.classList.add("active");
        tile.id = project.id;
        tile.onclick = () => {
            Manager.loadProject(project.id);
        }

        let name = document.createElement("div");
        name.className = "project-name";
        name.textContent = project.name;
        tile.appendChild(name);

        let buttons = document.createElement("div");
        buttons.className = "proj-buttons";

        let edit = new Image();
        edit.src = editButton;
        edit.className = "edit";
        edit.onclick = () => {
            openProjectEditModal();
            fillProjectEditModal(project.id);
            dynamicEventListeners(project);
        };
        buttons.appendChild(edit);

        const deleteBtn = new Image();
        deleteBtn.src = deleteButton;
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => Manager.deleteProject(project);
        buttons.appendChild(deleteBtn);

        tile.appendChild(buttons);

        projectTiles.appendChild(tile);
    };

    // Project Project Creating Fn.
    function newTaskTile(task) {
        let tile = document.createElement("div");
        tile.className = "task-tile";
        tile.setAttribute("task-id", task.id);

        let priority = document.createElement("div");
        priority.className = "task-priority";
        priority.style.backgroundColor = task.priority;

        let taskData = document.createElement("div");
        taskData.className = "task-data";
        taskData.onclick = (e) => {
            expandTask(e.target.parentNode);
        };

        let check = document.createElement("INPUT");
        check.setAttribute("type", "checkbox");
        if(task.status)
        {
            tile.classList.add("done");
            check.checked = true;
        }
        else
        check.checked = false;

        check.onclick = (e) => {
            Manager.setActiveTask(task.id);
            Manager.changeTaskStatus();
            tile.classList.toggle("done");
        };
        priority.appendChild(check);

        let name = document.createElement("div");
        name.className = "task-name";
        name.textContent = task.name;
        taskData.appendChild(name);

        let notes = document.createElement("div");
        notes.className = "task-notes";
        notes.textContent = task.notes;
        taskData.appendChild(notes);

        let taskButtons = document.createElement("div");
        taskButtons.className = "task-tile-buttons";

        let edit = new Image();
        edit.src = editButton;
        edit.className = "edit";
        edit.onclick = () => {
            Manager.setActiveTask(task.id);
            openTaskEditModal();
            fillTaskEditModal(task.id);
            dynamicEventListeners(task.id);
            
        }
        taskButtons.appendChild(edit);

        let deleteBtn = new Image();
        deleteBtn.className = "delete";
        deleteBtn.src = deleteButton;
        deleteBtn.onclick = (e) => { Manager.deleteTask(task, e.target.parentNode.parentNode); };
        taskButtons.appendChild(deleteBtn);

        tile.appendChild(priority);
        tile.appendChild(taskData);
        tile.appendChild(taskButtons);

        taskTiles.appendChild(tile);
    };

    function expandTask(node) {
        node.querySelector(".task-notes").classList.toggle("notes-active");
    };
    //*********************************************************************************************
    // Helper Functions

    // Loads New Projects.
    function loadNewProject(project) {
        newProjectTile(project);
        loadTasks(project.todos);
    };

    // Loads already exisitng projects.
    function loadProject(project) {
        if(project != null)
        loadTasks(project.todos);
    };

    // Deletes project tile from UI.
    function deleteProject(name) {
        if (projectPane.childNodes.length >= 1) {
            projectTiles.childNodes.forEach(proj => {
                if (proj.classList.contains("project-tile") && proj.firstChild.textContent == name) {
                    clearTaskPane();
                    projectTiles.removeChild(proj);
                }
            });
        }
    }
    
    // Reads data from Project Modal and makes a new tile.
    function submitProject() {
        let newName = document.querySelector(".modal-data > input").value;
        Manager.addProject(newName);
        closeModal();
        clearForm();
    };

    // Edits the UI Project tile.
    function editProject(id, name) {
        let projectTile = document.getElementById(id);
        projectTile.querySelector(".project-name").textContent = name;
    }

    // Fills the project edit modal with the details of selected project.
    function fillProjectEditModal(id) {
        let name = Manager.getProject(id).name;
        document.querySelector(".edit-project-modal > .modal-data > input").value = name;
    }
    
    // Fills the task edit modal with the details of selected task.
    function fillTaskEditModal(id) {
        let task = Manager.getActiveTask();
        document.querySelector(".edit-task-modal > .modal-data > input").value = task.name;
        document.querySelector(".edit-task-modal > .modal-data > .notes > .notes-input-field").value = task.notes;
        let priority = task.priority;
        document.querySelectorAll(".edit-task-modal > .modal-data > .priority > div").forEach(pr => {
            if(pr.className == priority)
            {
                pr.style.backgroundColor = pr.className;
                pr.style.color = "white";
                pr.classList.add("btn-active")
            }

        });
    }
    
    // Tasks Loader
    function loadTasks(tasks) {
        clearTaskPane();
        for (let i = 0; i < tasks.length; i++)
        newTaskTile(tasks[i]);
    };

    // Deletes task tile from UI.
    function deleteTask(node) {
        taskTiles.removeChild(node);
    };

    // New Task Added 
    function addTask(task) {
        newTaskTile(task);
    };

    // Reads data from Task Modal and makes a new tile.
    function submitTask() {
        let newName = document.querySelector(".task-modal > .modal-data > input").value;
        let priority = document.querySelector(".priority > .btn-active").classList[0];
        let notes = document.querySelector(".notes-input-field").value;
        if (newName != "") {
            Manager.addTask(newName, priority, notes );
        }
        clearForm();
        closeModal();
    };

    // Clears Task Pane.
    function clearTaskPane() {
        while (taskTiles.childNodes.length > 1)
            taskTiles.removeChild(taskTiles.childNodes[taskTiles.childNodes.length - 1])
    };

    // Clears Selected Priority Buttons in Task Modal when needed.
    function clearButtons() {
        document.querySelectorAll(".edit-task-modal > .modal-data > .priority > div").forEach(btn => {
            btn.classList.remove("btn-active");
            btn.style.borderColor = btn.className;
            btn.style.color = btn.className;
            btn.style.backgroundColor = "transparent";
        });

        document.querySelectorAll(".task-modal > .modal-data > .priority > div").forEach(btn => {
            btn.classList.remove("btn-active");
            btn.style.borderColor = btn.className;
            btn.style.color = btn.className;
            btn.style.backgroundColor = "transparent";
        });
    };

    // Highlights the selected project.
    function newActiveProject(id) {
        removeActive();
        document.getElementById(id).classList.toggle("active");
    }

    // Edits the UI Task Tile after edits in the storage.
    function editTaskTile() {
        let task = Manager.getActiveTask();
        for(let i = 0; i < taskTiles.childNodes.length; i++) {
            let node = taskTiles.childNodes[i];
            if(node.classList.contains("task-tile") && node.getAttribute('task-id') == task.id)
            {
                node.querySelector(".task-priority").style.backgroundColor = task.priority;
                node.querySelector(".task-data > .task-name").textContent = task.name;
                node.querySelector(".task-data > .task-notes").textContent = task.notes;
                break;
            }
        }
    }

    // Removes active class from all the Project Tiles.
    function removeActive() {
        let projTiles = projectTiles.childNodes;
        projTiles.forEach(tile => {
            tile.classList.remove("active");
        });
    };


    // Clears Modal Forms when needed.
    function clearForm() {
        document.querySelector(".project-modal > .modal-data > input").value = "";
        document.querySelector(".task-modal > .modal-data > input").value = "";
        document.querySelector(".task-modal > .modal-data > .notes > .notes-input-field").value = "";
        document.querySelector(".edit-project-modal > .modal-data > input").value = "";
        document.querySelector(".edit-task-modal > .modal-data > input").value = "";
        document.querySelector(".edit-task-modal > .modal-data > .notes > .notes-input-field").value = "";
        clearButtons();
    };

    // Event listeners for submit buttons and priority button selections.
    function dynamicEventListeners(subject = null) {
        document.querySelector(".edit-project-modal > .modal-buttons > .tick").addEventListener("click", () => {
            let newName = document.querySelector(".edit-project-modal > .modal-data > input").value;
            Manager.editProject(subject.id, newName);
            closeEditors();
            return;
        });

        document.querySelector(".edit-task-modal > .modal-buttons > .tick").addEventListener("click", () => {
            let newName = document.querySelector(".edit-task-modal > .modal-data > input").value;
            let newNotes = document.querySelector(".edit-task-modal > .modal-data > .notes > .notes-input-field").value;
            let newPriority = document.querySelector(".priority > .btn-active").classList[0];


            Manager.editTask(newName, newNotes, newPriority);
            clearButtons();
            closeEditors();
            return;
        });

        document.querySelectorAll(".priority > div").forEach(btn => {
            btn.addEventListener("click", () => {
                clearButtons();
                btn.style.backgroundColor = btn.className;
                btn.style.color = "white";
                btn.classList.add("btn-active");
                return;
            });
        });
    };
    return {
        begin,
        loadProject,
        loadNewProject,
        deleteProject,
        editProject,
        newActiveProject,
        addTask,
        deleteTask,
        editTaskTile
    }
})();

export {display};
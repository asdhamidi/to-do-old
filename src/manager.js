import { Project } from "./constructors";
import {display} from "./display";

let Manager = (() => {
    let projects = [];

    // Currently selected.
    let activeProject = null;
    let activeTask = null;

    // IDs assigned to each project.
    let ids = 0;

    function addProject(name) {
        let newProj = Project(name);
        newProj.id = ids++;

        projects.push(newProj)
        setActiveProject(newProj.id);

        display.loadNewProject(newProj);
        display.newActiveProject(newProj.id);
    };

    function loadProject(id) {
        display.loadProject(getProject(id));
        display.newActiveProject(id);
        setActiveProject(id);
    };

    function deleteProject(p) { 
        projects = projects.filter(proj => proj.name != p.name);

        setActiveProject(null);
        display.deleteProject(p.name);
    };

    function getTasks(id = 0) {
        getProject(id).todos;
    };

    function editProject(id, name) {
        getProject(id).edit(name);
    };

    function setActiveProject(id) { 
        if(id != null)
        activeProject = getProject(id) 
        else
        activeProject = id;
    };

    function getProject(ID)
    {
        for(let i = 0; i < projects.length; i++)
        if(projects[i].id === ID)
        return projects[i];
    };

    function getActiveProject() {
        return activeProject;
    };
    
    function deleteTask(task, node) {
        getActiveProject().deleteTask(task, node);
    };

    function addTask(name, priority, notes) {
        getActiveProject().addTask(name, priority, notes);
    };

    function editTask(name, notes, priority) {
        getActiveProject().editTask(name, notes, priority)
    }

    function getActiveTask() {
        return activeTask;
    }

    function setActiveTask(id) {
        activeTask = getActiveProject().getTask(id);
    };

    function changeTaskStatus() {
        getActiveTask().changeStatus();
    }

    return {
        addProject,
        deleteProject,
        loadProject,
        editProject,
        getProject,
        getActiveProject,
        getActiveTask,
        setActiveTask,
        getTasks,
        addTask,
        deleteTask,
        editTask, 
        changeTaskStatus
    }
})();

export {Manager};
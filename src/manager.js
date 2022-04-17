import { Project } from "./constructors";
import {display} from "./display";

let Manager = (() => {
    let projects = [];

    let current = null;

    let ids = 0;

    function addProject(name) {
        let newProj = Project(name);
        newProj.id = ids++;

        projects.push(newProj)
        changeCurrent(newProj.id);

        display.loadNewProject(newProj);
        display.newActiveProject(newProj.id);
    };

    function loadProject(id) {
        display.loadProject(getProject(id));
        display.newActiveProject(id);
        changeCurrent(id);
    };

    function deleteProject(p) { 
        projects = projects.filter(proj => proj.name != p.name);

        display.deleteProject(p.name);
    };

    function getTasks(id = 0) {
        getProject(id).todos;
    };

    function editProject(id, name) {
        getProject(id).edit(name);
    };

    function changeCurrent(id) { 
        if(id != null)
        current = getProject(id) 
        else
        current = id;
    };

    function getProject(ID)
    {
        for(let i = 0; i < projects.length; i++)
        if(projects[i].id === ID)
        return projects[i];
    };

    function getCurrent() {
        return current;
    };
    
    function deleteTask(task, node) {
        getCurrent().deleteTask(task, node);
    };

    function addTask(name, priority, notes) {
        getCurrent().addTask(name, priority, notes);
    };

    function editTask(name, notes, priority, task) {
        getCurrent().editTask(name, notes, priority, task)
    }
    return {
        addProject,
        deleteProject,
        loadProject,
        editProject,
        getProject,
        getCurrent,
        changeCurrent,
        getTasks,
        addTask,
        deleteTask,
        editTask
    }
})();

export {Manager};
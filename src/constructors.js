import { display } from "./display";
import { Manager } from "./manager";

function Todo(name, priority, notes, id, dueDate = null, status = false)
{
    function editTask(newName, newNotes, newPriority) {
        this.name = newName;
        this.notes = newNotes;
        this.priority = newPriority;
    }

    function changeStatus() {
        this.status = !this.status;
    }

    return({name, notes, dueDate, id, priority, status, editTask, changeStatus});
}

function Project(name)
{
    let todos = [];
    let id = null; // ID of the project.
    let ids = 0; // IDs for the tasks of the project.

    function addTask(task, priority, notes) {
        let newTask = Todo(task, priority, notes);
        newTask.id = ids++;
        todos.push(newTask);
        display.addTask(newTask);
    };

    function deleteTask(task, node) {
        this.todos = this.todos.filter(t => t.name != task.name);
        display.deleteTask(node);
    };

    function edit(newName) {
        this.name = newName;
        display.editProject(this.id, newName);
    };

    function clearData() {
        todos = [];
        id = null;
    };

    // Retrieves the task with the given ID.
    function getTask(id) {
        for(let i = 0; i < todos.length; i++)
        {
            if(todos[i].id == id)
            return todos[i];
        }
    }

    function editTask(name, notes, priority)
    {
        Manager.getActiveTask().editTask(name, notes, priority);
        display.editTaskTile();
    }

    return {name, todos, id, addTask, deleteTask, edit, clearData, editTask, getTask};
} 

export {Todo, Project};
import { display } from "./display";

function Todo(name, priority, notes, id, dueDate = null, status = false)
{   
    function editTask(newName, newNotes, newPriority) {
        this.name = newName;
        this.notes = newNotes;
        this.priority = newPriority;
    }

    return({name, notes, dueDate, id, priority, status, editTask});
}

function Project(name)
{
    let todos = [];
    let id = null;
    let ids = 0;

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
    }

    function getTask(id) {
        for(let i = 0; i < todos.length; i++)
        {
            if(todos[i].id == id)
            return todos[i];
        }
    }

    function editTask(name, notes, priority, id)
    {
        getTask(id).editTask(name, notes, priority);
        display.editTaskTile(getTask(id));
    }

    return {name, todos, id, addTask, deleteTask, edit, clearData, editTask, getTask};
} 

export {Todo, Project};
import {display} from "./display";
import {Manager} from "./manager";

// Starts the app.
export function begin() {
    display.begin();
    loadUp();
}

// Loads default dummy data.
function loadUp() {
    Manager.addProject("Home");
    fillUp();
}

function fillUp() {
    let current = Manager.getActiveProject();
    let tasks = ["Learn Programming", "Create websites", "Make Money", "Do weird things with money"];
    let colors = ["red", "green", "orange"];
    for(let i = 0; i < 4; i++)
    current.addTask(tasks[i], colors[Math.floor(Math.random() * 3)], "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum");
}
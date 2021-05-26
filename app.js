// define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {

    //DOM event listener
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener("submit", addTask);
    //Remove task event
    taskList.addEventListener("click", removeTask);
    //Clear task event
    clearBtn.addEventListener("click", clearTasks);

    //Filter tasks
    filter.addEventListener("keyup", filterTask);
}
//Get tasks form LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    //jab local storage se tasks retrieve kar rahe hain tw wo string mei hai unko object mei convert karna pare ga using Json.parse
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        //Create li element
        const li = document.createElement("li");
        //Add class
        li.className = "collection-item";
        //Create text node and append to the li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement("a");
        //Add class
        link.className = "delete-item secondary-content";
        //Add Icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append link to li
        li.appendChild(link);

        //Append li to the ul
        taskList.appendChild(li);
    });


}

//Add Tasks
function addTask(e) {

    if (taskInput.value === '') {
        alert("Add a task");
    }
    //Create li element
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item";
    //Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement("a");
    //Add class
    link.className = "delete-item secondary-content";
    //Add Icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);

    //Append li to the ul
    taskList.appendChild(li);

    //Store in LS
    storeInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = "";

    e.preventDefault();
}

//Store task 
function storeInLocalStorage(task) {
    let tasks;
    //agar local storage mei koi tasks nhi h tw tasks array create kardo
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    //jab local storage se tasks retrieve kar rahe hain tw wo string mei hai unko object mei convert karna pare ga using Json.parse
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("are you sure?")) {
            e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLocalStorage( e.target.parentElement.parentElement);
        }
    }
  


};
//Remove from Ls
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    //agar local storage mei koi tasks nhi h tw tasks array create kardo
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    //jab local storage se tasks retrieve kar rahe hain tw wo string mei hai unko object mei convert karna pare ga using Json.parse
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(e) {
    //taskList.innerHTML='';

    //Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    //Clear tasks from LS
    clearTasksFromLocalStorage();
}
function  clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }

        }
    );

};
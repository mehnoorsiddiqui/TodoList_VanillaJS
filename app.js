// Define UI vars
const form=document.querySelector("#task-form");
const taskList=document.querySelector(".collection");
const clearBtn=document.querySelector(".clear-tasks");
const filter=document.querySelector("#filter");
const taskInput=document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //Add task event
    form.addEventListener("submit",addTask);
}
function addTask(e){
    if(taskInput.value===''){
        alert("Add a task");
    }
    //Create li element
    const li=document.createElement("li");
    //Add class
    li.className="collection-item";
    //Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link=document.createElement("a");
    //Add class
    link.className="delete-item secondary-content";
    //Add Icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);
   
    //Append li to the ul
    taskList.appendChild(li);
    console.log(taskList);
    //Clear input
    taskInput.value="";

    e.preventDefault();
}


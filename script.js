const taskInput =
document.getElementById(
"taskInput"
);

const taskList =
document.getElementById(
"taskList"
);

const filterButtons =
document.querySelector(
".filters"
);

let tasks =
JSON.parse(
localStorage.getItem(
"tasks"
)
)
||
[];

let currentFilter =
"all";

renderTasks();

/* CREATE */

document
.getElementById(
"addBtn"
)

.addEventListener(

"click",

()=>{

const text =
taskInput.value.trim();

if(
text===""

)

return;

tasks.push({

id:
Date.now(),

text,

completed:
false

});

taskInput.value="";

save();

}

);

/* FILTER */

filterButtons
.addEventListener(

"click",

e=>{

if(
e.target.dataset.filter
){

currentFilter =
e.target.dataset.filter;

renderTasks();

}

}

);

/* UPDATE + DELETE */

taskList
.addEventListener(

"click",

e=>{

const id =
Number(
e.target.dataset.id
);

if(
e.target.classList
.contains(
"complete"
)
){

tasks =
tasks.map(

task=>

task.id===id

?

{

...task,

completed:
!task.completed

}

:

task

);

}

if(

e.target.classList
.contains(
"delete"
)

){

tasks =
tasks.filter(

task=>

task.id!==id

);

}

save();

}

);

/* STORAGE */

function save(){

localStorage
.setItem(

"tasks",

JSON.stringify(
tasks
)

);

renderTasks();

}

/* RENDER */

function renderTasks(){

taskList.innerHTML="";

const filtered =

tasks.filter(

task=>{

if(
currentFilter==="all"
)

return true;

if(
currentFilter==="active"
)

return !task.completed;

if(
currentFilter==="completed"
)

return task.completed;

}

);

filtered.forEach(

task=>{

const item =
document.createElement(
"li"
);

item.innerHTML =

`

<span class="${
task.completed
?
"done"
:
""
}">

${task.text}

</span>

<div>

<button
class="complete"
data-id="${task.id}">

${
task.completed
?
"Undo"
:
"Done"
}

</button>

<button
class="delete"
data-id="${task.id}">

Delete

</button>

</div>

`;

taskList.append(
item
);

}

);

}
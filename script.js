let addTaskBtnDOM = document.querySelector("#addTaskBtn");
let ulListDOM = document.querySelector("#ulList");
let text_formDOM = document.querySelector("#text_form");

let TASKS = [];

getLocalStrogeFunc(); // Local Strogede depolanan bilgi varsa onu cagırmadık.

addTaskBtnDOM.addEventListener("click", newTask);

ulListDOM.addEventListener("click", (event) => {
    if (event.target.tagName === 'LI') {
        event.target.firstChild.firstChild.firstChild.classList.toggle("checked");
        event.target.firstChild.lastChild.classList.toggle("line-through");
        event.target.classList.toggle("check-bg");
    }
})


function newTask(e) {
    let input_text = text_formDOM.value.trim();

    if (input_text) {
        TASKS.push(input_text)
        text_formDOM.value = "";
        displayTasks();
    } else showAlertFunction()

    e.preventDefault(); // Sayfanın yenilenmesini engelledik. 
}

function displayTasks() {
    ulListDOM.innerHTML = "";
    hiddenAlertFunction();

    TASKS.forEach((task, id) => {
        let liDOM = document.createElement("li");
        let divDOM = document.createElement("div");
        let checkDOM = document.createElement("span");
        let spanDOM = document.createElement("span");

        let deleteButtonDOM = document.createElement("button");

        liDOM.classList.add('list-group-item', 'list-group-item-action');

        checkDOM.innerHTML = `<i class="fa-solid fa-check checked me-1"></i>`;
        spanDOM.innerText = task;

        deleteButtonDOM.classList.add('btn', 'btn-danger', 'fa-solid', 'fa-trash-can');

        divDOM.append(checkDOM);
        divDOM.append(spanDOM);
        liDOM.append(divDOM); // check iconu ile taski bir div icine yazarak yan yana almış olduk
        liDOM.append(deleteButtonDOM);
        ulListDOM.append(liDOM);

        deleteButtonDOM.addEventListener("click", () => {
            deleteTask(id);
        });

    });
    setLocalStroge(TASKS);
}

function deleteTask(index) {
    TASKS.splice(index, 1);
    displayTasks();
}

function showAlertFunction() {
    let alertMessageDOM = document.querySelector("#alertMessage");
    alertMessageDOM.classList.remove("d-none");
    text_formDOM.value = "";
}

function hiddenAlertFunction() {
    let alertMessageDOM = document.querySelector("#alertMessage");
    alertMessageDOM.classList.add("d-none");
}

function setLocalStroge(value) {
    localStorage.setItem('task', JSON.stringify(value)); // array ve objeleri local storageye depolamak istersen "JSON.stringify" ifadesini kullanmak gerekir. 
}

function getLocalStrogeFunc() {
    let getLocalStroge = JSON.parse(window.localStorage.getItem('task'));
    if (getLocalStroge) {
        TASKS = getLocalStroge;
        displayTasks();
    }
}





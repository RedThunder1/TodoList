function addItem() {
    const input_field = document.getElementById("input");
    const title = document.getElementById("title");
    const list = document.getElementById("todo_list")

    if (input_field.value === "") {
        title.innerText = "Can't add item! No text inputted!";
    } else {
        list.innerHTML += '<li><a onclick="crossOut(this)" class="todo_item">' + input_field.value + '</a><a onclick="removeItem(this)" class="close_item">X</a></li>';
        input_field.value = "";
        title.innerText = "Your todo items!";
    }
}

function removeItem(item) {
    const list = document.getElementById("todo_list")
    const title = document.getElementById("title");
    item.parentNode.remove();
    if (!list.innerHTML.includes('<li>')) {
        title.innerHTML = "You have no todo items yet!<br>Add them below!";
    }
}

function loadItems() {
    const list = document.getElementById("todo_list")
    const title = document.getElementById("title");
    let todo = JSON.parse(localStorage.getItem("todo-list"));
    if (!todo) {
        todo = [];
    } else {
        todo.forEach(item => {
            list.innerHTML += '<li><a onclick="crossOut(this)" class="todo_item">' + item + '</a><a onclick="removeItem(this)" class="close_item">X</a></li>';
        })
        title.innerText = "Your todo items!";
    }
}

function crossOut(item) {
    if (item.innerHTML.includes("<s>")) {
        item.innerHTML = item.innerText
    } else{
        item.innerHTML = '<s>' + item.innerHTML + '</s>';
    }
}

function load_events() {
    const input_field = document.getElementById("input");
    input_field.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addItem();
        }
    });
    loadItems();
}
window.onload = load_events;

window.onbeforeunload = function () {
    const list = document.getElementsByClassName('todo_item');
    let data = [];
    for (let i = 0; i < list.length; i++) {
        data.push(list[i].innerText)
    }
    localStorage.setItem('todo-list', JSON.stringify(data))
}


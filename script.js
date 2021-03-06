// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoBuuton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const changeBack = document.querySelector('.change');


// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoBuuton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);
changeBack.addEventListener('click', changeBG);



// FUNCTIONS

function addTodo(event){
    // prevent form from submitting
    event.preventDefault();
    // Todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo");
    // Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCAL STORAGE:
    saveLocalTodos(todoInput.value);
    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
     // CHECK DELETE BUTTON
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
     trashButton.classList.add('trash-btn');
     todoDiv.appendChild(trashButton);

    //  append to list:
    todoList.appendChild(todoDiv);
    // Clear Input value:
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    // Delete
    if(item.classList[0]==='trash-btn'){
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    // Check
    if(item.classList[0]==='complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    } 

}



function filterTodo(e){
    const todos = [...todoList.childNodes].filter(node => node instanceof HTMLElement);
    console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList?.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
              
            case "uncompleted":
                if(!todo.classList?.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }      
    });
}


function saveLocalTodos(todo){
    // CHECK--Already exists
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}
    
function getTodos(){
        let todos;
        if(localStorage.getItem('todos')===null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        
        todos.forEach(function(todo){
        // Todo div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add("todo");
        // Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
       
        // CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // CHECK DELETE BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //  append to list:
        todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos(todo){
    // CHECK--Already exists
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}



function changeBG(){
    const changeBody = document.querySelector('body');
    const changeToggle = document.querySelector('.change');
    const changeButton = document.querySelector('.todo-button');
    const changeFilter = document.querySelector('.select');
    const changeFilter1 = document.querySelector('select');
    changeBody.classList.toggle("change-bg");
    changeToggle.classList.toggle("change1");
    changeToggle.classList.toggle("change-icon");
    changeButton.classList.toggle("change-button");
    changeFilter.classList.toggle("change-filter");
    changeFilter1.classList.toggle("change-filter1");

}













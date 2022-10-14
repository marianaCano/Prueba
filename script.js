const formulario = document.querySelector("#formulario");
const tareas = document.querySelector("#tareas");
const total = document.querySelector("#total");
const completadas = document.querySelector("#completadas");
const filterOption = document.querySelector('.filter_todo');
filterOption.addEventListener("click", filterTodo)
let tasks = [];

(() => {
    formulario.addEventListener('submit', validarFormulario);

    document.addEventListener("DOMContentLoaded", () => {
        let datosLS = JSON.parse(localStorage.getItem("tareas")) || [];
        tasks = datosLS;
        render();
    })
})()

function validarFormulario(e) {
    e.preventDefault();

    const tarea = document.querySelector("#tarea").value;
    if (tarea.trim().length === 0) {
        console.log('vacio');
        return
    }

    //creamos el objeto tarea
    const objTarea = { id: Date.now(), tarea: tarea, estado: false };
    //agregamos al array 
    tasks = [...tasks, objTarea];
    formulario.reset();
    //agregamos al HTML
    render();

}


function render() {

    while (tareas.firstChild) {
        tareas.removeChild(tareas.firstChild)
    }

    if (tasks.length > 0) {
        tasks.forEach(item => {
            const elemento = document.createElement('div');
            elemento.classList.add('item-tarea');
            elemento.id = item.id;
            elemento.innerHTML = `
                <p>${item.estado ? (
                    `<span class='completa'>${item.tarea}</span>`
                ) : (
                    `<span>${item.tarea}</span>`
                )}</p>
                <div class="botones">
                    <button class="eliminar" data-id="${item.id}" onclick="eliminarTarea(${item.id})">X</button>
                    <button class="completada" data-id="${item.id}" onclick="completarTarea(${item.id})">✔</button>
                </div>
            `
            tareas.appendChild(elemento)
        });

    } else {
        const mensaje = document.createElement("h5");
        mensaje.textContent = "No hay tareas"
        tareas.appendChild(mensaje)
    }

    let totalTareas = tasks.length;
    let tareasCompletas = tasks.filter(item => item.estado === true).length;

    total.textContent = `Total tareas: ${totalTareas}`;
    completadas.textContent = `Tareas Completadas: ${tareasCompletas}`;

    //localStorage
    localStorage.setItem("tareas", JSON.stringify(tasks))

}

function eliminarTarea(id) {
    console.log(id)

    const nuevasTareas = tasks.filter((item) => item.id !== id);
    tasks = nuevasTareas;
    render();

}


//completar tarea
function completarTarea(id) {
    console.log(id)

    const nuevasTareas = tasks.map(item => {
        if (item.id === id) {
            item.estado = !item.estado;
            return item;
        } else {
            return item
        }
    })

    //modicar arreglo
    tasks = nuevasTareas;
    render();
        
    
}
function filterTodo(event) {
    const currentTasks = document.querySelectorAll('.item-tarea');

    console.log(this.value)
    switch (`${this.value}`) {
        case "all":
            currentTasks.forEach(displayAllTasks)
            
            break;
        case "completed":
            currentTasks.forEach(displayCompletedTasks)

            break;
        case "uncompleted":
            currentTasks.forEach(displayUncompletedTasks)
            break;
    }
} 

function displayAllTasks(task) {
    task.style.display = "flex";
}
function displayCompletedTasks(task) {
    const currentTask = tasks.find(localStorageTask => localStorageTask.id === Number.parseInt(task.id))
    
    if (currentTask && currentTask.estado) {
        task.style.display = "flex";
    } else {
        task.style.display = "none";

    }
}

function displayUncompletedTasks(task) {
    const currentTask = tasks.find(localStorageTask => localStorageTask.id === Number.parseInt(task.id))

    if (currentTask && !currentTask.estado) {
        task.style.display = "flex";
    } else {
        task.style.display = "none";

    }
}

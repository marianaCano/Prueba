
const CLAVE_LOCALSTORAGE = "lista_tareas";
document.addEventListener("DOMContentLoaded", () => {
	let tareas = []; // El arreglo global 
	
	const $contenedorTareas = document.querySelector("#contenedorTareas"),
		$btnGuardarTarea = document.querySelector("#btnAgregarTarea"),
		$inputNuevaTarea = document.querySelector("#inputNuevaTarea");

	// clic del botón para agregar nueva tarea
	$btnGuardarTarea.onclick = () => {
		const tarea = $inputNuevaTarea.value;
		if (!tarea) {
			return;
		}
		tareas.push({
			tarea: tarea,
			terminada: false,
		});
		$inputNuevaTarea.value = "";
		guardarTareasEnAlmacenamiento();
		refrescarListaDeTareas();
	};

	const obtenerTareasDeAlmacenamiento = () => {
		const posibleLista = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE));
		if (posibleLista) {
			return posibleLista;
		} else {
			return [];
		}
	};

	const guardarTareasEnAlmacenamiento = () => {
		localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(tareas));
	};

	const refrescarListaDeTareas = () => {
		$contenedorTareas.innerHTML = "";
		for (const [indice, tarea] of tareas.entries()) {
			//eliminar la tarea
			const $enlaceParaEliminar = document.createElement("a");
			$enlaceParaEliminar.classList.add("enlace-eliminar");
			$enlaceParaEliminar.innerHTML = "&times;";
			$enlaceParaEliminar.href = "";
			$enlaceParaEliminar.onclick = (evento) => {
				evento.preventDefault();
				if (!confirm("¿Eliminar tarea?")) {
					return;
				}
				tareas.splice(indice, 1);
				// Guardar los cambios
				guardarTareasEnAlmacenamiento(tareas);
				refrescarListaDeTareas();
			};
			// tarea como terminada
			const $checkbox = document.createElement("input");
			$checkbox.type = "checkbox";
			$checkbox.onchange = function () { 
				if (this.checked) {
					tareas[indice].terminada = true;
				} else {
					tareas[indice].terminada = false;
				}
				guardarTareasEnAlmacenamiento(tareas);
				refrescarListaDeTareas();
			}

			const $span = document.createElement("span");
			$span.textContent = tarea.tarea;
			const $li = document.createElement("li");
			// Verificamos si la tarea está marcada para marcar los elementos
			if (tarea.terminada) {
				$checkbox.checked = true;
				$span.classList.add("tachado");
			}
			$li.appendChild($checkbox);
			$li.appendChild($span);
			$li.appendChild($enlaceParaEliminar);
			$contenedorTareas.appendChild($li);
		}
	};
	// Llamar a la función la primera vez
	tareas = obtenerTareasDeAlmacenamiento();
	refrescarListaDeTareas();
});
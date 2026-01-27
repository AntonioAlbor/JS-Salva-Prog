//Creamos la Clase Tarea para poder crear objetos tarea
class Tarea {
    constructor(descripcion) {
        this.descripcion = descripcion;
        this.completada = false;
    }
}

//Inicializamos las variables y nos traemos los elementos del DOM con jQuery
let tareas = [];

const boton_añadir_tarea = $("#boton-añadir-tarea");
const tarea_texto = $("#tarea-texto");
const boton_todas_tareas = $("#todas");
const boton_completadas_tarea = $("#completadas");
const boton_pendientes_tarea = $("#pendientes");
const tabla_tareas = $("#tabla-tareas");

//Funcionalidades de los botones con jQuery
$(boton_añadir_tarea).click(añadirTarea);
$(boton_completadas_tarea).click(mostrarTareasCompletadas);
$(boton_pendientes_tarea).click(mostrarTareasPendientes);
$(boton_todas_tareas).click(actualizarTablaTareas);


//Cambios de color de los botones al ser pulsados

//Botón Completadas
boton_completadas_tarea.click(function () {
    boton_todas_tareas.css("background-color", "");
    boton_pendientes_tarea.css("background-color", "");
    boton_completadas_tarea.css("background-color", "#589ee9");
});

//Botón Todas
boton_todas_tareas.click(function () {
    boton_completadas_tarea.css("background-color", "");
    boton_pendientes_tarea.css("background-color", "");
    boton_todas_tareas.css("background-color", "#589ee9");
});

//Botón Pendientes
boton_pendientes_tarea.click(function () {
    boton_completadas_tarea.css("background-color", "");
    boton_todas_tareas.css("background-color", "");
    boton_pendientes_tarea.css("background-color", "#589ee9");
});

//Si no hay tareas que ponga que no hay tareas por default
if (tareas.length === 0) {
    tabla_tareas.html(
        '<tr><th>No Hay</th><th>Tareas Aún</th></tr>'
    );
}

//Función añadirTarea, saca el valor de form con jQuery, valida la tarea y llama al modal
function añadirTarea() {

    let texto = $("#tarea-texto").val();

    validarTareas(texto)

    if (validarTareas(texto) === "Error") {
        return;
    }

    modal("añadir tarea");


}

//Función actualizarTablaTareas, recorre el array de tareas y las añade a la tabla con jQuery, si están completadas les añade un tachado
function actualizarTablaTareas() {
    $(tabla_tareas).empty();

    for (let i = 0; i < tareas.length; i++) {

        if (tareas[i].completada === false) {

            let fila = `
            <tr>
                <td>${tareas[i].descripcion}</td>
                <td>
                    <button class="btn btn-success" onclick="completarTarea(${i})">
                        Completada
                    </button>
                    <button class="btn btn-warning" onclick="editarTarea(${i})">
                        Editar
                    </button>
                    <button class="btn btn-danger" onclick="eliminarTarea(${i})">
                        Eliminar
                    </button>
                </td>
            </tr>`;

            $(tabla_tareas).append(fila);

            //Si la tarea tiene el estado de comletada las añade pero le añade un <s> para tacharla
        } else {

            let fila = `
            <tr>
                <td><s>${tareas[i].descripcion}</s></td>
                <td>
                    <button class="btn btn-success" onclick="completarTarea(${i})">
                        Completada
                    </button>
                    <button class="btn btn-warning" onclick="editarTarea(${i})">
                        Editar
                    </button>
                    <button class="btn btn-danger" onclick="eliminarTarea(${i})">
                        Eliminar
                    </button>
                </td>
            </tr>`;

            $(tabla_tareas).append(fila);
        }
    }
}

//Función eliminarTarea, llama al modal para confirmar la eliminación
function eliminarTarea(index) {
    modal("eliminar tarea", index);

}

//Función editarTarea, abre un modal de sweetalert que nos permite editar la tarea
function editarTarea(index) {

    Swal.fire({
        title: "Editar tarea",
        input: "text",
        inputValue: tareas[index].descripcion,
        showCancelButton: true,
        inputValidator: (texto_nuevo) => {
            if (texto_nuevo.trim() === "") {
                return "No puede estar vacio";
            }

            if (texto_nuevo.length > 65) {
                return "El texto es demasiado largo";
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            tareas[index].descripcion = result.value;
            actualizarTablaTareas();
            Swal.fire("Guardado", "", "success");
        }
    });
}

//Función completarTarea, cambia el estado de la tarea a completada si se pulsa el boton y la añade al array de tareas completadas
function completarTarea(index) {
    tareas[index].completada = true;
    actualizarTablaTareas();
}

//Función mostrarTareasCompletadas, recorre el array de tareas buscando solo completadas y las muestra en la tabla tachadas
function mostrarTareasCompletadas() {
    $(tabla_tareas).empty();

    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].completada === true) {
            let fila = `
            <tr>
                <td><s>${tareas[i].descripcion}</s></td>
                <td>
                    <button class="btn btn-danger" onclick="eliminarTarea(${i})">
                        Eliminar
                    </button>
                </td>
            </tr>`;
            $(tabla_tareas).append(fila);
        }
    }
}

//Función mostrarTareasPendientes, recorre el array de tareas y muestra solo las que no están completadas
function mostrarTareasPendientes() {
    $(tabla_tareas).empty();
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].completada == false) {
            let fila = `
            <tr>
                <td>${tareas[i].descripcion}</td>
                <td>
                    <button class="btn btn-danger" onclick="eliminarTarea(${i})">
                        Eliminar
                    </button>
                </td>
            </tr>`;

            $(tabla_tareas).append(fila);
        }
    }
}

//Función validarTareas, valida que la tarea no esté vacía, no sea demasiado larga y no esté repetida
function validarTareas(descripcion) {

    //Validar que no esté vacía
    if (descripcion.trim() === '') {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Rellena el campo de descripción",
        });
        return "Error";
    }

    //Validar que no sea demasiado larga
    if (descripcion.length > 65) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El texto es demasiado largo",
        });
        return "Error";
    }

    //Validar que no esté repetida
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].descripcion.toLowerCase() === descripcion.toLowerCase()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "La tarea está repetida",
            });
            return "Error";
        }
    }

    return "Correcto";

}

//Función modal, segun el mensaje que reciba crea un modal de confirmación para añadir o eliminar tareas
function modal(mensaje, index) {
    let titulo = "";
    let boton_confirmacion = "";
    let boton_cancelar = "";
    let succes = "";
    let cancel = "";

    if (mensaje === "añadir tarea") {

        titulo = `¿Quieres añadir esta tarea? "${tarea_texto.val()}"`;
        boton_confirmacion = "Guardar";
        boton_cancelar = "No guardar";
        succes = "Guardado!";
        cancel = "Cancelado";

    } else if (mensaje === "eliminar tarea") {
        titulo = `¿Quieres eliminar esta tarea? "${tareas[index].descripcion}"`;
        boton_confirmacion = "Eliminar";
        boton_cancelar = "No eliminar";
        succes = "Eliminado!";
        cancel = "Cancelado";
    }

    Swal.fire({
        title: titulo,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: boton_confirmacion,
        denyButtonText: boton_cancelar
    }).then((result) => {
        if (result.isConfirmed) {

            //Añade la tarea
            if (mensaje === "añadir tarea") {
                let nueva_tarea = new Tarea($("#tarea-texto").val());
                tareas.push(nueva_tarea);
                $("#tarea-texto").val("");
            }

            //Elimina la tarea
            else if (mensaje === "eliminar tarea") {
                tareas.splice(index, 1);
            }

            Swal.fire(succes, "", "success");

            //Si borramos todas las tareas que ponga que no hay tareas
            if (tareas.length === 0) {
                tabla_tareas.html('<tr><th>No Hay</th><th>Tareas Aún</th></tr>');
            } else {
                actualizarTablaTareas();
            }
        } else if (result.isDenied) {
            Swal.fire(cancel, "", "info");
        }
    });
}

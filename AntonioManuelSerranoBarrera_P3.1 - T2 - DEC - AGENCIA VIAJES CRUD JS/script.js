// Clases Viaje, Cliente, Reserva
class Viaje {
    constructor(codigo, destino, precio, tipo) {
        this.codigo = codigo;
        this.destino = destino;
        this.precio = precio;
        this.tipo = tipo; //Cambio disponibilidad por tipo
    }

    getInfo() {
        return `Viaje [${this.codigo}] a ${this.destino}, precio: ${this.precio} euros, tipo: ${this.tipo}`;
    }

}

class Cliente {
    constructor(nombre, apellido, email, telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }

    getResumen() {
        return `Cliente: ${this.nombre} ${this.apellido}, Email: ${this.email}, Teléfono: ${this.telefono}`;
    }

}

class Reserva {
    constructor(cliente, viaje) {
        this.cliente = cliente;
        this.viaje = viaje;
    }

    getResumen() {
        return `${this.cliente.getResumen()}\nReservó: ${this.viaje.getInfo()}`;
    }

}


//Inicialización de arrays, traemos los botones para añadir clientes, viajes y reservas y les damos funcionalidad
let clientes = [];
const boton_añadir_cliente = document.getElementById('boton-añadir-cliente');
boton_añadir_cliente.addEventListener('click', añadirCliente);

let viajes = [];
const boton_añadir_viaje = document.getElementById('boton-añadir-viaje');
boton_añadir_viaje.addEventListener('click', añadirViaje);

let reservas = [];
const boton_crear_reserva = document.getElementById('boton-crear-reserva');
boton_crear_reserva.addEventListener('click', añadirReserva);

//Traemos las tablas para mostrar por defecto un mensaje si están vacías
const tablaClientes = document.getElementById('tabla-clientes');
tablaClientes.innerHTML = '';
if (tablaClientes.innerHTML === '') {
    tablaClientes.innerHTML = `<tr>
    <th>No</th>
    <th>Hay</th>
    <th>Clientes</th>
    <th>Aún</th>
    <th>!</th>
    </tr>`;
}

const tablaViajes = document.getElementById('tabla-viajes');
tablaViajes.innerHTML = '';
if (tablaViajes.innerHTML === '') {
    tablaViajes.innerHTML = `<tr>
    <th>No</th>
    <th>Hay</th>
    <th>Viajes</th>
    <th>Aún</th>
    <th>!</th>
    </tr>`;
}

const tablaReservas = document.getElementById('tabla-reservas');
tablaReservas.innerHTML = '';
if (tablaReservas.innerHTML === '') {
    tablaReservas.innerHTML = `<tr>
    <th>No</th>
    <th>Hay</th>
    <th>Reservas</th>
    <th>Aún</th>
    </tr>`;
}

//Función añadir cliente, trae los valores de los seletores, los valida y si son correctos crea un nuevo cliente y lo añade al array
function añadirCliente() {
    let nombre_cliente = document.getElementById('nombre-cliente').value;
    let apellidos_cliente = document.getElementById('apellidos-cliente').value;
    let correo_electronico_cliente = document.getElementById('correo-electronico-cliente').value;
    let telefono_cliente = document.getElementById('telefono-cliente').value;


    validarClientes(nombre_cliente, apellidos_cliente, correo_electronico_cliente, telefono_cliente)
    if (validarClientes(nombre_cliente, apellidos_cliente, correo_electronico_cliente, telefono_cliente) === "Error") {
        return;
    }

    let nuevo_cliente = new Cliente(nombre_cliente, apellidos_cliente, correo_electronico_cliente, telefono_cliente);

    //Llamada al modal de confirmación
    modal("añadir cliente");
    clientes.push(nuevo_cliente);

    //Vacia los selectores
    nombre_cliente = document.getElementById('nombre-cliente').value = '';
    apellidos_cliente = document.getElementById('apellidos-cliente').value = '';
    correo_electronico_cliente = document.getElementById('correo-electronico-cliente').value = '';
    telefono_cliente = document.getElementById('telefono-cliente').value = '';
}

//Funcion para validar los datos de los clientes con diferentes patrones y condiciones
function validarClientes(nombre_cliente, apellidos_cliente, correo_electronico_cliente, telefono_cliente) {

    const patron_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;

    //Comprobamos que los campos no estén vacíos
    if (nombre_cliente === '' || apellidos_cliente === '' || correo_electronico_cliente === '' || telefono_cliente === '') {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Rellena todos los campos",
        });
        return "Error";
    }

    //Comprobamos que no haya clientes con el mismo telefono
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].telefono === telefono_cliente) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El teléfono esta repetido",
            });
            return "Error";
        }
    }

    //Comprobamos que no haya clientes con el mismo nombre y apellidos
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].nombre === nombre_cliente && clientes[i].apellido === apellidos_cliente) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El cliente esta repetido",
            });
            return "Error";
        }
    }

    //Validamos el email con el patrón
    if (patron_email.test(correo_electronico_cliente) === false) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El email no es válido",
        });
        return "Error";
    }

    //Validamos el teléfono, tiene que ser un número y tener 9 dígitos
    if (isNaN(telefono_cliente) || telefono_cliente.length < 9) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El teléfono no es válido",
        });
        return "Error";
    }

    return "Correcto";

}

//Función modal que segun el mensaje que reciba (de cada funcion diferente) mostrará un mensaje u otro
function modal(mensaje) {
    let titulo = "";
    let boton_confirmacion = "";
    let boton_cancelar = "";
    let succes = "";
    let cancel = "";

    if (mensaje === "añadir cliente") {

        titulo = "¿Quieres añadir el cliente?";
        boton_confirmacion = "Guardar";
        boton_cancelar = "No guardar";
        succes = "Guardado!";
        cancel = "Cancelado";

    } else if (mensaje === "eliminar cliente") {
        titulo = "¿Quieres eliminar el cliente?";
        boton_confirmacion = "Eliminar";
        boton_cancelar = "No eliminar";
        succes = "Eliminado!";
        cancel = "Cancelado";

    } else if (mensaje === "añadir viaje") {
        titulo = "¿Quieres añadir el viaje?";
        boton_confirmacion = "Guardar";
        boton_cancelar = "No guardar";
        succes = "Guardado!";
        cancel = "Cancelado";

    } else if (mensaje === "eliminar viaje") {
        titulo = "¿Quieres eliminar el viaje?";
        boton_confirmacion = "Eliminar";
        boton_cancelar = "No eliminar";
        succes = "Eliminado!";
        cancel = "Cancelado";

    } else if (mensaje === "añadir reserva") {
        titulo = "¿Quieres añadir la reserva?";
        boton_confirmacion = "Guardar";
        boton_cancelar = "No guardar";
        succes = "Guardado!";
        cancel = "Cancelado";

    } else if (mensaje === "eliminar reserva") {
        titulo = "¿Quieres eliminar la reserva?";
        boton_confirmacion = "Eliminar";
        boton_cancelar = "No eliminar";
        succes = "Eliminado!";
        cancel = "Cancelado";
    }

    //El modal acina distintas funciones si confirmamos la acción
    Swal.fire({
        title: titulo,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: boton_confirmacion,
        denyButtonText: boton_cancelar
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(succes, "", "success");
            actualizarTablaClientes();
            actualizarTablaViajes();
            actualizarTablaReservas();
            actualizarSelectorClientes();
            actualizarSelectorViajes();
            guardarDatos();
        } else if (result.isDenied) {
            Swal.fire(cancel, "", "info");
        }
    });
}

//Función eliminar cliente, comprueba si el cliente tiene reservas antes de eliminarlo recorriendo la array de reservas
function eliminarCliente(nombre) {
for (let i = 0; i < reservas.length; i++) {
        if (reservas[i].cliente.nombre === nombre) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El cliente tiene reservas, no se puede eliminar",
            });
            return "Error"; 
        }
    }
for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].nombre === nombre) {
            clientes.splice(i, 1);
            break;
        }
    }
    modal("eliminar cliente");
    actualizarSelectorClientes();
}

//Función para actualizar la tabla de clientes, trae la tabla de nuevo, la vacia y la rellena con los datos del array 
function actualizarTablaClientes() {
    const tablaClientes = document.getElementById('tabla-clientes');
    tablaClientes.innerHTML = '';
    for (let i = 0; i < clientes.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
              <td>${clientes[i].nombre} </td>
              <td>${clientes[i].apellido}</td>
              <td>${clientes[i].email}</td>
              <td>${clientes[i].telefono}</td>
              <td>
              <button type='button' class='btn btn-danger btn-sm' onclick='eliminarCliente("${clientes[i].nombre}")'>Eliminar</button>
              </td>`;
        tablaClientes.appendChild(fila);
    }

    //Nueva comprobación por si no hay clientes al eliminarlos todos que muestre el mensaje por defecto
    if (clientes.length === 0) {
        tablaClientes.innerHTML = `<tr>
        <th>No</th>
        <th>Hay</th>
        <th>Clientes</th>
        <th>Aún</th>
        <th>!</th>
        </tr>`;
    }
    guardarDatos();
}

//Función añadir viaje, trae los valores de los selectores, los valida y si son correctos crea un nuevo viaje y lo añade al array
function añadirViaje() {

    let codigo_viaje = document.getElementById('codigo-viaje').value;
    let destino_viaje = document.getElementById('destino-viaje').value;
    let precio_viaje = document.getElementById('precio-viaje').value;
    let tipo_viaje = document.getElementById('selector-tipo-viaje').value;

    validarViajes(codigo_viaje, destino_viaje, precio_viaje, tipo_viaje);
    if (validarViajes(codigo_viaje, destino_viaje, precio_viaje, tipo_viaje) === "Error") {
        return;
    }

    let nuevo_viaje = new Viaje(codigo_viaje, destino_viaje, precio_viaje, tipo_viaje);
    modal("añadir viaje");
    viajes.push(nuevo_viaje);

    codigo_viaje = document.getElementById('codigo-viaje').value = '';
    destino_viaje = document.getElementById('destino-viaje').value = '';
    precio_viaje = document.getElementById('precio-viaje').value = '';

}

//Función para validar los datos de los viajes con diferentes patrones y condiciones
function validarViajes(codigo_viaje, destino_viaje, precio_viaje, tipo_viaje) {

    const patron_codigo = /^[0-9]{3}[a-zA-Z]$/;

    //Comprobamos que los campos no estén vacíos
    if (codigo_viaje === '' || destino_viaje === '' || precio_viaje === '' || tipo_viaje === '') {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Rellena todos los campos",
        });
        return "Error";
    }

    //Comprobamos que no haya viajes con el mismo código o destino
    for (let i = 0; i < viajes.length; i++) {
        if (viajes[i].codigo === codigo_viaje || viajes[i].destino === destino_viaje) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El vuelo esta repetido",
            });
            return "Error";
        }
    }

    //Validamos el código con el patrón
    if (patron_codigo.test(codigo_viaje) === false) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El código no es válido. Formato: XXX#",
        });
        return "Error";
    }

    //Validamos el precio tiene que ser un número
    if (isNaN(precio_viaje) || precio_viaje <= 0) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El precio no es válido",
        });
        return "Error";
    }

    return "Correcto";

}

//Función eliminar viaje, comprueba si el viaje tiene reservas antes de eliminarlo recorriendo la array de reservas
function eliminarViaje(destino) {
    for (let i = 0; i < reservas.length; i++) {
        if (reservas[i].viaje.destino === destino) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El viaje tiene reservas, no se puede eliminar",
            });
            return "Error";
        }
    }

    for (let i = 0; i < viajes.length; i++) {
        if (viajes[i].destino === destino) {
            viajes.splice(i, 1);
            break;
        }
    }
    modal("eliminar viaje");
    actualizarSelectorViajes();
}

//Función para actualizar la tabla de viajes, trae la tabla, la vacia y la rellena con los datos del array
function actualizarTablaViajes() {
    const tablaViajes = document.getElementById('tabla-viajes');
    tablaViajes.innerHTML = '';
    for (let i = 0; i < viajes.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
              <td>${viajes[i].codigo} </td>
              <td>${viajes[i].destino}</td>
              <td>${viajes[i].precio}</td>
              <td>${viajes[i].tipo}</td>
              <td>
              <button type='button' class='btn btn-danger btn-sm' onclick='eliminarViaje("${viajes[i].destino}")'>Eliminar</button>
              </td>`;
        tablaViajes.appendChild(fila);
    }

    //Misma comprobacion que en clientes por si no hay viajes que muestre el mensaje por defecto
    if (viajes.length === 0) {
        tablaViajes.innerHTML = `<tr>
        <th>No</th>
        <th>Hay</th>
        <th>Viajes</th>
        <th>Aún</th>
        <th>!</th>
        </tr>`;
    }
    guardarDatos();
}

//Función para actualizar el selector de clientes en cuanto se añaden en la creación de reservas
function actualizarSelectorClientes() {
    const selectorClientes = document.getElementById('selector-cliente-reserva');
    selectorClientes.innerHTML = '';
    //Rellenamos el selector con los nombres de los clientes y usando innerHTML creando manualmente las opciones del selector
    for (let i = 0; i < clientes.length; i++) {
        const opcion = document.createElement('option');
        opcion.value = clientes[i].nombre;
        opcion.text = clientes[i].nombre;
        selectorClientes.appendChild(opcion);
    }
}

//Misma funcion que la anterior pero con viajes
function actualizarSelectorViajes() {
    const selectorViajes = document.getElementById('selector-viaje-reserva');
    selectorViajes.innerHTML = '';
    for (let i = 0; i < viajes.length; i++) {
        const opcion = document.createElement('option');
        opcion.value = viajes[i].destino;
        opcion.text = viajes[i].destino;
        selectorViajes.appendChild(opcion);
    }
}

//Función añadir reserva, valida y añade a su array
function añadirReserva() {

    //No podia utilizar directamente el valor del selector original ya que al actualizarse dinamicamente 
    //Segun se añaden clientes y viajes, el valor seleccionado se perdia, por lo tanto necesito una variable que copie ese valor

    //Traemos los valores de los selectores originales 
    const cliente_reserva = document.getElementById('selector-cliente-reserva').value;
    const viaje_reserva = document.getElementById('selector-viaje-reserva').value;

    //Inicializamos unas variables para almacenar el cliente y viaje 
    let cliente_encontrado = null;
    let viaje_encontrado = null;

    //Recorremos el array de clientes, si el cliente es el mismo lo guarda y lo valida a posteriori 
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].nombre === cliente_reserva) {
            cliente_encontrado = clientes[i];
            break;
        }
    }

    //Lo mismo con los viajes
    for (let i = 0; i < viajes.length; i++) {
        if (viajes[i].destino === viaje_reserva) {
            viaje_encontrado = viajes[i];
            break;
        }
    }

    validarReserva(cliente_encontrado, viaje_encontrado);
    if (validarReserva(cliente_encontrado, viaje_encontrado) === "Error") {
        return;
    }


    let nuevo_reserva = new Reserva(cliente_encontrado, viaje_encontrado);
    modal("añadir reserva");
    reservas.push(nuevo_reserva);

    document.getElementById('selector-cliente-reserva').selectedIndex = 0;
    document.getElementById('selector-viaje-reserva').selectedIndex = 0;
}

//Función para validar las reservas, comprueba que no haya reservas duplicadas o que el cliente ya tenga una reserva
function validarReserva(cliente_encontrado, viaje_encontrado) {

    //Comprobamos que los campos no estén vacíos
    if (cliente_encontrado === null || viaje_encontrado === null) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Rellena todos los campos",
        });
        return "Error";
    }

    //Comprobamos que no haya reservas duplicadas
    for (let i = 0; i < reservas.length; i++) {
        if (reservas[i].viaje.destino === viaje_encontrado.destino && reservas[i].cliente.nombre === cliente_encontrado.nombre) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "La reserva ya existe",
            });
            return "Error";
        }
    }

    //Comprobamos que el cliente no tenga ya una reserva
    for (let i = 0; i < reservas.length; i++) {
        if (reservas[i].cliente.nombre === cliente_encontrado.nombre) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El cliente ya tiene una reserva",
            });
            return "Error";
        }
    }

    return "Correcto";

}

//Función eliminar reserva, recorre el array de reservas y elimina la reserva del cliente seleccionado en basea su nombre
function eliminarReserva(nombre) {
    for (let i = 0; i < reservas.length; i++) {
        if (reservas[i].cliente.nombre === nombre) {
            reservas.splice(i, 1);
            break;
        }
    }
    modal("eliminar reserva");



}

//Función para actualizar la tabla de reservas, trae la tabla, la vacia y la rellena con los datos del array
function actualizarTablaReservas() {
    const tablaReservas = document.getElementById('tabla-reservas');

    //Construccion del formato de fechas para que quede elegante y se entienda
    const fechaActual = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaBonita = fechaActual.toLocaleDateString('es-ES', opciones);

    tablaReservas.innerHTML = '';
    for (let i = 0; i < reservas.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
              <td>${reservas[i].cliente.nombre} </td>
              <td>${reservas[i].viaje.destino}</td>
                <td>${fechaBonita}</td>
              <td> 
                <button type='button' class='btn btn-danger btn-sm' onclick='eliminarReserva("${reservas[i].cliente.nombre}")'>Eliminar</button>
                </td>`;
        tablaReservas.appendChild(fila);
    }
    if (reservas.length === 0) {
        tablaReservas.innerHTML = `<tr>
        <th>No</th>
        <th>Hay</th>
        <th>Reservas</th>
        <th>Aún</th>
        </tr>`;
    }
    guardarDatos();
}

//Funciones del LocalStorage para guardar y cargar los datos de clientes, viajes y reservas conviriendo los arrays en strings JSON
function guardarDatos() {
    localStorage.setItem('clientes', JSON.stringify(clientes));
    localStorage.setItem('viajes', JSON.stringify(viajes));
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

//Aqui hacemos parse para convertir los strings JSON de vuelta a arrays y actualizar las tablas y selectores
function cargarDatos() {
    clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    viajes = JSON.parse(localStorage.getItem('viajes')) || [];
    reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    //Actualizamos las tablas y selectores al cargar los datos
    actualizarTablaClientes();
    actualizarTablaViajes();
    actualizarTablaReservas();
    actualizarSelectorClientes();
    actualizarSelectorViajes();
}

//Llamada a la función de cargar datos al iniciar la página
cargarDatos();
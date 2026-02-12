// variables del DOM 

//barra de búsqueda
const busqueda = document.getElementById("busqueda");

//tbody
const tabla = document.getElementById("tabla");

//selector de orden
const barraOrdenacion = document.getElementById("orden");

//selector de numero de datos a mostrar
const numero = document.getElementById("numero");

//mensaje de mostrar x datos
const paginacion = document.getElementById("paginacion")

//spinner de carga
const spinner = document.getElementById("spinner");

//botón de recarga
const recargar = document.getElementById("recargar");

//botones de paginación
const pagina = document.getElementById("pagina");
const principio = document.getElementById("first");
const final = document.getElementById("last");
const atras = document.getElementById("prev");
const siguiente = document.getElementById("next");

let datos = [];

recargar.addEventListener("click", function () {
    traerDatos();
});

function traerDatos() {
    //Funcion traerDatos, carga los datos de la API, muestra el spinner y actualiza la array de datos

    spinner.style.display = "flex"; // activamos spinner

    //hacemos petición a API que devolvera una Promesa de fecth
    fetch("https://jsonplaceholder.typicode.com/comments")
        // cuando la promesa se resuelva, se ejecuta esta función que recibe la respuesta de la API
        .then(function (respuesta) {
            // si la respuesta es correcta, se devuelve la respuesta en formato JSON lo que también devuelve una promesa
            return respuesta.json();
        })
        // cuando la promesa de respuesta.json() se resuelva se ejecuta esta función que recibe los datos en formato JSON
        .then(function (datosJson) {
            datos = datosJson; // los mete en la array
            paginaActual = 1; // reseteamos la página actual a 1 cada vez que recargamos los datos
            mostrarPagina(); // activamos la función mostrarPagina() para mostrar los datos en la página
            spinner.style.display = "none"; // cerramos spinner
        })
        .catch(function (error) {
            //si hay algun problema mostramos un sweetalert

            Swal.fire({
                icon: "error",
                title: "Error al cargar la API",
                text: "No se pudieron obtener los datos",
            });

        });
}

function mostrarDatos(datos) {
    // función mostrarDatos, recibe un array de datos y los muestra en la tabla
    tabla.innerHTML = "";

    for (let i = 0; i < datos.length; i++) {
        tabla.innerHTML += `
            <tr>
                <td>${datos[i].name}</td>
                <td>${datos[i].email}</td>
            </tr>
        `;
    }
}

barraOrdenacion.addEventListener("change", function () {
    // evento de cambio en el selector de orden, le pasa el valor del orden a la funcion ordenarDatos()
    const ordenSeleccionado = barraOrdenacion.value;
    ordenarDatos(ordenSeleccionado, datos);
});

function ordenarDatos(ordenSeleccionado, datos) {
    // función ordenarDatos, recibe el orden seleccionado y dependiendo del valor lo ordena
    datos.sort(function (a, b) {
        if (ordenSeleccionado === "asc") {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        } else {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0;
        }
    });

    mostrarPagina();
}

busqueda.addEventListener("input", function () {
    // evento en la busqueda, le pasa el texto a la función buscarDatos()
    const texto = busqueda.value.toLowerCase();
    buscarDatos(datos, texto);
});

function buscarDatos(datos, texto) {
    // función buscarDatos, recibe un array de datos y un texto, y filtra los datos que contienen el texto
    const resultado = datos.filter(function (dato) {
        return ( //en este caso queremos que busque el texto tanto en el nombre como en el email
            dato.name.toLowerCase().includes(texto) ||
            dato.email.toLowerCase().includes(texto)
        );
    });

    mostrarDatos(resultado);
}

// SECCIÓN DE PAGINACIÓN

numero.addEventListener("change", function () {
    // evento de cambio en el selector de numero de datos a mostrar
    // le pasa el valor del selector a la variable porPagina y resetea la página actual a 1
    porPagina = parseInt(numero.value);
    paginaActual = 1;
    mostrarPagina();
});

let paginaActual = 1; // variable que guarda el número de página actual
let porPagina = parseInt(numero.value); // numero de datos que vamos a mostrar, el que pongamos en el selector

function totalPaginas() {
    return Math.ceil(datos.length / porPagina);
    //El número total de datos en la array se divide por el número de datos que quiero enseñar por página
    //Si tengo 500 datos y lo divido por 15 datos que enseño por pantalla
    //el resultado es 33.33, pero como no puedo poner 0.33, redondeo hacia arriba y me da 34 páginas en total
}

function mostrarPagina() {
    // mostrarPagina se encarga de mostrar los datos que se suponen que deben salir en el número de pagina que indiquemos
    const inicio = (paginaActual - 1) * porPagina;
    // primero en inicio calculamos desde qué posición del array datos empezamos a mostrar
    const fin = inicio + porPagina;
    // despues en fin calculamos en que posicion del array dejamos de mostrar esos datos, solo tenemos que sumar 
    // el numero de datos que queremos ver al inicio
    const datosPagina = datos.slice(inicio, fin); // cogemos con slice los datos entre inicio y fin
    mostrarDatos(datosPagina); // llamamos a mostrarDatos() y le pasamos esos datos 
    pagina.textContent = paginaActual; // por último, actualizamos el número de página que se muestra en el HTML
    actualizarPaginacion();
    actualizarBotones(); // por ultimo llamamos a actualizarBotones() 
}
 
principio.addEventListener("click", function () {
    //Si no estamos en la pagina 1 nos lleva a la pagina 1
    if (paginaActual !== 1) {
        paginaActual = 1;
        mostrarPagina();
    }
});

atras.addEventListener("click", function () {
    //Le decimos que si la pagina actual es mayor que 1, entonces se resta 1 a la pagina actual y se muestra esa pagina
    if (paginaActual > 1) {
        paginaActual--;
        mostrarPagina();
    }
});

siguiente.addEventListener("click", function () {
    //Si la pagina actual es menor que el total de paginas, entonces se suma 1 a la pagina actual y se muestra esa pagina
    if (paginaActual < totalPaginas()) {
        paginaActual++;
        mostrarPagina();
    }
});

final.addEventListener("click", function () {
    //Si no estamos en la ultima pagina nos lleva a la ultima pagina
    const ultima = totalPaginas();
    if (paginaActual !== ultima) {
        paginaActual = ultima;
        mostrarPagina();
    }
});

function actualizarBotones() {
    // función actualizarBotones que se encarga de mostrar u ocultar los botones de paginación
    const total = totalPaginas();

    // pagina 1 solo siguiente y última
    if (paginaActual === 1) {
        principio.style.display = "none";
        atras.style.display = "none";
        siguiente.style.display = "inline-block";
        final.style.display = "inline-block";
        return;
    }

    // ultima pagina solo primera y anterior
    if (paginaActual === total) {
        principio.style.display = "inline-block";
        atras.style.display = "inline-block";
        siguiente.style.display = "none";
        final.style.display = "none";
        return;
    }

    // el resto que muestre todo
    principio.style.display = "inline-block";
    atras.style.display = "inline-block";
    siguiente.style.display = "inline-block";
    final.style.display = "inline-block";
}

function actualizarPaginacion() {
    // función actualizarPaginacion que se encarga de mostrar el mensaje de "mostrando x resultados de y totales"
    const total = datos.length;

    const inicio = (paginaActual - 1) * porPagina;
    const fin = Math.min(inicio + porPagina, total);

    const mostrando = fin - inicio;

    paginacion.innerHTML = `<p>Mostrando ${mostrando} resultados de ${total} totales</p>`;
}

traerDatos();
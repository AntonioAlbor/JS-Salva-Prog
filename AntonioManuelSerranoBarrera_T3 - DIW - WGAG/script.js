// En esta practica he optado por no hacer una seccion con todas las variables del DOM
//Son tantas que me liaria poniendolas todas al principio, prefiero ponerlas cada una en su seccion

//Tema claro/oscuro
const botonTema = document.getElementById("cambiar-tema");
const body = document.body;
const header = document.querySelector("header");
const sections = document.querySelectorAll("section");
const footer = document.querySelector("footer");
const buttons = document.querySelectorAll("button");
const iconoTema = document.getElementById("icono-tema-claro");

//aplicamos el tema claro y cambiamos las variables root
function aplicarTemaClaro() {
    body.style.backgroundColor = "var(--fondo-claro)";
    body.style.color = "var(--texto-claro)";

    header.style.backgroundColor = "var(--header-claro)";
    header.style.borderColor = "var(--borde-claro)";

    sections.forEach(section => {
        section.style.backgroundColor = "var(--seccion-claro)";
        section.style.borderColor = "var(--borde-claro)";
    });

    footer.style.backgroundColor = "var(--footer-claro)";
    footer.style.borderColor = "var(--borde-claro)";

    buttons.forEach(button => {
        button.style.backgroundColor = "var(--boton-claro)";
        button.style.color = "var(--texto-claro)";
    });

    iconoTema.className = "bi bi-sun";
    localStorage.setItem("tema", "claro");
}

//aplicamos el tema oscuro y cambiamos las variables root
function aplicarTemaOscuro() {
    body.style.backgroundColor = "var(--fondo-oscuro)";
    body.style.color = "var(--texto-oscuro)";

    header.style.backgroundColor = "var(--header-oscuro)";
    header.style.borderColor = "var(--borde-oscuro)";

    sections.forEach(section => {
        section.style.backgroundColor = "var(--seccion-oscuro)";
        section.style.borderColor = "var(--borde-oscuro)";
    });

    footer.style.backgroundColor = "var(--footer-oscuro)";
    footer.style.borderColor = "var(--borde-oscuro)";

    buttons.forEach(button => {
        button.style.backgroundColor = "var(--boton-oscuro)";
        button.style.color = "var(--texto-oscuro)";
    });

    localStorage.setItem("tema", "oscuro");
    iconoTema.className = "bi bi-moon";
}

//Guardamos la preferencia en el localStorage
const temaGuardado = localStorage.getItem("tema");

//Al cargar la pagina, aplicamos el tema guardado
if (temaGuardado === "oscuro") {
    aplicarTemaOscuro();
} else {
    aplicarTemaClaro();
}

// Al pulsar el botón
botonTema.addEventListener("click", () => {
    if (localStorage.getItem("tema") === "oscuro") {
        aplicarTemaClaro();
    } else {
        aplicarTemaOscuro();
    }
});


//Barra de progreso
const barra_progreso = document.getElementById('barra-progreso');

window.addEventListener('scroll', function () {
    let posicion = window.scrollY;
    let altura = window.innerHeight;
    let altura_total = document.body.clientHeight;
    let porcentaje = (posicion / (altura_total - altura)) * 100;
    barra_progreso.style.width = porcentaje + '%';
});


//Boton ir arriba
const botonArriba = document.getElementById("ir-arriba");

botonArriba.addEventListener("click", function () {
    window.scrollTo({
        top: 0, behavior: "smooth" //efectillo suave
    });
});


//Cambiar color de fondo
const seccionColor = document.getElementById("seccion-color");
const botonCambiarColor = document.getElementById("cambiar-color");

//Pequeña funcion que genera rgbs aleatorios
const generarColorAleatorio = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const color = `rgb(${r}, ${g}, ${b})`;
    return color;
};

botonCambiarColor.addEventListener("click", () => {
    const colorAleatorio = generarColorAleatorio();
    seccionColor.style.backgroundColor = colorAleatorio;
});

//Contador de clicks
const botonSumar = document.getElementById("sumar-click");
const contador = document.getElementById("contador-clicks");

let contadorClicks = 0;

botonSumar.addEventListener("click", () => {
    contadorClicks++;
    contador.textContent = contadorClicks;
});

//Seccion mensaje dinamico de Kincillo segun la hora
const seccionMensaje = document.getElementById("mensaje-dinamico");
const parrafoMensaje = seccionMensaje.querySelector("p");

const hora = new Date().getHours();
let saludo = "";

if (hora >= 6 && hora < 12) {
    saludo = "Este mensaje de buenos se mostrara por la mañana, es decir, entre las 6 y las 12, cuando Kincillo sigue durmiendo";
} else if (hora >= 12 && hora < 20) {
    saludo = "Este mensaeje de buenas tardes se mostrara por la tarde, es decir, entre las 12 y las 20, cuando Kincillo sigue durmiendo (por desgracia)";
} else {
    saludo = "Este mensaje de buenas noches se mostrara por la noche, es decir, entre las 20 y las 6, cuando Kincillo ya duerme profundamente";
}

parrafoMensaje.textContent = saludo;

//Funcionalidad aumentar/disminuir letra
const botonAumentar = document.getElementById("aumentar-letra");
const botonDisminuir = document.getElementById("disminuir-letra");

let tamañoTexto = 16;

botonAumentar.addEventListener("click", () => {
    tamañoTexto += 2;
    document.body.style.fontSize = tamañoTexto + "px";
});

botonDisminuir.addEventListener("click", () => {
    if (tamañoTexto > 10) {
        tamañoTexto -= 2;
        document.body.style.fontSize = tamañoTexto + "px";
    }
});


//Leer pagina, pilla todo el texto y lo lee con SpeechSynthesisUtterance
const botonLeer = document.getElementById("leer-pagina");

botonLeer.addEventListener("click", () => {
    const textoPagina = document.body.innerText;

    const mensaje = new SpeechSynthesisUtterance(textoPagina);
    mensaje.lang = "es-ES";

    window.speechSynthesis.cancel(); // por si ya estaba leyendo
    window.speechSynthesis.speak(mensaje);
});

//Bromilla de durillo
const botonSalva = document.getElementById("pulsa-salva");

botonSalva.addEventListener("click", () => {
    Swal.fire({
        toast: true,
        icon: "success",
        title: "Ave Salva!",
        text: "Los que van a suspender te saludan",
        timer: 3000,
        timerProgressBar: true
    });
});
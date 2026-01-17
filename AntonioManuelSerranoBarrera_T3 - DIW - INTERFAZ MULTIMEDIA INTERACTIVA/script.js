
// Variables pasadas

const cancion_foto = document.querySelector('.cancion-foto');
const cancion_nombre = document.querySelector('.cancion-nombre');
const cancion_artista = document.querySelector('.cancion-artista');

const playpause_btn = document.querySelector('.playpause');
const siguiente_cancion_btn = document.querySelector('.siguiente-cancion');
const cancion_anterior_btn = document.querySelector('.cancion-anterior');

const duracion_slider = document.querySelector('.duracion-slider');
const volumen_slider = document.querySelector('.volumen-slider');
const duracion_actual = document.querySelector('.duracion-actual');
const duracion_total = document.querySelector('.duracion-total');

const btn_mute = document.querySelector('.btn-mute');

const audioActual = document.createElement('audio');

let indice = 0;
let reproduciendo = false;
let actualizarTiempo;

// Lista de canciones
const lista_musica = [
    {
        imagen: 'images/SomethingGoingOn.png',
        nombre: 'Something going on',
        artista: 'Kaysha',
        musica: 'music/Kaysha - Something going on.mp3'
    },
    {
        imagen: 'images/spider.png',
        nombre: 'Spider',
        artista: 'Gims & Dystinct',
        musica: 'music/GIMS & DYSTINCT - SPIDER.mp3'
    },
    {
        imagen: 'images/phone.png',
        nombre: 'Phone',
        artista: 'Meduza',
        musica: 'music/MEDUZA - Phone.mp3'
    }
];

cargarCancion(indice); // cargamos la primera cancion 

//funcion cargarCancion, primero resetea todo y luego carga el indice junto con sus datos
function cargarCancion(indice) {
    clearInterval(actualizarTiempo);
    reset();

    audioActual.src = lista_musica[indice].musica;
    audioActual.load();

    cancion_foto.style.backgroundImage = "url(" + lista_musica[indice].imagen + ")";
    cancion_nombre.textContent = lista_musica[indice].nombre;
    cancion_artista.textContent = lista_musica[indice].artista;

    actualizarTiempo = setInterval(actualizarDuracion, 1000);

    audioActual.addEventListener('ended', siguienteCancion);
}

//funcion Reset lo pone todo a 0
function reset() {
    duracion_actual.textContent = "00:00";
    duracion_total.textContent = "00:00";
    duracion_slider.value = 0;
}

// funcion playpause llama a play o pause 
function playpause() {
    reproduciendo ? pauseCancion() : playCancion();
}

//funcion playCancion reproduce la cancion y cambia el icono
function playCancion() {
    audioActual.play();
    reproduciendo = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

//funcion pauseCancion pausa la cancion y cambia el icono
function pauseCancion() {
    audioActual.pause();
    reproduciendo = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

//funcion siguienteCancion cambia la cancion en base al indice y la reproduce
function siguienteCancion() {
    if (indice < lista_musica.length - 1) indice++;
    else indice = 0;

    cargarCancion(indice);
    playCancion();
}

//funcion cancionAnterior cambia la cancion en base al indice y la reproduce
function cancionAnterior() {
    if (indice > 0) {
        indice -= 1;
    } else {
        indice = lista_musica.length - 1;
    }
    cargarCancion(indice);
    playCancion();
}

//funcion duracion y volumen actualizan los valores en base a los sliders
function duracion() {
    let duracion = audioActual.duration * (duracion_slider.value / 100);
    audioActual.currentTime = duracion;
}
function volumen() {
    audioActual.volume = volumen_slider.value / 100;
}

//funcion para las teclas 
document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        e.preventDefault(); //sino da problemas
        mute();
    }

    if (e.code === "ArrowRight") {
        siguienteCancion();
    }

    if (e.code === "ArrowLeft") {
        cancionAnterior();
    }

});

//funcion mute, comprueba si el audio esta muteado o no y cambia el texto del boton
function mute() {
    audioActual.muted = !audioActual.muted;
    btn_mute.textContent = audioActual.muted ? "UNMUTE" : "MUTE";
}

//funcion actualizarDuracion actualiza la duracion de la cancion y el slider
function actualizarDuracion() {
    let posicion = 0;
    if (!isNaN(audioActual.duration)) {
        posicion = audioActual.currentTime * (100 / audioActual.duration);
        duracion_slider.value = posicion;
        
        let minutos = Math.floor(audioActual.currentTime / 60);
        let segundos = Math.floor(audioActual.currentTime - minutos * 60);
        let duracion_minutos = Math.floor(audioActual.duration / 60);
        let duracion_segundos = Math.floor(audioActual.duration - duracion_minutos * 60);

        if (segundos < 10) { segundos = "0" + segundos; }
        if (duracion_segundos < 10) { duracion_segundos = "0" + duracion_segundos; }
        if (minutos < 10) { minutos = "0" + minutos; }
        if (duracion_minutos < 10) { duracion_minutos = "0" + duracion_minutos; }

        duracion_actual.textContent = minutos + ":" + segundos;
        duracion_total.textContent = duracion_minutos + ":" + duracion_segundos;
    }
}


//pequeña "animacion" para los textos de la pantalla de carga
const estados = [
    "JOINING SERVER",
    "PREPARING ASSETS",
    "ESTABLISHING CONNECTION"
];

let estadoindice = 0;
const estadoTexto = document.getElementById("estadoTexto");

setInterval(() => {
    estadoindice = (estadoindice + 1) % estados.length;
    estadoTexto.textContent = estados[estadoindice];
}, 2000); 
// Ejercicio 1: Manipulación básica de arrays
console.log("Ejercicio 1: Manipulación básica de arrays");
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const cuadrados = numeros.map(num => num ** 2);
const pares = numeros.filter(num => num % 2 === 0);
const suma = numeros.reduce((acum, num) => acum + num, 0);
console.log("Cuadrados:", cuadrados);
console.log("Pares:", pares);
console.log("Suma:", suma);

// Ejercicio 2: Transformaciones de strings
console.log("Ejercicio 2: Transformaciones de strings");
const ciudades = ["madrid", "barcelona", "valencia", "sevilla", "cádiz"];
const mayus = ciudades.map(ciudad => ciudad.toUpperCase());
const orden_alfabetico = ciudades.sort();
const ciudades_M = ciudades.some(ciudad => ciudad.startsWith("M ") || ciudad.startsWith("m ")); //los dos casos
const ciudades_4_caracteres = ciudades.every(ciudad => ciudad.length > 4);
console.log("Ciudades en mayus:", mayus);
console.log("Ciudades ordenadas:", orden_alfabetico);
console.log("Ciudad que empieza con M:", ciudades_M);
console.log("Ciudades con mas de 4 caracteres:", ciudades_4_caracteres);

// Ejercicio 3: Organización de datos
console.log("Ejercicio 3: Organización de datos");
const estudiantes = [
    { nombre: "Ana", edad: 20, nota: 8 },
    { nombre: "Luis", edad: 22, nota: 5 },
    { nombre: "María", edad: 19, nota: 7 },
    { nombre: "Carlos", edad: 21, nota: 4 }
];
const aprobados = estudiantes.filter(estudiante => estudiante.nota >= 5);
const edades = estudiantes.map(estudiante => estudiante.edad).sort((a, b) => a - b);
const nombres = estudiantes.map(estudiante => estudiante.nombre).join(", ");
const nota_media = estudiantes.reduce((acum, estudiante) => acum + estudiante.nota, 0) / estudiantes.length;
console.log("Nota media:", nota_media);
console.log("Estudiantes aprobados:", aprobados);
console.log("Edades ordenadas:", edades);
console.log("Nombres de estudiantes:", nombres);
console.log("Nota media:", nota_media);

// Ejercicio 4: Análisis de palabras
console.log("Ejercicio 4: Análisis de palabras");
const palabras = ["kincillo", "eder", "juanpilabelludo", "david", "alons"];
const palabras_5_caracteres = palabras.filter(palabra => palabra.length > 5);
const reversa = palabras.map(palabra => palabra.split("").reverse().join(""));
const orden_longitud = palabras.sort((a, b) => a.length - b.length);
console.log("Palabras con mas de 5 caracteres:", palabras_5_caracteres);
console.log("Palabras en reversa:", reversa);
console.log("Palabras ordenadas por longitud:", orden_longitud);

// Ejercicio 5: Operaciones con matrices
console.log("Ejercicio 5: Operaciones con matrices");
const num1 = [4, 5, 6];
const num2 = [9, 10, 11];
const suma_ambos = num1.map((num, index) => num + num2[index]);
const mult_ambos = num1.map((num, index) => num * num2[index]);
const indice_mayor_10 = num2.findIndex(num => num > 10);
console.log("Suma de ambos arrays:", suma_ambos);
console.log("Multiplicacion de ambos arrays:", mult_ambos);
console.log("Indice de numero mayor a 10:", indice_mayor_10);

// Ejercicio 6: Juego de palabras
console.log("Ejercicio 6: Juego de palabras");
const frase = ["kincillo", "es", "un", "gran", "programador"];
const frase_entera = frase.reduce((acum, frase) => acum + " " + frase)
const frase_oden_inverso = frase.reverse().join(" ");
const palabra_kincillo = frase.includes("kincillo");
console.log("Frase entera:", frase_entera);
console.log("Frase en orden inverso:", frase_oden_inverso);
console.log("La frase tiene la palabra 'kincillo':", palabra_kincillo);

//Ejercicio 7: Estadísticas rápidas
console.log("Ejercicio 7: Estadísticas rápidas");
const num_aleatorio = [];
for (let i = 0; i < 10; i++) {
    num_aleatorio.push(Math.floor(Math.random() * 101));
}
const num_alto = Math.max(...num_aleatorio);
const num_bajo = Math.min(...num_aleatorio);
const cantidad_impares = num_aleatorio.filter(num => num % 2 !== 0).length;
console.log("Numero mas alto:", num_alto);
console.log("Numero mas bajo:", num_bajo);
console.log("Cantidad de numeros impares:", cantidad_impares);
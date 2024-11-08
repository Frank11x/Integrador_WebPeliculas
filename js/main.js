// Carrusel
const carrusel = document.getElementById('carousel');
const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

let desplazamiento;
let peliculasVisibles = 5;

document.addEventListener('DOMContentLoaded', () => {
    const peliculas = document.querySelectorAll('.pelicula');
    if (peliculas.length === 0) {
        console.error("No hay películas disponibles en el carrusel.");
        return;
    }

    const anchoPelicula = peliculas[0].offsetWidth;
    desplazamiento = anchoPelicula * peliculasVisibles;

    flechaIzquierda.addEventListener('click', moverCarruselIzquierda);
    flechaDerecha.addEventListener('click', moverCarruselDerecha);

    window.addEventListener('resize', () => {
        const nuevoAnchoPelicula = peliculas[0].offsetWidth;
        desplazamiento = nuevoAnchoPelicula * peliculasVisibles;
    });
});

function moverCarruselIzquierda() {
    carrusel.scrollBy({
        left: -desplazamiento,
        behavior: 'smooth'
    });
}

function moverCarruselDerecha() {
    carrusel.scrollBy({
        left: desplazamiento,
        behavior: 'smooth'
    });
}

function manejarSuscripcion(event) {
    event.preventDefault();
    const emailInput = document.getElementById("correo");
    const email = emailInput.value;

    if (validateEmail(email)) {
        alert("¡Gracias por suscribirte con el correo " + email + "!");
        emailInput.value = '';
    } else {
        alert("Por favor, ingresa un correo electrónico válido.");
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

const formularioSuscripcion = document.getElementById("formulario-suscripcion");
if (formularioSuscripcion) {
    formularioSuscripcion.addEventListener("submit", manejarSuscripcion);
}

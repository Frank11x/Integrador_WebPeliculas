// --------------------- Carrusel -----------------------------
// Variables del carrusel
const carrusel = document.getElementById('carousel');
const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

// Número de desplazamientos por clic
const numeroPeliculas = document.querySelectorAll('.pelicula').length;
const peliculasVisibles = 5; // Por ejemplo, mostrar 5 películas a la vez en el carrusel

// Calcular el ancho total del carrusel
const anchoCarrusel = carrusel.offsetWidth;
const anchoPelicula = document.querySelector('.pelicula').offsetWidth;
const totalAnchoCarrusel = anchoPelicula * numeroPeliculas;

// Función para mover el carrusel hacia la izquierda
function moverCarruselIzquierda() {
    carrusel.scrollBy({
        left: -anchoPelicula * peliculasVisibles, // Desplazar hacia la izquierda por el ancho de las películas visibles
        behavior: 'smooth' // Desplazamiento suave
    });
}

// Función para mover el carrusel hacia la derecha
function moverCarruselDerecha() {
    carrusel.scrollBy({
        left: anchoPelicula * peliculasVisibles, // Desplazar hacia la derecha por el ancho de las películas visibles
        behavior: 'smooth' // Desplazamiento suave
    });
}

// Event listeners para las flechas
flechaIzquierda.addEventListener('click', moverCarruselIzquierda);
flechaDerecha.addEventListener('click', moverCarruselDerecha);
// -----------------------------------------------------------------

// Manejar la suscripción
function manejarSuscripcion(event) {
    event.preventDefault(); // Evitar el envío del formulario
    const emailInput = document.getElementById("correo"); // Asegúrate de que el ID coincida con el HTML
    const email = emailInput.value;

    if (validateEmail(email)) {
        alert("¡Gracias por suscribirte con el correo " + email + "!");
        emailInput.value = ''; // Limpiar el campo
    } else {
        alert("Por favor, ingresa un correo electrónico válido.");
    }
}

// Validar el formato del correo electrónico
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

document.addEventListener("DOMContentLoaded", function () {
    const formularioBusqueda = document.getElementById("formularioSuscripcion");

    // Verificar si estamos en busqueda.html
    if (window.location.pathname.includes("busqueda.html")) {
        realizarBusquedaEnBusquedaPage(); // Función para realizar la búsqueda en busqueda.html
    }

    // Evento de búsqueda desde la página principal (index.html)
    formularioBusqueda.addEventListener("submit", function (event) {
        event.preventDefault();
        const busquedaInput = document.getElementById("busqueda").value.trim();
        if (busquedaInput) {
            // Redirigir a busqueda.html con el término de búsqueda como parámetro
            window.location.href = `busqueda.html?query=${encodeURIComponent(busquedaInput)}`;
        } else {
            alert("Por favor ingresa un término de búsqueda.");
        }
    });
});

// Función para realizar la búsqueda en busqueda.html
function realizarBusquedaEnBusquedaPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");

    if (query) {
        fetch('js/peliculas.json')
            .then(response => response.json())
            .then(data => {
                const resultados = data.filter(pelicula =>
                    pelicula.nombre.toLowerCase().includes(query.toLowerCase()) ||
                    pelicula.elenco.some(actor => actor.toLowerCase().includes(query.toLowerCase())) ||
                    pelicula.genero.join(", ").toLowerCase().includes(query.toLowerCase())
                );

                mostrarResultados(resultados);
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error);
                alert('Hubo un problema al cargar los resultados.');
            });
    } else {
        alert("No se proporcionó un término de búsqueda.");
    }
}

// Función para mostrar los resultados de la búsqueda
function mostrarResultados(resultados) {
    const resultadoDiv = document.getElementById("resultado-busqueda");
    resultadoDiv.innerHTML = ''; // Limpiar resultados previos

    if (resultados.length > 0) {
        resultados.forEach(pelicula => {
            const divPelicula = document.createElement('div');
            divPelicula.classList.add('pelicula');
            divPelicula.innerHTML = `
                <h3>${pelicula.nombre}</h3>
                <p>${pelicula.sinopsis}</p>
                <a href="articulo.html?id=${pelicula.id}">Ver más</a>
            `;
            resultadoDiv.appendChild(divPelicula);
        });
    } else {
        resultadoDiv.innerHTML = '<p>No se encontraron resultados en el catálogo.</p>';
    }
}

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

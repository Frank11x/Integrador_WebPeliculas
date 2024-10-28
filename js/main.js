document.addEventListener("DOMContentLoaded", function () {
    fetch("js/peliculas.json")
        .then(response => response.json())
        .then(data => {
            const urlParams = new URLSearchParams(window.location.search);
            const peliculaId = urlParams.get("id"); // Obtenemos el id de la URL

            // Si hay un id en la URL, buscamos la película para mostrarla
            if (peliculaId) {
                const pelicula = data.find(p => p.id === peliculaId); // Buscamos la película

                if (pelicula) {
                    document.getElementById("portada").src = pelicula.portada;
                    document.getElementById("titulo").textContent = pelicula.nombre;
                    document.getElementById("trailer").href = pelicula.trailer;
                    document.getElementById("genero").textContent = pelicula.genero.join(", ");
                    document.getElementById("elenco").textContent = pelicula.elenco.join(", ");
                    document.getElementById("sinopsis").textContent = pelicula.sinopsis;
                }
            }
        })
        .catch(error => console.error("Error cargando el archivo JSON:", error));
});

// Función para manejar la búsqueda
async function realizarBusqueda() {
    const busquedaInput = document.getElementById("busqueda").value.toLowerCase();
    const resultadoDiv = document.getElementById("resultado-busqueda");
    resultadoDiv.innerHTML = ''; // Limpiar resultados anteriores

    try {
        const response = await fetch('js/peliculas.json');
        const peliculas = await response.json();
        const resultados = peliculas.filter(pelicula =>
            pelicula.nombre.toLowerCase().includes(busquedaInput) ||
            pelicula.elenco.some(actor => actor.toLowerCase().includes(busquedaInput)) ||
            pelicula.genero.join(", ").toLowerCase().includes(busquedaInput)
        );

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
            resultadoDiv.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
        resultadoDiv.innerHTML = '<p>Error al cargar los resultados.</p>';
    }
}

// Manejar la suscripción
function manejarSuscripcion(event) {
    event.preventDefault(); // Evitar el envío del formulario
    const emailInput = document.getElementById("email");
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


function realizarBusqueda() {
    const busqueda = document.getElementById('busqueda').value.toLowerCase();
    const resultadosDiv = document.getElementById('resultado-busqueda');
    
    // Borrar resultados previos
    resultadosDiv.innerHTML = '';

    // Simulación de resultados de búsqueda (adaptar para JSON en producción)
    const peliculas = [
        { titulo: "Película 1", sinopsis: "Sinopsis de Película 1", genero: "Acción" },
        { titulo: "Película 2", sinopsis: "Sinopsis de Película 2", genero: "Drama" },
        // Añadir más películas aquí o cargar desde JSON
    ];

    // Filtrar y mostrar resultados
    const resultados = peliculas.filter(pelicula => 
        pelicula.titulo.toLowerCase().includes(busqueda) ||
        pelicula.genero.toLowerCase().includes(busqueda)
    );

    if (resultados.length > 0) {
        resultados.forEach(pelicula => {
            const div = document.createElement('div');
            div.className = 'resultado-item';
            div.innerHTML = `
                <h3>${pelicula.titulo}</h3>
                <p>${pelicula.sinopsis}</p>
                <p><strong>Género:</strong> ${pelicula.genero}</p>
            `;
            resultadosDiv.appendChild(div);
        });
    } else {
        resultadosDiv.innerHTML = '<p>No se encontraron resultados.</p>';
    }
}
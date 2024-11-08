document.addEventListener("DOMContentLoaded", () => {
    // Obtiene el parámetro "id" de la URL (por ejemplo, articulo.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const peliculaId = urlParams.get('id');

    // Cargar los datos de las películas desde el archivo JSON
    fetch('js/peliculas.json')
        .then(response => response.json())
        .then(data => {
            // Buscar la película seleccionada usando el ID
            const pelicula = data.find(p => p.id === peliculaId);

            if (pelicula) {
                // Actualizar el contenido de la página con la información de la película
                document.getElementById('titulo-pelicula').textContent = pelicula.nombre;
                document.getElementById('portada-img').src = pelicula.portada;
                document.getElementById('link-trailer').href = pelicula.trailer;
                document.getElementById('genero-pelicula').textContent = pelicula.genero.join(', '); // Convertir array a string
                document.getElementById('elenco-pelicula').textContent = pelicula.elenco.join(', '); // Convertir array a string
                document.getElementById('sinopsis-pelicula').textContent = pelicula.sinopsis;

                // Validar que la calificación existe y no sea N/A
                const calificacion = pelicula.calificacion !== "N/A" ? pelicula.calificacion : 'No disponible';
                document.getElementById('calificacion-pelicula').textContent = calificacion;

            } else {
                alert('No se encontró la película seleccionada.');
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos de la película:', error);
            alert('Error al cargar los detalles de la película.');
        });
});

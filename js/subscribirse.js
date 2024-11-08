document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Limpiar mensajes previos
    const mensajesDiv = document.getElementById('mensajes');
    mensajesDiv.style.display = 'none';
    mensajesDiv.innerText = '';

    let esValido = true;
    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const correo = document.getElementById('correo');

    // Validación básica de nombre
    if (!nombre.value.trim()) {
        mostrarMensaje('El nombre es requerido.', true);
        esValido = false;
    }

    // Validación de correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.value.trim() || !regexCorreo.test(correo.value)) {
        mostrarMensaje('El correo electrónico no es válido.', true);
        esValido = false;
    }

    // Si es válido, mostrar mensaje de éxito
    if (esValido) {
        mostrarMensaje(`Gracias por suscribirte, ${nombre.value}. Te contactaremos a través de ${correo.value}.`, false);
        document.getElementById('formularioContacto').reset(); // Limpia el formulario
    }
});

function mostrarMensaje(mensaje, esError) {
    const mensajesDiv = document.getElementById('mensajes');
    mensajesDiv.innerText = mensaje;
    mensajesDiv.style.display = 'block';
    mensajesDiv.style.backgroundColor = esError ? '#FF5722' : '#4CAF50'; // Rojo para error, verde para éxito
}

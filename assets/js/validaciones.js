// validaciones.js - Validaciones de formularios

// Validar formulario de contacto
function validarFormularioContacto() {
    const nombre = document.getElementById('nombreContacto');
    const email = document.getElementById('emailContacto');
    const asunto = document.getElementById('asuntoContacto');
    const mensaje = document.getElementById('mensajeContacto');
    
    let isValid = true;

    // Resetear clases
    [nombre, email, asunto, mensaje].forEach(campo => {
        campo.classList.remove('is-invalid');
    });

    if (!nombre.value.trim()) {
        nombre.classList.add('is-invalid');
        isValid = false;
    }
    
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }
    
    if (!asunto.value.trim()) {
        asunto.classList.add('is-invalid');
        isValid = false;
    }
    
    if (!mensaje.value.trim()) {
        mensaje.classList.add('is-invalid');
        isValid = false;
    }
    
    return isValid;
}

// Validar formulario de login
function validarFormularioLogin() {
    const email = document.getElementById('emailLogin');
    const password = document.getElementById('passwordLogin');
    
    let isValid = true;

    // Resetear clases
    [email, password].forEach(campo => {
        campo.classList.remove('is-invalid');
    });

    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }
    
    if (!password.value.trim() || password.value.length < 6) {
        password.classList.add('is-invalid');
        isValid = false;
    }
    
    return isValid;
}

// Validar formulario de registro
function validarFormularioRegistro() {
    const nombre = document.getElementById('nombreRegistro');
    const email = document.getElementById('emailRegistro');
    const password = document.getElementById('passwordRegistro');
    
    let isValid = true;

    // Resetear clases
    [nombre, email, password].forEach(campo => {
        campo.classList.remove('is-invalid');
    });

    if (!nombre.value.trim()) {
        nombre.classList.add('is-invalid');
        isValid = false;
    }
    
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }
    
    if (!password.value.trim() || password.value.length < 6) {
        password.classList.add('is-invalid');
        isValid = false;
    }
    
    return isValid;
}
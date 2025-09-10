var registroOK = true;

function registrarUsuario() {
    console.log('Registrando usuario...');
    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var correo = document.getElementById('correo').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;

    validarNombre(nombre, "nombre");
    validarNombre(apellidos, "apellido");
    validarCorreo(correo);

    console.log("registroOK: " + registroOK);
    if (registroOK) {
        Swal.fire({
            title: "The Internet?",
            text: "That thing is still around?",
            icon: "success"
        });
    }
}

function validarNombre(nombre, nombreControl) {
    var regexNombre = /^[a-zA-Z]+ [a-zA-Z]+$/;

    if (nombre.length > 50) {
        document.getElementById("error_" + nombreControl + "_largo").style.display = "block";
        registroOK = false;
        return;
    }

    if (nombre == '') {
        document.getElementById("error_" + nombreControl + "").style.display = "block";
        registroOK = false;
        return;
    } else {
        registroOK = true;
        document.getElementById("error_" + nombreControl + "").style.display = "none";
    }

    if (!regexNombre.test(nombre)) {
        registroOK = false;
        document.getElementById("error_" + nombreControl + "_caracteres").style.display = "block";
        document.getElementById("error_" + nombreControl).style.display = "none";
        return;
    } else {
        registroOK = true;
        document.getElementById("error_" + nombreControl + "_caracteres").style.display = "none";
    }
}

function validarCorreo(correo) {
    regexEmail = /^[a-zA-Z0-9.-_]+@duoc.cl$/;
    if (regexEmail.test(correo)) {
        console.log("correo valido");
        registroOK = true;
    } else {
        registroOK = false;
        console.log("correo inválido");
    }
}

// Inicializar mapa
var map = L.map('mapa').setView([-33.4489, -70.6693], 5); // Centro en Chile

// Tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Agregar marcadores
var ciudades = [
    { nombre: "Santiago", lat: -33.4489, lng: -70.6693 },
    { nombre: "Puerto Montt", lat: -41.4693, lng: -72.9425 },
    { nombre: "Villarica", lat: -39.2536, lng: -72.2300 },
    { nombre: "Nacimiento", lat: -37.5500, lng: -72.4167 },
    { nombre: "Viña del Mar", lat: -33.0245, lng: -71.5515 },
    { nombre: "Valparaíso", lat: -33.0458, lng: -71.6197 },
    { nombre: "Concepción", lat: -36.8201, lng: -73.0444 }
];

ciudades.forEach(function(ciudad) {
    L.marker([ciudad.lat, ciudad.lng]).addTo(map)
        .bindPopup(ciudad.nombre);
});
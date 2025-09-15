const productos = [
  { 
    id: 'FR001', 
    nombre: 'Manzanas Fuji', 
    precio: 1200, 
    categoria: 'Frutas', 
    stock: 150, 
    descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.', 
    origen: 'Valle del Maule',
    imagen: 'assets/images/manzanas 2.webp'
  },
  { 
    id: 'FR002', 
    nombre: 'Naranjas Valencia', 
    precio: 1000, 
    categoria: 'Frutas', 
    stock: 200, 
    descripcion: 'Jugosas y ricas en vitamina C.', 
    origen: 'Región del Biobío',
    imagen: 'assets/images/naranja.jpg'
  },
  { 
    id: 'FR003', 
    nombre: 'Plátanos Cavendish', 
    precio: 800, 
    categoria: 'Frutas', 
    stock: 250, 
    descripcion: 'Plátanos maduros y dulces.', 
    origen: 'Zona Norte',
    imagen: 'assets/images/platano.jpg'
  },
  { 
    id: 'VR001', 
    nombre: 'Zanahorias Orgánicas', 
    precio: 900, 
    categoria: 'Verduras', 
    stock: 100, 
    descripcion: 'Zanahorias crujientes cultivadas sin pesticidas.', 
    origen: 'O\'Higgins',
    imagen: 'assets/images/zanahoria.webp'
  },
  { 
    id: 'VR002', 
    nombre: 'Espinacas Frescas', 
    precio: 700, 
    categoria: 'Verduras', 
    stock: 80, 
    descripcion: 'Espinacas frescas y nutritivas.', 
    origen: 'Región Metropolitana',
    imagen: 'assets/images/espinaca.webp'
  },
  { 
    id: 'VR003', 
    nombre: 'Pimientos Tricolores', 
    precio: 1500, 
    categoria: 'Verduras', 
    stock: 120, 
    descripcion: 'Pimientos rojos, amarillos y verdes.', 
    origen: 'Región de Valparaíso',
    imagen: 'assets/images/pimientos.webp'
  },
  { 
    id: 'PO001', 
    nombre: 'Miel Orgánica', 
    precio: 5000, 
    categoria: 'Organicos', 
    stock: 50, 
    descripcion: 'Miel pura y orgánica producida por apicultores locales.', 
    origen: 'Zona rural',
    imagen: 'assets/images/miel.png'
  },
  { 
    id: 'PO003', 
    nombre: 'Quinua Orgánica', 
    precio: 3500, 
    categoria: 'Organicos', 
    stock: 60, 
    descripcion: 'Quinua de alta calidad.', 
    origen: 'Andes',
    imagen: 'assets/images/quinoa.jpg'
  },
  { 
    id: 'PL001', 
    nombre: 'Leche Entera', 
    precio: 1200, 
    categoria: 'Lacteos', 
    stock: 200, 
    descripcion: 'Leche fresca de granjas locales.', 
    origen: 'Lechería local',
    imagen: 'assets/images/leche v1.png'
  }
];

// Mostrar productos destacados en index.html
function mostrarProductos() {
    const contenedor = document.getElementById("productos-destacados");
    if (!contenedor) return;

    // Selección manual de destacados: manzana, leche y quinua
    const destacados = productos.filter(p => 
        p.id === "FR001" || p.id === "PL001" || p.id === "PO003"
    );

    contenedor.innerHTML = '';
    
    destacados.forEach(p => {
        const div = document.createElement("div");
        div.className = "col-md-4 mb-4"; // Espaciado entre tarjetas
        div.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${p.imagen}" class="card-img-top img-producto" alt="${p.nombre}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${p.nombre}</h5>
              <p class="card-text fw-bold text-success">$${p.precio} CLP</p>
              <div class="mt-auto">
                <a href="producto-detalle.html?codigo=${p.id}" class="btn btn-success btn-sm w-100">Ver Detalle</a>
              </div>
            </div>
          </div>
        `;
        contenedor.appendChild(div);
    });
}

// Mostrar lista de productos en productos.html
function mostrarListaProductos(lista = productos) {
    const contenedor = document.getElementById("lista-productos");
    if (!contenedor) return;

    contenedor.innerHTML = '';
    
    lista.forEach(p => {
        const div = document.createElement("div");
        div.className = "col-md-4 mb-4";
        div.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${p.imagen}" class="card-img-top img-producto" alt="${p.nombre}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${p.nombre}</h5>
              <p class="card-text fw-bold text-success">$${p.precio} CLP</p>
              <p class="card-text"><small class="text-muted">Stock: ${p.stock}</small></p>
              <div class="mt-auto d-flex gap-2">
                <a href="producto-detalle.html?codigo=${p.id}" class="btn btn-success btn-sm flex-fill">Ver Detalle</a>
                <button class="btn btn-warning btn-sm flex-fill" onclick="agregarAlCarrito('${p.id}')">Agregar</button>
              </div>
            </div>
          </div>
        `;
        contenedor.appendChild(div);
    });
    
    actualizarContadorCarrito();
}

// Mostrar detalle de producto en producto-detalle.html
function mostrarDetalleProducto(codigo) {
    const producto = productos.find(p => p.id === codigo);
    const contenedor = document.getElementById("detalle-producto");
    if (!contenedor || !producto) return;

    contenedor.innerHTML = `
      <div class="col-md-6">
        <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
      </div>
      <div class="col-md-6">
        <h2>${producto.nombre}</h2>
        <p class="lead fw-bold text-success">$${producto.precio} CLP</p>
        <p><strong>Descripción:</strong> ${producto.descripcion}</p>
        <p><strong>Origen:</strong> ${producto.origen}</p>
        <p><strong>Stock:</strong> ${producto.stock}</p>
        <button class="btn btn-success btn-lg" onclick="agregarAlCarrito('${producto.id}')">Agregar al Carrito</button>
        <a href="productos.html" class="btn btn-outline-secondary ms-2">Volver</a>
      </div>
    `;
    
    actualizarContadorCarrito();
}

// Aplicar filtros en productos.html
function aplicarFiltros() {
    const categoria = document.getElementById('filtroCategoria').value;
    const stock = document.getElementById('filtroStock').value;
    
    let listaFiltrada = productos;
    
    if (categoria) {
        listaFiltrada = listaFiltrada.filter(p => p.categoria === categoria);
    }
    
    if (stock === 'disponible') {
        listaFiltrada = listaFiltrada.filter(p => p.stock > 0);
    } else if (stock === 'agotado') {
        listaFiltrada = listaFiltrada.filter(p => p.stock === 0);
    }
    
    mostrarListaProductos(listaFiltrada);
}

// Inicializar en productos.html
if (window.location.pathname.includes('productos.html')) {
    document.addEventListener("DOMContentLoaded", function () {
        mostrarListaProductos();
        document.getElementById('btnAplicarFiltros').addEventListener('click', aplicarFiltros);
    });
}

// Actualizar contador del carrito en todas las páginas
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById("cart-count");
    if (contador) {
        contador.textContent = carrito.length;
    }
}

// Inicializar contador al cargar cualquier página
document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorCarrito();
});

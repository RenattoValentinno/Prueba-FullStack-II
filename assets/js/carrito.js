// carrito.js - Funciones del carrito de compras

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
  console.log("Intentando agregar producto con ID:", idProducto);
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log("Carrito actual:", carrito);
    
    const producto = productos.find(p => p.id === idProducto);
    console.log("Producto encontrado:", producto);
    if (!producto) {
      
    console.error("Producto no encontrado");  
      return
    };
    
    const itemExistente = carrito.find(item => item.id === idProducto);
    console.log("Item existente en el carrito:", itemExistente);
    if (itemExistente) {
      console.log("catidad actual:", itemExistente.cantidad, "stock disponible:", producto.stock);
        if (itemExistente.cantidad < producto.stock) {
            itemExistente.cantidad += 1;
            console.log("Cantidad actualizada:", itemExistente.cantidad);
        } else {
          console.warn(`Stock máximo alcanzado. No se puede agregar más de ${producto.stock} unidades de ${producto.nombre}`);
            alert(`Solo hay ${producto.stock} unidades disponibles de ${producto.nombre}`);
            return;
        }
    } else {
      console.log(`Producto no está en carrito. Stock disponible: ${producto.stock}`);
        if (producto.stock > 0) {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            });
            console.log("Producto agregado al carrito con cantidad 1");
        } else {
          console.warn(`Producto ${producto.nombre} está agotado (stock: ${producto.stock})`);
            alert(`${producto.nombre} está agotado`);
            return;
        }
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("Carrito guardado en localStorage:", carrito);
    actualizarContadorCarrito();
    alert(`${producto.nombre} agregado al carrito`);
}

// Mostrar contenido del carrito en carrito.html
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("carrito-contenido");
    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
          <p class="text-center text-muted">Tu carrito está vacío.</p>
          <div class="text-center mt-3">
            <a href="productos.html" class="btn btn-success">Ver Productos</a>
          </div>
        `;
        return;
    }

    let contenidoHTML = `
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
    `;

    let total = 0;
    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        contenidoHTML += `
          <tr>
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>
              <input type="number" min="1" value="${item.cantidad}" class="form-control form-control-sm cantidad-item" data-index="${index}" style="width: 80px;">
            </td>
            <td>$${subtotal}</td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </td>
          </tr>
        `;
    });

    contenidoHTML += `
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-4">
        <h4>Total: $${total}</h4>
        <div>
          <button class="btn btn-warning me-2" onclick="vaciarCarrito()">Vaciar Carrito</button>
          <button class="btn btn-success">Proceder al Pago</button>
        </div>
      </div>
    `;

    contenedor.innerHTML = contenidoHTML;

    // Agregar event listeners a los inputs de cantidad
    document.querySelectorAll('.cantidad-item').forEach(input => {
        input.addEventListener('change', function() {
            const index = this.dataset.index;
            const nuevaCantidad = parseInt(this.value);
            if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
                this.value = 1;
                return;
            }
            actualizarCantidadCarrito(index, nuevaCantidad);
        });
    });
}

// Actualizar cantidad de un item en el carrito
function actualizarCantidadCarrito(index, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (index >= 0 && index < carrito.length) {
        // Verificar stock
        const producto = productos.find(p => p.id === carrito[index].id);
        if (producto && nuevaCantidad <= producto.stock) {
            carrito[index].cantidad = nuevaCantidad;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito(); // Recargar para actualizar totales
        } else {
            alert(`Solo hay ${producto.stock} unidades disponibles de ${producto.nombre}`);
            // Revertir el valor del input
            document.querySelector(`.cantidad-item[data-index="${index}"]`).value = carrito[index].cantidad;
        }
    }
}

// Eliminar un item del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContadorCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        localStorage.removeItem("carrito");
        mostrarCarrito();
        actualizarContadorCarrito();
    }
}
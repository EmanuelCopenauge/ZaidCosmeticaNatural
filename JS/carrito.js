// =====================
// INICIALIZACIÓN
// =====================

// Obtener carrito del localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// =====================
// FUNCIONES DEL CARRITO
// =====================

// Renderiza todos los productos en el carrito
function renderizarCarrito() {
  const carritoLista = document.getElementById('carrito-lista');
  const carritoTotal = document.getElementById('carrito-total');
  carritoLista.innerHTML = '';
  
  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio;

    const div = document.createElement('div');
    div.className = 'producto-en-carrito';
    div.innerHTML = `
      <img src="${producto.imgSrc}" alt="${producto.nombre}" />
      <strong>${producto.nombre}</strong>
      <p>Precio: $${producto.precio}</p>
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    carritoLista.appendChild(div);
  });

  carritoTotal.textContent = total;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Elimina un producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  renderizarCarrito();
}

// Vacía el carrito completo
function vaciarCarrito() {
  carrito = [];
  renderizarCarrito();
}

// =====================
// FUNCIONES DE WHATSAPP
// =====================

// Envía el pedido por WhatsApp
function enviarPedidoWhatsApp(nombreCliente, telefonoCliente) {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  let mensaje = `Hola! Soy ${nombreCliente}.\n`;
  if (telefonoCliente) mensaje += `Teléfono: ${telefonoCliente}\n`;
  mensaje += `Productos:\n`;

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} - $${p.precio}\n`;
  });

  const total = carrito.reduce((sum, p) => sum + p.precio, 0);
  mensaje += `Total: $${total}\n`;

  // Número de WhatsApp del negocio (formato internacional)
  const numeroWhatsApp = "5491130712583"; // reemplazá con tu número

  // Crear enlace de WhatsApp
  const enlace = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  // Abrir WhatsApp en nueva pestaña
  window.open(enlace, "_blank");

  // Vaciar carrito
  vaciarCarrito();
  document.getElementById("formCompra").reset();
}

// =====================
// EVENTOS
// =====================

// Evento del formulario para finalizar compra
document.getElementById("formCompra").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombreCliente = document.getElementById("nombreCliente").value.trim();
  const telefonoCliente = document.getElementById("telefonoCliente").value.trim();

  enviarPedidoWhatsApp(nombreCliente, telefonoCliente);
});

// Render inicial del carrito
renderizarCarrito();

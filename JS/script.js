/*CODIGO JAVA SCRIPT PARA ZAID COSMETICA NATURAL*/

/*CARRUSEL*/
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel-images");
  const images = document.querySelectorAll(".carousel-images img");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let index = 0;

  function showSlide(i) {
    if (i < 0) index = images.length - 1;
    else if (i >= images.length) index = 0;
    else index = i;

    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;
  }

  prevBtn.addEventListener("click", () => {
    showSlide(index - 1);
  });

  nextBtn.addEventListener("click", () => {
    showSlide(index + 1);
  });

  // Opcional: autoplay cada 5 segundos
  setInterval(() => {
    showSlide(index + 1);
  }, 5000);

  showSlide(index);
});

/*------------------------------------------------------------------------*/

/* LOGICA DE PROGRAMACION PARA EL CARRITO DE COMPRAS DE ZAID COSMETICA NATURAL  */

// ==============================
// LÓGICA DEL CARRITO DE COMPRAS
// ==============================

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio, imgSrc) {
  // 1. Obtener carrito actual del localStorage o crear uno vacío
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // 2. Agregar nuevo producto
  carrito.push({
    nombre: nombre,
    precio: Number(precio),
    imgSrc: imgSrc
  });

  // 3. Guardar carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // 4. Notificar al usuario
  alert(`${nombre} fue agregado al carrito.`);
}

// Función para vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem('carrito');
  alert("El carrito ha sido vaciado.");
}

// Función para obtener el total del carrito
function obtenerTotalCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
  return total;
}

// Función para mostrar el carrito en el DOM
function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const listaCarrito = document.getElementById('carrito-lista');
  const totalCarrito = document.getElementById('carrito-total');

  if (!listaCarrito || !totalCarrito) return; // Evitar errores si no hay contenedor en la página

  // Limpiar lista actual
  listaCarrito.innerHTML = '';

  // Crear elementos para cada producto
  carrito.forEach((producto, index) => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('producto-en-carrito');
    divProducto.innerHTML = `
      <img src="${producto.imgSrc}" alt="${producto.nombre}">
      <strong>${producto.nombre}</strong>
      <span>$${producto.precio}</span>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    listaCarrito.appendChild(divProducto);
  });

  // Actualizar total
  totalCarrito.textContent = `Total: $${obtenerTotalCarrito()}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(indice) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(indice, 1); // eliminar producto
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito(); // refrescar lista
}

// Llamar a mostrarCarrito al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);



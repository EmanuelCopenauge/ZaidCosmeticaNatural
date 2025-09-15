// Cargar comentarios desde el JSON
async function cargarTestimonios() {
  const response = await fetch('comentarios.json');
  const comentarios = await response.json();
  const contenedor = document.getElementById('testimonios');
  contenedor.innerHTML = '';

  comentarios.forEach(c => {
    contenedor.innerHTML += `
      <div class="testimonio">
        <p>"${c.comentario}"</p>
        <strong>- ${c.nombre} (${c.fecha})</strong>
        <div>Calificación: ${'★'.repeat(c.calificacion)}</div>
      </div>
    `;
  });
}

// Agregar un nuevo comentario (solo en memoria)
document.getElementById('formTestimonio').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const comentario = document.getElementById('comentario').value;
  const calificacion = parseInt(document.getElementById('calificacion').value);
  const fecha = new Date().toLocaleDateString();

  // Mostrarlo en la página
  const contenedor = document.getElementById('testimonios');
  contenedor.innerHTML += `
    <div class="testimonio">
      <p>"${comentario}"</p>
      <strong>- ${nombre} (${fecha})</strong>
      <div>Calificación: ${'★'.repeat(calificacion)}</div>
    </div>
  `;

  // Limpiar formulario
  this.reset();
});

// Inicializar
cargarTestimonios();

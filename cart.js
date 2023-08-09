carrito = JSON.parse(localStorage.getItem('ingredientesEnCarrito'))
const carritoIngredientes = document.querySelector('.carrito-ingredientes')



function anadirCarrito () {
  carritoIngredientes.innerHTML = ''

  carrito.forEach(ingrediente => {
    const div = document.createElement('div');
    div.classList.add('carrito-ingrediente');
    div.innerHTML = `
      <img src="${ingrediente.imagen}" alt="">
      <div class="carrito-ingrediente-nombre">
        <small>Ingrediente</small>
        <h3>${ingrediente.nombre}</h3>
      </div>
      <div class="carrito-ingrediente-cantidad">
        <small>Cantidad</small>
        <p>${ingrediente.cantidad}</p>
      </div>
      <div class="carrito-ingrediente-precio">
        <small>Precio</small>
        <p>$${ingrediente.precio}</p>
      </div>
      <div class="carrito-ingrediente-subtotal">
        <small>Subtotal</small>
        <p>$${ingrediente.precio}</p>
      </div>
      <button class="carrito-ingrediente-eliminar" value="${ingrediente.id}"><i class="bi bi-trash3"></i></button>
    `
    carritoIngredientes.appendChild(div)
  })

}

anadirCarrito()

function calcularTotalCarrito() {
  const total = carrito.reduce((acumulador, ingrediente) => acumulador + ingrediente.precio * ingrediente.cantidad, 0)
  const totalCarritoElement = document.querySelector('.carrito-acciones-total');
  totalCarritoElement.innerHTML = `<p>Total: $${total}</p>`
}
calcularTotalCarrito();







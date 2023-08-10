let carrito = JSON.parse(localStorage.getItem('ingredientesEnCarrito')) || []

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
    `
    carritoIngredientes.appendChild(div)

    const eliminar = document.createElement('span')
    eliminar.innerHTML = `<i class="bi bi-trash3" value="${ingrediente.id}"></i>`
    eliminar.className = 'carrito-ingrediente-eliminar'

    div.appendChild(eliminar)

    eliminar.addEventListener('click', eliminarIngrediente)
  })

  const carritoAcciones = document.querySelector('.carrito-acciones')
  carritoAcciones.innerHTML = ''
  calcularTotalCarrito()
}

const eliminarIngrediente = () => {
  const findId = carrito.find(element => element.id)

  carrito = carrito.filter((carritoId) => {
    return carritoId !== findId
  })
  console.log(findId);
  anadirCarrito()
}

function calcularTotalCarrito() {
  const carritoAcciones = document.querySelector('.carrito-acciones')
  const total = carrito.reduce((acumulador, ingrediente) => acumulador + ingrediente.precio * ingrediente.cantidad, 0)
  
  const totalCarritoElement = document.createElement('div');
  totalCarritoElement.classList.add('carrito-acciones-total')
  totalCarritoElement.innerHTML = `<p>Total: $${total}</p>`

  carritoAcciones.appendChild(totalCarritoElement)
}

if(carrito.length) {
  anadirCarrito()
} else {
  carritoIngredientes.innerHTML = `<div class="carrito-vacio">Arma tu hamburguesa agregando ingredientes!!</div>` 
}






let carrito = JSON.parse(localStorage.getItem('ingredientesEnCarrito')) || []

carrito = JSON.parse(localStorage.getItem('ingredientesEnCarrito'))
const carritoIngredientes = document.querySelector('.carrito-ingredientes')
const carritoAcciones = document.querySelector('.carrito-acciones')


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
        <p>$${ingrediente.precio * ingrediente.cantidad}</p>     
      </div>
    `
    carritoIngredientes.appendChild(div)

    const eliminar = document.createElement('span')
    eliminar.innerHTML = `<i class="bi bi-trash3" value="${ingrediente.id}"></i>`
    eliminar.className = 'carrito-ingrediente-eliminar'

    div.appendChild(eliminar)

    eliminar.addEventListener('click', eliminarIngrediente)
  })

  carritoAcciones.innerHTML = ''

  const vaciarCarritoButton = document.createElement('div')
  vaciarCarritoButton.addEventListener('click', vaciarCarrito)
  vaciarCarritoButton.classList.add('carrito-acciones-vaciar')
  vaciarCarritoButton.innerText = 'VACIAR CARRITO'
  carritoAcciones.appendChild(vaciarCarritoButton)

  calcularTotalCarrito()
}

const vaciarCarrito = () => {
  carrito = []
  anadirCarrito()
  localStorage.removeItem('ingredientesEnCarrito')
}

function calcularTotalCarrito() {
  const total = carrito.reduce((acumulador, ingrediente) => acumulador + ingrediente.precio * ingrediente.cantidad, 0)
  
  const totalCarritoElement = document.createElement('div');
  totalCarritoElement.classList.add('carrito-acciones-total')
  totalCarritoElement.innerText = `Total: $${total}`

  carritoAcciones.appendChild(totalCarritoElement)
}

const eliminarIngrediente = () => {
  const findId = carrito.find(element => element.id)

  carrito = carrito.filter((carritoId) => {
    return carritoId !== findId
  })
  anadirCarrito()
  localStorage.setItem('ingredientesEnCarrito', JSON.stringify(carrito))
}

if(carrito && carrito.length) {
 anadirCarrito() 
} else {
  carritoIngredientes.innerHTML = `<div class="carrito-vacio">Arma tu hamburguesa agregando ingredientes!!</div>` 
}






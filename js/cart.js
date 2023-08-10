let carrito = JSON.parse(localStorage.getItem('ingredientesEnCarrito')) || []

carrito = JSON.parse(localStorage.getItem('ingredientesEnCarrito'))
const carritoIngredientes = document.querySelector('.carrito-ingredientes')
const carritoAccionesBotones = document.querySelector('.carrito-acciones-botones')
const carritoAcciones = document.querySelector('.carrito-acciones')

const vaciarCarritoMessage = () => {
  carritoIngredientes.innerHTML = `<div class="carrito-vacio">Arma tu hamburguesa agregando ingredientes!!</div>`
  carritoAccionesBotones.remove('carrito-acciones-botones')

  localStorage.removeItem('ingredientesEnCarrito') 
}

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
    eliminar.id = `${ingrediente.id}`

    div.appendChild(eliminar)

    eliminar.addEventListener('click', () => eliminarIngrediente(eliminar.id))

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

  Swal.fire({
    title: '¿Deseas vaciar el carrito?',
    showCancelButton: true,
    confirmButtonText: 'CONFIRMAR',
    cancelButtonText: 'CANCELAR'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Se vació el carrito')
      carrito = []
      anadirCarrito()
      vaciarCarritoMessage()
      Toastify({
        text: "Ingredientes eliminados",
        duration: 2500,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
          background: "#e9e693",
          color: "#995226",
          borderRadius: "2rem"
        },
        onClick: function(){} 
      }).showToast()
    }
  })

}

function calcularTotalCarrito() {
  const total = carrito.reduce((acumulador, ingrediente) => acumulador + ingrediente.precio * ingrediente.cantidad, 0)
  
  const totalCarritoElement = document.createElement('div');
  totalCarritoElement.classList.add('carrito-acciones-total')
  totalCarritoElement.innerText = `Total: $${total}`

  if (total == 0) {
    vaciarCarritoMessage()
  }
  carritoAcciones.appendChild(totalCarritoElement)
}

const comprar = () => {

  const div = document.createElement('button')
  div.classList.add('carrito-acciones-comprar')
  div.innerText = 'COMPRAR'

  carritoAccionesBotones.appendChild(div)

  div.addEventListener('click', () => {
     Swal.fire('Tu compra fue realizada con éxito!')
     vaciarCarritoMessage()
  })
}

const eliminarIngrediente = (id) => {

  Toastify({
    text: "Eliminado",
    duration: 2500,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, 
    style: {
      background: "#e9e693",
      color: "#995226",
      borderRadius: "2rem"
    },
    onClick: function(){} 
  }).showToast();

  carrito = carrito.filter((carritoId) => {
    return carritoId.id != id
  })
  anadirCarrito()
  localStorage.setItem('ingredientesEnCarrito', JSON.stringify(carrito))
}

if(carrito && carrito.length) {
 anadirCarrito() 
} else {
  vaciarCarritoMessage()
}

comprar()

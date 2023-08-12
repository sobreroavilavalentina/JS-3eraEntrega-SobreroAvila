let carrito = JSON.parse(localStorage.getItem('ingredientesEnCarrito')) || []

carrito = JSON.parse(localStorage.getItem('ingredientesEnCarrito'))
const carritoIngredientes = document.querySelector('.carrito-ingredientes')
const carritoAccionesBotones = document.querySelector('.carrito-acciones-botones')
const carritoAcciones = document.querySelector('.carrito-acciones')
const carritoInstrucciones = document.querySelector('.instrucciones')


const vaciarCarritoMessage = () => {
  carritoIngredientes.innerHTML = `<div class="carrito-vacio">Arma tu hamburguesa agregando ingredientes!!</div>`
  carritoAccionesBotones.remove('carrito-acciones-botones')
  carritoInstrucciones.remove('instrucciones')  

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

const div = document.createElement('button')
div.classList.add('carrito-acciones-comprar')
div.innerText = 'COMPRAR'
carritoAccionesBotones.appendChild(div)


const comprar = () => {
  div.addEventListener('click', () => {

    const ifPanSelected = carrito.some(ingrediente => ingrediente.subtipo == 'pan')
    const ifVerdSelected = carrito.some(ingrediente => ingrediente.subtipo == 'verduras')
    const ifQuesoSelected = carrito.some(ingrediente => ingrediente.subtipo == 'queso')
    const ifAderSelected = carrito.some(ingrediente => ingrediente.subtipo == 'aderezos')
    const ifHamburSelected = carrito.some(ingrediente => ingrediente.subtipo == 'hamburguesas')
    const ifPapasSelected = carrito.some(ingrediente => ingrediente.subtipo == 'aderezosPapas')
    

    if (!ifPanSelected) {
      Swal.fire({
        icon: 'error',
        title: '¿Comerás tu hamburguesa sin pan?',
        text: 'Debes añadir un(1) tipo de pan para realizar la compra',
        footer: '<a href="./index.html">Añade un tipo de pan</a>'
      })
    } else if (!ifVerdSelected) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Debes añadir verduras a tu hamburguesa',
        footer: '<a href="./index.html">Añade verduras</a>'
      })
    } else if (!ifQuesoSelected) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Debes añadir un tipo de queso a tu hamburguesa',
        footer: '<a href="./index.html">Añade queso</a>'
      })
    } else if (!ifAderSelected) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Debes añadir un tipo de aderezo a tu hamburguesa',
        footer: '<a href="./index.html">Añade aderezos</a>'
      })
    } else if (!ifHamburSelected) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Debes añadir un tipo de hamburguesa',
        footer: '<a href="./index.html">Añade un tipo de hamburguesa</a>'
      })
    } else {

      if (!ifPapasSelected) {
        Swal.fire({
          title: 'No has añadido papas, ¿deseas confirmar tu compra de todos modos?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: '¿Confirmar compra?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Compra realizada con éxito!',
                  vaciarCarritoMessage()
                )
              }
            })
          }
        })  
      } else {
        Swal.fire({
          title: '¿Confirmar compra?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Compra realizada con éxito!',
              vaciarCarritoMessage()
            )
          }
        })
      }  
    }
  })
}

comprar()

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

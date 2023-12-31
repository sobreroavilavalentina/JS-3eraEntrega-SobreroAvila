let carrito = JSON.parse(localStorage.getItem('ingredientesEnCarrito')) || []

let ingredientes = []

fetch("./js/data.json")
  .then(response => response.json())
  .then(data => {
    ingredientes = data
    cargarIngredientes(ingredientes.filter(ingrediente => ingrediente.tipo === 'ingrediente'))
    cargarHamburguesas(ingredientes.filter(ingrediente => ingrediente.tipo === 'hamburguesa'))
    cargarPapas(ingredientes.filter(ingrediente => ingrediente.tipo == 'papasFritas'))
  })


const contenedorIngredientes = document.querySelector('.ingredientes')
const botonesCategorias = document.querySelectorAll('.boton-categoria')
const contenedorHamburguesas = document.querySelector('.hamburguesas')
const contenedorPapas = document.querySelector('.papasFritas')
const tituloPrincipal = document.querySelector('.titulo-ppal')
const nroCarrito = document.getElementById('cantidad-carrito')

const contadorCarrito = () => {
  nroCarrito.innerText = (carrito.length)
}


botonesCategorias.forEach(boton => {
  boton.addEventListener('click', (e) => {

    botonesCategorias.forEach(boton => boton.classList.remove('active'))

    e.currentTarget.classList.add('active')

    if (e.currentTarget.id != 'todos') {
      const ingredientesCategorias = ingredientes.filter(ingrediente => ingrediente.subtipo === e.currentTarget.id)
      cargarIngredientes(ingredientesCategorias)
      const ingredientesCategoriasTitulo = ingredientes.find(ingrediente => ingrediente.subtipo === e.currentTarget.id)
      tituloPrincipal.innerText = (ingredientesCategoriasTitulo.subtipo).toLocaleUpperCase()
    } else {
      tituloPrincipal.innerText = 'Todos los ingredientes'
      cargarIngredientes(ingredientes.filter(ingrediente => ingrediente.tipo === 'ingrediente'))
    }
  })
})


function cargarIngredientes(ingredientesSeleccionados) {

  contenedorIngredientes.innerHTML = ''

  // ingredientesSeleccionados = ingredientes.filter(ingrediente => ingrediente.tipo == 'ingrediente')
  
  ingredientesSeleccionados.forEach(ingrediente => {

    const div = document.createElement('div')
    div.classList.add('ingrediente')
    div.innerHTML = `
    <div>
      <img class="ingrediente-img" src="${ingrediente.imagen}" alt="${ingrediente.nombre}">
      <div class="ingrediente-descripcion">
        <h3 class="ingrediente-nombre">${ingrediente.nombre}</h3>
        <p class="ingrediente-precio">$ ${ingrediente.precio}</p>
        <div class="ingrediente-cantidad">
          <button class="boton-agregar" id="${ingrediente.id}">AÑADIR</button>
          <p class="nro-cantidad disabled" id="cantidad${ingrediente.id}">${ingrediente.cantidad}</p>
          </div>
      </div>
    </div>
    `
    contenedorIngredientes.appendChild(div)
  })
}

function cargarHamburguesas(hamburguesasSeleccionados) {

  hamburguesasSeleccionados.forEach(ingrediente => {

    const div = document.createElement('div')
    div.classList.add('hamburguesasDiv')
    div.innerHTML = `
     <li>${ingrediente.nombre}</li>
    `
    contenedorHamburguesas.appendChild(div)

    const buttonSeleccionar = document.createElement('div')
    buttonSeleccionar.classList.add('buttonSeleccionar')
    buttonSeleccionar.innerHTML = `<button class="boton-seleccion" id="${ingrediente.id}">ELEGIR</button>
    <p class="nro-cantidad disabled" id="cantidad${ingrediente.id}">${ingrediente.cantidad}</p>
    `

    div.append(buttonSeleccionar)
  })
  localStorage.setItem('ingredientesEnCarrito', JSON.stringify(carrito))

}

function cargarPapas(papasSeleccionados) {
  
  papasSeleccionados.forEach(papa => {

    const div = document.createElement('div')
    div.classList.add('hamburguesasDiv')
    div.innerHTML = `
        <li>${papa.nombre}</li>
    `
    contenedorPapas.appendChild(div)

    const buttonSeleccionar = document.createElement('div')
    buttonSeleccionar.classList.add('buttonSeleccionar')
    buttonSeleccionar.innerHTML = `<button class="boton-seleccion" id="${papa.id}">ELEGIR</button>
    <p class="nro-cantidad disabled" id="cantidad${papa.id}">${papa.cantidad}</p>
    `
    div.append(buttonSeleccionar)
  })
  localStorage.setItem('ingredientesEnCarrito', JSON.stringify(carrito));
}


const botonesAgregar = document.querySelectorAll('.main-division')

botonesAgregar.forEach(boton => {
  boton.addEventListener('click', (e) => {
    if (e.target.classList.contains('boton-agregar') || e.target.classList.contains('boton-seleccion')) {
      
      
      validarIngredienteEnCarrito(e.target.id)

      Toastify({
        text: "Ingrediente añadido",
        duration: 2500,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#e9e693",
          color: "#995226",
          borderRadius: "2rem"
        },
        onClick: function(){} // Callback after click
      }).showToast();
    }
  })
})



const validarIngredienteEnCarrito = (id) => {
  const isRepeated = carrito.some(ingrediente => ingrediente.id == id)
  const ingrediente = ingredientes.find(item => item.id == id)

  if (!isRepeated) {
    ingrediente.cantidad = 1
    carrito.push(ingrediente)
    const cantidadElement = document.getElementById(`cantidad${ingrediente.id}`)
    cantidadElement.classList.add('disabled')
  } else {
    const ingrediente = carrito.find(item => item.id == id)
    ingrediente.cantidad++
  }
  const cantidad = document.getElementById(`cantidad${ingrediente.id}`)
  cantidad.innerText = `${ingrediente.cantidad}`
  cantidad.classList.remove('disabled')
  contadorCarrito()

  localStorage.setItem('ingredientesEnCarrito', JSON.stringify(carrito))
}




// hacer que no se pueda comprar sin una minimo de 1 producto de pan
// ver de mantener las cantidades en el localStorage cuando vuelvo del cart.js
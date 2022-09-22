const productos = [
  {id:01, tipo:"Camiseta", nombre:"Camiseta Argentinos Juniors", precio: 5000, foto: "./images/camiseta-argentinos.jpg" },
  {id:02, tipo:"Camiseta", nombre:"Camiseta Atletico Tucuman", precio: 5500, foto: "./images/camiseta-atletico.jpg" },
  {id:03, tipo:"Camiseta", nombre:"Camiseta Banfield", precio: 5500, foto: "./images/camiseta-banfield.jpg" },
  {id:04, tipo:"Camiseta", nombre:"Camiseta Belgrano", precio: 6000, foto: "./images/camiseta-belgrano.jpg" },
  {id:05, tipo:"Camiseta", nombre:"Camiseta Boca Juniors", precio: 8500, foto: "./images/camiseta-boca.jpg" },
  {id:06, tipo:"Camiseta", nombre:"Camiseta Estudiantes", precio: 7000, foto: "./images/camiseta-estudiantes.jpg" },
  {id:07, tipo:"Camiseta", nombre:"Camiseta Gimnasia", precio: 7000, foto: "./images/camiseta-gimnasia.jpg"},
  {id:08, tipo:"Camiseta", nombre:"Camiseta Godoy Cruz", precio: 5000, foto: "./images/camiseta-godoy.jpg"},
  {id:09, tipo:"Camiseta", nombre:"Camiseta Huracan", precio: 4500, foto: "./images/camiseta-huracan.jpg"},
  {id:10, tipo:"Camiseta", nombre:"Camiseta Independiente", precio: 8000, foto: "./images/camiseta-independiente.jpg"},
  {id:11, tipo:"Camiseta", nombre:"Camiseta Lanus", precio: 7000, foto: "./images/camiseta-lanus.jpg"},
  {id:12, tipo:"Camiseta", nombre:"Camiseta Newells", precio: 6500, foto: "./images/camiseta-newells.jpg"},
  {id:13, tipo:"Camiseta", nombre:"Camiseta Racing", precio: 8000, foto: "./images/camiseta-racing.jpg"},
  {id:14, tipo:"Camiseta", nombre:"Camiseta River Plate", precio: 8500, foto: "./images/camiseta-river.jpg"},
  {id:15, tipo:"Camiseta", nombre:"Camiseta Rosario Central", precio: 6500, foto: "./images/camiseta-rosario.jpg"},
  {id:16, tipo:"Camiseta", nombre:"Camiseta San Lorenzo", precio: 7500, foto: "./images/camiseta-sanlorenzo.jpg"},
  {id:17, tipo:"Camiseta", nombre:"Camiseta Talleres", precio: 6000, foto: "./images/camiseta-talleres.jpg"},
  {id:18, tipo:"Camiseta", nombre:"Camiseta Velez Sarsfield", precio: 7500, foto: "./images/camiseta-velez.jpg"}
];

let carrito = cargarCarrito();

let sectionProductos = document.getElementById("section-productos");
let sectionCarrito = document.getElementById("section-carrito");

let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h2>Total: $</h2>";
sectionCarrito.appendChild(totalCompra);

let montoTotalCompra = document.createElement("h2");
montoTotalCompra.innerText = "0";
totalCompra.appendChild(montoTotalCompra);

let cantidadProductos = document.createElement("div");
cantidadProductos.innerHTML = "<h3>Cantidad de productos: </h3>";
sectionCarrito.appendChild(cantidadProductos);

let cantProductos = document.createElement("h3");
cantProductos.innerText = "0";
cantidadProductos.appendChild(cantProductos);

let botonFinalizar = document.createElement("button");
botonFinalizar.innerText = "Finalizar compra";
sectionCarrito.appendChild(botonFinalizar);
botonFinalizar.setAttribute("class", "boton");

botonFinalizar.onclick = () => {
  const precioFinal = montoTotalCompra.innerText;
  Swal.fire({
    title: '¿Seguro que queres finalizar tu compra?',
    text: `Total a abonar: $${precioFinal}`,
    showCancelButton: true,
    confirmButtonColor: '#008f39',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Compra confirmada',
        '¡Que lo disfrutes!',
        'success'
      )
      vaciarCarrito();
    }
  })
}

for (const producto of productos) {
  let container = document.createElement("div");
  container.setAttribute("class", "card-product");
  container.innerHTML = ` <div class="img-container">
                            <img src="${producto.foto}" alt="${producto.nombre}" class="img-product"/>
                            </div>
                            <div class="info-producto">
                            <p class="font">${producto.nombre}</p>
                            <strong class="font">$${producto.precio}</strong>
                            <button class="boton" id="btn${producto.id}"> Agregar al carrito </button>
                            </div>`;
  sectionProductos.appendChild(container);
  document.getElementById(`btn${producto.id}`).onclick = () => agregarAlCarrito(`${producto.id}`);
}

function agregarAlCarrito(id) {
  carrito.push(productos.find(p => p.id == id));
  localStorage.setItem("carrito", JSON.stringify(carrito));
  calcularTotalCarrito();
}

function calcularTotalCarrito() {
  let total = 0;
  for (const producto of carrito) {
    total += producto.precio;
  }
  montoTotalCompra.innerText = total;
  cantProductos.innerText = carrito.length;
}

function vaciarCarrito() {
  montoTotalCompra.innerText = "0";
  cantProductos.innerText = "0";
  localStorage.clear();
  carrito = [];
}

function cargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (carrito == null) {
    return [];
  } else {
    return carrito;
  }
}
//Definición de variables//
const baseProductos = [
    {
      nombre: "TV Samsung UHD",
      precio: 1800,
      imagen: "img/samsungtv.png"
    },
  
    {
      nombre: "TV LG UHD",
      precio: 1600,
      imagen: "img/lgtv.png"
    },
  
    {
      nombre: "TV Sony UHD",
      precio: 2500,
      imagen: "img/sonytv.png"
    },
  
    {
      nombre: "Roku TV",
      precio: 150,
      imagen: "img/roku.png"
    },
  
    {
      nombre: "Chromecast TV",
      precio: 200,
      imagen: "img/chromecast.jpg"
    },
  
    {
      nombre: "Fire TV",
      precio: 250,
      imagen: "img/firetv.png"
    },
  ];

class Carrito {
  constructor(object) {
    if (object) {
        Object.assign(this,object)
    } else {
      this.productos = [0, 0, 0, 0, 0, 0];
    }
  }

  cantidadProductos() {
    var cantidad = 0
    for (var i = 0; i < this.productos.length; i++) {
        cantidad = cantidad + this.productos[i] 
    }
    return cantidad ;
  }

  calcularTotalPagar() {
    var total = 0
    for (var i = 0; i < this.productos.length; i++) {
        total = total + this.productos[i] * baseProductos[i].precio
    }
    return total ;
  }

  estaVacio() {
    for (var i = 0; i < this.productos.length; i++) {
      if (this.productos[i] > 0) {
        return false;
      }
    }
    return true;
  }

  agregarProducto(codigo) {
    this.productos[codigo - 1] = this.productos[codigo - 1] + 1;
  }

  quitarProducto(codigo) {
    this.productos[codigo - 1] = this.productos[codigo - 1] - 1;
  }
}

if (localStorage.getItem("carrito") == null) {
  localStorage.setItem("carrito", JSON.stringify(new Carrito()));
} else {
}

actualizarCarritoDOM()

var costoTotal = 0;
var messageId = 0;

// Agregar producto al carrito

$('.add_cart_btn').click(function(){
  var codigoProducto = parseInt(this.getAttribute("data-id"));
  var carritoStorage = JSON.parse(localStorage.getItem("carrito"));
  var carritoTemporal = new Carrito(carritoStorage);
  carritoTemporal.agregarProducto(codigoProducto);
  localStorage.setItem("carrito", JSON.stringify(carritoTemporal))

  // Actualizar el carrito en el DOM

  actualizarCarritoDOM()
  messageId++;
  var messageIdTemporal = messageId;
  $('#messages-wraper').append(`<div class="message" id="message-${messageIdTemporal}"> <p class="mb-0">¡Se agregó el producto al carrito!</p></div>`)
  setTimeout(() => {
    $(`#message-${messageIdTemporal}`).remove()
  }, 2500);

})

  // Remover productos del carrito

$('body').on('click',".remove_cart_btn",function(){
  var codigoProducto = parseInt(this.getAttribute("data-id"));
  var carritoStorage = JSON.parse(localStorage.getItem("carrito"));
  var carritoTemporal = new Carrito(carritoStorage);
  carritoTemporal.quitarProducto(codigoProducto);
  localStorage.setItem("carrito", JSON.stringify(carritoTemporal))

  actualizarCarritoDOM()
})

function actualizarCarritoDOM() {
    var carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    var carrito = new Carrito(carritoStorage)
    if (carrito.estaVacio()){
      $('#carrito-resumen').html(`<p> Agrega un producto </p>`)
    } else {
        var htmlProductos = ``
        for (var i = 0;  i < carrito.productos.length; i++) {
            if (carrito.productos[i] > 0) {
                var html = `<div class="carrito-resumen-item d-flex align-items-center justify-content-between my-2">
                <img src="${baseProductos[i].imagen}" alt="">
                <div>
                    <div>${baseProductos[i].nombre}</div>
                    <div> Cantidad: <span> ${carrito.productos[i]} </span> </div>
                </div>
                <button class="btn btn-danger remove_cart_btn" data-id="${i+1}" type="button">-</button>
            </div>`
                htmlProductos = htmlProductos + html
            }

        }
        
        $('#carrito-resumen').html(htmlProductos)
    }

    $('#precioTotal').html('S/' + carrito.calcularTotalPagar())


    $('#cartq').html(carrito.cantidadProductos())

}

// Destruir el carrito después de pagar

$(".action-pay").click(function(){
  localStorage.removeItem("carrito")
  window.location.href = "gracias.html"
})

// Mostrar monto total en payment

var carritoStorage = JSON.parse(localStorage.getItem("carrito"));
var carritoTemporal = new Carrito(carritoStorage);
var totalPagar = carritoTemporal.calcularTotalPagar()
$("#pay,#totalPay").html(totalPagar)


// Productos a comprar

        var htmlProductos = ``
        for (var i = 0;  i < carritoTemporal.productos.length; i++) {
            if (carritoTemporal.productos[i] > 0) {
                var html = `<div class="productos_payment d-flex align-items-center mb-3">
                <img class="mx-3" src="${baseProductos[i].imagen}" alt="">
                <div> 
                    <p>${baseProductos[i].nombre}</p>
                    <p> Cantidad: ${carritoTemporal.productos[i]}</p>
               </div>
            </div>`
                htmlProductos = htmlProductos + html
            }

        }
        
        $('.resumen_productos').html(htmlProductos)

        // Evento icon carrito

        $(".action-toggle-cart").click(function(){
          $(".carritoInner").toggleClass("active")
        })
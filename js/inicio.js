import { comprarProducto } from "./carrito.js"

const divProductos = document.getElementById("productos");
const buscar = document.getElementById("buscador");
const traerProductos = async () => {
    try {
        const response = await fetch("./db/productos.json");
        const data = await response.json();
        localStorage.setItem("productos",JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }

}
traerProductos();
export let productosDisponibles = JSON.parse(localStorage.getItem("productos"));

document.addEventListener("DOMContentLoaded", () => {
    generarProductos(productosDisponibles)
})

export const generarProductos = (productos) => {
    divProductos.innerHTML = "";
  
    productos.forEach((producto) => {

    const { imagen, nombre, categoria, precio, id } = producto
     
      let card = document.createElement("div");
      card.className = "producto";
      card.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">$${precio}</p>
                <a id=btn${id} class="btn color-boton">agregar al carrito</a>
            </div>
        </div>`;
  
      divProductos.appendChild(card);

      const btnComprar = document.getElementById(`btn${id}`)
      btnComprar.addEventListener("click", () => comprarProducto(id))
  
  
    });
  };


buscar.addEventListener("keyup", (e) => {
    const productosEncontrados = productosDisponibles.filter((producto) => producto.nombre.toLowerCase().includes(e.target.value));
    productosDisponibles = productosEncontrados

  if(e.target.value !== ""){
    generarCardsProductos(productosEncontrados)
  }else{
    productosDisponibles = JSON.parse(localStorage.getItem("productos"))
    generarCardsProductos(productosDisponibles)
  }
  
})
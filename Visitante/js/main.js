const carritoContenedor = document.getElementById('carrito-contenedor');
carritoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-producto')) {
        const productoId = e.target.dataset.productoId;
        const producto = document.querySelector(`#producto-${productoId}`);
        producto.parentNode.removeChild(producto);
        actualizarTotal();
    }
});

function actualizarTotal() {
    const totalElement = document.getElementById('total');
    const productos = document.querySelectorAll('#carrito-contenedor .producto');
    const total = [...productos].reduce((acumulador, producto) => {
        const precioElemento = producto.querySelector('p');
        const precio = precioElemento ? Number(precioElemento.textContent.replace('$', '')) : 0;
        const cantidadElemento = producto.querySelector('p:nth-child(4)');
        const cantidad = cantidadElemento ? Number(cantidadElemento.textContent.replace('Cantidad: ', '')) : 0;
        console.log(`Precio: ${precio}, Cantidad: ${cantidad}`);
        return acumulador + precio * cantidad;
    }, 0);
    console.log(`Total: ${total}`);
    totalElement.textContent = "Total: $" + total.toFixed(2);
}




document.querySelectorAll('.agregar-carrito').forEach((boton) => {
    boton.addEventListener('click', (e) => {
        const producto = e.target.closest('.producto');
        const nombreProducto = producto.querySelector('h3').textContent;
        const precio = Number(producto.querySelector('p').textContent.replace('$', ''));
        const productoId = producto.dataset.productoId;
        const imagenProducto = producto.querySelector('img').src;
        const carrito = document.getElementById('carrito');
        const productoEnCarrito = document.querySelector(`#producto-${productoId}`);
        if (productoEnCarrito) {
            const cantidad = Number(productoEnCarrito.querySelector('p:nth-child(4)').textContent.replace(/[^0-9]/g, ""));
            productoEnCarrito.querySelector('p:nth-child(4)').textContent = `Cantidad: ${cantidad + 1}`;
        } else {
            const nuevoProducto = document.createElement('div');
            nuevoProducto.innerHTML = `
                <div class="producto" id="producto-${productoId}">
                    <img src="${imagenProducto}" alt="${nombreProducto}">
                    <h3>${nombreProducto}</h3>
                    <p>Precio: $${precio}</p>
                    <p>Cantidad: 1</p>
                    <button class="eliminar-producto" data-producto-id="${productoId}">Eliminar</button>
 </div>
            `;
            carrito.appendChild(nuevoProducto);
        }
        actualizarTotal();
    });
});

document.getElementById('eliminar-productos').addEventListener('click', () => {
    document.getElementById('carrito-contenedor').innerHTML = '';
    actualizarTotal();
});

carrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-producto')) {
        const productoId = e.target.dataset.productoId;
        const producto = document.querySelector(`#producto-${productoId}`);
        producto.parentNode.removeChild(producto);
        actualizarTotal();
    }
});

fetch('data.json')
    .then(response => response.json())
    .then(data => console.log(data));

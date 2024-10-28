let carrito = [];

// Agrega un producto al carrito
function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    actualizarCarrito();
}

// Actualiza el carrito en el DOM
function actualizarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    carritoLista.innerHTML = ""; // Limpia el contenido actual para evitar duplicados

    // Inicializa el total a 0
    let total = 0;

    // Crear un DocumentFragment para mejorar el rendimiento
    const fragment = document.createDocumentFragment();

    carrito.forEach(item => {
        const { producto, precio } = item;

        // Crea el elemento de lista
        const itemElement = document.createElement('li');

        // Crea el span para el nombre del producto
        const nombreSpan = document.createElement('span');
        nombreSpan.classList.add('nombre-producto');
        nombreSpan.innerText = producto;

        // Crea el span para el precio del producto
        const precioSpan = document.createElement('span');
        precioSpan.classList.add('precio-producto');
        precioSpan.innerText = `$${precio.toFixed(2)}`;

        // Botón para eliminar el producto
        const eliminarBtn = document.createElement('button');
        eliminarBtn.innerText = "Eliminar";
        eliminarBtn.onclick = () => eliminarItem(producto, precio); // Usa una función anónima para el evento

        // Añade los spans y el botón al elemento de lista
        itemElement.appendChild(nombreSpan);
        itemElement.appendChild(precioSpan);
        itemElement.appendChild(eliminarBtn);

        // Añade el elemento de lista al fragmento
        fragment.appendChild(itemElement);

        // Suma el precio al total
        total += precio;
    });

    // Añade todos los elementos al DOM de una sola vez
    carritoLista.appendChild(fragment);

    // Actualiza el total en el DOM
    document.getElementById('total').innerText = `$${total.toFixed(2)}`;
}

// Finaliza la compra
function finalizarCompra() {
    carrito = [];
    actualizarCarrito();
}

// Toggle del carrito
function toggleCarrito() {
    const carrito = document.getElementById('carrito');
    carrito.classList.toggle('show');
}

// Evitar que el carrito se cierre cuando se hace clic en "Cerrar"
document.getElementById('carrito-cerrar').addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el clic cierre el carrito completo
    document.getElementById('carrito').classList.remove('show');
});

// Función para eliminar un item del carrito
function eliminarItem(producto) {
    const index = carrito.findIndex(item => item.producto === producto);
    if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }
}

// Función para enviar el pedido por WhatsApp
function enviarPorWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Datos del pedido
    const carritoItems = document.querySelectorAll('#carrito-lista li');
    let mensaje = "Hola, quiero realizar el siguiente pedido:\n\n";

    carritoItems.forEach(item => {
        const nombreProducto = item.querySelector('.nombre-producto').innerText;
        const precioProducto = item.querySelector('.precio-producto').innerText;
        mensaje += `- ${nombreProducto}: ${precioProducto}\n`;
    });

    const total = document.getElementById('total').innerText;
    mensaje += `\nTotal: ${total}`;

    // Número de WhatsApp (código de país + número, sin espacios ni guiones)
    const numeroWhatsApp = "573186704679"; // Reemplaza con el número del negocio

    // Generar enlace de WhatsApp
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Abrir enlace en una nueva pestaña
    window.open(url, '_blank');
}

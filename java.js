document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    const clearCartButton = document.getElementById('clearCart');
    const checkoutButton = document.getElementById('checkout');
    const purchaseMessage = document.getElementById('purchaseMessage');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        cartTotalContainer.innerHTML = `Total: $${total.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(product) {
        cart.push(product);
        updateCart();
    }

    document.querySelectorAll('.carousel-item button').forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.parentElement;
            const product = {
                image: productElement.querySelector('img').src,
                name: productElement.querySelector('h3').innerText,
                price: parseFloat(productElement.querySelector('p').innerText.replace('$', ''))
            };
            addToCart(product);
        });
    });

    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });

    clearCartButton.addEventListener('click', function() {
        cart = [];
        updateCart();
    });

    checkoutButton.addEventListener('click', function() {
        if (cart.length > 0) {
            cart = [];
            updateCart();
            purchaseMessage.innerText = "¡Compra realizada con éxito!";
            purchaseMessage.style.display = 'block';
        } else {
            purchaseMessage.innerText = "El carrito está vacío. Añade productos antes de finalizar la compra.";
            purchaseMessage.style.display = 'block';
        }
    });

    updateCart();
});

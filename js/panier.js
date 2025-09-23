document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Add to cart
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.id;
            const product = produits.find(p => p.id === productId);
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    });

    // Load cart
    const cartItems = document.querySelector('#cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemTotal = parseInt(item.prix.replace(' FCFA', '').replace('.', '')) * item.quantity;
            total += itemTotal;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <img src="${item.images[0]}" alt="${item.nom}">
                        <div class="cart-item-details">
                            <h3>${item.nom}</h3>
                            <p>${item.prix}</p>
                        </div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
            `;
        });
        document.querySelector('#cart-total').textContent = `${total.toLocaleString()} FCFA`;

        // Quantity controls
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const cartItem = cart.find(item => item.id === id);
                if (btn.classList.contains('increase')) {
                    cartItem.quantity += 1;
                } else if (btn.classList.contains('decrease') && cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                } else if (btn.classList.contains('decrease')) {
                    cart = cart.filter(item => item.id !== id);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.reload();
            });
        });
    }

    // Checkout form
    const checkoutForm = document.querySelector('#checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.querySelector('#name').value;
            const phone = document.querySelector('#phone').value;
            const address = document.querySelector('#address').value;
            let message = `Bonjour Cardy Store! Je souhaite commander :\n\n🛒 MA COMMANDE :\n`;
            let total = 0;
            cart.forEach(item => {
                const itemTotal = parseInt(item.prix.replace(' FCFA', '').replace('.', '')) * item.quantity;
                total += itemTotal;
                message += `• ${item.nom} x${item.quantity} - ${item.prix}\n`;
            });
            message += `\n💰 TOTAL : ${total.toLocaleString()} FCFA\n`;
            message += `\n👤 Nom : ${name}\n📞 Tél : ${phone}\n📍 Adresse : ${address}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/2290166364730?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            localStorage.removeItem('cart');
            window.location.reload();
        });
    }

    // Contact form
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const messageText = document.querySelector('#message').value;
            const message = `Nouveau message de contact\n\n👤 Nom : ${name}\n📧 Email : ${email}\n💬 Message : ${messageText}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/2290166364730?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        });
    }

    function updateCartCount() {
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = cartCount;
        });
    }
});
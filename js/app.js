document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Search functionality
    const searchInput = document.querySelector('#search-input');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const name = product.querySelector('.product-price').textContent.toLowerCase();
            product.style.display = name.includes(query) ? 'block' : 'none';
        });
    });

    // Load featured products
    const featuredProducts = document.querySelector('#featured-products');
    if (featuredProducts) {
        produits.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <a href="produit.html?id=${product.id}">
                    <img src="${product.images[0]}" alt="${product.nom}">
                    <div class="product-price">${product.prix}</div>
                </a>
            `;
            featuredProducts.appendChild(card);
        });
    }

    // Load catalogue
    const catalogueProducts = document.querySelector('#catalogue-products');
    if (catalogueProducts) {
        produits.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <a href="produit.html?id=${product.id}">
                    <img src="${product.images[0]}" alt="${product.nom}">
                    <div class="product-price">${product.prix}</div>
                </a>
            `;
            catalogueProducts.appendChild(card);
        });
    }

    // Load product details
    const productDetail = document.querySelector('#product-detail');
    if (productDetail) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = produits.find(p => p.id === productId);
        if (product) {
            productDetail.innerHTML = `
                <div class="product-images">
                    <img src="${product.images[0]}" alt="${product.nom}" class="main-image">
                    <div class="thumbnail-container">
                        ${product.images.map(img => `
                            <img src="${img}" alt="${product.nom}" class="thumbnail">
                        `).join('')}
                    </div>
                </div>
                <div class="product-info">
                    <h2>${product.nom}</h2>
                    <div class="product-price-large">${product.prix}</div>
                    <p class="product-description">${product.description}</p>
                    <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
                </div>
            `;
            // Thumbnail functionality
            const thumbnails = document.querySelectorAll('.thumbnail');
            const mainImage = document.querySelector('.main-image');
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    mainImage.src = thumb.src;
                });
            });
            thumbnails[0].classList.add('active');
        }
    }
});
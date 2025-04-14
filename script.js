// Initialize cart globally
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function getCart() {
    return cart;
}

function setCart(newCart) {
    cart = newCart;
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    localStorage.setItem("cartTotal", cartTotal.toFixed(2));
    updateCartCount(); // Ensure count updates on save
}

function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0) || 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-product-id");
            const productName = button.getAttribute("data-name");
            const productPrice = parseFloat(button.getAttribute("data-price"));

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1,
                    image: `images/product${productId}.jpg`
                });
            }
            saveCart();
            alert(`${productName} added to cart!`);
        });
    });

    // Search functionality
    const searchButton = document.querySelector(".search-bar button");
    if (searchButton) {
        searchButton.addEventListener("click", function () {
            const searchInput = document.querySelector(".search-bar input").value;
            console.log(`Searching for: $${searchInput}`);
        });
    }

    // Menu toggle functionality
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const dropdowns = document.querySelectorAll(".dropdown");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        dropdowns.forEach(dropdown => {
            dropdown.addEventListener("click", function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.classList.toggle("active");
                }
            });
        });

        document.addEventListener("click", function (e) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove("active");
                dropdowns.forEach(dropdown => dropdown.classList.remove("active"));
            }
        });
    }

    // Initial cart count update
    updateCartCount();
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Toggle dropdowns on mobile
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.classList.toggle('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const img = card.querySelector('.product-image');

        card.addEventListener('click', function() {
            if (img.classList.contains('enlarged-img')) {
                // If the image is already enlarged, return it to its original size
                img.classList.remove('enlarged-img');
                img.style.transform = 'scale(1)';
                card.querySelector('.product-image-container').appendChild(img);
            } else {
                // Enlarge the image and move it to the body
                img.classList.add('enlarged-img');
                document.body.appendChild(img);
            }
        });
    });
});

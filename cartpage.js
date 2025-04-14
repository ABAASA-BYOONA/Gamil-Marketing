document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    // Ensure saveCart is available (copied from script.js for independence)
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
        localStorage.setItem("cartTotal", total.toFixed(2));
        updateCartCount();
    }

    if (cartItemsContainer && cartTotalElement) {
        function renderCart() {
            cartItemsContainer.innerHTML = "";
            let total = 0;

            cart.forEach((item, index) => {
                const itemPrice = Number(item.price); // Ensure price is numeric
                total += itemPrice * item.quantity;
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>UGX${itemPrice.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            console.log("Total calculated:", total); // Debug output
            if (cartTotalElement) {
                cartTotalElement.textContent = total.toFixed(2);
            } else {
                console.error("cart-total element not found");
            }
            localStorage.setItem("cartTotal", total.toFixed(2));
            updateCartCount();
        }

        // Event delegation for buttons
        cartItemsContainer.addEventListener("click", function (e) {
            const index = parseInt(e.target.getAttribute("data-index"));
            if (e.target.classList.contains("decrease")) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                saveCart();
                renderCart();
            } else if (e.target.classList.contains("increase")) {
                cart[index].quantity++;
                saveCart();
                renderCart();
            }
        });

        // Initial render
        renderCart();
    } else {
        console.error("Required elements (cart-items or cart-total) not found");
    }
});
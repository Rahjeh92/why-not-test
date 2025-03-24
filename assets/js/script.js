/**
 * Toggles the visibility of a menu with a smooth slide effect.
 * @param {string} id - The ID of the menu to toggle.
 */
function toggleMenu(id) {
    var menu = document.getElementById(id);

    if (!menu) {
        console.error("Menu not found: " + id);
        return;
    }

    if (menu.style.maxHeight) {
        menu.style.maxHeight = null; // Collapse this menu
    } else {
        menu.style.maxHeight = menu.scrollHeight + "px"; // Expand this menu
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let cart = []; // Stores cart items
    let totalPrice = 0; // Stores total price

    // Select all menu items and add click event to add to cart
    document.querySelectorAll(".menu-items tbody tr").forEach(row => {
        row.addEventListener("click", function () {
            let item = this.cells[0]?.textContent.trim(); // Get item name
            let priceText = this.cells[1]?.textContent.trim().replace("€", ""); // Get price
            let price = parseFloat(priceText); // Convert price to number

            if (!isNaN(price)) {
                addToCart(item, price);
            } else {
                console.error("Invalid price format:", priceText);
            }
        });
    });

    /**
     * Adds an item to the cart and updates the display.
     * @param {string} item - The name of the item.
     * @param {number} price - The price of the item.
     */
    function addToCart(item, price) {
        cart.push({ item, price });
        totalPrice += price;
        updateCartDisplay();
    }

    /**
     * Updates the cart display in the UI.
     */
    function updateCartDisplay() {
        let cartList = document.getElementById("cart-list");
        let totalDisplay = document.getElementById("total-price");

        cartList.innerHTML = ""; // Clear the cart list before re-adding items

        cart.forEach((order, index) => {
            let li = document.createElement("li");

            li.innerHTML = `
                <span class="item-name">${order.item}</span>
                <span class="item-price">${order.price.toFixed(2)} €</span>
                <button class="delete-item" data-index="${index}">X</button>
            `;

            cartList.appendChild(li);
        });

        totalDisplay.textContent = `Total: ${totalPrice.toFixed(2)} €`;
    }


    /**
     * Removes an item from the cart and updates the display.
     * @param {number} index - The index of the item to remove.
     */
    function removeFromCart(index) {
        if (index >= 0 && index < cart.length) {
            totalPrice -= cart[index].price; // Deduct price from total
            cart.splice(index, 1); // Remove item from array
            updateCartDisplay(); // Update UI
        }
    }

    // Event listener for delete buttons in the cart
    document.getElementById("cart-list").addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-item")) {
            let index = parseInt(event.target.getAttribute("data-index"));
            removeFromCart(index);
        }
    });

    /**
     * Sends the order via email.
     */
    function sendOrder() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let orderDetails = cart.map(order => `${order.item}: ${order.price.toFixed(2)} €`).join("\n");
        let subject = "New Order";
        let body = `Order Details:\n\n${orderDetails}\n\nTotal Price: ${totalPrice.toFixed(2)} €`;

        window.location.href = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    // Attach event listener to the send order button
    document.getElementById("send-order").addEventListener("click", sendOrder);
});

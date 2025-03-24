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
    let cart = []; // Store orders
    let totalPrice = 0; // Total price

    // Select all menu items and add click event
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

    function addToCart(item, price) {
        cart.push({ item, price });
        totalPrice += price;
        updateCartDisplay();
    }

    function updateCartDisplay() {
        let cartList = document.getElementById("cart-list");
        let totalDisplay = document.getElementById("total-price");

        cartList.innerHTML = ""; // Clear list and re-add items
        cart.forEach(order => {
            let li = document.createElement("li");
            li.textContent = `${order.item} - ${order.price} €`;
            cartList.appendChild(li);
        });

        totalDisplay.textContent = `Total: ${totalPrice.toFixed(2)} €`;
    }

    function sendOrder() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let orderDetails = cart.map(order => `${order.item}: ${order.price} €`).join("\n");
        let subject = "New Order";
        let body = `Order Details:\n\n${orderDetails}\n\nTotal Price: ${totalPrice.toFixed(2)} €`;

        window.location.href = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    // Attach event listener to the send order button
    document.getElementById("send-order").addEventListener("click", sendOrder);
});

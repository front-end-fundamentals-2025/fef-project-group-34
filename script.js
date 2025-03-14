let cart = JSON.parse(localStorage.getItem("cart")) || [];

// function to save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// function to add an item to the cart
function addToCart(button) {
    const productData = button.dataset;
    const quantityInput = document.getElementById("quantity");
    const quantity = parseInt(quantityInput?.value || 1);

    const item = {
        id: productData.id,
        name: productData.name,
        price: parseFloat(productData.price.replace(',', '')),
        image: productData.image,
        quantity: quantity
    };

    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex > -1) {
        // update quantity if item exists
        cart[existingItemIndex].quantity += quantity;
    } else {
        // add new item if it doesn't exist
        cart.push(item);
    }

    saveCart();
    
}

//  to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

//  to update item quantity
function updateQuantity(index, newQuantity) {
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        saveCart();
        displayCart();
    }
}

//  to display cart items
function displayCart() {
    const cartContainer = document.querySelector(".cart-items");
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your shopping bag is empty</p>';
        return;
    }

    let total = 0;
// help from our classmate samuel with some parts
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price} SEK</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
        `;
    });

    //  total
    cartContainer.innerHTML += `
        <div class="cart-total">
            <h3>Total: ${total} SEK</h3>
            <button class="checkout-button">Proceed to Checkout</button>
        </div>
    `;
}

// to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();

    const addButtons = document.querySelectorAll('.add-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', () => addToCart(button));
    });

    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
});
// hamburger menu code adapted from w3school 
function toggleMenu() {
    const navLinks = document.getElementById("myLinks");
    if (navLinks.style.display === "block") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "block";
    }
  }



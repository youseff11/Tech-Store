// Event listener for the dropdown toggle (Main Navigation Dropdown)
const dropdownToggle = document.querySelector('.nav-item.dropdown .nav-link');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownToggle.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default behavior (like navigation)
  dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
});

// Event listener for My Cart link (Dropdown)
document.getElementById('cart-link').addEventListener('click', function(e) {
    e.preventDefault();  // Prevent the default link behavior
    const cartDropdown = document.getElementById('cart-dropdown');

    // Toggle visibility of the cart dropdown
    if (cartDropdown.style.display === "none" || cartDropdown.style.display === "") {
        cartDropdown.style.display = "block";
        updateCartDropdown(); // Update the dropdown with the cart items
    } else {
        cartDropdown.style.display = "none"; // Hide the dropdown
    }
});

// Function to update the cart dropdown display
function updateCartDropdown() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.innerHTML = ''; // Clear the dropdown

    // Retrieve the cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0; // Variable to calculate the total price

    if (cartItems.length === 0) {
        cartDropdown.innerHTML = '<li>No items in the cart</li>';
    } else {
        // Add each item in cartItems array to the dropdown
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            const itemText = document.createElement('span');
            itemText.textContent = `${item.name} - ${item.price}$ x ${item.quantity}`;
            li.appendChild(itemText);

            // Create the "X" button to reduce quantity
            const reduceButton = document.createElement('button');
            reduceButton.textContent = "-";
            reduceButton.classList.add('reduce-btn');
            reduceButton.style.marginLeft = '10px'; // Optional styling
            reduceButton.addEventListener('click', function () {
                reduceItemQuantity(index); // Call the function to reduce quantity
            });

            li.appendChild(reduceButton); // Add the reduce button to the item
            cartDropdown.appendChild(li);

            totalPrice += item.price * item.quantity; // Calculate the total price
        });

        // Add the total price at the bottom of the dropdown
        const totalPriceElement = document.createElement('li');
        totalPriceElement.textContent = `Total: ${totalPrice}$`;
        cartDropdown.appendChild(totalPriceElement);
    }
}

// Function to reduce item quantity
function reduceItemQuantity(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems[index].quantity > 1) {
        // Reduce the quantity if it's greater than 1
        cartItems[index].quantity--;
    } else {
        // Remove the item if quantity reaches 0
        cartItems.splice(index, 1);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Update the dropdown and other cart displays
    updateCartDropdown();
    updateCart(); // Update the main cart display if necessary
}

// Event listener for the Add to Cart button
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const itemName = this.getAttribute('data-name');
        const itemPrice = parseFloat(this.getAttribute('data-price'));

        // Retrieve the cart from localStorage, or initialize as empty array
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the item is already in the cart
        const existingItem = cartItems.find(item => item.name === itemName);

        if (existingItem) {
            // If the item is already in the cart, increase its quantity
            existingItem.quantity++;
        } else {
            // Otherwise, add the item with quantity 1
            cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Update the cart display
        updateCart();
    });
});

// Update the main cart display (if necessary)
function updateCart() {
    // You can implement a function to update the cart icon or count here if needed.
    // For example, updating a cart count on a navigation bar.
}


// الوصول إلى الزر الذي يحتوي على ID "navbar-toggler" (زر التبديل)
const navbarToggler = document.querySelector('.navbar-toggler');

// الوصول إلى العنصر الذي يحتوي على ID "navbarSupportedContent" (القائمة المنسدلة)
const navbarCollapse = document.getElementById('navbarSupportedContent');

// إضافة حدث عند الضغط على زر التبديل
navbarToggler.addEventListener('click', function() {
    // التبديل بين إظهار وإخفاء القائمة في الشاشات الصغيرة
    if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');  // إخفاء القائمة
    } else {
        navbarCollapse.classList.add('show');  // إظهار القائمة
    }
});

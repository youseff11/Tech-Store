// Function to update the cart display
function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');

    // Clear the current cart display
    cartList.innerHTML = '';

    // Retrieve the cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    // Add each item in cartItems array to the UI
    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}$ x ${item.quantity}`; // Show quantity

        // Create a reduce quantity button
        const reduceButton = document.createElement('button');
        reduceButton.textContent = "-";
        reduceButton.classList.add('reduce-btn');
        reduceButton.addEventListener('click', function() {
            reduceItemQuantity(index); // Call function to reduce quantity
        });

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            deleteItem(index); // Call deleteItem to remove the item
        });

        // Append the buttons to the item
        li.appendChild(reduceButton);
        li.appendChild(deleteButton);
        cartList.appendChild(li);

        totalPrice += item.price * item.quantity; // Calculate total price based on quantity
    });

    // Update the total price
    totalPriceElement.textContent = totalPrice;
    // Update the cart count in the navbar
    cartCountElement.textContent = cartItems.length;
}

// Function to reduce item quantity
function reduceItemQuantity(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems[index].quantity > 1) {
        // Reduce the quantity if it's greater than 1
        cartItems[index].quantity--;
    } else {
        // Remove the item if quantity is 1
        cartItems.splice(index, 1);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Update the cart display
    updateCart();
}

// Function to delete an item from the cart
function deleteItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage
    updateCart(); // Refresh the cart display
}

// Event listener for Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const itemName = this.getAttribute('data-name');
        const itemPrice = parseFloat(this.getAttribute('data-price'));

        // Retrieve the cart from localStorage, or initialize as empty array
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the item already exists in the cart
        const existingItemIndex = cartItems.findIndex(item => item.name === itemName);
        if (existingItemIndex !== -1) {
            // If the item exists, increment the quantity
            cartItems[existingItemIndex].quantity++;
        } else {
            // Add the item with quantity 1 if it doesn't exist in the cart
            cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Update the cart display
        updateCart();
    });
});

// Event listener for My Cart link
document.getElementById('cart-link').addEventListener('click', function() {
    // Display the cart items in a modal or page
    updateCart(); // This function will show the cart content
});

// Event listener for Reset Cart button
document.getElementById('reset-cart').addEventListener('click', function() {
    // Clear the cart from localStorage
    localStorage.removeItem('cart');

    // Update the cart display after resetting
    updateCart();
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
// -----------------------------------------------------------------------------
// Event listener for Reset Cart button (in dropdown)
document.getElementById('reset-cart').addEventListener('click', function() {
    // Clear the cart from localStorage
    localStorage.removeItem('cart');
    
    // Update the cart display after resetting
    updateCart();
});


document.getElementById("search-input").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    let resultsFound = false;
    
    cards.forEach(function(card) {
      const title = card.querySelector(".card-back h4").textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "block";
        resultsFound = true;
      } else {
        card.style.display = "none";
      }
    });
    
    if (!resultsFound && query.length > 0) {
      // يمكنك إضافة رسالة تفيد بعدم العثور على نتائج
      alert("No products found");
    }
  });
  
  
// Event listener for the Show Bill button
document.getElementById('show-bill').addEventListener('click', function() {
    // Retrieve the cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    // Create the bill content string
    let billContent = 'Your Bill Details:\n\n';
    cartItems.forEach(item => {
        billContent += `${item.name} - ${item.price}$ x ${item.quantity}\n`;
        totalPrice += item.price * item.quantity;
    });

    billContent += `\nTotal: ${totalPrice}$`;

    // Show the bill content in an alert box
    alert(billContent);
});

// احصل على الرابط الذي يحتوي على الـ dropdown
const dropdownToggle = document.querySelector('.nav-item.dropdown .nav-link');

// احصل على القائمة المنسدلة نفسها
const dropdownMenu = document.querySelector('.dropdown-menu');

// إضافة حدث عند النقر على الرابط لفتح أو إغلاق القائمة المنسدلة
dropdownToggle.addEventListener('click', function (event) {
  // منع الـ default behavior (مثل التنقل)
  event.preventDefault();

  // التبديل بين إظهار وإخفاء القائمة
  dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
});

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


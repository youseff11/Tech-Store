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
        li.textContent = `${item.name} - ${item.price}$`;

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            deleteItem(index); // Call deleteItem to remove the item
        });

        // Append the delete button next to the product
        li.appendChild(deleteButton);
        cartList.appendChild(li);

        totalPrice += item.price;
    });

    // Update the total price
    totalPriceElement.textContent = totalPrice;
    // Update the cart count in the navbar
    cartCountElement.textContent = cartItems.length;
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

        // Add the item to cartItems array
        cartItems.push({ name: itemName, price: itemPrice });

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

// Event listener for the Show Bill button
document.getElementById('show-bill').addEventListener('click', function() {
    // Retrieve the cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    // Create the bill content string
    let billContent = 'Your Bill Details:\n\n';
    cartItems.forEach(item => {
        billContent += `${item.name} - ${item.price}$\n`;
        totalPrice += item.price;
    });

    billContent += `\nTotal: ${totalPrice}$`;

    // Show the bill content in an alert box
    alert(billContent);
});
// Event listener for Reset Cart button
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
  
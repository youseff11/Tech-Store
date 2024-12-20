const cards = document.querySelectorAll('.card'); // Select all product cards
const cartItems = document.getElementById('cart-items'); // Get the cart items container
const totalPriceElement = document.getElementById('total-price'); // Get the total price element
const showBillBtn = document.querySelector('.creative-btn'); // Get the "Show Bill" button
let totalPrice = 0; // Initialize total price

// Iterate through each card to add click event listeners
cards.forEach(card => {
    card.addEventListener('click', () => {
        // Get the product name and price from the card's back content
        const mealName = card.querySelector('.card-back h4').innerText;
        const price = parseFloat(card.querySelector('.card-back p:last-of-type').innerText.replace('$', ''));

        // Create a new cart item
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${mealName} - ${price}$
            <button class="delete-btn">Delete</button>
        `;

        // Append the cart item to the cart
        cartItems.appendChild(listItem);

        // Update the total price
        totalPrice += price;
        totalPriceElement.innerText = totalPrice.toFixed(2);

        // Add functionality to the delete button
        const deleteBtn = listItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            // Remove the item from the cart
            cartItems.removeChild(listItem);

            // Subtract the price from the total
            totalPrice -= price;
            totalPriceElement.innerText = totalPrice.toFixed(2);
        });
    });
});

// Add functionality to the "Show Bill" button
showBillBtn.addEventListener('click', () => {
    let billDetails = "Your Bill:\n";

    // Loop through all cart items to gather details
    const items = cartItems.querySelectorAll('li');
    items.forEach(item => {
        billDetails += item.textContent.replace('Delete', '').trim() + '\n';
    });

    // Add the total to the bill details
    billDetails += `\nTotal: ${totalPrice.toFixed(2)}$`;

    // Display the bill in an alert
    alert(billDetails);
});

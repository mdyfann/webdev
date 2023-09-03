const cartItemsContainer = document.getElementById("cart-items");
const productsContainer = document.getElementById("products-container");
const cart = [];

// Fetch JSON data
fetch("products.json")
    .then(response => response.json())
    .then(products => {
        let row = document.createElement("div");
        row.classList.add("row");
        
        products.forEach((product, index) => {
            if (index % 3 === 0 && index !== 0) {
                cartItemsContainer.appendChild(row);
                row = document.createElement("div");
                row.classList.add("row");
            }

            const productCard = createProductCard(product);
            row.appendChild(productCard);
        });

        // Add the last row if not already added
        if (row.childNodes.length > 0) {
            cartItemsContainer.appendChild(row);
        }

        // Create Add button for each product
        const addButton = document.createElement("button");
        addButton.textContent = "Add Product";
        addButton.classList.add("add-button");
        addButton.addEventListener("click", () => {
            addProductToCart(product, quantityInput.value);
            displaySelectedProducts();
        });

    })
    .catch(error => console.error("Error fetching JSON:", error));

// Function to create a product card
function createProductCard(product) {
    const item = document.createElement("div");
    item.classList.add("item");

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const details = document.createElement("div");
    details.classList.add("item-details");

    const productName = document.createElement("h3");
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = `${product.price}`;

    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity");

    const minusButton = document.createElement("button");
    minusButton.textContent = "-";
    minusButton.classList.add("quantity-button", "minus");

    const quantityInput = document.createElement("input");
    quantityInput.type = "text";
    quantityInput.value = "0";
    quantityInput.classList.add("quantity-value");

    const plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.classList.add("quantity-button", "plus");

    const addButton = document.createElement("button");
    addButton.textContent = "Add Product";
    addButton.classList.add("add-button");
    addButton.addEventListener("click", () => addProductToCart(product, quantityInput.value));  

    // Add event listeners to quantity buttons
    minusButton.addEventListener("click", () => decreaseQuantity(quantityInput));
    plusButton.addEventListener("click", () => increaseQuantity(quantityInput));

    // Append elements to their containers
    quantityContainer.appendChild(minusButton);
    quantityContainer.appendChild(quantityInput);
    quantityContainer.appendChild(plusButton);

    details.appendChild(productName);
    details.appendChild(productPrice);
    details.appendChild(quantityContainer);
    details.appendChild(addButton);

    item.appendChild(img);
    item.appendChild(details);

    return item;
}

// Function to decrease quantity
function decreaseQuantity(input) {
    let quantity = parseInt(input.value);
    if (quantity > 0) {
        quantity--;
        input.value = quantity;
    }
}

// Function to increase quantity
function increaseQuantity(input) {
    let quantity = parseInt(input.value);
    quantity++;
    input.value = quantity;
}


// Function to add product to cart
function addProductToCart(product, quantity) {
    const parsedQuantity = parseInt(quantity);

    if (parsedQuantity > 0) {
        const existingCartItem = cart.find(item => item.product.name === product.name);

        if (existingCartItem) {
            existingCartItem.quantity += parsedQuantity;
        } else {
            cart.push({ product, quantity: parsedQuantity });
        }

        // Log the updated cart
        console.log("Updated Cart:", cart);

        displaySelectedProducts(); // Update selected products display
    } else {
        console.log("Invalid quantity. Please enter a valid quantity.");
    }
}

// Function to display selected products
function displaySelectedProducts() {
    const selectedProductsContainer = document.getElementById("selected-products-container");
    selectedProductsContainer.innerHTML = ""; // Clear existing content

    let totalAmount = 0; // Initialize total amount

    cart.forEach(cartItem => {
        const selectedProductItem = document.createElement("div");
        selectedProductItem.classList.add("selected-item");

        const selectedProductImage = document.createElement("img");
        selectedProductImage.src = cartItem.product.image;
        selectedProductImage.alt = cartItem.product.name;
        selectedProductImage.classList.add("selected-product-image");

        const selectedProductDetails = document.createElement("div");
        selectedProductDetails.classList.add("selected-item-details");

        const selectedProductName = document.createElement("h3");
        selectedProductName.textContent = cartItem.product.name;

        const productPriceNumber = parseFloat(cartItem.product.price.replace("Rp.", "").replace(".", "").replace(",", ""));
        const subtotal = productPriceNumber * cartItem.quantity;

        const selectedProductPrice = document.createElement("p");
        selectedProductPrice.textContent = `${cartItem.product.price} X ${cartItem.quantity} `;

        const selectedProductSubtotal = document.createElement("p");
        selectedProductSubtotal.textContent = `Amount: Rp.${subtotal.toLocaleString()}`;

        totalAmount += subtotal;

        selectedProductDetails.appendChild(selectedProductName);
        selectedProductDetails.appendChild(selectedProductPrice);
        selectedProductDetails.appendChild(selectedProductSubtotal);

        selectedProductItem.appendChild(selectedProductImage);
        selectedProductItem.appendChild(selectedProductDetails);

        selectedProductsContainer.appendChild(selectedProductItem);
    });

    // Calculate tax amount (11% of the subtotal)
    const taxAmount = totalAmount * 0.11;

    // Calculate total amount (subtotal + tax)
    const totalAmountWithTax = totalAmount + taxAmount;

    // Update the total amount and tax in the HTML
    const subtotalElement = document.getElementById("subtotal");
    subtotalElement.textContent = `Subtotal : Rp.${totalAmount.toLocaleString()}`;

    const taxAmountElement = document.getElementById("tax-amount");
    taxAmountElement.textContent = `Tax (11%) : Rp.${taxAmount.toLocaleString()}`;

    const totalElement = document.getElementById("total");
    totalElement.textContent = `Total : Rp.${totalAmountWithTax.toLocaleString()}`;
}
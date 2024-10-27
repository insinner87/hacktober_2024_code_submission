document.getElementById('add-product-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productId = document.getElementById('product-id').value.trim();
    const productName = document.getElementById('product-name').value.trim();
    const price = parseFloat(document.getElementById('price').value.trim());
    const quantity = parseInt(document.getElementById('quantity').value.trim(), 10);
    const file = document.getElementById('image')?.files[0];
    const preview = document.getElementById('preview');
    
    if (!file) {
        alert('Please upload an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const newProduct = { id: productId, name: productName, price: price, image: e.target.result, quantity: quantity };
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(newProduct); // Add new product
        localStorage.setItem('products', JSON.stringify(products));
        alert('Product added successfully!');
        document.getElementById('add-product-form')?.reset(); // Reset the form
        preview.style.display = 'none'; // Hide the image preview
    }
    reader.readAsDataURL(file); // Convert the file to a base64 string
});

// Function to delete a product by its unique ID
document.getElementById('delete-product-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const deleteId = document.getElementById('delete-id').value.trim();
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const productExists = products.some(product => product.id === deleteId);

    if (productExists) {
        products = products.filter(product => product.id !== deleteId); // Remove the product by ID
        localStorage.setItem('products', JSON.stringify(products));
        alert(`Product with ID: ${deleteId} deleted successfully!`);
        document.getElementById('delete-product-form').reset(); // Reset the form
    } else {
        alert('Product not found!');
    }
});

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous entries

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <p>Quantity(per kg): ${product.quantity}</p>
            <button onclick="buyProduct('${product.id}')">Buy</button>
        `;
        productList.appendChild(productDiv);
    });
}

function buyProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
        if (product.quantity > 0) {
            product.quantity--;
            localStorage.setItem('products', JSON.stringify(products));
            displayProducts(); // Refresh the product list
            alert(`Purchased 1 ${product.name}. Remaining quantity: ${product.quantity}`);
        } else {
            alert('Out of stock!');
        }
    }
}

// Display products on page load
window.onload = displayProducts;

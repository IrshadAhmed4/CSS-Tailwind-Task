const products = [
      { id: 1, name: "iPhone 15", 
        price: 699.99, 
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop" },
      { id: 2, 
        name: "Samsung Galaxy Tab S9", 
        price: 599.99, 
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop" },
      { id: 3, 
        name: "Apple iMac 24", 
        price: 1299.99, 
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop" },
      { id: 4, 
        name: "Gaming Mouse", 
        price: 49.99, 
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop" },
      { id: 5, 
        name: "Boat Wireless Headphones", 
        price: 59.99, 
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" },
      { id: 6, 
        name: "JBL Bluetooth Speaker", 
        price: 49.99, 
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop" }
    ];

    let cart = [];

    function renderProducts() {
      const productList = document.getElementById("product-list");
      let allCardsHTML = "";

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        allCardsHTML += `
          <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded mb-4">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">${product.name}</h3>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-800">$${product.price.toFixed(2)}</span>
              <button onclick="addToCart(${product.id})"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          </div>
        `;
      }
      productList.innerHTML = allCardsHTML;
    }

    function addToCart(productId) {
      let productToAdd = null;
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
          productToAdd = products[i];
          break;
        }
      }

      let existingItem = null;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
          existingItem = cart[i];
          break;
        }
      }

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          quantity: 1
        });
      }

      updateCartUI();
    }

    function decreaseQuantity(productId) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === productId) {
                if (cart[i].quantity > 1) {
                    cart[i].quantity--;
                } else {
                    cart.splice(i, 1);
                }
                break; 
            }
        }
        updateCartUI();
    }

    function removeFromCart(productId) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
          cart.splice(i, 1); 
          break;
        }
      }
      updateCartUI();
    }

    function updateCartUI() {
      const cartItemsContainer = document.getElementById("cart-items");
      const cartCount = document.getElementById("cart-count");
      const cartTotal = document.getElementById("cart-total");

      let totalItems = 0;
      let totalPrice = 0;
      
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
      } else {
        let allCartItemsHTML = "";
        for (let i = 0; i < cart.length; i++) {
          const item = cart[i];
          allCartItemsHTML += `
            <div class="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 mb-4 gap-4">
              <div>
                <h3 class="font-semibold text-lg">${item.name}</h3>
                <p class="text-gray-600">Quantity: ${item.quantity}</p>
                <p class="font-medium text-gray-800">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="addToCart(${item.id})" class="bg-green-500 text-white w-8 h-8 rounded hover:bg-green-600 font-bold">+</button>
                <button onclick="decreaseQuantity(${item.id})" class="bg-yellow-500 text-white w-8 h-8 rounded hover:bg-yellow-600 font-bold">-</button>
                <button onclick="removeFromCart(${item.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
              </div>
            </div>
          `;
          
          totalItems += item.quantity;
          totalPrice += item.price * item.quantity;
        }
        cartItemsContainer.innerHTML = allCartItemsHTML;
      }

      cartCount.textContent = totalItems;
      cartTotal.textContent = totalPrice.toFixed(2);
    }
    
    renderProducts();
    updateCartUI();
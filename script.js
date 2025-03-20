const cart = JSON.parse(localStorage.getItem('cart')) || {};
const addToCartBtns = document.querySelectorAll('#add-to-cart-btn')
const addToCartMsg = document.querySelector("#add-to-cart-msg");
const products = document.querySelectorAll("#products .item");
const modal = document.getElementById("modal");

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  let cartCount;
  if (cart) {
    cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)
  } else {
    cartCount = 0
  }
  document.querySelector("#total-cart-count").innerHTML = `(${cartCount})`;

}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

function decrementCartQuantity(e) {
  e.stopPropagation();
  console.log('decrementing quantity');
  // debugger
    const itemCount = e.target.nextElementSibling;
  
    console.log(e.target.closest('#item-quantity'));
  
    // debugger
    const item = e.target.closest('.item');
    const itemAddToCartBtn = item.querySelector('.product-image #add-to-cart-btn');
  
    const itemName = item.querySelector('.item-description #product-name').textContent.trim()
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    // debugger
    if (!cart[itemName]) {
        return
    }
    
    cart[itemName].quantity = Math.max(0, Number(cart[itemName].quantity) - 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartCount();
    // debugger;
    if (cart[itemName].quantity <= 0) {
      delete cart[itemName];
      localStorage.setItem("cart", JSON.stringify(cart));
      itemAddToCartBtn.innerHTML = `
        <img id="product-image" src="./product-list-with-cart-main/assets/images/icon-add-to-cart.svg" alt="" srcset="" class="m-1">
        <div id="add-to-cart-msg" class="m-1 bg-white">Add To Cart</div>
      `;
      itemAddToCartBtn.style.backgroundColor = 'white'
      // itemAddToCartBtn.removeEventListener("click", addToCartHandler);
      // itemAddToCartBtn.addEventListener("click", addToCartHandler);
      updateCartCount();
  updateYourCart();

      return;
    }
  itemCount.innerHTML = cart[itemName].quantity
  updateYourCart();
    return;
    
    // localStorage.setItem(itemName, Number(curCount)-1)
}

function incrementCartQuantity(e) {
  e.stopPropagation();
  // debugger;
    console.log("incrementing quantity");
    const itemCount = e.target.previousElementSibling
    // debugger
    const item = e.target.closest(".item");
    const itemName = item
      .querySelector(".item-description #product-name")
      .textContent.trim();
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (!cart[itemName]) {
      return;
    }
    console.log(cart[itemName]);
    cart[itemName].quantity = Math.max(0, Number(cart[itemName].quantity) + 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart[itemName]);

  itemCount.innerHTML = `${Number(cart[itemName].quantity)}`;
  updateYourCart();
    updateCartCount();
    
}

function addToCartHandler(e) {
  debugger;
    e.stopPropagation();
    const button = e.currentTarget;
    const productCard = e.target.closest(".item");
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const productCategory = productCard
      .querySelector("#product-category")
      .textContent.trim();
    const productName = productCard
      .querySelector("#product-name")
      .textContent.trim();
    const productPrice = productCard
      .querySelector("#product-price")
      .textContent.trim();
    const productImage = productCard.querySelector('#product-thumbnail').src
    const addToCartBtn = e.target.parentElement.parentElement;

    console.log(productName, " is the clicked product");

    if (cart[productName]) {
      cart[productName].quantity += 1;
    } else {
      cart[productName] = {
        price: productPrice,
        quantity: 1,
        thumbnail: productImage.replace('desktop', 'thumbnail'),
      };
    }

    addToCartBtn.querySelector("#add-to-cart-btn").style.backgroundColor =
      "#B84623";
    addToCartBtn.querySelector("#add-to-cart-btn").innerHTML = `
      <img
          class="decrement-btn m-1 p-2"
          src="./product-list-with-cart-main/assets/images/icon-decrement-quantity.svg"
          alt=""
      />
      <span id="item-quantity" class="item-quantity m-1 text-white">${cart[productName].quantity}</span>
      <img
          class="increment-btn m-1 p-2"
          src="./product-list-with-cart-main/assets/images/icon-increment-quantity.svg"
          alt=""
      />
    `;
    // Remove the "Add to Cart" event listener to prevent re-adding handlers
    button.removeEventListener("click", addToCartHandler);

    // Add event listeners for increment and decrement buttons
    // addToCartBtn
    //   .querySelector(".decrement-btn")
    //   .addEventListener("click", function (e) {
    //     decrementCartQuantity(e);
    //   });

    // addToCartBtn
    //   .querySelector(".increment-btn")
    //   .addEventListener("click", function (e) {
    //     incrementCartQuantity(e);
    //   });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateYourCart();
}

function updateYourCart() {
  // debugger;
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const cartDisplay = document.querySelector(".add-to-cart-items");
  console.log(cart);
  let items = []

  if (Object.keys(cart).length >= 1) {
    cartDisplay.innerHTML = "";
    let grandTotal = 0
    for (let productName in cart) {
      const product = cart[productName];
      const productQuantity = product.quantity
      const productPrice = product.price.replace(/[^0-9.]/g, "");
      const totalPrice = Number(productPrice) * Number(productQuantity);
      const cartItem = document.createElement('div')
      grandTotal += totalPrice;
      cartItem.classList.add('cart-item');

      cartItem.innerHTML = `
        <div class="ml-5 p-2 flex flex-row justify-between">
          <div class="cart-item-details m-2">
            <p class="font-semibold">${productName}</p>
            <span class="text-red-600">${productQuantity}x</span>
            <span class="ml-3 font-extralight">@$${productPrice}</span>
            <span class="ml-5 font-semibold">$${totalPrice.toFixed(2)}</span>
          </div>
          <div class="delete-cart-item mr-5">
            <img src="./product-list-with-cart-main/assets/images/icon-remove-item.svg" alt="" srcset="" />
          </div>
        </div>
        <hr class="border-t ml-5 mr-5 border-gray-400 my-5">
      `;
      cartDisplay.appendChild(cartItem);
    }
    const totalContainer = document.createElement('div');
    totalContainer.classList.add(
      "cart-total",
      "font-bold",
      "mt-3",
      "text-right"
    );
    totalContainer.innerHTML = `
    <div class="flex flex-row justify-between">
      <div class="ml-5 p-2 font-normal">Order Total</div>
      <div class="text-2xl">$${grandTotal.toFixed(2)}</div>
    </div>
    <div class="carbon-impact flex flex-row justify-center border mt-5 ml-5 p-2 rounded-lg bg-slate-100">
      <img class="" src="./product-list-with-cart-main/assets/images/icon-carbon-neutral.svg" alt="" srcset="">
      <div class="font-normal text-sm ml-3">This is a <strong>Carbon-Neutral</strong> Delivery</div>
    </div>
    <div class="flex flex-row justify-center mt-5 ml-5">
      <button id="openModal" class="p-2 w-full bg-red-600 text-white rounded-2xl">Confirm Order</button>
    </div>
      `;
    cartDisplay.appendChild(totalContainer)
  } else {
    cartDisplay.innerHTML = `
      <img class="mt-10 ml-20" src="./product-list-with-cart-main/assets/images/illustration-empty-cart.svg" alt="" srcset="">
      <div class="add-to-cart-base-text ml-10 text-[#80625B]">Your selected items will appear here</div>
    `;
  }
}

addToCartBtns.forEach((button) => {
  // Attach the event listener to each button
  // button.addEventListener("click", addToCartHandler);
});


// event delegation

document.addEventListener("click", function (e) {
  const addToCartButton = e.target.closest("#add-to-cart-btn");

  // If user clicks "Add to Cart" (but NOT inside decrement/increment buttons)
  if (
    addToCartButton &&
    !e.target.closest(".decrement-btn") &&
    !e.target.closest(".increment-btn")
  ) {
    // debugger;
    addToCartHandler(e);
    return; // Prevent further execution
  }

  // If user clicks decrement (-)
  if (e.target.closest(".decrement-btn")) {
    // debugger
    decrementCartQuantity(e);
    return;
  }

  // If user clicks increment (+)
  if (e.target.closest(".increment-btn")) {
    // debugger
    incrementCartQuantity(e);
    return;
  }

  // Check if the clicked element is the "Open Modal" button
  if (e.target && e.target.id === "openModal") {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
  }

  // Check if the clicked element is the "Close Modal" button
  if (e.target && e.target.id === "closeModal") {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
  }
});


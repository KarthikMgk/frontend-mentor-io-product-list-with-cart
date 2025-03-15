const cart = JSON.parse(localStorage.getItem('cart')) || {};
const curCartCount = localStorage.getItem("cartCount");
const addToCartBtns = document.querySelectorAll('#add-to-cart-btn')
const addToCartMsg = document.querySelector("#add-to-cart-msg");
const products = document.querySelectorAll("#products .item");
const cartCountTag = document.querySelector('#cart-count')


document.addEventListener("DOMContentLoaded", () => {
    const cartCount = localStorage.getItem("cartCount") || 0;
    updateCartCount(cartCount);
});



function updateCartCount(currentQuantity) {
    
    localStorage.setItem("cartCount", Number(currentQuantity));
    let cartCount = localStorage.getItem('cartCount')
    cartCountTag.innerHTML = `(${cartCount})`;
}

function decrementCartQuantity(e) {
    console.log('decrementing quantity');
    const itemCount = e.target.nextElementSibling;
  
    console.log(e.target.closest('#item-quantity'));
  
    // debugger
    const item = e.target.closest('.item');
    const itemName = item.querySelector('.item-description #product-name').textContent.trim()
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    let cartQuantity = localStorage.getItem('cartCount', 0)
    if (!cart[itemName]) {
        return
    }
    console.log(cart[itemName]);
    cart[itemName].quantity = Math.max(0, Number(cart[itemName].quantity) - 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log(cart[itemName]);
   
    localStorage.setItem("cartCount", Math.max(0, Number(cartQuantity)-1))
    itemCount.innerHTML = `${Number(cart[itemName].quantity)}`;

    
    // localStorage.setItem(itemName, Number(curCount)-1)
}

function incrementCartQuantity(e) {
  
    console.log("incrementing quantity");
    const itemCount = e.target.previousElementSibling
    // debugger
    const item = e.target.closest(".item");
    const itemName = item
      .querySelector(".item-description #product-name")
      .textContent.trim();
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    let cartQuantity = localStorage.getItem("cartCount", 0);
    if (!cart[itemName]) {
      return;
    }
    console.log(cart[itemName]);
    cart[itemName].quantity = Math.max(0, Number(cart[itemName].quantity) + 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart[itemName]);

    localStorage.setItem("cartCount", Math.max(0, Number(cartQuantity) + 1));
    itemCount.innerHTML = `${Number(cart[itemName].quantity)}`;
    
}


addToCartBtns.forEach((button) => {
  
  function addToCartHandler(e) {
    const productCard = e.target.closest(".item");
    const productCategory = productCard
      .querySelector("#product-category")
      .textContent.trim();
    const productName = productCard
      .querySelector("#product-name")
      .textContent.trim();
    const productPrice = productCard
      .querySelector("#product-price")
      .textContent.trim();
    const addToCartBtn = e.target.parentElement.parentElement;

    console.log(productName, " is the clicked product");

    if (cart[productName]) {
      cart[productName].quantity += 1;
    } else {
      cart[productName] = {
        price: productPrice,
        quantity: 1,
      };
    }

    addToCartBtn.querySelector("#add-to-cart-btn").style.backgroundColor =
      "#B84623";
    addToCartBtn.querySelector("#add-to-cart-btn").innerHTML = `
      <img
          id="add-cart-decrement-btn"
          src="./product-list-with-cart-main/assets/images/icon-decrement-quantity.svg"
          alt=""
          class="m-1 p-2"
      />
      <span id="item-quantity" class="item-quantity m-1 text-white">${cart[productName].quantity}</span>
      <img
          id="add-cart-increment-btn"
          src="./product-list-with-cart-main/assets/images/icon-increment-quantity.svg"
          alt=""
          class="m-1 p-2"
      />
    `;

    // Remove the "Add to Cart" event listener to prevent re-adding handlers
    button.removeEventListener("click", addToCartHandler);

    // Add event listeners for increment and decrement buttons
    document
      .getElementById("add-cart-decrement-btn")
      .addEventListener("click", function (e) {
        decrementCartQuantity(e);
      });

    document
      .getElementById("add-cart-increment-btn")
      .addEventListener("click", function (e) {
        incrementCartQuantity(e);
      });

    localStorage.setItem("cart", JSON.stringify(cart));
    currentQuantity = Number(localStorage.getItem("cartCount"));
    updateCartCount(currentQuantity + 1);
  }

  // Attach the event listener to each button
  button.addEventListener("click", addToCartHandler);
});

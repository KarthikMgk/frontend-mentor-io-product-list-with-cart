const cart = JSON.parse(localStorage.getItem('cart')) || {};
const addToCartBtns = document.querySelectorAll('#add-to-cart-btn')
const addToCartMsg = document.querySelector("#add-to-cart-msg");
const products = document.querySelectorAll("#products .item");


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
      itemAddToCartBtn.removeEventListener("click", addToCartHandler);
      itemAddToCartBtn.addEventListener("click", addToCartHandler);
      updateCartCount();
    }
    
  itemCount.innerHTML = cart[itemName].quantity
  return;
    
    // localStorage.setItem(itemName, Number(curCount)-1)
}

function incrementCartQuantity(e) {
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
    updateCartCount();
    
}

function addToCartHandler(e) {
  // debugger;
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
    addToCartBtn
      .querySelector(".decrement-btn")
      .addEventListener("click", function (e) {
        decrementCartQuantity(e);
      });

    addToCartBtn
      .querySelector(".increment-btn")
      .addEventListener("click", function (e) {
        incrementCartQuantity(e);
      });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }


addToCartBtns.forEach((button) => {
  // Attach the event listener to each button
  button.addEventListener("click", addToCartHandler);
});

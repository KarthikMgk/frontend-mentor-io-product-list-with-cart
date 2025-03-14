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

function updateCartItems() {

}

function updateCartCount(currentQuantity) {
    localStorage.setItem("cartCount", Number(currentQuantity));
    let cartCount = localStorage.getItem('cartCount')
    cartCountTag.innerHTML = `(${cartCount})`;
}

addToCartBtns.forEach(button => {
    button.addEventListener('click', (e) => {
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
            cart[productName].quantity += 1
        } else {
            cart[productName] = {
                price: productPrice,
                quantity: 1
            }
        }
        

        addToCartBtn.querySelector("#add-to-cart-btn").innerHTML = cart[productName].quantity;
        localStorage.setItem('cart', JSON.stringify(cart))
        currentQuantity = Number(localStorage.getItem('cartCount'))
        updateCartCount(currentQuantity+1);

    })
})


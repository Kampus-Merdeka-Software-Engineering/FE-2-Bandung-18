// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Start when the document is ready
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
  loadCartFromLocalStorage(); // Load cart items from Local Storage
  update();
  addEvents();
}

// ============= UPDATE & RERENDER ===========
function update() {
  updateTotal();
}

// =============== ADD EVENTS ===============
function addEvents() {
  // Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}


// ============= HANDLE EVENTS FUNCTIONS =============
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
    saveCartToLocalStorage(); // Save cart items to Local Storage
    update(); // Update the cart display
  }

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );
  saveCartToLocalStorage(); // Save cart items to Local Storage
  update();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer

  saveCartToLocalStorage(); // Save cart items to Local Storage
  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet!");
    return;
  }

  // Save cart items to local storage before clearing the cart
  saveCartToLocalStorage();

  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";

  itemsAdded = [];
  saveCartToLocalStorage(); // Save cart items to Local Storage
  update();

  // Display the order modal
  showOrderModal();
}


// =========== UPDATE & RERENDER FUNCTIONS =========
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("Rp", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // keep 3 digits after the decimal point
  total = total.toFixed(3);
  // or you can use also
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "Rp" + " " + total;
}

function update() {
  updateTotal();
  addEvents(); // Tambahkan kembali event listener setelah merender ulang elemen
}

// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

// =============== LOCAL STORAGE ===============
function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(itemsAdded));
}

function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cartItems");
  if (storedCart) {
    itemsAdded = JSON.parse(storedCart);
    itemsAdded.forEach((item) => {
      let cartBoxElement = CartBoxComponent(item.title, item.price, item.imgSrc);
      let newNode = document.createElement("div");
      newNode.innerHTML = cartBoxElement;
      const cartContent = cart.querySelector(".cart-content");
      cartContent.appendChild(newNode);
    });
  }
}

function updateOrderSummary() {
  const orderSummaryList = document.getElementById("order-summary-list");
  orderSummaryList.innerHTML = ""; // Bersihkan daftar sebelum memperbarui

  // Tambahkan setiap item dari keranjang ke dalam daftar
  itemsAdded.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.title} - ${item.price}`;
    orderSummaryList.appendChild(listItem);
  });

  // Perbarui total harga pada ringkasan pesanan
  const totalElement = document.getElementById("total-price");
  let total = itemsAdded.reduce((acc, item) => acc + parseFloat(item.price.replace("Rp", "")), 0);
  totalElement.textContent = `Total: Rp ${total.toFixed(3)}`;
}


// =============== HANDLE ORDER MODAL FUNCTIONS ===============
function showOrderModal() {
  // Cek apakah keranjang tidak kosong sebelum menampilkan formulir pesanan
  if (itemsAdded.length > 0) {
    // Perbarui ringkasan pesanan sebelum menampilkan formulir
    updateOrderSummary();

    const orderModal = document.getElementById("order-modal");
    orderModal.style.display = "block";

    // Simpan status formulir pesanan ke localStorage
    localStorage.setItem("orderFormVisible", "true");
  }
}

function closeOrderModal() {
  const orderModal = document.getElementById("order-modal");
  orderModal.style.display = "none";

  // Hapus status formulir pesanan dari localStorage
  localStorage.removeItem("orderFormVisible");
}

// Jalankan fungsi showOrderModal saat halaman dimuat jika status formulir pesanan ada di localStorage
document.addEventListener("DOMContentLoaded", function () {
  const orderFormVisible = localStorage.getItem("orderFormVisible");

  if (orderFormVisible === "true") {
    showOrderModal();
  }
});

function submitOrder() {
  // Collect form data
  const fullname = document.getElementById("fullname").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const paymentMethod = document.getElementById("payment-method").value;
  const additionalMessage = document.getElementById("additional-message").value;

  // Perform form validation
  if (!fullname || !phone || !address || !paymentMethod) {
    window.alert("Please fill out all the required fields before submitting.");
    return;
  }

  // Additional validation or processing logic can be added here

  // Save order details to local storage
  saveOrderToLocalStorage({
    fullname,
    phone,
    address,
    paymentMethod,
    additionalMessage,
    items: itemsAdded
  });

  // Display confirmation message
  showSuccessPopup();

  // Clear the form fields after submission
  clearFormFields();

  // Close the order modal
  closeOrderModal();

  // Clear the cart and update order summary in local storage
  itemsAdded = [];
  saveCartToLocalStorage();
  updateOrderSummary();
}

function clearFormFields() {
  // Clear the form fields
  document.getElementById("fullname").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  document.getElementById("payment-method").value = "";
  document.getElementById("additional-message").value = "";
}


function saveOrderToLocalStorage(orderDetails) {
  // Save order details to local storage
  localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
}

function loadOrderFromLocalStorage() {
  // Load order details from local storage
  const orderDetailsString = localStorage.getItem("orderDetails");
  if (orderDetailsString) {
    const orderDetails = JSON.parse(orderDetailsString);
    // Do something with the order details if needed
    // For example, display them in the UI
  }
}

function clearOrderFromLocalStorage() {
  // Clear order details from local storage after submission
  localStorage.removeItem("orderDetails");
}


document.addEventListener("DOMContentLoaded", function () {
  // Load order details from local storage when the page is loaded
  loadOrderFromLocalStorage();
  // ...

  // Check if the order form has been submitted
  const orderDetailsString = localStorage.getItem("orderDetails");
  if (orderDetailsString) {
    // If order details exist, hide the order form
    closeOrderModal();
  }
});

// function pop-up
function showSuccessPopup() {
  const successPopup = document.getElementById("success-popup");
  const orderForm = document.getElementById("order-modal");

  // Menyembunyikan formulir
  orderForm.style.display = "none";

  // Menampilkan pop-up sukses
  successPopup.style.display = "block";
  document.getElementById("popup-overlay").style.display = "flex";
}

function closeSuccessPopup() {
  const successPopup = document.getElementById("success-popup");
  const orderForm = document.getElementById("order-modal");

  // Menyembunyikan pop-up sukses
  successPopup.style.display = "none";
  document.getElementById("popup-overlay").style.display = "none";
}

// Update your existing buy button event listener
const buy_btn = document.querySelector(".btn-buy");
buy_btn.addEventListener("click", showOrderModal);


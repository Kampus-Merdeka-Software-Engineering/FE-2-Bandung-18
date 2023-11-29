document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cartItemCount = document.getElementById("cart-notification");
    const cartContent = document.querySelector(".cart-content");

    let itemCount = 0;

    function addToCart() {
        itemCount++;
        updateCartItemCount();
        showCartNotification();
    }

    function removeFromCart() {
        // Logika pengurangan item dari keranjang
        itemCount = Math.max(0, itemCount - 1);
        updateCartItemCount();
        showCartNotification();
    }

    function updateCartItemCount() {
        cartItemCount.textContent = itemCount;
    }

    function showCartNotification() {
        // Tampilkan notifikasi di atas ikon keranjang
        cartItemCount.textContent = itemCount;
        cartItemCount.style.display = "block";
    }

    function setCartIconClickListener() {
        cartIcon.addEventListener("click", function () {
            // Tambahkan logika untuk menampilkan keranjang atau lakukan aksi yang diinginkan
            console.log("Cart icon clicked!");
        });
    }

    // Tambahkan event listener untuk menambahkan barang ke keranjang
    const addToCartButtons = document.querySelectorAll(".add-cart");
    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", addToCart);
    });

    // Tambahkan event listener untuk menghapus barang dari keranjang
    const removeCartItemButtons = document.querySelectorAll(".cart-remove");
    removeCartItemButtons.forEach(function (button) {
        button.addEventListener("click", removeFromCart);
    });

    // Tambahkan event listener untuk mengubah kuantitas barang di keranjang
    const changeQuantityInputs = document.querySelectorAll(".cart-quantity");
    changeQuantityInputs.forEach(function (input) {
        input.addEventListener("input", updateQuantity);
    });

    // Tambahkan event listener untuk tombol "Order Now"
    const orderNowButton = document.querySelector(".btn-buy");
    orderNowButton.addEventListener("click", handleOrderNow);

    setCartIconClickListener();

    function handleOrderNow() {
        // Tambahkan logika untuk menangani klik tombol "Order Now"

        // Reset notifikasi menjadi 0
        resetCartNotification();
    }

    function resetCartNotification() {
        itemCount = 0;
        cartItemCount.textContent = "0";
        cartItemCount.style.display = "none";
    }

    function updateQuantity() {
        // Logika untuk menangani perubahan kuantitas
        const newQuantity = parseInt(this.value);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            itemCount = newQuantity;
            updateCartItemCount();
            showCartNotification();
        }
    }
});


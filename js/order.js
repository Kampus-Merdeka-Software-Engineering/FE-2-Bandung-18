// Function to place the order
function placeOrder() {
    // Validate form fields and proceed with the order placement
    // ...

    // Show the popup and update the receipt
    showPopup();
    updateReceipt();
}

// Function to update the receipt
function updateReceipt() {
    const receiptElement = document.getElementById("receipt");
    let receiptHTML = "<ul>";
    itemsAdded.forEach(item => {
        receiptHTML += `<li>${item.title} - ${item.price}</li>`;
    });
    receiptHTML += `</ul><p>Total: ${document.querySelector(".total-price").innerHTML}</p>`;
    receiptElement.innerHTML = receiptHTML;
}

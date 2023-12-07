const API_URL = "http://localhost:3001"

document.addEventListener("DOMContentLoaded", async () => {
    // fetchAllMenu();
    if (window.location.pathname.includes("menu.html")) {
        await fetchAllMenu()
    }

});

const fetchAllMenu = async () => {
    try {
      const response = await fetch (`${API_URL}/menuDessertbox`);
      const menu = await response.json();
      console.log(menu);
      displayMenu(menu);
    } catch (error) {
        console.error("Error:", error)
    }
};

const displayMenu = (menu) => {
    const section = document.querySelector(".ourMenu-content");
    section.innerHTML = ''; 
  
    menu.forEach((menuItem) => {
      const div = document.createElement("div");
      div.classList.add("product-box"); // Tambahkan kelas product-box
      div.innerHTML = `
        <img src=${menuItem.images} alt="" class="product-img">
        <h2 class="product-title">${menuItem.name}</h2>
        <span class="product-price">Rp ${menuItem.price.toLocaleString()}</span>
        <i class='bx bx-shopping-bag add-cart'></i>
      `;
      section.appendChild(div);
    });
  };
  
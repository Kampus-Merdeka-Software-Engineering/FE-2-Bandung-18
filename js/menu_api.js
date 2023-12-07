const API_URL = "https://lazy-blue-fawn-toga.cyclic.app";

document.addEventListener("DOMContentLoaded", async () => {
    if (window.location.pathname.includes("menu.html")) {
        await fetchMenu();
    }
});

const fetchMenu = async () => {
    try {
        const response = await fetch(`${API_URL}/menuDessertbox`); // Gunakan URL lengkap menuDessertbox
        const menu = await response.json();
        console.log(menu);
        displayMenu(menu);
    } catch (error) {
        console.error("Error fetching menu:", error);
    }
};

const displayMenu = (menu) => {
    const section = document.querySelector(".ourMenu-content");
    section.innerHTML = '';

    menu.forEach((menuItem) => {
        const div = document.createElement("div");
        div.classList.add("product-box");
        div.innerHTML = `
            <img src=${menuItem.images} alt="" class="product-img">
            <h2 class="product-title">${menuItem.name}</h2>
            <span class="product-price">Rp ${menuItem.price.toLocaleString()}</span>
            <i class='bx bx-shopping-bag add-cart'></i>
        `;
        section.appendChild(div);
    });
};

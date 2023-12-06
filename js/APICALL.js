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

const displayMenu= (menu) => {
    const section = document.getElementById("dessert-box")
    menu.forEach((menu) => {
        const div = document.createElement("div")
        div.innerHTML = `
        <h3>${menu.name}</h3>
        <p>Price: ${menu.price}</p>
        `
        section.appendChild(div);
        
    });
};


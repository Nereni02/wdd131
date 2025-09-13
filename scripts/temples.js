
const yearSpan = document.createElement("span");
const lastModifiedSpan = document.createElement("span");

const footer = document.querySelector("footer p");
footer.innerHTML = `© <span id="year"></span> Diana Nereni Hernandez Rodriguez | Last Modified: <span id="lastModified"></span>`;

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const nav = document.querySelector("nav ul");

const hamburgerBtn = document.createElement("button");
hamburgerBtn.setAttribute("id", "hamburger");
hamburgerBtn.innerHTML = "☰";
document.querySelector("header").insertBefore(hamburgerBtn, nav);

hamburgerBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
    if (hamburgerBtn.innerHTML === "☰") {
        hamburgerBtn.innerHTML = "✖";
    } else {
        hamburgerBtn.innerHTML = "☰";
    }
});

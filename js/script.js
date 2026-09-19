const header = document.querySelector("site-header");
const nav = document.querySelector("#nav");
const menuButton = document.querySelector("#menuButton");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
});

menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuButton.textContent = isOpen ? "x" : "☰";
});

document.addEventListener(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
        menuButton.textContent = "☰";
    });
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    button.addEventListener("click", () => {
        if (button.textContent.trim() === "Current theme") return;

        const originalText = button.textContent;
        button.textContent = "Coming later...";

        window.setTimeout(() => {
            button.textContent = "Coming later...";
        }, 1600);
    });
});
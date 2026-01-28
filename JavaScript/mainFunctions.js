// Variablen Zuweisung
const page = document.getElementById("page");
const btn = document.getElementById("toggleBtn");
const overlay = document.getElementById("overlay");

// Tooglen der Sidebar
const setOpen = (open) => {
    page.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open);
};
// Click-Check
btn.addEventListener("click", () => {
    setOpen(!page.classList.contains("is-open"));
});
// Schließen der Sidebar (mit Tastenfunktion)
overlay.addEventListener("click", () => setOpen(false));
document.addEventListener("keydown", e => {
    if (e.key === "Escape") setOpen(false);
});
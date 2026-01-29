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




document.addEventListener('DOMContentLoaded', () => {
    // 1. Hier pflegst du deine Zertifikate ein
    const zertifikate = [
        { name: "Python Programmierung Zertifikat", datei: "python_cert.pdf" },
        { name: "Scrum Master Foundation", datei: "scrum_cert.pdf" },
        { name: "Sprachzertifikat Englisch (C1)", datei: "englisch_c1.pdf" },
        { name: "Praktikumszeugnis", datei: "praktikum.pdf" }
    ];

    // 2. Den Container im HTML finden
    const container = document.getElementById('cert-container');

    if (container) {
        // Wir bauen das HTML Stück für Stück zusammen
        let htmlContent = '';

        zertifikate.forEach(cert => {
            htmlContent += `
                <div class="cert-unit" style="text-align: center; margin-bottom: 30px;">
                    <a href="downloads/${cert.datei}" target="_blank" style="text-decoration: none; color: inherit; font-weight: bold; font-size: 1.1rem; display: block; margin-bottom: 8px;">
                        ${cert.name} (Ansehen)
                    </a>
                    <nav>
                        <ul class="nav-list" style="padding: 0; list-style: none; margin: 0;">
                            <li><a href="downloads/${cert.datei}" download>📥 Direkt Download (PDF)</a></li>
                        </ul>
                    </nav>
                </div>
                <hr style="width: 30%; border: 0; border-top: 1px solid #eee; margin: 20px auto;">
            `;
        });

        // 3. Das generierte HTML in den Container schreiben
        container.innerHTML = htmlContent;
    }
});
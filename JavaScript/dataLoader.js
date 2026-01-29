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
function loadData() {
    try {
        const portfolio = jsonData.portfolio;

        //Funktion für alle Seiten
        fillContactInfo(portfolio.personalInfo);
        //fillInterests(portfolio.interests);

        // Funktionen nur für Lebenslauf-Seite (cv.html)
        if (document.getElementById('json-work-experience')) {
            fillWorkExperience(portfolio.workExperience);
            fillEducation(portfolio.education);
            fillSkills(portfolio.skills);
        }
        // Funktionen für rechtliche Seiten
        fillImpressumData(portfolio.personalInfo);
        fillDatenschutzData(portfolio.personalInfo);

    } catch (error) {
        console.error(" Fehler beim laden: ", error);
    }
}

/**
* Füllt Kontaktdaten in der Sidebar auf ALLEN Seiten
* @param {Object} personalInfo - JSON-Daten mit persönlichen Informationen
*/
function fillContactInfo(personalInfo) {
    if (!personalInfo) return;

    setText('.json-email', personalInfo.email);
    setText('.json-phone', personalInfo.phone);
    setText('.json-country', personalInfo.address.country);

    const addressElement = document.querySelector('.json-address');
    if (addressElement) {
        addressElement.textContent = `${personalInfo.address.street}, ${personalInfo.address.city}`;
    }

    console.log(" Kontaktinfo geladen");
}

// ============ Ab hier CV.Verarbeitung ====================
/** 
*Erstellt die Berufserfahrungsliste für die Lebenslauf-Seite
* @param {Array} workExperience - Array mit Berufserfahrung aus JSON
*/
function fillWorkExperience(workExperience) {
    const container = document.getElementById('json-work-experience');
    if (!container || !workExperience) return;

    let html = '';
    workExperience.forEach((job, index) => {
        const isLast = index === workExperience.length - 1;
        html += `
        <div class="work-item ${isLast ? 'last' : ''}">
            <div class="job-header">
                <h3>${job.position}</h3>
                <div class="job-meta">
                    <span class="company">${job.company}</span>
                    <span class="location">${job.location}</span>
                    <span class="period">${job.period}</span>
                </div>
            </div>
            <ul class="job-responsibilities">
                ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
        </div>`;
    });
    container.innerHTML = html;

    console.log(" Berufserfahrung geladen");
}

/** 
*Erstellt die Berufserfahrungsliste für die Lebenslauf-Seite
* @param {Array} education - Array mit Berufserfahrung aus JSON
*/
function fillEducation(education) {
    const container = document.getElementById('json-education');
    if (!container || !education) return;

    let html = '';
    education.forEach((edu, index) => {
        const isLast = index === education.length - 1;
        html += `
        <div class="education-item ${isLast ? 'last' : ''}">
            <div class="education-header">
                <h3>${edu.program}</h3>
                <div class="education-meta">
                    <span class="program">${edu.program}</span>
                    <span class="institution">${edu.institution}</span>
                    <span class="period">${edu.period}</span>
                </div>
            </div>
        </div>`;
    });
    container.innerHTML = html;

    console.log(" Schulische Laufbahn geladen");
}

/**
* Erstellt die Skills-Sektion für die Lebenslauf-Seite
* @param {Object} skills - Skills-Daten aus JSON
*/
function fillSkills(skills) {
    const container = document.getElementById('json-skills');
    if (!container || !skills) return;

    let html = '<div class="skills-container">';

    // Sprachen
    if (skills.languages?.length > 0) {
        html += `<div class="skills-category">
            <h4>Sprachen</h4>
            <div class="skills-list languages">`;
        skills.languages.forEach(lang => {
            html += `<span class="skill-tag">${lang.language} (${lang.level})</span>`;
        });
        html += `</div></div>`;
    }

    // Software & Technologien
    if (skills.software?.length > 0) {
        html += `<div class="skills-category">
            <h4>Software & Technologien</h4>
            <div class="skills-list software">`;
        skills.software.forEach(soft => {
            html += `<span class="skill-tag">${soft.name} (${soft.level})</span>`;
        });
        html += `</div></div>`;
    }

    // Führerschein (Beschlossen, das es nicht mit reinkommt. -> Aber in Json hinterlegt)
    // if (skills.drivingLicense) {
        // html += `<div class="skills-category">
            // <h4>Führerschein</h4>
            // <p class="license">${skills.drivingLicense}</p>
        // </div>`;
    // }

    // Persönliche Fähigkeiten
    if (skills.abilities?.length > 0) {
        html += `<div class="skills-category">
            <h4>Persönliche Fähigkeiten</h4>
            <div class="skills-list abilities">`;
        skills.abilities.forEach(ability => {
            html += `<span class="skill-tag">${ability}</span>`;
        });
        html += `</div></div>`;
    }

    html += '</div>';
    container.innerHTML = html;

    console.log(" Skills geladen");
}

// ==================== Bestimmung der "Textfelder" ===================
/**
 *  Füllt Impressum-Daten auf impressum.html
 * @param {Object} personalinfo - Personal Information
 */

function fillImpressumData (personalInfo) {
    if(!personalInfo) return;
    setText('.json-name', personalInfo.name);
    setText('.json-address-street', personalInfo.address.street);
    setText('.json-address-city', personalInfo.address.city);
    setText('.json-address-country', personalInfo.address.country);
    //setText('.json-phone', personalInfo.phone);
    //setText('.json-email', personalInfo.email);

    // Nur auf Impressum-Seite ausführen
    const impressumContainer = document.querySelector('.impressum-section');
    if(impressumContainer) {
        const addressHtml = `
            <p><strong>${personalInfo.name}</strong></p>
            <p>${personalInfo.address.street}<br>
            ${personalInfo.address.city}<br>
            ${personalInfo.address.country}</p>
            
        `;
    
        //const firstSection = document.querySelector('.impressum-section');
        //if(firstSection) {
        //    firstSection.innerHTML = addressHtml;
        //}
    } 
}

//=================== Json-Lade-Funktion ============================

/**
 * Lädt Json-Daten aus einer externen Datei
 * Wird verwendet, wenn jsonData nicht direkt eingebunden ist
 */
function loadJSONFromFile() {
    fetch('json/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error ('JSON-Datei nicht gefunden');
            }
            return response.json();
        })
        .then(data => {
            window.jsonData = data;
            loadData();
        })
        .catch(error => {
            console.error('Fehler beim Laden der JSON-Datei:', error);
            showError('Daten konnten nicht geladen werden');
        });
}

// ===================Event-Listener & Initialisierung ============
// Initialisiert den CV Loader wenn Domain geladne ist

document.addEventListener('DOMContentLoaded', function() {
    console.log("CV Loader initialisiert");

    if (typeof jsonData !== 'undefined') {
        loadData();
    } else {
        console.log("Json-Daten nicht eingebunden.");
        loadJSONFromFile();
    }
});
    

// =========== Hilfs-Funktionen ========================

/**
* Setzt Text auf alle Elemente mit einem bestimmten Selektor
* @param {string} selector - CSS-Selektor
* @param {string} text - Anzuzeigender Text
*/
function setText(selector, text) {
    document.querySelectorAll(selector).forEach(el => {
        el.textContent = text;
    });
}

/**
* Zeigt Fehlermeldungen in den entsprechenden Containern an
* @param {string} message - Fehlermeldung
*/
function showError(message) {
    ['json-work-experience', 'json-education', 'json-skills', 'json-interests'].forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<div class="json-error">${message}</div>`;
        }
    });
}

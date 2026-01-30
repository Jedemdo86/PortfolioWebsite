// PortfolioWebsite/JavaScript/dataLoader.js
/**
 * dataLoader.js
 * Lädt und verarbeitet JSON-Daten für das Portfolio-Website-Projekt.
 * Verantwortlich für das Füllen von Inhalten auf verschiedenen Seiten basierend auf den JSON-Daten.
 */
function loadData() {
    try {
        const portfolio = jsonData.portfolio;

        //Funktion für alle Seiten
        fillContactInfo(portfolio.personalInfo);
        fillaboutYouInfo(portfolio.aboutYou);
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



/**
* Füllt About-You Texte auf ALLEN Seiten
* @param {Object} aboutYou - JSON-Daten mit persönlichen Informationen
*/
function fillaboutYouInfo(aboutYou) {
    if (!aboutYou) return;

    setText('.json-about-p1', aboutYou.p1 || '');
    setText('.json-about-p2', aboutYou.p2 || '');
    setText('.json-about-p3', aboutYou.p3 || '');

    console.log(" About-You Texte geladen");
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
        <div class="job-card ${isLast ? 'last' : ''}">
                <h3>${job.position}</h3>
                <div class="job-meta">
                    <span class="company">${job.company}</span>
                    <span class="location">${job.location}</span>
                    <span class="period">${job.period}</span>
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
*Erstellt die Schulische Laufbahn für die Lebenslauf-Seite
* @param {Array} education - Array mit Berufserfahrung aus JSON
*/
function fillEducation(education) {
    const container = document.getElementById('json-education');
    if (!container || !education) return;

    let html = '';
    education.forEach((edu, index) => {
        const isLast = index === education.length - 1;
        html += `
        <div class="job-card ${isLast ? 'last' : ''}">
                <h3>${edu.program}</h3>
                <div class="education-meta">
                    <span class="program">${edu.program}</span>
                    <span class="institution">${edu.institution}</span>
                    <span class="period">${edu.period}</span>
            </div>
        </div>`;
    });
    container.innerHTML = html;

    console.log(" Schulische Laufbahn geladen");
}

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
    ['json-work-experience','json-aboutYou', 'json-education', 'json-skills', 'json-interests'].forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<div class="json-error">${message}</div>`;
        }
    });
}

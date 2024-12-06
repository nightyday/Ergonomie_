// Sélection des éléments
const pseudoInput = document.getElementById('pseudo');
const emailInput = document.getElementById('email');
const telephoneInput = document.getElementById('telephone');
const pseudoMessage = document.getElementById('pseudo-message');
const submitButton = document.getElementById('submit');
const validateButton = document.getElementById('validate');
const confirmButton = document.getElementById('confirm');
const valuesDisplay = document.getElementById('values');

// Variables pour gérer l'état
let pseudoLocked = false;
let countdownInterval;
let collectedDigits = "";

// Sélectionner les chiffres du cercle
const digits = document.querySelectorAll('#circle-container .digit');
digits.forEach(digit => {
    digit.addEventListener('click', () => {
        collectedDigits += digit.dataset.digit;
        telephoneInput.value = collectedDigits;
    });
});

// Fonction pour afficher les valeurs saisies
function displayValues() {
    const pseudoValue = pseudoInput.value;
    const emailValue = emailInput.value;
    const telephoneValue = telephoneInput.value;

    valuesDisplay.innerHTML = `
        <p><strong>Pseudo :</strong> ${pseudoValue}</p>
        <p><strong>Email :</strong> ${emailValue}</p>
        <p><strong>Téléphone :</strong> ${telephoneValue}</p>
    `;
}

// Fonction pour faire tourner le champ email et changer sa couleur
function rotateAndChangeColor() {
    const rotationAngle = Math.random() < 0.5 ? 45 : 90; // Choisir aléatoirement 45° ou 90°
    emailInput.style.transform = `rotate(${rotationAngle}deg)`;

    // Change la couleur de l'email à chaque caractère
    emailInput.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

// Écouteur d'événements pour l'input du champ email
emailInput.addEventListener('input', () => {
    rotateAndChangeColor(); // Faire tourner le champ email à chaque saisie et changer la couleur
});

// Action lorsque l'utilisateur clique sur "Valider"
submitButton.addEventListener('click', () => {
    submitButton.style.display = 'none';
    validateButton.style.display = 'inline-block';
});

// Action lorsque l'utilisateur clique sur "Valider la saisie"
validateButton.addEventListener('click', () => {
    validateButton.style.display = 'none';
    confirmButton.style.display = 'inline-block';
});

// Action lorsque l'utilisateur clique sur "Confirmer la saisie"
confirmButton.addEventListener('click', () => {
    confirmButton.style.display = 'none';
    displayValues();
});

// Ajouter un écouteur pour le backspace
document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        // Vider tous les champs
        pseudoInput.value = '';
        emailInput.value = '';
        telephoneInput.value = '';
    }
});

let pseudoTimeout;
let countdown = 10;

pseudoInput.addEventListener('input', () => {
    // Si deux caractères ont été saisis et que le champ n'est pas déjà verrouillé
    if (pseudoInput.value.length === 2 && !pseudoLocked) {
        // Verrouiller le champ après 2 caractères
        pseudoLocked = true;
        pseudoInput.setAttribute('disabled', 'true'); // Désactiver le champ pseudo

        // Afficher le message et initialiser le compte à rebours
        pseudoMessage.textContent = `T'es trop speed, prends une pause café et check la Sopradio 😉 (SSGTours). Attends ${countdown} secondes...`;
        pseudoMessage.style.display = 'block';

        // Initialiser le compte à rebours
        countdownInterval = setInterval(() => {
            countdown--;
            pseudoMessage.textContent = `Rapide rapide, prends une pause café/thés. Attends ${countdown} secondes...`;

            // Quand le compte à rebours atteint 0
            if (countdown <= 0) {
                clearInterval(countdownInterval); // Stopper le compte à rebours
                pseudoInput.removeAttribute('disabled'); // Réactiver le champ
                pseudoMessage.style.display = 'none'; // Cacher le message
                pseudoLocked = false; // Déverrouiller le champ
                countdown = 10; // Réinitialiser le compte à rebours pour une prochaine utilisation
            }
        }, 1000);
    }
});


// Fonction pour faire sauter le champ pseudo
function makePseudoJump() {
    if (!pseudoLocked) {
        // Appliquer un mouvement aléatoire au champ pseudo
        const randomX = Math.floor(Math.random() * 30) - 15; // Valeur aléatoire entre -15 et 15 pour l'axe X
        const randomY = Math.floor(Math.random() * 30) - 15; // Valeur aléatoire entre -15 et 15 pour l'axe Y
        pseudoInput.style.transform = `translate(${randomX}px, ${randomY}px)`; // Appliquer le mouvement

        // Répéter toutes les 2 secondes
        setTimeout(makePseudoJump, 2000);
    }
}

// Démarrer l'animation dès le début
makePseudoJump();

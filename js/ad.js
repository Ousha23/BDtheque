// Utilisation d'une Map pour stocker les adhérents

function Adherent(nom, prenom, email) {
  this.nom = nom;
  this.prenom = prenom;
  this.email = email;
}

let adherents = new Map();

function ajouterAdherent(nom, prenom, email) {
  let nouvelAdherent = new Adherent(nom, prenom, email);
  nouvelAdherent.anciennesAdresses = [];

  // Enregistre l'adhérent dans le localStorage
  let adherentsData = JSON.parse(localStorage.getItem('adherents')) || {};
  adherentsData[email] = nouvelAdherent;
  localStorage.setItem('adherents', JSON.stringify(adherentsData));

  // Enregistre également dans la Map (si nécessaire)
  adherents.set(email, nouvelAdherent);

  return nouvelAdherent;
}


function afficherAdherents() {
  const tableIdElement = document.getElementById("tableId");
  tableIdElement.innerHTML = "";

  // Récupère les adhérents depuis le localStorage
  let adherentsData = JSON.parse(localStorage.getItem('adherents')) || {};

  Object.entries(adherentsData).forEach(([email, adherent]) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td class="col-2">${adherent.nom}</td>
        <td class="col-2">${adherent.prenom}</td>
        <td class="col-2">${email}</td>
        <td class="col-2">
          <button onclick="editerAdherent('${email}')">Éditer</button>
          <button onclick="supprimerAdherent('${email}')">Supprimer</button>
        </td>
      `;
    tableIdElement.appendChild(tableRow);
  });

  const tableContainer = document.getElementById("tableContainer");
  tableContainer.classList.remove("hide");
}

const form = document.getElementById("adherentForm");
const messageAjout = document.getElementById("messageAjout");

function clearMessage(element) {
  setTimeout(function () {
    element.textContent = "";
  }, 3000);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;

  if (emailExists(email)) {
    alert(
      "L'adresse email est déjà utilisée. Veuillez entrer une autre adresse email."
    );
    return;
  }

  const nouvelAdherent = ajouterAdherent(nom, prenom, email);
  afficherAdherents();
  form.reset();

  messageAjout.textContent = `L'adhérent ${nouvelAdherent.nom} ${nouvelAdherent.prenom} a été ajouté.`;
  clearMessage(messageAjout);
});

function emailExists(email) {
  return adherents.has(email);
}

// Fonction pour générer un code adhérent unique
let codeAdherentCounter = 6; // Commencez à partir de 6, car vous avez déjà des adhérents jusqu'à "006"

function generateCodeAdherent() {
  codeAdherentCounter++;
  return codeAdherentCounter.toString().padStart(3, "0");
}



// Appelle la fonction afficherAdherents pour afficher les adhérents existants et le nouvel adhérent
afficherAdherents();

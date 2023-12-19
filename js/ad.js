// Votre code JavaScript ici

function Adherent(nom, prenom, email) {
  this.nom = nom;
  this.prenom = prenom;
  this.email = email;
}

let listeAdherents = [];

function ajouterAdherent(nom, prenom, email) {
  let nouvelAdherent = new Adherent(nom, prenom, email);
  nouvelAdherent.anciennesAdresses = [];
  listeAdherents.push(nouvelAdherent);
}

function afficherAdherents() {
  const tableIdElement = document.getElementById("tableId");
  tableIdElement.innerHTML = "";

  listeAdherents.forEach(function (adherent, index) {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td class="col-2">${index + 1}</td>
        <td class="col-2">${adherent.nom}</td>
        <td class="col-2">${adherent.prenom}</td>
        <td class="col-2">${adherent.email}</td>
        <td class="col-2">
          <button onclick="editerAdherent(${index + 1})">Éditer</button>
          <button onclick="supprimerAdherent(${index + 1})">Supprimer</button>
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

  ajouterAdherent(nom, prenom, email);
  afficherAdherents();
  form.reset();

  messageAjout.textContent = "Un nouvel adhérent a été ajouté.";
  clearMessage(messageAjout);
});

function emailExists(email) {
  return listeAdherents.some((adherent) => adherent.email === email);
}

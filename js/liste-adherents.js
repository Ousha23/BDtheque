// Initialisation de la Map adherents
//let adherents = new Map();

//localStorage.removeItem("adherents");
window.addEventListener('DOMContentLoaded', (event) => {
  // Vérifie s'il existe déjà des adhérents dans le localStorage
  const adherentsFromStorage = localStorage.getItem('adherents');
  if (adherentsFromStorage) {
    // Si des adhérents sont trouvés dans le localStorage, les charger dans la Map `adherents`
    adherents = new Map(JSON.parse(adherentsFromStorage));
  } else {
    localStorage.setItem("adherents", JSON.stringify(Array.from(adherents.entries())));
    recupMapEmplJson = localStorage.getItem('adherents');
    adherents = new Map(JSON.parse(adherentsFromStorage));
  }

  // Ensuite, appeler la fonction pour afficher les adhérents
  afficherAdherents();
});

// Fonction pour afficher les adhérents existants
function afficherAdherents() {
  const tableIdElement = document.getElementById("tableId");
  tableIdElement.innerHTML = ""; // Nettoie le contenu actuel

  // Affiche les adhérents de la Map
  adherents.forEach(function (adherent, codeAdherent) {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td class="col-2">${codeAdherent}</td>
      <td class="col-2">${adherent.nom}</td>
      <td class="col-2">${adherent.prenom}</td>
      <td  id="tomail" class="col-2 nouvelEmail">${adherent.email}</td>
      <td class="col-2">
      <button id="bModifier-${codeAdherent}" class="bModifier" data-code="${codeAdherent}">Éditer</button>
      <button id="bSupprimer-${codeAdherent}" class="bSupprimer" data-code="${codeAdherent}">Supprimer</button>

      </td>
    `;
    tableIdElement.appendChild(tableRow);
  });

  const editButtons = document.querySelectorAll(".bModifier");
  const deleteButtons = document.querySelectorAll(".bSupprimer");

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const codeAdherent = this.getAttribute("data-code");
      editerAdherent(codeAdherent);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const codeAdherent = this.getAttribute("data-code");
      supprimerAdherent(codeAdherent);
    });
  });
}



// Fonction pour ajouter un adhérent à la Map
function ajouterAdherent(nom, prenom, email) {
  // Vérifie si l'email existe dans la Map des adhérents
  let emailExiste = false;

  adherents.forEach(function (adherent) {
    if (adherent.email === email) {
      emailExiste = true;
      return;
    }
  });

  if (emailExiste) {
    alert(
      "L'adresse email est déjà utilisée. Veuillez entrer une autre adresse email."
    );
    return null;
  }

  function genererLogin(nom, prenom) {
    // Convertir le prénom en majuscules et extraire les deux premières lettres
    const deuxPremieresLettresPrenom = prenom.substr(0, 2).toUpperCase();

    // Supprimer les espaces et convertir le nom en minuscules
    const nomSansEspaces = nom.toLowerCase().replace(/\s/g, "");

    // Combiner le nom (en minuscules et sans espaces) avec les deux premières lettres du prénom (en majuscules)
    const login = `${nomSansEspaces}.${deuxPremieresLettresPrenom}`;

    return login;
  }

  function genererPass(nom, prenom) {
    return `${nom.toLowerCase()}${prenom.toLowerCase()}@!`;
  }

  // Générer le login en utilisant la fonction genererLogin
  let login = genererLogin(nom, prenom);
  console.log("Login généré :", login);

  let pass = genererPass(nom, prenom);
  console.log("Mot de passe généré :", pass);

  let nouvelAdherent = {
    //codeAdherent:codeAdherent,
    nom: nom,
    prenom: prenom,
    email: email,
    dateAdhesion: new Date(),
    login: login,
    pass: pass,
  };

  console.log(
    "Date d'adhésion de nouvel adhérent :",
    nouvelAdherent.dateAdhesion
  );
  // Génère un code adhérent unique
  let codeAdherent = generateCodeAdherent();

  adherents.set(codeAdherent, nouvelAdherent);


 
  // Mettre à jour le localStorage avec les adhérents mis à jour
 localStorage.setItem('adherents', JSON.stringify(Array.from(adherents.entries())));


  // Met à jour l'affichage
  afficherAdherents();
 
  return nouvelAdherent;
}

// Écouteur d'événement sur la soumission du formulaire
const form = document.getElementById("adherentForm");
const messageAjout = document.getElementById("messageAjout");
const messageErreur = document.getElementById("messageErreur");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;
 
 
 
  function validerNomPrenom(chaine) {
    const estValideCasse = /^[A-Z][a-z\-]*$/.test(chaine); // Autoriser les tirets "-"
    const estValideLettres = /^[a-zA-Z\-]+$/.test(chaine); // Autoriser les tirets "-"
    const contientChiffre = /\d/.test(chaine);

    return estValideCasse && estValideLettres && !contientChiffre;
  }

  const isNomValide = validerNomPrenom(nom);
  const isPrenomValide = validerNomPrenom(prenom);

  if (!isNomValide || !isPrenomValide) {
    if (!isNomValide) {
      if (/^[0-9]+$/.test(nom)) {
        messageErreur.textContent =
          "Le nom ne peut pas contenir des chiffres. Veuillez réessayer.";
      } else {
        messageErreur.textContent =
          "Le nom doit commencer par une majuscule suivie de lettres minuscules. Veuillez réessayer.";
      }
    }
    if (!isPrenomValide) {
      if (/^[0-9]+$/.test(prenom)) {
        messageErreur.textContent =
          "Le prénom ne peut pas contenir des chiffres. Veuillez réessayer.";
      } else {
        messageErreur.textContent =
          "Le prénom doit commencer par une majuscule suivie de lettres minuscules. Veuillez réessayer.";
      }
    }
    clearMessage(messageErreur);
    return;
  }

  const nouvelAdherent = ajouterAdherent(nom, prenom, email);

  if (nouvelAdherent) {
    form.reset();
    messageAjout.textContent = `L'adhérent ${nouvelAdherent.nom} ${nouvelAdherent.prenom} a été ajouté.`;
    clearMessage(messageAjout);
  }
});



const lienRetour = document.getElementById("retour");
const tableContainer = document.getElementById("tableContainer");
const adherentForm = document.getElementById("adherentForm");

lienRetour.addEventListener("click", function (event) {
  event.preventDefault();

  // Afficher le tableau des adhérents
  tableContainer.classList.remove("hide");

  // Cache le formulaire
  adherentForm.classList.add("hide");
});
// Fonction pour générer un code adhérent unique
let codeAdherentCounter = 6; // Commencez à partir de 6, car vous avez déjà des adhérents jusqu'à "006"

function generateCodeAdherent() {
  codeAdherentCounter++;
  return codeAdherentCounter.toString().padStart(3, "0");
}

// Fonction pour effacer un message après un certain délai
function clearMessage(element) {
  setTimeout(function () {
    element.textContent = "";
  }, 3000);
}



// Appelle la fonction afficherAdherents pour afficher les adhérents existants
afficherAdherents();

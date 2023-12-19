/*
      this.adherents = new Map([
        [
          "001",
          {
            id: "001",
            nom: "Dupont",
            prenom: "Jean",
            email: "jean.dupont@email.com",
            emprunts: [],
          },
        ],
        [
          "002",
          {
            id: "002",
            nom: "Martin",
            prenom: "Sophie",
            email: "sophie.martin@email.com",
            emprunts: [],
          },
        ],
        [
          "003",
          {
            id: "003",
            nom: "Lefevre",
            prenom: "Pierre",
            email: "pierre.lefevre@email.com",
            emprunts: [],
          },
        ],
        [
          "004",
          {
            id: "004",
            nom: "Dufour",
            prenom: "Marie",
            email: "marie.dufour@email.com",
            emprunts: [],
          },
        ],
        [
          "005",
          {
            id: "005",
            nom: "Leroy",
            prenom: "Lucas",
            email: "lucas.leroy@email.com",
            emprunts: [],
          },
        ],
        [
          "006",
          {
            id: "006",
            nom: "Bertrand",
            prenom: "Anna",
            email: "anna.bertrand@email.com",
            emprunts: [],
          },
        ],
      ]);

      // Fonction pour afficher les détails des adhérents
      function afficherDetailsAdherents() {
        const detailsAdherentsElement =
          document.getElementById("detailsAdherents");

        // Nettoie le contenu actuel des détails des adhérents
        detailsAdherentsElement.innerHTML = "";

        this.adherents.forEach((adherent, id) => {
          const detailsAdherent = document.createElement("div");
          detailsAdherent.classList.add("adherent-details");

          detailsAdherent.innerHTML = `
          <p>ID: ${id}</p>
          <p>Nom: ${adherent.nom}</p>
          <p>Prénom: ${adherent.prenom}</p>
          <p>Email: ${adherent.email}</p>
          <p>--------------</p>
        `;

          detailsAdherentsElement.appendChild(detailsAdherent);
        });
      }

      // Appelez cette fonction pour afficher les détails des adhérents dans votre interface utilisateur
      afficherDetailsAdherents();

      function Adherent(nom, prenom, email) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
      }

      // Création d'une liste vide d'adhérents
      let listeAdherents = [];

      const form = document.getElementById("adherentForm");
      const listeAdherentsElement = document.getElementById("listeAdherents");
      const modifierAdherentForm = document.getElementById(
        "modifierAdherentForm"
      );
      const messageModification = document.getElementById(
        "messageModification"
      );
      const messageAjout = document.getElementById("messageAjout");

      // Cette fonction supprime le contenu du message après un délai de 3 secondes
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

      modifierAdherentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nom = document.getElementById("nomModifier").value;
        const prenom = document.getElementById("prenomModifier").value;
        const nouvelEmail = document.getElementById("nouvelEmail").value;

        modifierAdherent(nom, prenom, nouvelEmail);
        modifierAdherentForm.reset();
      });

      function ajouterAdherent(nom, prenom, email) {
        let nouvelAdherent = new Adherent(nom, prenom, email);
        listeAdherents.push(nouvelAdherent);
      }

      function afficherAdherents() {
        listeAdherentsElement.innerHTML = "";

        listeAdherents.forEach(function (adherent, index) {
          const listItem = document.createElement("li");
          listItem.innerHTML = `Adhérent ${index + 1}:<br>Nom: ${
            adherent.nom
          }<br>Prénom: ${adherent.prenom}<br>Email: ${
            adherent.email
          }<br>--------------`;
          listeAdherentsElement.appendChild(listItem);
        });
      }

      function emailExists(email) {
        return listeAdherents.some((adherent) => adherent.email === email);
      }

      function modifierAdherent(nom, prenom, nouvelEmail) {
        let found = false;

        for (let i = 0; i < listeAdherents.length; i++) {
          if (
            listeAdherents[i].nom === nom &&
            listeAdherents[i].prenom === prenom
          ) {
            if (
              emailExists(nouvelEmail) &&
              listeAdherents[i].email !== nouvelEmail
            ) {
              alert(
                "L'adresse email est déjà utilisée. Veuillez entrer une autre adresse email."
              );
              return;
            }

            listeAdherents[i].email = nouvelEmail;
            found = true;
            updateAdherentInList(i);
            break;
          }
        }

        if (!found) {
          console.log("Adhérent non trouvé");
        } else {
          messageModification.textContent = `L'adresse email de l'adhérent ${prenom} ${nom} a été modifiée.`;
          setTimeout(() => {
            messageModification.textContent = "";
          }, 3000);
        }
      }

      function updateAdherentInList(index) {
        const updatedAdherent = listeAdherents[index];
        const listItemToUpdate = listeAdherentsElement.childNodes[index];

        listItemToUpdate.innerHTML = `Adhérent ${index + 1}:<br>Nom: ${
          updatedAdherent.nom
        }<br>Prénom: ${updatedAdherent.prenom}<br>Email: ${
          updatedAdherent.email
        }<br>--------------`;
      }*/
// Fonction pour afficher les détails des adhérents
function afficherDetailsAdherents() {
  const detailsAdherentsElement = document.getElementById("detailsAdherents");

  // Nettoie le contenu actuel des détails des adhérents
  detailsAdherentsElement.innerHTML = "";

 
  this.adherents.forEach((adherent, id) => {
    const detailsAdherent = document.createElement("div");
    detailsAdherent.classList.add("adherent-details");

    detailsAdherent.innerHTML = `
    <p>ID: ${id}</p>
    <p>Nom: ${adherent.nom}</p>
    <p>Prénom: ${adherent.prenom}</p>
    <p>Email: ${adherent.email}</p>
    <p>--------------</p>
  `;

    detailsAdherentsElement.appendChild(detailsAdherent);
  });
}

// Appelez cette fonction pour afficher les détails des adhérents dans votre interface utilisateur
afficherDetailsAdherents();

/*
const adherentsData = new Map([
    ["001", { 
        id: "001", 
        nom: "Dupont", 
        prenom: "Jean", 
        email: "jean.dupont@email.com", 
        emprunts: [],
        login: "jean.dupont",
        password: "motdepasse123",
        dateAdhesion: "2023-01-01" // Remplacez par la véritable date d'adhésion
    }],
    ["002", { 
        id: "002", 
        nom: "Martin", 
        prenom: "Sophie", 
        email: "sophie.martin@email.com", 
        emprunts: [],
        login: "sophie.martin",
        password: "motdepasse456",
        dateAdhesion: "2023-02-15" // Remplacez par la véritable date d'adhésion
    }],
    ["003", { 
        id: "003", 
        nom: "Lefevre", 
        prenom: "Pierre", 
        email: "pierre.lefevre@email.com", 
        emprunts: [],
        login: "pierre.lefevre",
        password: "motdepasse789",
        dateAdhesion: "2023-03-20" // Remplacez par la véritable date d'adhésion
    }],
    ["004", { 
        id: "004", 
        nom: "Dufour", 
        prenom: "Marie", 
        email: "marie.dufour@email.com", 
        emprunts: [],
        login: "marie.dufour",
        password: "motdepasseabc",
        dateAdhesion: "2023-04-05" // Remplacez par la véritable date d'adhésion
    }],
    ["005", { 
        id: "005", 
        nom: "Leroy", 
        prenom: "Lucas", 
        email: "lucas.leroy@email.com", 
        emprunts: [],
        login: "lucas.leroy",
        password: "motdepassexyz",
        dateAdhesion: "2023-05-10" // Remplacez par la véritable date d'adhésion
    }],
    ["006", { 
        id: "006", 
        nom: "Bertrand", 
        prenom: "Anna", 
        email: "anna.bertrand@email.com", 
        emprunts: [],
        login: "anna.bertrand",
        password: "motdepasse123",
        dateAdhesion: "2023-06-15" // Remplacez par la véritable date d'adhésion
    }],
]);
*/
function Adherent(nom, prenom, email) {
  this.nom = nom;
  this.prenom = prenom;
  this.email = email;
}

// Création d'une liste vide d'adhérents
//let listeAdherents = [];

const form = document.getElementById("adherentForm");
const listeAdherentsElement = document.getElementById("listeAdherents");
const modifierAdherentForm = document.getElementById("modifierAdherentForm");
const messageModification = document.getElementById("messageModification");
const messageAjout = document.getElementById("messageAjout");

// Cette fonction supprime le contenu du message après un délai de 3 secondes
function clearMessage(element) {
  setTimeout(function () {
    element.textContent = "";

    // Réinitialisation des styles CSS
    element.style.color = "";
    element.style.backgroundColor = "";
    element.style.border = "";
    element.style.padding = "";
    element.style.margin = "";
  }, 3000);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;

  if (emailExists(email)) {
    const errorMessageElement = document.createElement("div");
    errorMessageElement.textContent =
      "L'adresse email est déjà utilisée. Veuillez entrer une autre adresse email.";
    errorMessageElement.style.color = "red";
    errorMessageElement.style.backgroundColor = "#ffe6e6";
    errorMessageElement.style.border = "1px solid #ff6666";
    errorMessageElement.style.padding = "10px";
    errorMessageElement.style.margin = "10px 0";

    // Insère le message d'erreur dans votre interface utilisateur
    form.insertAdjacentElement("beforebegin", errorMessageElement);

    // Efface le message après 3 secondes
    setTimeout(() => {
      errorMessageElement.remove();
    }, 3000);

    return;
  }

  ajouterAdherent(nom, prenom, email);
  afficherAdherents();
  form.reset();

  messageAjout.textContent = "Un nouvel adhérent a été ajouté.";
  clearMessage(messageAjout);

  // Application des styles CSS
  messageAjout.style.color = "green";
  messageAjout.style.backgroundColor = "#e6ffe6";
  messageAjout.style.border = "1px solid #66ff66";
  messageAjout.style.padding = "10px";
  messageAjout.style.margin = "10px 0";
});

modifierAdherentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nom = document.getElementById("nomModifier").value;
  const prenom = document.getElementById("prenomModifier").value;
  const nouvelEmail = document.getElementById("nouvelEmail").value;

  modifierAdherent(nom, prenom, nouvelEmail);
  modifierAdherentForm.reset();
});

function ajouterAdherent(nom, prenom, email) {
  let nouvelAdherent = new Adherent(nom, prenom, email);
  // Initialise la propriété 'anciennesAdresses' pour chaque nouvel adhérent
  nouvelAdherent.anciennesAdresses = [];

  listeAdherents.push(nouvelAdherent);
}

function afficherAdherents() {
  listeAdherentsElement.innerHTML = "";

  adherentsData.forEach(function (adherent, index) {
    const listItem = document.createElement("li");
    listItem.innerHTML =`
    Adhérent ${index}:<br>
    ID: ${adherent.id}<br>
    Nom: ${adherent.nom}<br>
    Prénom: ${adherent.prenom}<br>
    Email: ${adherent.email}<br>
    Emprunts: ${JSON.stringify(adherent.emprunts)}<br>
    Login: ${adherent.login}<br>
    Mot de passe: ${adherent.password}<br>
    Date d'adhésion: ${adherent.dateAdhesion}<br>
    --------------
  `;
    listeAdherentsElement.appendChild(listItem);
  });
}

function emailExists(email) {
  return listeAdherents.some((adherent) => adherent.email === email);
}


function modifierAdherent(nom, prenom, nouvelEmail) {
  let found = false;

  for (let i = 0; i < listeAdherents.length; i++) {
    if (listeAdherents[i].nom === nom && listeAdherents[i].prenom === prenom) {
      if (
        emailExists(nouvelEmail) &&
        listeAdherents[i].email !== nouvelEmail &&
        listeAdherents[i].anciennesAdresses.includes(nouvelEmail)
      ) {
        alert(
          "Vous avez déjà changé l'adresse email de cet utilisateur avec cette adresse. Veuillez utiliser une autre adresse email."
        );
        return;
      }

      if (emailExists(nouvelEmail)) {
        alert(
          "L'adresse email est déjà utilisée par un autre adhérent. Veuillez entrer une autre adresse email."
        );
        return;
      }

      if (emailExists(nouvelEmail) && listeAdherents[i].email !== nouvelEmail) {
        if (
          !listeAdherents[i].anciennesAdresses.includes(listeAdherents[i].email)
        ) {
          listeAdherents[i].anciennesAdresses.push(listeAdherents[i].email);
        }
      }

      listeAdherents[i].email = nouvelEmail;
      found = true;
      updateAdherentInList(i);
      break;
    }
  }

  if (!found) {
    console.log("Adhérent non trouvé");
  } else {
    messageModification.textContent = `L'adresse email de l'adhérent ${prenom} ${nom} a été modifiée.`;
    setTimeout(() => {
      messageModification.textContent = "";
    }, 3000);
  }
}

function modifierAdherent(nom, prenom, nouvelEmail) {
  let found = false;

  for (const [id, adherent] of adherentsData.entries()) {
    if (adherent.nom === nom && adherent.prenom === prenom) {
      if (
        adherent.email !== nouvelEmail &&
        adherentsData.has(nouvelEmail)
      ) {
        alert(
          "L'adresse email est déjà utilisée par un autre adhérent. Veuillez entrer une autre adresse email."
        );
        return;
      }

      // Gérer les anciennes adresses email
      if (!adherent.anciennesAdresses) {
        adherent.anciennesAdresses = [];
      }

      if (adherent.email !== nouvelEmail) {
        adherent.anciennesAdresses.push(adherent.email);
      }

      adherent.email = nouvelEmail;
      found = true;
      updateAdherentInList(id);
      break;
    }
  }

  if (!found) {
    console.log("Adhérent non trouvé");
  } else {
    messageModification.textContent = `L'adresse email de l'adhérent ${prenom} ${nom} a été modifiée.`;
    setTimeout(() => {
      messageModification.textContent = "";
    }, 3000);
  }
}


function updateAdherentInList(index) {
  const updatedAdherent = listeAdherents[index];
  const listItemToUpdate = listeAdherentsElement.childNodes[index];

  listItemToUpdate.innerHTML =`
  Adhérent ${updatedAdherent.id}:<br>
  ID: ${updatedAdherent.id}<br>
  Nom: ${updatedAdherent.nom}<br>
  Prénom: ${updatedAdherent.prenom}<br>
  Email: ${updatedAdherent.email}<br>
  Emprunts: ${JSON.stringify(updatedAdherent.emprunts)}<br>
  Login: ${updatedAdherent.login}<br>
  Mot de passe: ${updatedAdherent.password}<br>
  Date d'adhésion: ${updatedAdherent.dateAdhesion}<br>
  --------------
` ;
}

function updateAdherentInList(index) {
  const updatedAdherent = listeAdherents[index];
  const listItemToUpdate = listeAdherentsElement.childNodes[index];

  if (listItemToUpdate) {
    listItemToUpdate.innerHTML = `
    Adhérent ${index + 1}:<br>
    ID: ${updatedAdherent.id}<br>
    Nom: ${updatedAdherent.nom}<br>
    Prénom: ${updatedAdherent.prenom}<br>
    Email: ${updatedAdherent.email}<br>
    Emprunts: ${JSON.stringify(updatedAdherent.emprunts)}<br>
    Login: ${updatedAdherent.login}<br>
    Mot de passe: ${updatedAdherent.password}<br>
    Date d'adhésion: ${updatedAdherent.dateAdhesion}<br>
    --------------
  `;
  } else {
    console.error("Élément HTML non trouvé pour la mise à jour.");
  }
}

const supprimerAdherentForm = document.getElementById("supprimerAdherentForm");
const messageSuppression = document.getElementById("messageSuppression");

supprimerAdherentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nom = document.getElementById("nomSupprimer").value;
  const prenom = document.getElementById("prenomSupprimer").value;
  const email = document.getElementById("emailSupprimer").value;

  supprimerAdherent(nom, prenom, email);
  supprimerAdherentForm.reset();
});


function supprimerAdherent(nom, prenom, email) {
  let found = false;
  for (let i = 0; i < listeAdherents.length; i++) {
    if (
      listeAdherents[i].nom === nom &&
      listeAdherents[i].prenom === prenom &&
      listeAdherents[i].email === email
    ) {
      listeAdherents.splice(i, 1); // Supprime l'adhérent du tableau
      found = true;
      afficherAdherents(); // Met à jour l'affichage de la liste des adhérents
      break;
    }
  }

  if (!found) {
    messageSuppression.textContent = "Adhérent non trouvé.";
    setTimeout(() => {
      messageSuppression.textContent = "";
    }, 3000);
  } else {
    messageSuppression.textContent = `L'adhérent ${prenom} ${nom} a été supprimé.`;
    setTimeout(() => {
      messageSuppression.textContent = "";
    }, 3000);
  }
}

function supprimerAdherent(nom, prenom, email) {
  let found = false;

  for (const [id, adherent] of adherentsData.entries()) {
    if (
      adherent.nom === nom &&
      adherent.prenom === prenom &&
      adherent.email === email
    ) {
      adherentsData.delete(id);
      found = true;
      afficherAdherents();
      break;
    }
  }

  if (!found) {
    messageSuppression.textContent = "Adhérent non trouvé.";
    setTimeout(() => {
      messageSuppression.textContent = "";
    }, 3000);
  } else {
    messageSuppression.textContent = `L'adhérent ${prenom} ${nom} a été supprimé.`;
    setTimeout(() => {
      messageSuppression.textContent = "";
    }, 3000);
  }
}

// Initialisation de l'affichage des adhérents
afficherAdherents();


/*
const adherentsData = new Map([
  [
    "001",
    {
      codeAdherent: "001",
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@email.com",
      emprunts: [],
      login: "jean.dupont",
      pass: "motdepasse123",
      dateAdhesion: "2023-01-01",
    },
  ],
  [
    "002",
    {
      codeAdherent: "002",
      nom: "Martin",
      prenom: "Sophie",
      email: "sophie.martin@email.com",
      emprunts: [],
      login: "sophie.martin",
      pass: "motdepasse456",
      dateAdhesion: "2023-02-15",
    },
  ],
  [
    "003",
    {
      codeAdherent: "003",
      nom: "Lefevre",
      prenom: "Pierre",
      email: "pierre.lefevre@email.com",
      emprunts: [],
      login: "pierre.lefevre",
      pass: "motdepasse789",
      dateAdhesion: "2023-03-20",
    },
  ],
  [
    "004",
    {
      codeAdherent: "004",
      nom: "Dufour",
      prenom: "Marie",
      email: "marie.dufour@email.com",
      emprunts: [],
      login: "marie.dufour",
      pass: "motdepasseabc",
      dateAdhesion: "2023-04-05",
    },
  ],
  [
    "005",
    {
      codeAdherent: "005",
      nom: "Leroy",
      prenom: "Lucas",
      email: "lucas.leroy@email.com",
      emprunts: [],
      login: "lucas.leroy",
      pass: "motdepassexyz",
      dateAdhesion: "2023-05-10",
    },
  ],
  [
    "006",
    {
      codeAdherent: "006",
      nom: "Bertrand",
      prenom: "Anna",
      email: "anna.bertrand@email.com",
      emprunts: [],
      login: "anna.bertrand",
      pass: "motdepasse123",
      dateAdhesion: "2023-06-15",
    },
  ],
]);

function Adherent(nom, prenom, email) {
  this.nom = nom;
  this.prenom = prenom;
  this.email = email;
}

const form = document.getElementById("adherentForm");
const listeAdherentsElement = document.getElementById("listeAdherents");
const modifierAdherentForm = document.getElementById("modifierAdherentForm");
const messageModification = document.getElementById("messageModification");
const messageAjout = document.getElementById("messageAjout");

function clearMessage(element) {
  setTimeout(function () {
    element.textContent = "";
    element.style.color = "";
    element.style.backgroundColor = "";
    element.style.border = "";
    element.style.padding = "";
    element.style.margin = "";
  }, 3000);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;

  if (adherentsData.has(email)) {
    const errorMessageElement = document.createElement("div");
    errorMessageElement.textContent =
      "L'adresse email est déjà utilisée. Veuillez entrer une autre adresse email.";
    errorMessageElement.style.color = "red";
    errorMessageElement.style.backgroundColor = "#ffe6e6";
    errorMessageElement.style.border = "1px solid #ff6666";
    errorMessageElement.style.padding = "10px";
    errorMessageElement.style.margin = "10px 0";

    form.insertAdjacentElement("beforebegin", errorMessageElement);

    setTimeout(() => {
      errorMessageElement.remove();
    }, 3000);

    return;
  }

  ajouterAdherent(nom, prenom, email);
  afficherAdherents();
  form.reset();

  messageAjout.textContent = "Un nouvel adhérent a été ajouté.";
  clearMessage(messageAjout);

  messageAjout.style.color = "green";
  messageAjout.style.backgroundColor = "#e6ffe6";
  messageAjout.style.border = "1px solid #66ff66";
  messageAjout.style.padding = "10px";
  messageAjout.style.margin = "10px 0";
});

modifierAdherentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nom = document.getElementById("nomModifier").value;
  const prenom = document.getElementById("prenomModifier").value;
  const nouvelEmail = document.getElementById("nouvelEmail").value;

  modifierAdherent(nom, prenom, nouvelEmail);
  modifierAdherentForm.reset();
});

/*
function ajouterAdherent(nom, prenom, email) {
  let nouvelAdherent = new Adherent(nom, prenom, email);
  adherentsData.set(nouvelAdherent.id, nouvelAdherent);
}

function ajouterAdherent(
  codeAdherent,
  nom,
  prenom,
  email,
  emprunts,
  login,
  password,
  dateAdhesion
) {
  let nouvelAdherent = new Adherent(nom, prenom, email);
  nouvelAdherent.codeAdherent = codeAdherent;
  nouvelAdherent.emprunts = emprunts;
  nouvelAdherent.login = login;
  nouvelAdherent.password = password;
  nouvelAdherent.dateAdhesion = dateAdhesion;

  adherentsData.set(codeAdherent, nouvelAdherent);
}
*/
/*function ajouterAdherent(nom, prenom, email) {
  if (adherentsData.has(email)) {
    alert("L'adresse email est déjà utilisée. Veuillez entrer une autre adresse email.");
    return;
  }

  let nouvelAdherent = new Adherent(nom, prenom, email);
  nouvelAdherent.codeAdherent = generateAdherentCode(); // Générez un code unique ici
  adherentsData.set(nouvelAdherent.codeAdherent, nouvelAdherent);
  afficherAdherents();
  form.reset();

  messageAjout.textContent = "Un nouvel adhérent a été ajouté.";
  clearMessage(messageAjout);
}

function generateAdherentCode() {
  // Générez un code unique ici (par exemple, un numéro aléatoire)
  return Math.floor(Math.random() * 1000).toString();
}

function afficherAdherents() {
  listeAdherentsElement.innerHTML = "";

  adherentsData.forEach(function (adherent, index) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    Adhérent ${index + 1}:<br>
    ID: ${adherent.codeAdherent}<br>
    Nom: ${adherent.nom}<br>
    Prénom: ${adherent.prenom}<br>
    Email: ${adherent.email}<br> 
    <!-- Emprunts: ${JSON.stringify(adherent.emprunts)}<br> -->
    <!-- Login: ${adherent.login}<br> -->
    <!-- Mot de passe: ${adherent.password}<br>-->
    <!-- Date d'adhésion: ${adherent.dateAdhesion}<br>-->
    --------------
  `;
    listeAdherentsElement.appendChild(listItem);
  });
}

function modifierAdherent(nom, prenom, nouvelEmail) {
  const adherentId = findAdherentIdByNomPrenom(nom, prenom);

  if (adherentId !== null) {
    const ancienAdherent = adherentsData.get(adherentId);

    if (
      ancienAdherent.email !== nouvelEmail &&
      adherentsData.has(nouvelEmail)
    ) {
      alert(
        "L'adresse email est déjà utilisée par un autre adhérent. Veuillez entrer une autre adresse email."
      );
      return;
    }

    if (!ancienAdherent.anciennesAdresses) {
      ancienAdherent.anciennesAdresses = [];
    }

    if (ancienAdherent.email !== nouvelEmail) {
      ancienAdherent.anciennesAdresses.push(ancienAdherent.email);
    }

    ancienAdherent.email = nouvelEmail;
    updateAdherentInList(adherentId);
  } else {
    console.log("Adhérent non trouvé");
  }
}

function updateAdherentInList(adherentId) {
  const updatedAdherent = adherentsData.get(adherentId);

  // Mettez à jour l'élément HTML correspondant ici
  // ...

  messageModification.textContent = `L'adresse email de l'adhérent ${updatedAdherent.prenom} ${updatedAdherent.nom} a été modifiée.`;
  setTimeout(() => {
    messageModification.textContent = "";
  }, 3000);
}

function findAdherentIdByNomPrenom(nom, prenom) {
  for (const [id, adherent] of adherentsData) {
    if (adherent.nom === nom && adherent.prenom === prenom) {
      return id;
    }
  }
  return null;
}

const supprimerAdherentForm = document.getElementById("supprimerAdherentForm");

supprimerAdherentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nom = document.getElementById("nomSupprimer").value;
  const prenom = document.getElementById("prenomSupprimer").value;
  const email = document.getElementById("emailSupprimer").value;

  supprimerAdherent(nom, prenom, email);
  supprimerAdherentForm.reset();
});

function supprimerAdherent(nom, prenom, email) {
  const adherentId = findAdherentIdByNomPrenom(nom, prenom);

  if (adherentId !== null) {
    adherentsData.delete(adherentId);
    afficherAdherents();
  } else {
    console.log("Adhérent non trouvé");
  }
}
*/
/*function modifierAdherent(nom, prenom, nouvelEmail) {
    let found = false;

    for (let i = 0; i < listeAdherents.length; i++) {
      if (
        listeAdherents[i].nom === nom &&
        listeAdherents[i].prenom === prenom
      ) {
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

        if (
          emailExists(nouvelEmail) &&
          listeAdherents[i].email !== nouvelEmail
        ) {
          if (
            !listeAdherents[i].anciennesAdresses.includes(
              listeAdherents[i].email
            )
          ) {
            listeAdherents[i].anciennesAdresses.push(
              listeAdherents[i].email
            );
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

  function updateAdherentInList(index) {
    const updatedAdherent = listeAdherents[index];
    const listItemToUpdate = listeAdherentsElement.childNodes[index];

    listItemToUpdate.innerHTML = `Adhérent ${index + 1}:<br>Nom: ${
      updatedAdherent.nom
    }<br>Prénom: ${updatedAdherent.prenom}<br>Email: ${
      updatedAdherent.email
    }<br>--------------`;
  }
*/

// modifications.js

function editerAdherent(codeAdherent) {
  const adherent = adherents.get(codeAdherent);

  const editForms = document.querySelectorAll('[id^="editForm-"]');
  editForms.forEach((form) => {
    form.style.display = "none";
  });

  const editForm = document.getElementById(`editForm-${codeAdherent}`);
  if (editForm) {
    if (editForm.style.display === "block") {
      editForm.style.display = "none"; // Masque le formulaire si déjà affiché
    } else {
      editForm.style.display = "block"; // Affiche le formulaire s'il est masqué
      const modifierBtn = editForm.querySelector("#modifierBtn");
      if (modifierBtn) {
        modifierBtn.classList.remove("hidden"); // Retire la classe hidden pour afficher le bouton
      } else {
        console.log("Bouton non trouvé.");
      }
    }
  } else {
    const form = document.createElement("form");
    form.id = `editForm-${codeAdherent}`;
    form.className = "editFormClass";
    form.innerHTML = `

    <label for="adherent-${codeAdherent}">ID :</label>
      <input type="text" id="adherent-${codeAdherent}" value="${codeAdherent}" class="idModifier" required><br><br>

      <label for="editNom-${codeAdherent}">Nom :</label>
      <input type="text" id="editNom-${codeAdherent}" value="${adherent.nom}" class="nomModifier" required><br><br>

      <label for="editPrenom-${codeAdherent}">Prénom :</label>
      <input type="text" id="editPrenom-${codeAdherent}" value="${adherent.prenom}" class="prenomModifier" required><br><br>

      <label for="editEmail-${codeAdherent}">Email :</label>
      <input type="text" id="editEmail-${codeAdherent}" value="${adherent.email}" class="nouvelEmail" required><br><br>

      <button id="modifierBtn-${codeAdherent}" type="submit">Enregistrer</button>
    `;

    
    function mettreAJourLigneAdherent(codeAdherent, nom, prenom, email) {
      // Sélectionne l'élément du bouton Éditer en utilisant l'attribut data-code
      const elementBModifier = document.querySelector(`[data-code="${codeAdherent}"]`);
    
      function emailExists(email) {
        return Array.from(adherents.values()).some((adherent) => adherent.email === email);
      }
      
      // Vérifie si l'élément du bouton Éditer a été trouvé
      if (elementBModifier) {
        // Trouve la ligne (élément tr) la plus proche à partir du bouton Éditer
        const tableRow = elementBModifier.closest("tr");
    
        // Vérifie si la ligne a été trouvée
        if (tableRow) {
          // Vérifie si l'adresse e-mail existante a été modifiée
          const emailExistante = tableRow.querySelector("#tomail").textContent;
    
          if (emailExistante !== email) {
            // Vérifie si la nouvelle adresse e-mail est déjà utilisée par un autre adhérent
            if (emailExists(email)) {
              const messageErreur = document.getElementById("messageErreur");
              messageErreur.textContent = "L'adresse email est déjà utilisée par un autre adhérent. Veuillez entrer une autre adresse email.";
              clearMessage(messageErreur);
              return;
            }
          }
    
 // Met à jour le contenu des cellules de la ligne avec les nouvelles valeurs
// Met à jour le contenu des cellules de la ligne avec les nouvelles valeurs
tableRow.children[0].textContent = codeAdherent;
tableRow.children[1].textContent = nom;
tableRow.children[2].textContent = prenom;
tableRow.children[3].textContent = email;
       
        } else {
          // Affiche une erreur si la ligne n'est pas trouvée
          console.error(
            `L'élément avec data-code "${codeAdherent}" n'est pas à l'intérieur d'une balise <tr>.`
          );
        }
     
        form.reset();
       } else {
        // Affiche une erreur si l'élément du bouton Éditer n'est pas trouvé
        console.error(`Élément avec data-code "${codeAdherent}" non trouvé.`);
      }
    }
    
    
    
    // Ajoutez un gestionnaire d'événements 'submit' au formulaire créé
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêche le comportement par défaut du formulaire

      // Récupérez les valeurs modifiées du formulaire pour l'adhérent
      //const Di = document.querySelector(`.idModifier`).value;
      const nom = document.querySelector(`.nomModifier`).value;
      const prenom = document.querySelector(`.prenomModifier`).value;
      const email = document.querySelector(`.nouvelEmail`).value;
      const messageErreur = document.getElementById("messageErreur");


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

      // Mettre à jour la ligne correspondante dans le tableau
      mettreAJourLigneAdherent(codeAdherent, prenom, email);

      // Afficher la notification
      const messageModification = document.getElementById(
        "messageModification"
      );
      messageModification.textContent = `L'adhérent ${adherent.nom} ${adherent.prenom} a été modifié.`;
      clearMessage(messageModification);

      // Masquer le formulaire après modification
      //editForm.style.display = "none";
    });

    const adherentForm = document.getElementById("adherentForm");
    if (adherentForm) {
      adherentForm.insertAdjacentElement("afterend", form);
    } else {
      console.error("Formulaire d'adhérent non trouvé dans le DOM.");
    }
  }

  function clearMessage(element) {
    setTimeout(() => {
      element.textContent = "";
    }, 5000);
  }
}

/*
// Sélection de l'élément bouton
const modifierBtn = document.getElementById('modifierBtn');

// Ajout d'un gestionnaire d'événements 'click'
modifierBtn.addEventListener('click', function() {
  /* votre code pour obtenir le code adhérent 
    // Récupérer les valeurs des champs du formulaire
    const nom = document.querySelector(`.nomModifier`).value;
    const prenom = document.querySelector(`.prenomModifier`).value;
    const email = document.querySelector(`.nouvelEmail`).value;

  const adherent = adherents.get(codeAdherent);
  adherent.nom = nom;
  adherent.prenom = prenom;

  if (adherents.has(codeAdherent)) {
    const adh = adherents.get(codeAdherent);
    adh.email = email;

    adherents.set(codeAdherent, adh);

    console.log(`Nouvel email pour ${adh.nom} ${adh.prenom}: ${adh.email}`);
  } else {
    console.log("L'adhérent n'existe pas");
  }
});



document.addEventListener("DOMContentLoaded", function () {
  // Récupérer le bouton "Enregistrer"
  const modifierBtn = document.getElementById("modifierBtn");

  if (modifierBtn) {
    modifierBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Empêche le comportement par défaut du bouton

    
     // Récupérer les valeurs des champs du formulaire
      const nom = document.querySelector(`.nomModifier`).value;
      const prenom = document.querySelector(`.prenomModifier`).value;
      const email = document.querySelector(`.nouvelEmail`).value;

      // Appeler une fonction pour traiter les données du formulaire
      traiterFormulaire(codeAdherent, nom, prenom, email);
    });
  } else {
    console.error("Bouton 'Enregistrer' non trouvé dans le DOM.");
  }
});

// Fonction pour traiter les données du formulaire
function traiterFormulaire(codeAdherent, nom, prenom, email) {
  // Effectuer le traitement des données (par exemple, mettre à jour la base de données)
  console.log(`Code Adhérent: ${codeAdherent}`);
  console.log(`Nouveau Nom: ${nom}`);
  console.log(`Nouveau Prénom: ${prenom}`);
  console.log(`Nouvel Email: ${email}`);

  // Vous pouvez insérer ici votre logique pour mettre à jour la base de données ou autre traitement nécessaire
}
*/

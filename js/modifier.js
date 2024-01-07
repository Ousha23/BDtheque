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

      <button id="modifierBtn-${codeAdherent}" type="submit" class="mod">Modifier</button>
    `;

    function mettreAJourLigneAdherent(codeAdherent, nom, prenom, email) {
      const elementBModifier = document.querySelector(
        `[data-code="${codeAdherent}"]`
      );

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailValid = emailRegex.test(email);

      if (!emailValid) {
        afficherMessageErreur("Veuillez saisir une adresse e-mail valide.");
        return;
      }

      const emailExists = Array.from(adherents.values()).some(
        (adherent) => adherent.email === email
      );

      if (elementBModifier) {
        const tableRow = elementBModifier.closest("tr");
        if (tableRow) {
          const emailExistante = tableRow.querySelector("#tomail").textContent;

          if (emailExistante !== email && emailExists) {
            afficherMessageErreur(
              "L'adresse email est déjà utilisée par un autre adhérent. Veuillez entrer une autre adresse email."
            );
            return;
          }

          tableRow.children[0].textContent = codeAdherent;
          tableRow.children[1].textContent = nom;
          tableRow.children[2].textContent = prenom;
          tableRow.children[3].textContent = email;


            // Met à jour les données de l'adhérent dans le Map
  adherents.set(codeAdherent, { nom, prenom, email });

  // Met à jour le local storage après la modification
  localStorage.setItem("adherents", JSON.stringify([...adherents]));

         

       
        } else {
          console.error(
            `L'élément avec data-code "${codeAdherent}" n'est pas à l'intérieur d'une balise <tr>.`
          );
        }
      } else {
        console.error(
          `Élément avec data-code "${codeAdherent}" non trouvé.`
        );
      }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nom = document.querySelector(`.nomModifier`).value;
      const prenom = document.querySelector(`.prenomModifier`).value;
      const email = document.querySelector(`.nouvelEmail`).value;

      const messageErreur = document.getElementById("messageErreur");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailValid = emailRegex.test(email);

      if (!emailValid) {
        afficherMessageErreur("Veuillez saisir une adresse e-mail valide.");
        return;
      }

      if (
        nom === adherent.nom &&
        prenom === adherent.prenom &&
        email === adherent.email
      ) {
        messageErreur.textContent =
          "Veuillez modifier les informations pour effectuer la mise à jour.";
        clearMessage(messageErreur);
        return;
      }

      function validerNomPrenom(chaine) {
        const estValideCasse = /^[A-Z][a-z\-]*$/.test(chaine);
        const estValideLettres = /^[a-zA-Z\-]+$/.test(chaine);
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

      mettreAJourLigneAdherent(codeAdherent, nom, prenom, email);

      const messageModification = document.getElementById(
        "messageModification"
      );
      messageModification.textContent = `L'adhérent ${adherent.nom} ${adherent.prenom} a été modifié.`;
      clearMessage(messageModification);

      document.querySelector(`.idModifier`).value = "";
      document.querySelector(`.nomModifier`).value = "";
      document.querySelector(`.prenomModifier`).value = "";
      document.querySelector(`.nouvelEmail`).value = "";

      form.style.display = "none";
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

  function afficherMessageErreur(message) {
    const messageErreur = document.getElementById("messageErreur");
    if (messageErreur) {
      messageErreur.textContent = message;
      clearMessage(messageErreur);
    } else {
      console.error("Élément avec l'id 'messageErreur' non trouvé dans le DOM.");
    }
  }

  function clearMessage(element) {
    setTimeout(() => {
      element.textContent = "";
    }, 5000);
  }
}

/*
function sauvegarderAdherentDansLocalStorage(codeAdherent, nom, prenom, email) {
  let adherentsLocalStorage = localStorage.getItem("adherents");
  let adherents = {};

  if (adherentsLocalStorage) {
    adherents = JSON.parse(adherentsLocalStorage);
  }

  adherents[codeAdherent] = { nom, prenom, email };

  localStorage.setItem("adherents", JSON.stringify(adherents));
}
*/

function sauvegarderAdherentDansLocalStorage(codeAdherent, nom, prenom, email) {
  try {
    if (!codeAdherent || !nom || !prenom || !email) {
      console.error("Les paramètres ne peuvent pas être vides ou nuls.");
      return;
    }

    let adherentsLocalStorage = localStorage.getItem("adherents");
    let adherents = {};

    if (adherentsLocalStorage) {
      adherents = JSON.parse(adherentsLocalStorage);
    }

    adherents[codeAdherent] = { nom, prenom, email };

    localStorage.setItem("adherents", JSON.stringify(adherents));
    console.log("Adhérent sauvegardé avec succès dans le local storage :", adherents[codeAdherent]);
  } catch (error) {
    console.error("Une erreur est survenue lors de la sauvegarde dans le local storage :", error);
  }
}

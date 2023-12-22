// Ajoutez un gestionnaire d'événements 'click' pour les boutons "Supprimer"
document.addEventListener("click", function (event) {
  // Vérifiez si le clic était sur un bouton de suppression
  if (event.target.classList.contains("bSupprimer")) {
    // Récupérez le code adhérent associé au bouton cliqué
    const codeAdherentASupprimer = event.target.getAttribute("data-code");

    // Appelez la fonction pour supprimer l'adhérent
    supprimerAdherent(codeAdherentASupprimer);
  }
});

// Fonction pour supprimer la ligne d'un adhérent dans le tableau
function supprimerLigneAdherent(codeAdherent) {
  // Sélectionne l'élément du bouton Supprimer en utilisant l'attribut data-code
  const elementBSupprimer = document.querySelector(
    `[data-code="${codeAdherent}"]`
  );

  // Vérifie si l'élément du bouton Supprimer a été trouvé
  if (elementBSupprimer) {
    // Trouve la ligne (élément tr) la plus proche à partir du bouton Supprimer
    const tableRow = elementBSupprimer.closest("tr");

    // Vérifie si la ligne a été trouvée
    if (tableRow) {
      // Supprime la ligne du tableau
      tableRow.remove();
    } else {
      // Affiche une erreur si la ligne n'est pas trouvée
      console.error(
        `L'élément avec data-code "${codeAdherent}" n'est pas à l'intérieur d'une balise <tr>.`
      );
    }
  } else {
    // Affiche une erreur si l'élément du bouton Supprimer n'est pas trouvé
    console.error(`Élément avec data-code "${codeAdherent}" non trouvé.`);
  }
}

// Fonction pour effacer un message après un certain délai
function clearMessage(element) {
  setTimeout(() => {
    element.textContent = "";
  }, 5000);
}

// Fonction pour supprimer un adhérent
function supprimerAdherent(codeAdherent) {
  const adherent = adherents.get(codeAdherent);

  if (!adherent) {
    const messageErreur = document.getElementById("messageErreur");
    messageErreur.textContent =
      "Aucun adhérent ne correspond à ces informations.";
    clearMessage(messageErreur);
    return;
  }

  const suppForms = document.querySelectorAll('[id^="suppForm-"]');
  suppForms.forEach((form) => {
    form.style.display = "none";
  });

  const suppForm = document.getElementById(`suppForm-${codeAdherent}`);

  if (suppForm) {
    if (suppForm.style.display === "block") {
      suppForm.style.display = "none"; // Masque le formulaire si déjà affiché
    } else {
      suppForm.style.display = "block"; // Affiche le formulaire s'il est masqué
      const supprimerBtn = suppForm.querySelector(
        `#supprimerBtn-${codeAdherent}`
      );
      if (supprimerBtn) {
        supprimerBtn.classList.remove("hidden"); // Retire la classe hidden pour afficher le bouton
      } else {
        console.log("Bouton non trouvé.");
      }
    }
  } else {
    const form = document.createElement("form");
    form.id = `suppForm-${codeAdherent}`;
    form.className = "suppFormClass";
    form.innerHTML = `
        <label for="adherent-${codeAdherent}">ID :</label>
        <input type="text" id="adherent-${codeAdherent}" value="${codeAdherent}" class="idSupprimer" required><br><br>
  
        <label for="supprimerNom-${codeAdherent}">Nom :</label>
        <input type="text" id="supprimerNom-${codeAdherent}" value="${adherent.nom}" class="nomSupprimer" required><br><br>
  
        <label for="supprimerPrenom-${codeAdherent}">Prénom :</label>
        <input type="text" id="supprimerPrenom-${codeAdherent}" value="${adherent.prenom}" class="prenomSupprimer" required><br><br>
  
        <label for="supprimerEmail-${codeAdherent}">Email :</label>
        <input type="text" id="supprimerEmail-${codeAdherent}" value="${adherent.email}" class="nouvelSupprimer" required><br><br>
  
        <button id="supprimerBtn-${codeAdherent}" type="button" class="sub">Supprimer</button>
      `;

    form
      .querySelector(`#supprimerBtn-${codeAdherent}`)
      .addEventListener("click", function () {
        const nom = document.querySelector(
          `#supprimerNom-${codeAdherent}`
        ).value;
        const prenom = document.querySelector(
          `#supprimerPrenom-${codeAdherent}`
        ).value;
        const email = document.querySelector(
          `#supprimerEmail-${codeAdherent}`
        ).value;
        const messageErreur = document.getElementById("messageErreur");

        if (
          nom !== adherent.nom ||
          prenom !== adherent.prenom ||
          email !== adherent.email
        ) {
          messageErreur.textContent =
            "Les informations ne correspondent pas à l'adhérent sélectionné.";
          clearMessage(messageErreur);
          return;
        }

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

        const confirmation = window.confirm(
          `Voulez-vous vraiment supprimer l'adhérent ${adherent.nom} ${adherent.prenom} ?`
        );

        if (confirmation) {
          // Supprimez l'adhérent de la liste
          adherents.delete(codeAdherent);

          // Supprimez la ligne correspondante dans le tableau
          supprimerLigneAdherent(codeAdherent);

          const adherentsLocalStorage = localStorage.getItem("adherents");
          if (adherentsLocalStorage) {
            adherents = new Map(JSON.parse(adherentsLocalStorage));
            adherents.delete(codeAdherent); // Supprimer l'adhérent
            localStorage.setItem("adherents", JSON.stringify([...adherents])); // Mettre à jour le localStorage
          }
          // Afficher la notification de suppression
          const messageModification = document.getElementById(
            "messageModification"
          );
          messageModification.textContent = `L'adhérent ${adherent.nom} ${adherent.prenom} a bien été supprimé.`;
          clearMessage(messageModification);

          // Suppression réussie, maintenant effacez les champs du formulaire
          document.querySelector(`#adherent-${codeAdherent}`).value = "";
          document.querySelector(`#supprimerNom-${codeAdherent}`).value = "";
          document.querySelector(`#supprimerPrenom-${codeAdherent}`).value = "";
          document.querySelector(`#supprimerEmail-${codeAdherent}`).value = "";

          // Vérifiez si le tableau d'adhérents est vide
          if (adherents.size === 0) {
            const messageTableauVide =
              document.getElementById("messageTableauVide");
            if (messageTableauVide) {
              messageTableauVide.textContent =
                "Votre tableau d'adhérents est vide. Veuillez entrer de nouveaux adhérents.";
              clearMessage(messageTableauVide);
            } else {
              console.error(
                "Élément avec l'ID 'messageTableauVide' non trouvé."
              );
            }
          }
        } else {
          // Ne rien faire si l'utilisateur clique sur "Annuler"
          console.log("Suppression annulée.");
        }

        // form.reset();
      });

    const adherentForm = document.getElementById("adherentForm");
    if (adherentForm) {
      adherentForm.insertAdjacentElement("afterend", form);
    } else {
      console.error("Formulaire d'adhérent non trouvé dans le DOM.");
    }

    function clearMessage(element) {
      setTimeout(() => {
        element.textContent = "";
      }, 5000);
    }
  }
}

/*
// Fonction pour supprimer un adhérent
function supprimerAdherent(codeAdherent) {
  const adherent = adherents.get(codeAdherent);

  const suppForms = document.querySelectorAll('[id^="suppForm-"]');
  suppForms.forEach((form) => {
    form.style.display = "none";
  });

  const suppForm = document.getElementById(`suppForm-${codeAdherent}`);

  if (suppForm) {
    if (suppForm.style.display === "block") {
      suppForm.style.display = "none"; // Masque le formulaire si déjà affiché
    } else {
      suppForm.style.display = "block"; // Affiche le formulaire s'il est masqué
      const supprimerBtn = suppForm.querySelector(
        `#supprimerBtn-${codeAdherent}`
      );
      if (supprimerBtn) {
        supprimerBtn.classList.remove("hidden"); // Retire la classe hidden pour afficher le bouton
      } else {
        console.log("Bouton non trouvé.");
      }
    }
  } else {
    const form = document.createElement("form");
    form.id = `suppForm-${codeAdherent}`;
    form.className = "suppFormClass";
    form.innerHTML = `
          <label for="adherent-${codeAdherent}">ID :</label>
          <input type="text" id="adherent-${codeAdherent}" value="${codeAdherent}" class="idSupprimer" required><br><br>
    
          <label for="supprimerNom-${codeAdherent}">Nom :</label>
          <input type="text" id="supprimerNom-${codeAdherent}" value="${adherent.nom}" class="nomSupprimer" required><br><br>
    
          <label for="supprimerPrenom-${codeAdherent}">Prénom :</label>
          <input type="text" id="supprimerPrenom-${codeAdherent}" value="${adherent.prenom}" class="prenomSupprimer" required><br><br>
    
          <label for="supprimerEmail-${codeAdherent}">Email :</label>
          <input type="text" id="supprimerEmail-${codeAdherent}" value="${adherent.email}" class="nouvelSupprimer" required><br><br>
    
          <button id="supprimerBtn-${codeAdherent}" type="submit" class="sub">Supprimer</button>
        `;

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêche le comportement par défaut du formulaire
      // Ajoutez ici le code pour supprimer l'adhérent
      // ...
      const nom = document.querySelector(`.nomSupprimer`).value;
      const prenom = document.querySelector(`.prenomSupprimer`).value;
      const email = document.querySelector(`.nouvelSupprimer`).value;
      const messageErreur = document.getElementById("messageErreur");

      confirmation = window.confirm(
        `Voulez-vous vraiment supprimer l'adhérent ${adherent.nom} ${adherent.prenom} ?`
      );
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

      if (adherents.has(codeAdherent)) {
        const adherent = adherents.get(codeAdherent);

        // Demandez une confirmation avant de supprimer
        const confirmation = window.confirm(
          `Voulez-vous vraiment supprimer l'adhérent ${adherent.nom} ${adherent.prenom} ?`
        );

        if (confirmation) {
          // Supprimez l'adhérent de la liste
          adherents.delete(codeAdherent);

          // Supprimez la ligne correspondante dans le tableau
          supprimerLigneAdherent(codeAdherent);

          // Afficher la notification de suppression
          const messageModification = document.getElementById(
            "messageModification"
          );
          messageModification.textContent = `L'adhérent ${adherent.nom} ${adherent.prenom} a bien été supprimé.`;
          clearMessage(messageModification);

          // Vérifiez si le tableau d'adhérents est vide
          // Vérifiez si le tableau d'adhérents est vide
          if (adherents.size === 0) {
            const messageTableauVide =
              document.getElementById("messageTableauVide");
            if (messageTableauVide) {
              messageTableauVide.textContent =
                "Votre tableau d'adhérents est vide. Veuillez entrer de nouveaux adhérents.";
              clearMessage(messageTableauVide);
            } else {
              console.error(
                "Élément avec l'ID 'messageTableauVide' non trouvé."
              );
            }
          }
        } else {
          // Ne rien faire si l'utilisateur clique sur "Annuler"
          console.log("Suppression annulée.");
        }
      } else {
        console.error(`L'adhérent avec le code ${codeAdherent} n'existe pas.`);
      }
    });

    const adherentForm = document.getElementById("adherentForm");
    if (adherentForm) {
      adherentForm.insertAdjacentElement("afterend", form);
    } else {
      console.error("Formulaire d'adhérent non trouvé dans le DOM.");
    }

    function clearMessage(element) {
      setTimeout(() => {
        element.textContent = "";
      }, 5000);
    }
  }
}
*/

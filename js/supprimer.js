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




function masquerFormulaire(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    setTimeout(() => {
      container.innerHTML = "";
    }, 4000);
  } else {
    console.error("Container du formulaire non trouvé dans le DOM.");
  }
}


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

  const confirmation = window.confirm(`Voulez-vous vraiment supprimer l'adhérent ${adherent.nom} ${adherent.prenom} ?`);

  if (!confirmation) {
    console.log("Suppression annulée.");
    return;
  }

  const elementBSupprimer = document.querySelector(`[data-code="${codeAdherent}"]`);
  if (elementBSupprimer) {
    const tableRow = elementBSupprimer.closest("tr");
    if (tableRow) {
      tableRow.remove();
    } else {
      console.error(`L'élément avec data-code "${codeAdherent}" n'est pas à l'intérieur d'une balise <tr>.`);
    }
  } else {
    console.error(`Élément avec data-code "${codeAdherent}" non trouvé.`);
  }

  adherents.delete(codeAdherent);

  const adherentsLocalStorage = localStorage.getItem("adherents");
  if (adherentsLocalStorage) {
    adherents = new Map(JSON.parse(adherentsLocalStorage));
    adherents.delete(codeAdherent);
    localStorage.setItem("adherents", JSON.stringify([...adherents]));
  }

  const messageModification = document.getElementById("messageModification");
  messageModification.textContent = `L'adhérent ${adherent.nom} ${adherent.prenom} a bien été supprimé.`;
  clearMessage(messageModification);

  const formElements = document.querySelectorAll(`.suppFormClass input`);
  formElements.forEach((element) => {
    element.value = "";
  });

  if (adherents.size === 0) {
    const messageTableauVide = document.getElementById("messageTableauVide");
    if (messageTableauVide) {
      messageTableauVide.textContent = "Votre tableau d'adhérents est vide. Veuillez entrer de nouveaux adhérents.";
      clearMessage(messageTableauVide);
    } else {
      console.error("Élément avec l'ID 'messageTableauVide' non trouvé.");
    }
  }

  function clearMessage(element) {
    setTimeout(() => {
      element.textContent = "";
    }, 5000);
  }
}


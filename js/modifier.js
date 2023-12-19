function modifierAdherent(nom, prenom, nouvelEmail) {
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

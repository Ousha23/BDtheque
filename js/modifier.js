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


  function editerAdherent(codeAdherent) {
    const adherent = adherents.get(codeAdherent); // Récupère les données de l'adhérent
  
    const form = document.createElement("form");
    form.innerHTML = `
      <input type="text" id="editNom" value="${adherent.nom}">
      <input type="text" id="editPrenom" value="${adherent.prenom}">
      <input type="text" id="editEmail" value="${adherent.email}">
      <button onclick="modifierAdherent('${codeAdherent}')">Enregistrer</button>
    `;
  
    const tableRow = document.querySelector(`#${codeAdherent}`);
    const tdElement = tableRow.lastElementChild; // La dernière cellule contenant les boutons
  
    // Ajouter le formulaire à la ligne du tableau
    tdElement.appendChild(form);
  }*/
  
 // modifications.js
 document.addEventListener("DOMContentLoaded", function() {
 
  function editerAdherent(codeAdherent) {
    const adherent = adherents.get(codeAdherent);
  
    const form = document.createElement("form");
    form.innerHTML = `
      <input type="text" id="editNom" value="${adherent.nom}">
      <input type="text" id="editPrenom" value="${adherent.prenom}">
      <input type="text" id="editEmail" value="${adherent.email}">
      <button onclick="modifierAdherent('${codeAdherent}')">Enregistrer</button>
    `;
  
    const tableRow = document.getElementById(codeAdherent); 
    const tdElement = tableRow.lastElementChild;
  
    tdElement.appendChild(form);
  }
  
  function modifierAdherent(codeAdherent) {
    const nom = document.getElementById("editNom").value;
    const prenom = document.getElementById("editPrenom").value;
    const email = document.getElementById("editEmail").value;
    
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
  }

});
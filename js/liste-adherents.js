function afficherAdherents() {
  const tableIdElement = document.getElementById("tableId");
  tableIdElement.innerHTML = ""; // Nettoie le contenu actuel

  adherents.forEach(function (adherent, codeAdherent) {
    // Crée une nouvelle ligne pour chaque adhérent
    const tableRow = document.createElement("tr");

    // Remplit la ligne avec les détails de l'adhérent
    tableRow.innerHTML = `
      <td class="col-2">${codeAdherent}</td>
      <td class="col-2">${adherent.nom}</td>
      <td class="col-2">${adherent.prenom}</td>
      <td class="col-2">${adherent.email}</td>
      <td class="col-2">
        <button onclick="editerAdherent('${codeAdherent}')">Éditer</button>
        <button onclick="supprimerAdherent('${codeAdherent}')">Supprimer</button>
      </td>
    `;

    // Ajoute la ligne à la table
    tableIdElement.appendChild(tableRow);
  });
}

afficherAdherents();

function ajouterAdherent(nom, prenom, email) {
  let nouvelAdherent = {
    codeAdherent: generateCodeAdherent(), // Vous devez implémenter cette fonction
    nom: nom,
    prenom: prenom,
    email: email,
    dateAdhesion: new Date(),
  };

  adherents.set(nouvelAdherent.codeAdherent, nouvelAdherent);

  return nouvelAdherent;
}

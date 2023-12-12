const gestionEmprunts = new GestionEmprunts();



function rechercherAdherent() {
    const searchValue = document.getElementById("searchAdherent").value;
    
    //  rechercher un adhérent par nom, prénom ou ID
    const adherent = gestionEmprunts.rechercherAdherent(searchValue);

    // Affichez les résultats de la recherche
    afficherResultatsRecherche(adherent);

    
}


function afficherInfo() {
    alert("Vous pouvez rechercher un adhérent par Nom, Email ou ID.");
}




function afficherResultatsRecherche(adherent) {
    let resultatsRecherche = document.getElementById("resultatsRecherche");

    if (!adherent) {
        resultatsRecherche.innerHTML = "<p>Aucun adhérent trouvé.</p>";
        return;
    }

    // Affichez les détails de l'adhérent trouvé
    resultatsRecherche.innerHTML = `
        <p>ID Adhérent: ${adherent.id}</p>
        <p>Nom: ${adherent.nom}</p>
        <p>Prénom: ${adherent.prenom}</p>
        <p>Email: ${adherent.email}</p>
    `;

    // Affichez les prêts éventuels de l'adhérent
    afficherPrets(adherent.emprunts);
}

function afficherPrets(emprunts) {
    let listePrets = document.getElementById("listePrets");

    if (emprunts.length === 0) {
        listePrets.innerHTML = "<p>Cet adhérent n'a pas encore effectué d'emprunts.</p>";
        return;
    }

    // Générer le tableau HTML pour les prêts
    let tableHtml = document.createElement('table');
    tableHtml.className = 'table-bordure'; // Ajoutez une classe pour le style de bordure

    let headerRow = document.createElement('tr');
    let headers = ['Code Exemplaire', 'Titre', 'Date Emprunt', 'Date Retour Prévu'];

    headers.forEach(headerText => {
        let headerCell = document.createElement('th');
        let headerCellText = document.createTextNode(headerText);
        headerCell.appendChild(headerCellText);
        headerRow.appendChild(headerCell);
    });

    tableHtml.appendChild(headerRow);

    emprunts.forEach((emprunt) => {
        // Obtenez l'objet exemplaire associé au codeExemplaire
        let exemplaire = gestionEmprunts.bdExemplaires.get(emprunt.codeExemplaire);

        let row = document.createElement('tr');
        let rowData = [
            emprunt.codeExemplaire,
            exemplaire ? exemplaire.titre : "Titre non disponible",
            emprunt.dateEmprunt.toLocaleDateString(),
            emprunt.dateRetourPrevu.toLocaleDateString()
        ];

        rowData.forEach(cellData => {
            let cell = document.createElement('td');
            let cellText = document.createTextNode(cellData);
            cell.appendChild(cellText);
            row.appendChild(cell);
        });

        tableHtml.appendChild(row);
    });

    // Supprimez toutes les bordures existantes dans le cas où il y en a
    tableHtml.style.borderCollapse = 'collapse';

    // Ajouter le tableau au conteneur HTML (listePrets)
    listePrets.innerHTML = '';
    listePrets.appendChild(tableHtml);



    $(document).ready(function() {
        // Sélectionnez la première ligne du tableau par son ID (ajustez l'ID en conséquence)
        var premiereLigne = $('#listePrets table tr:first');
    
        // Ajoutez une classe à la première ligne
        premiereLigne.addClass('premiere-ligne');
    });

    $(document).ready(function() {
        // Sélectionnez la troisième ligne du tableau par son index (ajustez l'index en conséquence)
        var troisiemeLigne = $('#listePrets table tr').eq(2); // Notez que l'index commence à 0
    
        // Ajoutez une classe à la troisième ligne
        troisiemeLigne.addClass('troisieme-ligne');
    });
    
    
}


function enregistrerEmprunt() {
    let numeroAdherent = document.getElementById("numeroAdherent").value;
    let codeExemplaire = document.getElementById("codeExemplaire").value;

    // Appelez la méthode enregistrerEmprunt avec les valeurs du formulaire
    gestionEmprunts.enregistrerEmprunt(numeroAdherent, codeExemplaire);

    // Rafraîchissez les résultats après l'enregistrement du prêt
    rechercherAdherent();
}






function rechercherAdherent() {
    const searchValue = document.getElementById("searchAdherent").value;

    const adherent = gestionEmprunts.rechercherAdherent(searchValue);
    afficherResultatsRecherche(adherent);
}


   
function afficherResultatsRecherche(adherent) {
    let resultatsRecherche = document.getElementById("resultatsRecherche");

    if (!adherent) {
        resultatsRecherche.innerHTML = "<p>Aucun adhérent trouvé.</p>";
        return;
    }

    resultatsRecherche.innerHTML = `
        <p>ID Adhérent: ${adherent.id}</p>
        <p>Nom: ${adherent.nom}</p>
        <p>Prénom: ${adherent.prenom}</p>
        <p>Email: ${adherent.email}</p>
    `;


    afficherPrets(adherent.emprunts);
}

function afficherPrets(emprunts) {
    let listePrets = document.getElementById("listePrets");

    if (emprunts.length === 0) {
        listePrets.innerHTML = "<p>Cet adhérent n'a pas encore effectué d'emprunts.</p>";
        return;
    }


    let tableHtml = document.createElement('table');
    tableHtml.className = 'table-bordure';


    let headerRow = document.createElement('tr');
    let headers = ['Code Exemplaire', 'Titre', 'Date Emprunt', 'Date Retour Prévu'];

    headers.forEach(headerText => {
        let headerCell = document.createElement('th');

        headerCell.appendChild(document.createTextNode(headerText));

        headerRow.appendChild(headerCell);
    });

    tableHtml.appendChild(headerRow);

    emprunts.forEach((emprunt) => {

        let exemplaire = gestionEmprunts.bdExemplaires.get(emprunt.codeExemplaire);

        let row = document.createElement('tr');
        let rowData = [
            emprunt.codeExemplaire,
            exemplaire ? exemplaire.titre : "Titre non disponible",

            formatDate(emprunt.dateEmprunt),
            formatDate(emprunt.dateRetourPrevu)

        ];

        rowData.forEach(cellData => {
            let cell = document.createElement('td');

            cell.appendChild(document.createTextNode(cellData));

            row.appendChild(cell);
        });

        tableHtml.appendChild(row);
    });


    tableHtml.style.borderCollapse = 'collapse';
    listePrets.innerHTML = '';
    listePrets.appendChild(tableHtml);

    // ... (classes ajoutées avec jQuery, si nécessaire)
}

function formatDate(date) {
    // Add logic here to ensure date is a valid Date object
    return date instanceof Date ? date.toLocaleDateString() : '';
}

function enregistrerEmprunt() {
    let numeroAdherent = document.getElementById("numeroAdherent").value;
    let codeExemplaire = document.getElementById("codeExemplaire").value;
    
    gestionEmprunts.enregistrerEmprunt(numeroAdherent, codeExemplaire);
    rechercherAdherent();
}

function afficherInfo() {
    alert("Vous pouvez rechercher un adhérent par Nom, Email ou ID.");
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}


    



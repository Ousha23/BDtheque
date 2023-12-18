
function rechercherAdherent() {
    const searchValue = document.getElementById("searchAdherent").value;
    const adherent = gestionEmprunts.rechercherAdherent(searchValue);
    afficherResultatsRecherche(adherent);
}

function afficherResultatsRecherche(adherent) {
    let resultatsRecherche = document.getElementById("resultatsRecherche");



    resultatsRecherche.innerHTML = `

    <p style="font-size: 20px;"><span style="margin-right: 80px;"> <strong>ID Adhérent:</strong> ${adherent.id}</span>  <span><strong>Email:</strong> ${adherent.email}</span></p></br>
    <p style="font-size: 20px;"><span style="margin-right: 119px;"> <strong>Nom:</strong> ${adherent.nom}</span>  <span><strong>Prénom:</strong> ${adherent.prenom}</span></p>
    `;

    document.getElementById("numeroAdherent").value = adherent.id;

    afficherPrets(adherent.emprunts);
}

function afficherPrets(emprunts) {
    let listePrets = document.getElementById("listePrets");

    if (emprunts.length === 0) {
        listePrets.innerHTML = "<p style='color: red; font-size: 18px;'>Cet adhérent n'a pas encore effectué d'emprunts.</p>";

        return;
    }

    let tableHtml = document.createElement('table');
    tableHtml.className = 'table-bordure';

    let headerRow = document.createElement('tr');
    let headers = ['Code Exemplaire', 'Titre', 'Date Emprunt', 'Date Retour Prévu'];

    headers.forEach(headerText => {
        let headerCell = document.createElement('th');
        headerCell.appendChild(document.createTextNode(headerText));
        headerRow.style.height = '50px';
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

        row.style.height = '50px';
        tableHtml.appendChild(row);
    });

    tableHtml.style.borderCollapse = 'collapse';
    listePrets.innerHTML = '';
    listePrets.appendChild(tableHtml);

    tableHtml.style.borderCollapse = 'collapse';
tableHtml.style.width = '100%'; // Changer la largeur de la table

   
}




function formatDate(date) {
    // Add logic here to ensure date is a valid Date object
    return date instanceof Date ? date.toLocaleDateString() : '';
}

function enregistrerEmprunt() {
    let numeroAdherent = document.getElementById("numeroAdherent").value;
   // let codeExemplaire = document.getElementById("codeExemplaire").value;

   let codeExemplaire = document.getElementById("codeExemplaire").value;

   if (!numeroAdherent || !codeExemplaire) {
        Swal.fire({
            text: "Veuillez remplir tous les champs.",
            confirmButtonColor: '#FF6944'
        });
        return;
    }
    gestionEmprunts.enregistrerEmprunt(numeroAdherent, codeExemplaire);
    rechercherAdherent();
   
}

function retournerExemplaire() {
    let numeroAdherent = document.getElementById("numeroAdherent").value;
    let codeExemplaire = document.getElementById("codeExemplaire").value;
   
    gestionEmprunts.enregistrerRetour(numeroAdherent, codeExemplaire);
    rechercherAdherent(); 
}

function afficherInfo() {
 
    Swal.fire({
        text:"Vous pouvez rechercher un adhérent par Nom, Email ou ID.",
        confirmButtonColor: '#FF6944'});
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}
    
 
function annulerFormulaire() {
    // Actualiser la page
    window.location.reload();
}

    
        document.addEventListener("DOMContentLoaded", function () {
            // Obtenez l'URL de la page actuelle
            const currentUrl = window.location.href;
        
            // Sélectionnez tous les liens de navigation
            const navLinks = document.querySelectorAll('.nav-link');
        
            // Parcourez chaque lien de navigation
            navLinks.forEach(link => {
                // Obtenez l'URL du lien
                const linkUrl = link.href;
        
                // Vérifiez si l'URL du lien correspond à l'URL actuelle
                if (currentUrl === linkUrl) {
                    // Ajoutez la classe "active" au lien actif
                    link.classList.add('active');
                }
            });
        });
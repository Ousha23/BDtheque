let role = localStorage.getItem("role")
if (role !== "admin") document.location.href="forbidden.html";

//------ alimentation ou récupération des données employés depuis le localStorage

//localStorage.removeItem("employes");
let recupMapEmplJson = localStorage.getItem('employes');

if (recupMapEmplJson !== null) {
    employesStorage = new Map(JSON.parse(recupMapEmplJson));
} else {
    localStorage.setItem("employes", JSON.stringify(Array.from(employes.entries())));
    recupMapEmplJson = localStorage.getItem('employes');
    employesStorage = new Map(JSON.parse(recupMapEmplJson));
}

var inputNomEmp = document.getElementById("nomEmploye");
var inputPrenomEmp = document.getElementById("prenomEmploye");
var inputMailEmp = document.getElementById("mailEmploye");
var inputLoginEmp = document.getElementById("loginEmploye");
var inputPwdEmp = document.getElementById("passEmploye");
var inputConfPwdEmp = document.getElementById("confirmPassEmploye");
var btnAjoutEmp = document.getElementById("btnAjoutEmp");
var msgErrAjoutEmp = document.getElementById("msgErrAjoutEmp");
var msgErrModifEmp = document.getElementById("msgErrModifEmp");
var formAjoutEmp = document.getElementById("formAjoutEmp");
var lienAjoutEmp = document.getElementById("lienAjoutEmp");
var lienListeEmp = document.getElementById("lienListeEmp");
var btnAnnulModif = document.getElementById("btnAnnulModif");


construireTableEmp();

inputNomEmp.addEventListener("blur", function () {verifValeur(inputNomEmp.value)});
inputPrenomEmp.addEventListener("blur", function() {verifValeur(inputPrenomEmp.value)});
inputMailEmp.addEventListener("blur", function() { verifMail(inputMailEmp.value)});
inputLoginEmp.addEventListener("blur", function() {verifLogin(inputLoginEmp.value)});
formAjoutEmp.addEventListener("submit", function(event) {verifFormAjout(event)});
lienAjoutEmp.addEventListener("click", function() {afficheSection("sectionFormAjoutEmp")});
lienListeEmp.addEventListener("click", function() {afficheSection("listeEmp")});
lienAjoutEmp.addEventListener("click", function() {changeColor(lienAjoutEmp, lienListeEmp)});
lienListeEmp.addEventListener("click", function() {changeColor(lienListeEmp, lienAjoutEmp)});
inputConfPwdEmp.addEventListener("blur", function() {verifConfPwd(inputPwdEmp.value, inputConfPwdEmp.value )});
btnAnnulModif.addEventListener("click",function() {afficheSection("listeEmp")});

//////////// Fonctions//////////////

// -------- Partie inputs Formulaire --------
/**
 * Verifie les champs du formulaires avant ajout à la map et au localStorage
 * @param {event} event 
 */
function verifFormAjout (event) {
    if (verifValeur(inputNomEmp.value) === false || verifValeur(inputPrenomEmp.value) === false || verifMail(inputMailEmp.value) === false || verifLogin(inputLoginEmp.value) === false || verifConfPwd(inputPwdEmp.value, inputConfPwdEmp.value) === false) {
        event.preventDefault();
        msgErr("Un des champs est invalide. Merci de remplir tout les champs du formulaire!") ;
    } else if (verifDoublon (inputLoginEmp.value,inputMailEmp.value) === true){
        event.preventDefault();
        Swal.fire({
            title: "Cet utilisateur existe déjà !",
            icon: "warning",
            iconColor: '#FF6944', 
            confirmButtonColor: '#FF6944',
            customClass: {
            popup: 'custom-alert-class'
            }
        });

    } else {
        let roleSelect = verifRadio("role");
        if (roleSelect === null) {
            event.preventDefault();
            msgErr("Merci de selectionner un role pour cet employé") ;
        } else {
            event.preventDefault();
            Swal.fire({
                position: "center",
                icon: "success",
                iconColor: '#FF6944',
                title: "L'employé : " + inputNomEmp.value + ' a été ajouté avec succès comme "' + roleSelect + '".',
                confirmButtonColor: '#FF6944',
                customClass: {
                    popup: 'custom-alert-class',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirection ou autre action ici
                    formAjoutEmp.submit();
                    ajouterEmploye(inputNomEmp.value,inputPrenomEmp.value,inputLoginEmp.value, inputMailEmp.value, inputPwdEmp.value, roleSelect );
                }
            });
        } 
    }
}

/**
 * Vide la div msg
 */
function viderMsgErr () {
    msgErr("");
}

/**
 * Controle les champs (nom et prénom) avec une regex
 * @param {string} input 
 * @returns booleen
 */
function verifValeur(input){
    viderMsgErr();
    var myRegex = /^[a-zA-Z]+-?[a-zA-Z]*$/;
    if (input.length < 3 || myRegex.test(input) === false) {
        msgErr("le champs doit contenir au moins 3 lettres alphabétique") ;
        return false;
    }
}
/**
 * Contrôle le champs mail avec une Regex
 * @param {string} mail 
 * @returns 
 */
function verifMail (mail){   
    viderMsgErr();
    var myRegex =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (myRegex.test(mail) === false) {
        msgErr("Merci de saisir une adresse mail valide") ;
        return false;
    } 
}

/**
 * Contrôle la conformité avec le mot de passe saisi
 * @returns booleen
 */
function verifConfPwd(passValue, confimPassValue) {
    viderMsgErr();
    if (confimPassValue !== passValue){
        msgErr("Le mot de passe ne correspond pas. Merci de le ressaisir!") ;
        return false
    }
}
/**
 * Contrôle le login (nombre de caractère minimal)
 * @param {string} input 
 * @returns 
 */
function verifLogin(input) {
    viderMsgErr();

    if ( !input ||input === null || input.length < 3) {
        msgErr("le champs doit contenir au moins 3 caractères") ;
        return false
    }
    return true
}

//-------- Partie Données Formulaire ---------
/**
 * Vérifier la présence d'un doublon pour le mail et le login
 * @param {string} login 
 * @param {string} mail 
 * @returns 
 */
function verifDoublon (login, mail){
    viderMsgErr();
    let userTrouve = false;

    employesStorage.forEach((valeurs) => {
        let loginRecupEmpl = valeurs.login;
        let mailRecupEmpl = valeurs.email;
        if ((login.toLowerCase() === loginRecupEmpl.toLowerCase()) || (mail.toLowerCase() === mailRecupEmpl.toLowerCase())) {
            userTrouve = true;          
        }
    });

    return userTrouve;
}
/**
 * récupère les ID des inputs radio et vérifie celle qui est cochée
 * @returns booleen
 */
function verifRadio(chaine) {
    var radios = document.getElementsByName(chaine);
    var idCheck = null;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                idCheck = radios[i].id;
                break;
            }
        }
        if (idCheck !== null) {
            idCheck = convertRole(idCheck);
            return idCheck;
        } else {
            return idCheck
        }
}

/**
 * Convertisse l'ID de l'input en role correspondant à la map
 * @param {string} role 
 * @returns 
 */
function convertRole(role) {
    if (role === "roleGestionnaire" || role === "roleModifGestionnaire") {
        return "gestionnaire";
    } else if (role === "roleAdmin" || role === "roleModifAdmin") {
        return "admin";
    } else {
        return "responsable";
    }
}

/**
 * MAJ de la map et LocalStorage
 * @param {string} nom 
 * @param {string} prenom 
 * @param {string} login 
 * @param {string} mail 
 * @param {string} pass 
 * @param {string} role 
 */
function ajouterEmploye(nom, prenom, login, mail, pass, role) {
    let maxKey = Array.from(employesStorage.keys()).reduce((acc, key) => {
    const numericKey = parseInt(key, 10); // Convertit la clé en nombre
    return numericKey > acc ? numericKey : acc;
    }, -Infinity);
    let nouvelId = (maxKey + 1).toString();
    employesStorage.set(nouvelId, { nom, prenom, login, email: mail, pass, role });
    localStorage.setItem("employes", JSON.stringify(Array.from(employesStorage.entries()))); 
}

/**
 * Permet d’afficher et cacher les sections 
 * @param {string} id 
 */
function afficheSection(id) {
    viderMsgErr();
    var sectionFormAjoutEmp = document.getElementById("sectionFormAjoutEmp");
    var sectionListeEmp = document.getElementById("listeEmp");
    var sectionModifEmp = document.getElementById("sectionFormModifEmp");
    if (id === "sectionFormAjoutEmp") {
        sectionFormAjoutEmp.classList.remove("hide");
        sectionListeEmp.classList.add("hide");
        sectionModifEmp.classList.add("hide");
    } else if (id === "listeEmp") {
        sectionFormAjoutEmp.classList.add("hide");
        sectionListeEmp.classList.remove("hide");
        sectionModifEmp.classList.add("hide");
    } else if (id === "sectionFormModifEmp") {
        sectionModifEmp.classList.remove("hide");
        sectionFormAjoutEmp.classList.add("hide");
        sectionListeEmp.classList.add("hide");
    }

}

/**
 * Alimente le tableau avec les données récupérer de la map
 */
function construireTableEmp(){
    var tListeEmp = document.getElementById("tListeEmp");

	// afficher les colonnes du tableau en affichant les info venant de la BDD
    employesStorage.forEach((employe, key) => {
        var row = document.createElement("tr")
        row.setAttribute("id","row")
        // ID de l'employé
		var cellID = document.createElement("td");
		var cellTextID = document.createTextNode(key);
		cellID.appendChild(cellTextID);
        cellID.classList.add("d-none", "d-md-table-cell", "col-md-1");
		row.appendChild(cellID);
		// Nom de l'employé
        var cellnom = document.createElement("td");
		var cellTextnom = document.createTextNode(employe.nom);
		cellnom.appendChild(cellTextnom);
		row.appendChild(cellnom);

        // Le Login de l'employé
        var cellLogin = document.createElement("td");
		var cellTextLogin = document.createTextNode(employe.login);
		cellLogin.appendChild(cellTextLogin);
		row.appendChild(cellLogin);
		
        // Email de l'employé
        var cellEmail = document.createElement("td");
		var cellTextEmail = document.createTextNode(employe.email);
		cellEmail.appendChild(cellTextEmail);
        cellEmail.classList.add("d-none", "d-lg-table-cell", "col-md-1");
		row.appendChild(cellEmail);
        // Role de l'employé
        var cellRole = document.createElement("td");
		var cellTextRole = document.createTextNode(employe.role);
		cellRole.appendChild(cellTextRole);
        cellRole.classList.add("d-none", "d-md-table-cell", "col-md-1");
		row.appendChild(cellRole);
        
        
        var cellAction = document.createElement("td");
        var btnModifierEmp = document.createElement("span");
        var btnSupprimerEmp = document.createElement("span");
        var btnModifierEmpText = document.createTextNode("edit_square");
        var btnSupprimerEmpText = document.createTextNode("delete");
        cellAction.classList.add("tdActionEmp");
        btnModifierEmp.appendChild(btnModifierEmpText);
        btnSupprimerEmp.appendChild(btnSupprimerEmpText);
        btnModifierEmp.setAttribute("id","btnModifierEmp");
        btnModifierEmp.classList.add("material-symbols-outlined")
        btnSupprimerEmp.setAttribute("id","btnSupprimerEmp");
        btnSupprimerEmp.classList.add("material-symbols-outlined")
        btnModifierEmp.addEventListener("click", function() {recupEmp(key)});
        btnModifierEmp.addEventListener("click", function(){afficheSection("sectionFormModifEmp")});
        btnSupprimerEmp.addEventListener("click", function() {supprimerEmp(key)});
        cellAction.appendChild(btnModifierEmp);
        cellAction.appendChild(btnSupprimerEmp);
        row.appendChild(cellAction);
		tListeEmp.appendChild(row);
    });
}
//-----------------MODIFIER UN EMPLOYE

function recupEmp(id) {

    var emplAModif = employesStorage.get(id);
    var nomModif = document.getElementById("nomModifEmp");
    var prenomModif = document.getElementById("prenomModifEmp");
    var passModif = document.getElementById("passModifEmp");
    var confirmPassModif = document.getElementById("confirmPassModifEmp");
    var loginModif = document.getElementById("loginModifEmp");
    var mailModif = document.getElementById("mailModifEmp");
    var roleModif = document.getElementsByName("roleM");
    var formModifEmp = document.getElementById("formModifEmp");

    nomModif.value = emplAModif.nom;
    prenomModif.value = emplAModif.prenom;
    passModif.value = emplAModif.pass;
    loginModif.value = emplAModif.login;
    mailModif.value = emplAModif.email;
    confirmPassModif.value = emplAModif.pass;

    if (emplAModif.role === "responsable") {
        roleModif[1].checked = true;
    } else if (emplAModif.role === "admin") {
        roleModif[2].checked = true;
    } else {
        roleModif[0].checked = true;
    }

// todo Verif champs formulaire
    nomModif.addEventListener("blur", function() {verifValeur(nomModif.value)});
    prenomModif.addEventListener("blur", function() {verifValeur(prenomModif.value)});
    confirmPassModif.addEventListener("blur", function() {verifConfPwd(passModif.value,confirmPassModif.value)});
    formModifEmp.addEventListener("submit", function(event) {verifFormModif(event,nomModif.value,prenomModif.value, passModif.value,confirmPassModif.value, loginModif.value, mailModif.value, id, formModifEmp )});
}

function verifFormModif(event, nom, prenom, pass, confPass, login, mail, id, form) {
    console.log("toto")
    if (verifValeur(nom) === false || verifValeur(prenom) === false || verifConfPwd(pass, confPass) === false) {
        event.preventDefault();
        msgErr("Un ou plusieurs champs sont invalides. Merci de remplir tout les champs du formulaire!") ;
    } else {
        let roleSelect = verifRadio("roleM");
        console.log(roleSelect);
        if (roleSelect === null) {
            event.preventDefault();
            msgErr("Merci de selectionner un role pour cet employé") ;
        } else {
            event.preventDefault();
            Swal.fire({
                position: "center",
                icon: "success",
                iconColor: '#FF6944',
                title: "L'employé : " + nom + ' a été modifié avec succès.',
                confirmButtonColor: '#FF6944',
                customClass: {
                    popup: 'custom-alert-class',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirection ou autre action ici
                    form.submit();
                    employesStorage.set(id, { nom, prenom, login, email: mail, pass, role: roleSelect });
                    localStorage.setItem("employes", JSON.stringify(Array.from(employesStorage.entries())));
                }
            });
        }
    }
}
/**
 * Récupère l'employé par l'id, le supprime et actualise le tableau 
 * @param {string} id 
 */
function supprimerEmp (id) {
    var emplAsupp = employesStorage.get(id);
    if (emplAsupp.role !== "admin") {
        employesStorage.delete(id);
        Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Cet employé "+ emplAsupp.role + " sera définitivement supprimé!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff6944",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmer",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem("employes", JSON.stringify(Array.from(employesStorage.entries())));
                location.reload();
            }
        });
    } else {
        Swal.fire({
            title: "Vous ne pouvez pas supprimer un "+emplAsupp.role+" !",
            icon: "warning",
            iconColor: '#FF6944', 
            confirmButtonColor: '#FF6944',
            customClass: {
            popup: 'custom-alert-class'
            }
        });
    }
}

function changeColor(lienActif, lienQuitte) {
    lienActif.style.color = "#ff6944";
    lienQuitte.style.color= "black"
}

function msgErr (chaine) {
    msgErrModifEmp.innerText = chaine;
    msgErrAjoutEmp.innerText = chaine;
}
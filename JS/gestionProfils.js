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
var msgErrGestionEmp = document.getElementById("msgErrGestionEmp");
var formAjoutEmp = document.getElementById("formAjoutEmp");
var lienAjoutEmp = document.getElementById("lienAjoutEmp");
var lienListeEmp = document.getElementById("lienListeEmp");

construireTableEmp();

inputNomEmp.addEventListener("blur", function () {verifValeur(inputNomEmp.value)});
inputPrenomEmp.addEventListener("blur", function() {verifValeur(inputPrenomEmp.value)});
inputMailEmp.addEventListener("blur", function() { verifMail(inputMailEmp.value)});
inputLoginEmp.addEventListener("blur", function() {verifLogin(inputLoginEmp.value)});
formAjoutEmp.addEventListener("submit", function(event) {verifForm(event)});
lienAjoutEmp.addEventListener("click", function() {afficheSection("sectionFormAjoutEmp")});
lienListeEmp.addEventListener("click", function() {afficheSection("listeEmp")});

inputConfPwdEmp.addEventListener("blur", verifConfPwd);


//////////// Fonctions//////////////

// -------- Partie inputs Formulaire --------
/**
 * Verifie les champs du formulaires avant ajout à la map et au localStorage
 * @param {event} event 
 */
function verifForm (event) {
    if (verifValeur(inputNomEmp.value) === false || verifValeur(inputPrenomEmp.value) === false || verifMail(inputMailEmp.value) === false || verifLogin(inputLoginEmp.value) === false) {
        event.preventDefault();
        msgErrGestionEmp.innerText = "Merci de remplir tout les champs du formulaire!";
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
        let roleSelect = verifRadio();
        if (roleSelect === null) {
            event.preventDefault();
            msgErrGestionEmp.innerText = "Merci de selectionner un role pour cet employé";
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
    msgErrGestionEmp.innerText = "";
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
        msgErrGestionEmp.innerText = "le champs doit contenir au moins 3 lettres alphabétique";
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
        msgErrGestionEmp.innerText = "Merci de saisir une adresse mail valide";
        return false;
    } 
}

/**
 * Contrôle la conformité avec le mot de passe saisi
 * @returns booleen
 */
function verifConfPwd() {
    viderMsgErr();
    if (inputConfPwdEmp.value !== inputPwdEmp.value){
        msgErrGestionEmp.innerText = "Le mot de passe ne correspond pas. Merci de le ressaisir!";
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
        msgErrGestionEmp.innerText = "le champs doit contenir au moins 3 caractères";
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
function verifRadio() {
    var radios = document.getElementsByName('role');
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
    if (role === "roleGestionnaire") {
        return "gestionnaire";
    } else if (role === "roleAdmin") {
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
    console.log("test")
    var sectionFormAjoutEmp = document.getElementById("sectionFormAjoutEmp");
    var sectionListeEmp = document.getElementById("listeEmp");
    if (id === "sectionFormAjoutEmp") {
        sectionFormAjoutEmp.classList.remove("hide");
        sectionListeEmp.classList.add("hide");
    } else if (id === "listeEmp") {
        sectionFormAjoutEmp.classList.add("hide");
        sectionListeEmp.classList.remove("hide");
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
		row.appendChild(cellID);
		
        var cellnom = document.createElement("td");
		var cellTextnom = document.createTextNode(employe.nom);
		cellnom.appendChild(cellTextnom);
		row.appendChild(cellnom);

        // Le Login de l'employé
        var cellLogin = document.createElement("td");
		var cellTextLogin = document.createTextNode(employe.login);
		cellLogin.appendChild(cellTextLogin);
		row.appendChild(cellLogin);
		

        var cellEmail = document.createElement("td");
		var cellTextEmail = document.createTextNode(employe.email);
		cellEmail.appendChild(cellTextEmail);
		row.appendChild(cellEmail);

        var cellRole = document.createElement("td");
		var cellTextRole = document.createTextNode(employe.role);
		cellRole.appendChild(cellTextRole);
		row.appendChild(cellRole);
        
        var cellAction = document.createElement("td");
        var btnModifierEmp = document.createElement("button");
        var btnSupprimerEmp = document.createElement("button");
        var btnModifierEmpText = document.createTextNode("Modifier");
        var btnSupprimerEmpText = document.createTextNode("Supprimer");
        cellAction.classList.add("tdActionEmp");
        btnModifierEmp.appendChild(btnModifierEmpText);
        btnSupprimerEmp.appendChild(btnSupprimerEmpText);
        btnModifierEmp.setAttribute("id","btnModifierEmp");
        btnSupprimerEmp.setAttribute("id","btnSupprimerEmp");
        btnModifierEmp.addEventListener("click", function() {modifierEmp(key)});
        btnSupprimerEmp.addEventListener("click", function() {supprimerEmp(key)});
        cellAction.appendChild(btnModifierEmp);
        cellAction.appendChild(btnSupprimerEmp);
        row.appendChild(cellAction);
		tListeEmp.appendChild(row);
    });
}

/**
 * Récupère l'employé par l'id, le supprime et actualise le tableau 
 * @param {string} id 
 */
function supprimerEmp (id) {
    employesStorage.delete(id);
    Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Cette employé sera définitivement supprimé!",
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
}

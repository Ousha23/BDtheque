const connecte = (localStorage.getItem("idUser") !== null);
if (connecte) {
    document.location.href = "index.html";
}

var btnConnexion = document.getElementById("connexionBtn");
var msgErrConnexion = document.getElementById("msgErrConnexion");
var formConnexion = document.getElementById("connexionform");
var inputLogin = document.getElementById("inputLogin");
var inputPassword = document.getElementById("inputPassword");
var checkBoxEmploye = document.getElementById("checkEmploye");

btnConnexion.addEventListener("click", verifForm);
formConnexion.addEventListener("submit", verifForm);

/**
 * Récupère les valeurs des inputs, renvoi les msg d'erreur et verifie les champs si vide/ renvoi vers la page d'accueil
 * @param {event} event 
 */
function verifForm(event) {
    var loginValue = inputLogin.value;
    var passwordValue = inputPassword.value;

    if (!loginValue || !passwordValue) {
        event.preventDefault();
        msgErrConnexion.innerText = "Merci de saisir un nom d'utilisateur et un mot de passe pour vous connecter!";
    } else {
        var userTrouve = userExiste(loginValue, passwordValue);
        if (userTrouve === false) {
            event.preventDefault();
            msgErrConnexion.innerText = "Le nom d'utilisateur ou le mot de passe saisi est erroné, merci de réessayer!";
        } 
    }
}

/**
 * Verifie si la checkbox emplyé est sélectionné en renvoi vers la fonction correspondante
 * @param {string} login 
 * @param {string} password 
 * @returns 
 */
function userExiste(login, password) {

    if (checkBoxEmploye.checked) {
        console.log("verif employe");
        return existeEmploye(login, password);
    } else {
        console.log("verif adherent")
        return existeAdherent(login, password);
    }
}

/**
 * Verifie au niveau de la Map Adherents si l'utilisateur existe
 * @param {string} logAdherent 
 * @param {string} passAdherent 
 * @returns 
 */
function existeAdherent(logAdherent, passAdherent) {
    let userTrouve = false;
    adherents.forEach((values, id) => {
        let loginRecupAdher = values.login;
        let passRecupAdher = values.pass;
        let typeUser = "adherent";
        let role = "";

        if (logAdherent === loginRecupAdher && passAdherent === passRecupAdher) {
            userTrouve = true;
 
            addToLocalStorage(id,logAdherent, typeUser, role);
            return;
        }
    });
    return userTrouve; 
}

/**
 * Verifie au niveau de la Map Employes si l'utilisateur existe
 * @param {string} logEmploye 
 * @param {string} passEmploye 
 * @returns 
 */
function existeEmploye(logEmploye, passEmploye) {
    let userTrouve = false;
    
    employes.forEach((values, id) => {
        let loginRecupEmpl = values.login;
        let passRecupEmpl = values.pass;
        let typeUser = "employe";
        let role = values.role;

        if (logEmploye === loginRecupEmpl && passEmploye === passRecupEmpl) {
            userTrouve = true; 

            addToLocalStorage(id,logEmploye,typeUser, role);
            return
        }
    });
    return userTrouve; 
}

/**
 * ajout des données dans le local storage
 * @param {string} id 
 * @param {string} login 
 * @param {string} type 
 */
function addToLocalStorage(id, login, type, role) {
    localStorage.setItem("idUser", id);
    localStorage.setItem("login", login);
    localStorage.setItem("typeUser", type);
    localStorage.setItem("role", role);
}



var menuDynamicDiv = document.getElementById("menuDynamique");
var monComptetxt = document.getElementById("connexionLink");
var menuCompte = document.getElementById("menuCompte");
var lienDeconnexion = document.getElementById("lienDeconnexion");

let idUser = localStorage.getItem("idUser");
let typeUser = localStorage.getItem("typeUser");

monComptetxt.addEventListener("click", afficherMenuCompte);
menuCompte.addEventListener("mouseleave", hideMenuCompte);
lienDeconnexion.addEventListener("click", deconnexion);


if (idUser) {
    var login = afficherMenu(idUser, typeUser);
    afficherMonCompte(login);   
} else {
    monComptetxt.removeEventListener("click", afficherMenuCompte);
    monComptetxt.addEventListener("click", renvoieConnexion);
} 
///////////////////////// Fonctions ////////////////
/**
 * Contrôle avant affichage menu selon utilisateur
 * @param {string} idUser 
 * @param {string} typeUser 
 * @returns 
 */
function afficherMenu (idUser, typeUser){
    
    while (menuDynamicDiv.firstChild) {
        menuDynamicDiv.removeChild(menuDynamicDiv.firstChild);
    }
    if (typeUser==="employe"){
        var employe = employes.get(idUser);
        if (employe.role === "gestionnaire") {
            creerNavGestionnaire();
        } else if (employe.role === "responsable") {
            creerNavResp();   
        } else if (employe.role === "admin") {
            creerNavAdmin();
        }
        return employe.login
    } else {
        var adherent = adherents.get(idUser);
        if (adherent) {
            creerNavAdherant();
            return adherent.login;
        }
    }
    
};

/**
 * Affiche le login au niveau de la barre du menu 
 * @param {string} login 
 */
function afficherMonCompte (login) {
    if (login !== undefined) {
        monComptetxt.innerText = login;
    }
}

/**
 * affiche le menu (mon Profil et Deconnexion) au clique sur le username
 */
function afficherMenuCompte (){
    menuCompte.classList.remove("hide");
}

/**
 * renvoi vers la page de connexion si aucun compte connecté
 */
function renvoieConnexion (){
    document.location.href = "connexion.html"
}
/**
 * Cache le menu mon compte et deconnexion
 */
function hideMenuCompte() {
    var menuCompte = document.getElementById("menuCompte");
    menuCompte.classList.add("hide");
}

/**
 * Crée la barre de navigation Gestionnaire
 */
function creerNavGestionnaire(){
    
    var gestMmbreDiv = document.createElement("div");
    gestMmbreDiv.setAttribute("class", "col-sm-6 col-md-3 divLienMenu");
    gestMmbreDiv.setAttribute("id","gestMmbreLien");
    var gestMmbreTxt = document.createTextNode("Gestion des membres"); // Création du nœud texte
    var gestMmbreLink = document.createElement("a");
    gestMmbreLink.setAttribute("href", "construction.html");
    gestMmbreLink.setAttribute("class", "aLinkMenu");
    gestMmbreLink.appendChild(gestMmbreTxt); 
    gestMmbreDiv.appendChild(gestMmbreLink); 
    menuDynamicDiv.appendChild(gestMmbreDiv);;

    var gestBDDiv = document.createElement("div");
    gestBDDiv.setAttribute("class", "col-sm-6 col-md-3 divLienMenu");
    gestBDDiv.setAttribute("id", "gestBDLien");
    var gestBDTxt = document.createTextNode("Gestion des BD"); // Création du nœud texte
    var gestBDLink = document.createElement("a");
    gestBDLink.setAttribute("href", "construction.html");
    gestBDLink.setAttribute("class", "aLinkMenu");
    gestBDLink.appendChild(gestBDTxt); 
    gestBDDiv.appendChild(gestBDLink); 
    menuDynamicDiv.appendChild(gestBDDiv);

    var gestCatalogDiv = document.createElement("div");
    gestCatalogDiv.setAttribute("class", "col-sm-6 col-md-3 divLienMenu");
    gestCatalogDiv.setAttribute("id", "gestCatalogueLien");
    var gestCatalogTxt = document.createTextNode("Gestion du catalogue"); // Création du nœud texte
    var gestCatalogLink = document.createElement("a");
    gestCatalogLink.setAttribute("href", "construction.html");
    gestCatalogLink.setAttribute("class", "aLinkMenu");
    gestCatalogLink.appendChild(gestCatalogTxt); 
    gestCatalogDiv.appendChild(gestCatalogLink); 
    menuDynamicDiv.appendChild(gestCatalogDiv);

    var gestEmpruntDiv = document.createElement("div");
    gestEmpruntDiv.setAttribute("class", "col-sm-6 col-md-3  divLienMenu");
    gestEmpruntDiv.setAttribute("id", "gestEmpruntLien");
    var gestEmpruntTxt = document.createTextNode("Gestion des Emprunts"); // Création du nœud texte
    var gestEmpruntLink = document.createElement("a");
    gestEmpruntLink.setAttribute("href", "construction.html");
    gestEmpruntLink.setAttribute("class", "aLinkMenu");
    gestEmpruntLink.appendChild(gestEmpruntTxt); 
    gestEmpruntDiv.appendChild(gestEmpruntLink); 
    menuDynamicDiv.appendChild(gestEmpruntDiv); 

}

/**
 * Crée la barre navigation Adherent
 */
function creerNavAdherant(){

    var monHistoriqueDiv = document.createElement("div");
    monHistoriqueDiv.setAttribute("class", "col-sm-6 col-md-3 divLienMenu");
    monHistoriqueDiv.setAttribute("id","monHistoriqueLien");
    var monHistoriqueTxt = document.createTextNode("Mon historique"); // Création du nœud texte
    var monHistoriqueLink = document.createElement("a");
    monHistoriqueLink.setAttribute("href", "construction.html");
    monHistoriqueLink.setAttribute("class", "aLinkMenu");
    monHistoriqueLink.appendChild(monHistoriqueTxt); 
    monHistoriqueDiv.appendChild(monHistoriqueLink); 
    menuDynamicDiv.appendChild(monHistoriqueDiv);;

    var mesEmpruntsDiv = document.createElement("div");
    mesEmpruntsDiv.setAttribute("class", "col-sm-6 col-md-3 divLienMenu");
    mesEmpruntsDiv.setAttribute("id", "mesEmpruntsLien");
    var mesEmpruntsTxt = document.createTextNode("Mes Emprunts"); // Création du nœud texte
    var mesEmpruntsLink = document.createElement("a");
    mesEmpruntsLink.setAttribute("href", "construction.html");
    mesEmpruntsLink.setAttribute("class", "aLinkMenu");
    mesEmpruntsLink.appendChild(mesEmpruntsTxt); 
    mesEmpruntsDiv.appendChild(mesEmpruntsLink); 
    menuDynamicDiv.appendChild(mesEmpruntsDiv);

    var listeEnvieDiv = document.createElement("div");
    listeEnvieDiv.setAttribute("class", "col-sm-6 col-md-3 divLienMenu");
    listeEnvieDiv.setAttribute("id", "listeEnvieLien");
    var listeEnvieTxt = document.createTextNode("Ma liste d'envie"); // Création du nœud texte
    var listeEnvieLink = document.createElement("a");
    listeEnvieLink.setAttribute("href", "construction.html");
    listeEnvieLink.setAttribute("class", "aLinkMenu");
    listeEnvieLink.appendChild(listeEnvieTxt); 
    listeEnvieDiv.appendChild(listeEnvieLink); 
    menuDynamicDiv.appendChild(listeEnvieDiv);

    var abntDiv = document.createElement("div");
    abntDiv.setAttribute("class", "col-sm-6 col-md-3  divLienMenu");
    abntDiv.setAttribute("id", "abntLien");
    var abntTxt = document.createTextNode("Mon abonnement"); // Création du nœud texte
    var abntLink = document.createElement("a");
    abntLink.setAttribute("href", "construction.html");
    abntLink.setAttribute("class", "aLinkMenu");
    abntLink.appendChild(abntTxt); 
    abntDiv.appendChild(abntLink); 
    menuDynamicDiv.appendChild(abntDiv); 

}

/**
 * Crée la barre de navigation Admin
 */
function creerNavAdmin(){

    var gererProfileDiv = document.createElement("div");
    gererProfileDiv.setAttribute("class", "col-12 divLienMenu");
    gererProfileDiv.setAttribute("id","gererProfileLien");
    var gererProfileTxt = document.createTextNode("Gérer les profiles"); // Création du nœud texte
    var gererProfileLink = document.createElement("a");
    gererProfileLink.setAttribute("href", "gestionProfils.html");
    gererProfileLink.setAttribute("class", "aLinkMenu");
    gererProfileLink.appendChild(gererProfileTxt); 
    gererProfileDiv.appendChild(gererProfileLink); 
    menuDynamicDiv.appendChild(gererProfileDiv);;

}

/**
 * Crée la barre de navigation Responsable
 */
function creerNavResp(){

    var statistiqueDiv = document.createElement("div");
    statistiqueDiv.setAttribute("class", "col-12 col-md-4 divLienMenu");
    statistiqueDiv.setAttribute("id","gererProfileLien");
    var statistiqueTxt = document.createTextNode("Statistiques"); // Création du nœud texte
    var statistiqueLink = document.createElement("a");
    statistiqueLink.setAttribute("href", "construction.html");
    statistiqueLink.setAttribute("class", "aLinkMenu");
    statistiqueLink.appendChild(statistiqueTxt); 
    statistiqueDiv.appendChild(statistiqueLink); 
    menuDynamicDiv.appendChild(statistiqueDiv);

    var retardJourDiv = document.createElement("div");
    retardJourDiv.setAttribute("class", "col-sm-6 col-md-4 divLienMenu");
    retardJourDiv.setAttribute("id","gererProfileLien");
    var retardJourTxt = document.createTextNode("Retards du jour"); // Création du nœud texte
    var retardJourLink = document.createElement("a");
    retardJourLink.setAttribute("href", "construction.html");
    retardJourLink.setAttribute("class", "aLinkMenu");
    retardJourLink.appendChild(retardJourTxt); 
    retardJourDiv.appendChild(retardJourLink); 
    menuDynamicDiv.appendChild(retardJourDiv);

    var consultRetardDiv = document.createElement("div");
    consultRetardDiv.setAttribute("class", "col-sm-6 col-md-4 divLienMenu");
    consultRetardDiv.setAttribute("id","gererProfileLien");
    var consultRetardTxt = document.createTextNode("Consulter les retards"); // Création du nœud texte
    var consultRetardLink = document.createElement("a");
    consultRetardLink.setAttribute("href", "construction.html");
    consultRetardLink.setAttribute("class", "aLinkMenu");
    consultRetardLink.appendChild(consultRetardTxt); 
    consultRetardDiv.appendChild(consultRetardLink); 
    menuDynamicDiv.appendChild(consultRetardDiv);

}

/**
 * Supprime les données du localStorage et raffraichi la page
 */
function deconnexion () {
    localStorage.clear();
    document.location.href = "index.html";
}

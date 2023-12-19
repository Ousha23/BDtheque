// Définition d'un constructeur pour les adhérents
function Adherent(nom, email) {
  this.nom = nom;
  this.email = email;
}

// Création d'une liste vide d'adhérents
let listeAdherents = [];

// Fonction pour ajouter un adhérent à la liste
function ajouterAdherent(nom, email) {
  let nouvelAdherent = new Adherent(nom, email); // Création d'un nouvel adhérent en utilisant le constructeur Adherent
  listeAdherents.push(nouvelAdherent); // Ajout de l'adhérent à la liste
}

// Ajout de 30 adhérents à la liste
ajouterAdherent("Jean Dupont", "jean@example.com");
ajouterAdherent("Marie Durand", "marie@example.com");
ajouterAdherent("Pierre Martin", "pierre@example.com");
ajouterAdherent("Sophie Dubois", "sophie@example.com");
ajouterAdherent("Lucas Thomas", "lucas@example.com");
ajouterAdherent("Léa Garcia", "lea@example.com");
ajouterAdherent("Antoine Rodriguez", "antoine@example.com");
ajouterAdherent("Manon Lopez", "manon@example.com");
ajouterAdherent("Gabriel Martinez", "gabriel@example.com");
ajouterAdherent("Emma Hernandez", "emma@example.com");
ajouterAdherent("Louis Sanchez", "louis@example.com");
ajouterAdherent("Charlotte Nguyen", "charlotte@example.com");
ajouterAdherent("Pauline Kim", "pauline@example.com");
ajouterAdherent("Hugo Li", "hugo@example.com");
ajouterAdherent("Chloé Wong", "chloe@example.com");
ajouterAdherent("Théo Ma", "theo@example.com");
ajouterAdherent("Manuela Costa", "manuela@example.com");
ajouterAdherent("Jules Barbosa", "jules@example.com");
ajouterAdherent("Maëlys Perez", "maelys@example.com");
ajouterAdherent("Alexandre dos Santos", "alexandre@example.com");
ajouterAdherent("Clara Carvalho", "clara@example.com");
ajouterAdherent("Matteo Costa", "matteo@example.com");
ajouterAdherent("Lola Lefevre", "lola@example.com");
ajouterAdherent("Maxime Boucher", "maxime@example.com");
ajouterAdherent("Inès Lambert", "ines@example.com");
ajouterAdherent("Adam Moreau", "adam@example.com");
ajouterAdherent("Zoé Girard", "zoe@example.com");
ajouterAdherent("Julia Mercier", "julia@example.com");
ajouterAdherent("Nathan Dupuis", "nathan@example.com");
ajouterAdherent("Louise Legrand", "louise@example.com");

// Affichage de la liste des adhérents
console.log(listeAdherents);

// Affichage des détails de chaque adhérent
listeAdherents.forEach(function (adherent, index) {
  console.log(`Adhérent ${index + 1}:`);
  console.log(`Nom: ${adherent.nom}`);
  console.log(`Email: ${adherent.email}`);
  console.log("--------------");
});

// Affichage des détails de chaque adhérent
listeAdherents.forEach(function (adherent, index) {
  console.log(`Adhérent ${index + 1}:`);
  console.log(`Nom: ${adherent.nom}`);
  console.log(`Email: ${adherent.email}`);
  console.log("--------------");
});
function modifierAdherent(nom, nouvelEmail) {
  let found = false;

  for (let i = 0; i < listeAdherents.length; i++) {
    if (listeAdherents[i].nom === nom) {
      listeAdherents[i].email = nouvelEmail;
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("Adhérent non trouvé");
  } else {
    console.log(`Les détails de l'adhérent ${nom} ont été mis à jour.`);
  }
}

// Appel de la fonction pour modifier l'email d'un adhérent (par exemple)
modifierAdherent("Jean Dupont", "nouveaujean@example.com");

// Affichage mis à jour de la liste des adhérents
console.log(listeAdherents);

function supprimerAdherent(nom) {
  let index = listeAdherents.findIndex((adherent) => adherent.nom === nom);

  if (index !== -1) {
    listeAdherents.splice(index, 1);
    console.log(`L'adhérent ${nom} a été supprimé de la liste.`);
  } else {
    console.log("Adhérent non trouvé");
  }
}

// Appel de la fonction pour supprimer un adhérent (par exemple)
supprimerAdherent("Jean Dupont");

// Affichage de la liste mise à jour des adhérents après la suppression
console.log(listeAdherents);

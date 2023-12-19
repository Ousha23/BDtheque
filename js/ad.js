function Adherent(nom, prenom, email) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
  }

  // Fonction pour afficher les détails des adhérents
  function afficherDetailsAdherents() {
    const detailsAdherentsElement =
      document.getElementById("detailsAdherents");

    // Nettoie le contenu actuel des détails des adhérents
    /*  detailsAdherentsElement.innerHTML = "";

    
    this.adherents.forEach((adherent, id) => {
      const detailsAdherent = document.createElement("div");
      detailsAdherent.classList.add("adherent-details");

      detailsAdherent.innerHTML = `
      <p>ID: ${id}</p>
      <p>Nom: ${adherent.nom}</p>
      <p>Prénom: ${adherent.prenom}</p>
      <p>Email: ${adherent.email}</p>
      <p>--------------</p>
    `;

      detailsAdherentsElement.appendChild(detailsAdherent);
    });*/
  }

  // Appelez cette fonction pour afficher les détails des adhérents dans votre interface utilisateur
  afficherDetailsAdherents();

  // Création d'une liste vide d'adhérents
  let listeAdherents = [];

  const form = document.getElementById("adherentForm");
  const listeAdherentsElement = document.getElementById("listeAdherents");
  const modifierAdherentForm = document.getElementById(
    "modifierAdherentForm"
  );
  const messageModification = document.getElementById(
    "messageModification"
  );
  const messageAjout = document.getElementById("messageAjout");

  // Cette fonction supprime le contenu du message après un délai de 3 secondes
  function clearMessage(element) {
    setTimeout(function () {
      element.textContent = "";
    }, 3000);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;

    if (emailExists(email)) {
      alert(
        "L'adresse email est déjà utilisée. Veuillez entrer une autre adresse email."
      );
      return;
    }

    ajouterAdherent(nom, prenom, email);
    afficherAdherents();
    form.reset();

    messageAjout.textContent = "Un nouvel adhérent a été ajouté.";
    clearMessage(messageAjout);
  });
class GestionEmprunts {
    constructor() {
        
        this.emprunts = [];
        this.empruntMax = 3;
        this.dureeMaxEmpruntJours = 15;
        this.adherents = new Map([
            ["001", { id: "001", nom: "Dupont", prenom: "Jean", email: "jean.dupont@email.com", emprunts: [] }],
            ["002", { id: "002", nom: "Martin", prenom: "Sophie", email: "sophie.martin@email.com", emprunts: [] }],
            ["003", { id: "003", nom: "Lefevre", prenom: "Pierre", email: "pierre.lefevre@email.com", emprunts: [] }],
            ["004", { id: "004", nom: "Dufour", prenom: "Marie", email: "marie.dufour@email.com", emprunts: [] }],
            ["005", { id: "005", nom: "Leroy", prenom: "Lucas", email: "lucas.leroy@email.com", emprunts: [] }],
            ["006", { id: "006", nom: "Bertrand", prenom: "Anna", email: "anna.bertrand@email.com", emprunts: [] }],
        ]);
        //this.exemplaires = {};

        this.bdExemplaires = new Map([
            ["A001", { titre: "Titre BD A", disponible: true }],
            ["A002", { titre: "Titre BD B", disponible: true }],
            ["A003", { titre: "Titre BD C", disponible: true }],
            ["A004", { titre: "Titre BD D", disponible: false }],
            ["A005", { titre: "Titre BD E", disponible: true }],
            ["A006", { titre: "Titre BD F", disponible: true }],
            ["A007", { titre: "Titre BD G", disponible: true }],
            ["A008", { titre: "Titre BD H", disponible: true }],
            ["A009", { titre: "Titre BD I", disponible: true }],
            ["A010", { titre: "Titre BD J", disponible: true }],
        ]);
       
    }

  
    ajouterAdherent(id, nom, prenom, email) {
        // Créez un nouvel adhérent
        const nouvelAdherent = {
            id,
            nom,
            prenom,
            email,
            emprunts: [],
        };

        // Ajoutez le nouvel adhérent à la liste des adhérents
        this.adherents.set(id, nouvelAdherent);
    }
   

    rechercherAdherent(nomEmailId) {
        let adherent = null;
        // Vérifie si le paramètre est un ID
        if (!isNaN(nomEmailId) && this.adherents.has(nomEmailId)) {
            return this.adherents.get(nomEmailId);
        }

       
        // Recherche par nom et email
        for (const [_, adherent] of this.adherents) {
            if (adherent.nom.toLowerCase() === nomEmailId.toLowerCase() || 
                adherent.email.toLowerCase() === nomEmailId.toLowerCase()) {
                return adherent;
            }
        }

        //Si adherant introuvable --> créer nouvel adherant ou annuler
        if (!adherent) {
            alert("Cet adhérent n'est pas connu par notre système. Veuillez vérifier le numéro d'adhérent ou créer un nouvel adhérent.");

            const creerNouvelAdherent = confirm("Voulez-vous créer un nouvel adhérent ?");
            if (creerNouvelAdherent) {
                window.location.href = "creation_adherent.html";
            } else {
                alert("Opération annulée.");
            }
        } else {
            // Affichez les résultats de la recherche
            afficherResultatsRecherche(adherent);
        }
    }

    
     

  

    enregistrerEmprunt(numeroAdherent, codeExemplaire) {
        let adherent = this.rechercherAdherentParId(numeroAdherent);

        if (this.getNombreEmprunts(numeroAdherent) >= this.empruntMax) {
            alert("Cet adhérent a déjà atteint le nombre maximum d'emprunts autorisés.");
            return;
        }

        let exemplaire = this.bdExemplaires.get(codeExemplaire);

        if (!exemplaire) {
            this.saisirNouveauCodeExemplaire();
            return;
        }

        if (!exemplaire.disponible) {
            alert("Cette BD n'est pas disponible pour l'emprunt.");
            return;
        }

        //calcul date emprunt
        let dateRetourPrevu = new Date();
        dateRetourPrevu.setDate(dateRetourPrevu.getDate() + this.dureeMaxEmpruntJours);

        let emprunt = {
            numeroAdherent,
            codeExemplaire,
            dateEmprunt: new Date(),
            dateRetourPrevu,
        };

        adherent.emprunts.push(emprunt);
        exemplaire.disponible = false;

        //tester retard 
        /*const dateActuelle = new Date();
        const dateEmprunt = new Date(dateActuelle);
        dateEmprunt.setDate(dateEmprunt.getDate() - 16);
    
        let dateRetourPrevu = new Date(dateEmprunt);
        dateRetourPrevu.setDate(dateRetourPrevu.getDate() + this.dureeMaxEmpruntJours);
    
        let emprunt = {
            numeroAdherent,
            codeExemplaire,
            dateEmprunt,
            dateRetourPrevu,
        };*/

         // Vérifier le retard
        const retardJours = this.calculerRetard(emprunt);
        if (retardJours > 0) {
        const payerAmende = confirm(`Cet adhérent a un retard de ${retardJours} jours. Voulez-vous payer une amende de 5 euros ?`);

        if (payerAmende) {
            this.payerAmende(adherent);
        } else {
            this.restrictionsEmprunt(adherent);
        }
    }

        this.sauvegarderEmpruntsLocaux();

        alert("L'emprunt a été enregistré avec succès. Adhérent: " + emprunt.numeroAdherent + ", Code Exemplaire: " + emprunt.codeExemplaire + ", Titre: " + exemplaire.titre);

    }

    calculerRetard(emprunt) {
        const dateRetourEffectif = new Date(); 
        const retardMillis = dateRetourEffectif - emprunt.dateRetourPrevu;
        const retardJours = Math.floor(retardMillis / (24 * 60 * 60 * 1000));
        return Math.max(0, retardJours); 
    }
    
    payerAmende(adherent) {
        
        alert("Amende payée avec succès. L'adhérent peut emprunter à nouveau.");
    }
    
    restrictionsEmprunt(adherent) {
        
        alert("L'adhérent a des restrictions d'emprunt en raison du retard. Veuillez contacter le service client.");
    }

    rechercherAdherentParId(numeroAdherent) {
        const adherent = this.adherents.get(numeroAdherent);

        if (!adherent) {
            alert("L'adhérent n'est pas connu par notre système.");
            return null;
        }

        if (!adherent.emprunts) {
            adherent.emprunts = [];
        }

        return adherent;
    }

    getNombreEmprunts(numeroAdherent) {
        let adherent = this.rechercherAdherentParId(numeroAdherent);
        return adherent ? adherent.emprunts.length : 0;
    }

    saisirNouveauCodeExemplaire() {
        while (true) {
            let codeExemplaire = prompt("Le code exemplaire n'est pas reconnu. Veuillez le saisir à nouveau: ");
            if (this.bdExemplaires.get(codeExemplaire)) {
                break;
            }
            console.log("Code exemplaire non reconnu. Veuillez réessayer.");
        }
    }

    afficherExemplairesBD() {
        console.log("Liste des exemplaires de BD : ");
        this.bdExemplaires.forEach((exemplaire, codeExemplaire) => {
            let disponibilite = exemplaire.disponible ? "Disponible" : "Emprunté";
            console.log(`${codeExemplaire} - ${exemplaire.titre} (${disponibilite})`);
        });
    }

    sauvegarderEmpruntsLocaux() {
        // Convertissez les emprunts en format JSON
        const empruntsJSON = JSON.stringify(this.emprunts);

        // Stockez les emprunts dans le localStorage sous la clé "emprunts"
        localStorage.setItem("emprunts", empruntsJSON);
    }


    

    
}


class GestionEmprunts {
    constructor() {
        
        this.emprunts = [];
        this.empruntMax = 3;
        this.empruntMin =0;
        this.dureeMaxEmpruntJours = 15;
        this.exemplaires = exemplaires;
        this.albums = albums;
        this.adherents = new Map([
            ["001", { id: "001", nom: "Dupont", prenom: "Jean", email: "jean.dupont@email.com", emprunts: [],adesion: new Date("2023-01-01") }],
            ["002", { id: "002", nom: "Martin", prenom: "Sophie", email: "sophie.martin@email.com", emprunts: [],adesion: new Date("2023-02-15") }],
            ["003", { id: "003", nom: "Lefevre", prenom: "Pierre", email: "pierre.lefevre@email.com", emprunts: [],adesion:  new Date("2022-12-16")}],
            ["004", { id: "004", nom: "Dufour", prenom: "Marie", email: "marie.dufour@email.com", emprunts: [],adesion: new Date("2023-04-16") }],
            ["005", { id: "005", nom: "Leroy", prenom: "Lucas", email: "lucas.leroy@email.com", emprunts: [],adesion:new Date("2023-09-19")  }],
            ["006", { id: "006", nom: "Bertrand", prenom: "Anna", email: "anna.bertrand@email.com", emprunts: [],adesion: new Date("2023-08-01") }],
        ]);
      

        /*this.bdExemplaires = new Map([
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
        ]);*/

        if (!this.bdExemplaires) {
           
            this.bdExemplaires = new Map();
        
            for (const [idExemplaire, exemplaire] of this.exemplaires) {
                if (this.albums.has(exemplaire.idAlbum)) {
                    const titreAlbum = this.albums.get(exemplaire.idAlbum).titre;
                    exemplaire.titreAlbum = titreAlbum;
        
                    // Ajouter à la Map bdExemplaire
                    this.bdExemplaires.set(idExemplaire, exemplaire);
                }
            }
        }

        for (const [idExemplaire, exemplaire] of this.bdExemplaires) {
            // Renommer la variable barreCode en codeExemplaire
           // exemplaire.codeExemplaire = exemplaire.barreCode;
            exemplaire.titre = exemplaire.titreAlbum;
           // delete exemplaire.barreCode;  
            delete exemplaire.titreAlbum;  
           
        }
        
        // Afficher le contenu mis à jour de la Map bdExemplaire
        console.log("Contenu mis à jour de this.bdExemplaire :", this.bdExemplaires);

        this.loadEmpruntsFromLocalStorage();

        
        this.loadStateFromLocalStorage();
       
        
       
    }



   
   /* ajouterAdherent(id, nom, prenom, email) {
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
    }*/
   

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

            Swal.fire({
                icon: "error",
                iconColor: '#FF6944',
                title: "Oops...",
                text: "Cet adhérent n'est pas connu par notre système. Veuillez vérifier le numéro d'adhérent ou créer un nouvel adhérent.",
                confirmButtonColor: '#FF6944',
                footer: '<a href="création_adherant.html">Souhetez vous créer un nouvel adherant ?</a>',
                customClass: {
                    popup: 'custom-alert-class',
                    color:"black",
                  
                }


            }) .then(() => {
                // Code à exécuter après que l'utilisateur a cliqué sur "OK"
                let resultatsRecherche = document.getElementById("resultatsRecherche");
                resultatsRecherche.innerHTML = '<p style="color: red; font-size: 18px;">Aucun adhérent trouvé.</p> ';
            });
             
            return;
        } else {
            // Affichez les résultats de la recherche
            afficherResultatsRecherche(adherent);
        }
    }

    enregistrerEmprunt(numeroAdherent, codeExemplaire) {
       
        let adherent = this.rechercherAdherentParId(numeroAdherent);

        if (!this.verifierCotisation(numeroAdherent)) {
            return; // Arrêtez le processus d'emprunt si la cotisation n'est pas valide
        }

        if (this.getNombreEmprunts(numeroAdherent) >= this.empruntMax) {
           

            Swal.fire({
                title: "Maximum d'emprunts atteint!",
                text: "Cet adhérent a déjà atteint le nombre maximum d'emprunts autorisés.",
                icon: "question",
                iconColor: '#FF6944', 
                confirmButtonColor: '#FF6944',
                customClass: {
                    popup: 'custom-alert-class'
                  
                }
              });
              return;
        }

        let exemplaire = this.bdExemplaires.get(codeExemplaire);

        if (!exemplaire) {
            Swal.fire({
                icon: "error",
                iconColor: '#FF6944',
                title: "Oops...",
                text: "Code exemplaire non reconnu. Veuillez réessayer !",
                confirmButtonColor: '#FF6944',
                customClass: {
                    popup: 'custom-alert-class',
                    color:"black",
                  
                }
            }) 
            return;
        }

        if (!exemplaire.disponible) {
        

            Swal.fire({
                title: "Cette BD n'est pas disponible pour l'emprunt !",
                imageUrl: "https://unsplash.it/400/200",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                customClass: {
                    popup: 'custom-alert-class',
                    
                  
                }
              });
            return;
        }
      //calcul date emprunt
        let dateEmprunt = new Date();
        let dateRetourPrevu = new Date();
        dateRetourPrevu.setDate(dateRetourPrevu.getDate() + this.dureeMaxEmpruntJours);

        let emprunt = {
            numeroAdherent,
            codeExemplaire,
            dateEmprunt,
            dateRetourPrevu,
        };

        /*//tester retard 
         const dateActuelle = new Date();
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
 
         exemplaire.overdue = this.isBookOverdue(emprunt);


        adherent.emprunts.push(emprunt);
        this.bdExemplaires.set(codeExemplaire, { ...exemplaire, disponible: false });

   
        /* // Vérifier le retard
        const retardJours = this.calculerRetard(emprunt);
        if (retardJours > 0) {
            const payerAmende = confirm(`Cet adhérent a un retard de ${retardJours} jours. Voulez-vous payer une amende de 5 euros ?`);

            if (payerAmende) {
                this.payerAmende(adherent);
            } else {
                this.restrictionsEmprunt(adherent);
            }
        }*/

      

        this.sauvegarderEmpruntsLocaux(adherent);

        Swal.fire({
            position: "center",
            icon: "success",
            iconColor: '#FF6944',
            title: "L'emprunt a été enregistré avec succès.",
            showConfirmButton: false,
            timer: 3000,
            confirmButtonColor: '#FF6944',
            customClass: {
                popup: 'custom-alert-class',
              
            }
          });

       

        this.verifierRetard(exemplaire);
      
        
    }

    isBookOverdue(emprunt) {
        const dateRetourEffectif = new Date();
        const retardMillis = dateRetourEffectif - emprunt.dateRetourPrevu;
        const retardJours = Math.floor(retardMillis / (24 * 60 * 60 * 1000));
        return Math.max(0, retardJours) > 0;
    }
    
    verifierRetard(exemplaire) {
        if (exemplaire.overdue) {
            const payerAmende = confirm("Cette BD a un retard. Voulez-vous payer une amende de 5 euros ?");
    
            if (payerAmende) {
                // Perform actions for paying the fine
                alert("Amende payée avec succès. L'adhérent peut emprunter à nouveau.");
            } else {
                // Perform actions for not paying the fine
                alert("L'adhérent a des restrictions d'emprunt en raison du retard. Veuillez contacter le service client.");
            }
        }
    }

    verifierCotisation(numeroAdherent) {
        const adherent = this.rechercherAdherentParId(numeroAdherent);

        if (adherent && adherent.adesion) {
            const differenceAnnees = (new Date() - adherent.adesion) / (365 * 24 * 60 * 60 * 1000);

            if (differenceAnnees >= 1) {
                Swal.fire({
                    icon: "warning",
                    title: "Renouvellement de cotisation nécessaire",
                    text: "Votre adhésion a dépassé 1 an. Veuillez renouveler votre cotisation avant d'emprunter de nouveaux livres.",
                    confirmButtonColor: '#FF6944',
                    customClass: {
                        popup: 'custom-alert-class',
                        color: "black",
                    }
                });

                return false; // Indique que la cotisation n'est pas valide
            }
        }

        return true; // La cotisation est valide
    }


    enregistrerRetour(numeroAdherent, codeExemplaire) {
        let adherent = this.rechercherAdherentParId(numeroAdherent);
    
        if (this.getNombreEmprunts(numeroAdherent) <= this.empruntMin) {
            Swal.fire({
                title: "Cet adhérent n'a pas d'emprunts en cours!",
                icon: "question",
                iconColor: '#FF6944',
                confirmButtonColor: '#FF6944',
                customClass: {
                    popup: 'custom-alert-class'
                }
            });
            return;
        }
    
    
    
        let exemplaire = this.bdExemplaires.get(codeExemplaire);
    
        if (!codeExemplaire) {
            Swal.fire({
                icon: "error",
                iconColor: '#FF6944',
                title: "Oops...",
                text: "Code exemplaire non reconnu. Veuillez réessayer !",
                confirmButtonColor: '#FF6944',
                customClass: {
                    popup: 'custom-alert-class',
                    color: "black",
                }
            });
            return;
        }
    
        if (!adherent.emprunts.some(e => e.codeExemplaire === codeExemplaire)) {
            Swal.fire({
                title: "Cet exemplaire n'a pas été emprunté par cet adhérent !",
                text: "Veuillez vérifier les informations d'emprunt.",
                icon: "error",
                iconColor: "#FF6944",
                confirmButtonColor: "#FF6944",
                customClass: {
                    popup: "custom-alert-class",
                },
            });
            return;
        }
    
        this.bdExemplaires.set(codeExemplaire, { ...exemplaire, disponible: true });
    
        adherent.emprunts = adherent.emprunts.filter(e => e.codeExemplaire !== codeExemplaire);
        this.sauvegarderEmpruntsLocaux(adherent);
    
        Swal.fire({
            position: "center",
            icon: "success",
            iconColor: "#FF6944",
            title: "Le retour a été enregistré avec succès.",
            showConfirmButton: false,
            timer: 3000,
            confirmButtonColor: "#FF6944",
            customClass: {
                popup: "custom-alert-class",
            }
        });
    
        this.verifierRetard(exemplaire);
    }
    

   /* sauvegarderEmpruntsLocaux() {
        // Convertir tous les emprunts en format JSON
        
        const empruntsJSON = JSON.stringify(this.emprunts);
        
        // Stocker les emprunts dans le localStorage sous la clé "emprunts"
        localStorage.setItem("emprunts", empruntsJSON);
    }*/

    sauvegarderEmpruntsLocaux(adherent) {
      
        // Convertir les emprunts en format JSON
        var empruntsJSON = JSON.stringify(adherent.emprunts);
        var empruntsTJSON = JSON.stringify(this.emprunts);
        // Stocker les emprunts dans le localStorage sous la clé correspondant à l'adhérent
        localStorage.setItem("adherent_" + adherent.id + "_emprunts", empruntsJSON);
        localStorage.setItem("emprunts", empruntsTJSON);
    }  
    

    loadEmpruntsFromLocalStorage() {
        // Clear the existing emprunts array
        this.emprunts = [];
        //localStorage.clear();
        // Récupérer les emprunts généraux stockés dans le localStorage
        const savedEmprunts = localStorage.getItem("emprunts");
        this.emprunts = savedEmprunts ? JSON.parse(savedEmprunts) : [];
        if (!Array.isArray(this.emprunts)) {
            this.emprunts = [];
        }
    
        // Mettre à jour les emprunts des adhérents
        this.adherents.forEach((adherent, adherentId) => {
            const savedEmprunts = localStorage.getItem("adherent_" + adherentId + "_emprunts");
            adherent.emprunts = savedEmprunts ? JSON.parse(savedEmprunts) : [];
            if (!Array.isArray(adherent.emprunts)) {
                adherent.emprunts = [];
            }
        });
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
            // Handle the case where the adherent is not found
            Swal.fire({
                title: "L'adhérent n'est pas connu par notre système !",
                text: "Veuillez vérifier l'identifiant introduit",
                icon: "question",
                iconColor: '#FF6944', 
                confirmButtonColor: '#FF6944',
                customClass: {
                    popup: 'custom-alert-class'
                }
            });
    
            return null; // Ajoutez cette ligne pour éviter les erreurs lors de l'accès à adherent.emprunts
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

    


    afficherExemplairesBD() {
        console.log("Liste des exemplaires de BD : ");
        this.bdExemplaires.forEach((exemplaire, codeExemplaire) => {
            let disponibilite = exemplaire.disponible ? "Disponible" : "Emprunté";
            console.log(`${codeExemplaire} - ${exemplaire.titre} (${disponibilite})`);
           
        });
    }

    

    loadStateFromLocalStorage() {
       
        const savedState = localStorage.getItem("gestion_emprunts_state");
        if (savedState) {
            const state = JSON.parse(savedState);
            // Restore the state of borrowed books
            this.emprunts = state.emprunts || [];
            this.bdExemplaires = new Map(state.bdExemplaires || []);
        }
    }

    saveStateToLocalStorage() {
        // Save the state of borrowed books to local storage
        const state = {
            emprunts: this.emprunts,
            bdExemplaires: Array.from(this.bdExemplaires),
        };
        localStorage.setItem("gestion_emprunts_state", JSON.stringify(state));
    }
    
 
}

    

const gestionEmprunts = new GestionEmprunts();
gestionEmprunts.loadStateFromLocalStorage(); // Load the state when the page loads

window.addEventListener("beforeunload", () => {
    gestionEmprunts.saveStateToLocalStorage(); // Save the state before the page is unloaded
});


class GestionEmprunts {
    constructor() {
        
        this.emprunts = new Map(); 
        this.empruntMax = 3;
        this.empruntMin =0;
        this.dureeMaxEmpruntJours = 15;
        this.exemplaires = exemplaires || new Map();
        this.albums = albums || new Map();
        this.adherents = adherents || new Map();

      
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

        if (!this.adherents) {
            this.adherents = new Map();
        }

        for (const [idExemplaire, exemplaire] of this.bdExemplaires) {
            exemplaire.titre = exemplaire.titreAlbum;
           // delete exemplaire.barreCode;  
            delete exemplaire.titreAlbum;  
           
        }

        this.loadEmpruntsFromLocalStorage();
        this.loadStateFromLocalStorage();
        this.loadAmendesFromLocalStorage();
       
             
    }

    //recherche Adherant
    rechercherAdherent(nomEmailId) {
        let adherent = null;
    
        // Vérifie si le paramètre est un ID
        if (!isNaN(nomEmailId) && this.adherents.has(nomEmailId)) {
            return this.adherents.get(nomEmailId);
        }

       
    
        // Recherche par e-mail
        for (const [_, adherent] of this.adherents) {
            if (adherent.email.toLowerCase() === nomEmailId.toLowerCase()) {
                return adherent;
            }
        }
    
        // Recherche par nom
        const adherentsAvecNom = [...this.adherents.values()].filter(
            (adherent) => adherent.nom.toLowerCase() === nomEmailId.toLowerCase()
        );
    
        if (adherentsAvecNom.length === 1) {
            // Si un seul adhérent correspond au nom, le retourner
            return adherentsAvecNom[0];
        } else if (adherentsAvecNom.length > 1) {
            // S'il y a plusieurs adhérents avec le même nom, demander à l'utilisateur de spécifier l'ID ou l'e-mail
           
            Swal.fire({
                icon: "warning",
                iconColor: '#FF6944',
                text:"Il existe plusieurs adhérents avec le même nom. Veuillez spécifier l'ID ou l'e-mail.",
                confirmButtonColor: '#FF6944',
                customClass: {
                    popup: 'custom-alert-class',
                    color:"black",
                  
                }
            }) 
    
            const userInput = prompt(message);
    
            // Rechercher l'adhérent par ID ou e-mail
            adherent = this.adherents.get(userInput) || [...this.adherents.values()].find(
                (adherent) => adherent.email.toLowerCase() === userInput.toLowerCase()
            );

        }
         //Si adherant introuvable --> créer nouvel adherant ou annuler
         if (!adherent) {

            Swal.fire({
                icon: "warning",
                iconColor: '#FF6944',
                title: "Cet adhérent n'est pas connu par notre système.",
                text: " Veuillez vérifier le numéro d'adhérent ou créer un nouvel adhérent.",
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
    
        return adherent;
    }
    

    enregistrerEmprunt(numeroAdherent, codeExemplaire) {
       
        let adherent = this.rechercherAdherentParId(numeroAdherent);

        if (!this.verifierCotisation(numeroAdherent)) {
            return; // Arrêtez le processus d'emprunt si la cotisation n'est pas valide
        }

        const amendesAdherent = this.adherents.get(numeroAdherent)?.amendes || [];

        if (this.getNombreEmprunts(numeroAdherent) >= this.empruntMax) {
           

            Swal.fire({
                title: "Maximum d'emprunts atteint!",
                text: "Cet adhérent a déjà atteint le nombre maximum d'emprunts autorisés.",
                icon: "warning",
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
                icon: "warning",
                iconColor: '#FF6944',
                title: "Code exemplaire non reconnu....",
                text: " Veuillez réessayer !",
                confirmButtonColor: '#FF6944',
                customClass: {
                    popup: 'custom-alert-class',
                    color:"black",
                  
                }
            }) 
            return;
        }
        this.verifierRetard(exemplaire);  

        if (!exemplaire.disponible) {
        

            Swal.fire({
                title: "Cette BD n'est pas disponible pour l'emprunt !",
               
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                customClass: {
                    popup: 'custom-alert-class',
                    
                  
                }
              });
            return;
        }

    if (amendesAdherent.length > 0) {
        Swal.fire({
            title: "Amendes impayées",
            text: `Vous avez des amendes impayées. Voulez-vous payer vos amendes maintenant ?`,
            icon: "warning",
            iconColor: '#FF6944',
            confirmButtonColor: '#FF6944',
            showCancelButton: true,
            cancelButtonText: "Non, plus tard",
            customClass: {
                popup: 'custom-alert-class'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Appeler la méthode pour payer les amendes
                this.demanderPaiementAmende(adherent);
            } else {
                // Bloquer l'emprunt en raison d'amendes impayées
                Swal.fire({
                    title: "Emprunt bloqué",
                    text: "Vous ne pouvez pas emprunter en raison d'amendes impayées. Veuillez payer vos amendes avant de faire un nouvel emprunt.",
                    icon: "error",
                    iconColor: '#FF6944',
                    confirmButtonColor: '#FF6944',
                    customClass: {
                        popup: 'custom-alert-class'
                    }
                });
            }
        });
        return;
    }

       /*//calcul date emprunt
        let dateEmprunt = new Date();
        let dateRetourPrevu = new Date();
        dateRetourPrevu.setDate(dateRetourPrevu.getDate() + this.dureeMaxEmpruntJours);*/

      //tester retard 
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
           
        };


        adherent.emprunts.push(emprunt);
        this.bdExemplaires.set(codeExemplaire, { ...exemplaire, disponible: false });

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

          
    }



    enregistrerRetour(numeroAdherent, codeExemplaire) {
        let adherent = this.rechercherAdherentParId(numeroAdherent);
        let exemplaire = this.bdExemplaires.get(codeExemplaire);
        const dateRetourEffectif = new Date();
    
        if (!codeExemplaire || !adherent || !exemplaire) {
            // Gestion des erreurs
            return;
        }

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
    
        // Enregistrez les informations de retour dans le tableau adherent.emprunts
        const amende = 0; // Declare amende here
        const retour = {
            numeroAdherent,
            codeExemplaire,
            dateRetourEffectif,
            amende
        };
    
        adherent.emprunts.push(retour);
       
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
    
        // Mettez à jour les informations de l'adhérent après le retour de l'exemplaire
        this.saveStateToLocalStorage();
    
        this.bdExemplaires.set(codeExemplaire, { ...exemplaire, disponible: true });
    
        adherent.emprunts = adherent.emprunts.filter(e => e.codeExemplaire !== codeExemplaire);
        this.sauvegarderEmpruntsLocaux(adherent);
    
        // Appel de la fonction perteDommagesBD pour gérer les pertes/dommages
        this.perteDommagesBD(numeroAdherent, codeExemplaire);
       
        const motifRetourRadioButtons = document.getElementsByName('motifRetour');
        let motifRetour;
        
        // Loop through the radio buttons to find the selected one
        for (const radioButton of motifRetourRadioButtons) {
          if (radioButton.checked) {
            motifRetour = radioButton.value;
            break;
          }
        }

        this.verifierRetard(exemplaire);
        // Call your method or perform actions based on the selected value
        this.perteDommagesBD(numeroAdherent, codeExemplaire, motifRetour);
 
 
    }
    
    isBookOverdue(emprunt) {
        const dateRetourEffectif = new Date();
        const retardMillis = dateRetourEffectif - emprunt.dateRetourPrevu;
        const retardJours = Math.floor(retardMillis / (24 * 60 * 60 * 1000));
        return Math.max(0, retardJours) > 0;
    }
    
    verifierRetard(exemplaire, numeroAdherent) {
        let amende = 0;
        let adherent = this.adherents.get(numeroAdherent);
    
        if (exemplaire.overdue) {
            exemplaire.overdue = this.isBookOverdue(emprunt);

            Swal.fire({
                icon: "warning",
                iconColor: '#FF6944',
                title: "Cet adhérent a un retard.",
                text: " Vous devez retourner votre due avant d'effectuer de nouveaux emprunts",
                confirmButtonColor: '#FF6944',
                customClass: {
                    popup: 'custom-alert-class',
                    color:"black",
                  
                }
            }) 
                    // Restrictions d'emprunt en raison du retard
                    this.restrictionsEmprunt(adherent);
                
            
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

    perteDommagesBD(numeroAdherent, codeExemplaire, motifRetour) {
        let adherent = this.rechercherAdherentParId(numeroAdherent);
    
        // Vérifier les conditions avant de mettre à jour adherent.emprunts
       
    
        let montantAmende = 0;
    
        if (motifRetour === 'retard') {
            // Amendes pour perte
            montantAmende = 5;
        } else if (motifRetour === 'perte') {
            // Amendes pour perte
            montantAmende = 20;
            //this.bdExemplaires.delete(codeExemplaire);
        } else if (motifRetour === 'abime') {
            // Amendes pour dommages
            montantAmende = 10;
        } else {
            console.error("Motif de retour non reconnu.");
            return;
        }
    
        // Assurez-vous que adherent.amendes est initialisé comme un tableau
        if (!adherent.amendes) {
            adherent.amendes = [];
        }
    
        // Mettez à jour la propriété amende de l'adhérent
        if (adherent && Array.isArray(adherent.emprunts)) {
            adherent.amende = montantAmende;
        } else {
            console.error("Adherent inconnu.");
            return;
        }
     //a suprimer après
        // Enregistrez l'amende dans la liste des amendes de l'adhérent
        adherent.amendes.push({
            montant: montantAmende,
            date: new Date(),
        });

        this.saveStateToLocalStorage(); 
        this.sauvegarderAmendeLocaux(adherent);
    
        // Demandez le paiement de l'amende
        this.demanderPaiementAmende(adherent, montantAmende);
    }
    
    getMontantTotalAmendes(numeroAdherent) {
        const adherent = this.adherents.get(numeroAdherent);

        if (adherent && Array.isArray(adherent.amendes)) {
            // Calculer le montant total des amendes
            const montantTotal = adherent.amendes.reduce((total, amende) => total + amende.montant, 0);
            return montantTotal;
        } else {
            console.error("Adherent inconnu ou amendes non disponibles.");
            return 0; 
        }
    }

    demanderPaiementAmende(adherent) {
        const montantTotalAmendes = this.getMontantTotalAmendes(adherent.CodeAdherant); // Utilisez this.getMontantTotalAmendes
    
        Swal.fire({
            title: `Une amende de ${montantTotalAmendes} euros est due. Voulez-vous payer maintenant ?`,
            icon: "question",
            confirmButtonText: "Valider",
            cancelButtonText: "Annuler",
            showCancelButton: true,
            showCloseButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Payer l'amende
                adherent.amendes = []; // Réinitialiser le tableau des amendes après le paiement
                localStorage.removeItem("adherent_" + adherent.CodeAdherant + "_amendes");
                this.saveStateToLocalStorage();
    
                Swal.fire({
                    title: "Amendes payées",
                    text: "Vos amendes ont été payées avec succès. Vous pouvez maintenant faire un nouvel emprunt.",
                    icon: "success",
                    iconColor: '#FF6944',
                    confirmButtonColor: '#FF6944',
                    customClass: {
                        popup: 'custom-alert-class'
                    }
                });
            } else {
                Swal.fire({
                    title: "L'adhérent a des restrictions d'emprunt en raison d'une amende impayée.",
                    text: "Veuillez contacter le service client.",
                    icon: "error",
                    iconColor: '#FF6944',
                    confirmButtonColor: '#FF6944',
                    customClass: {
                        popup: 'custom-alert-class'
                    }
                });
            }
        });
    }
    
 
    calculerRetard(emprunt) {
        const dateRetourEffectif = new Date(); 
        const retardMillis = dateRetourEffectif - emprunt.dateRetourPrevu;
        const retardJours = Math.floor(retardMillis / (24 * 60 * 60 * 1000));
        return Math.max(0, retardJours); 
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

    sauvegarderEmpruntsLocaux(adherent) {
      
        // Convertir les emprunts en format JSON
        var empruntsJSON = JSON.stringify(adherent.emprunts);
        var empruntsTJSON = JSON.stringify(this.emprunts);
        // Stocker les emprunts dans le localStorage sous la clé correspondant à l'adhérent
        localStorage.setItem("adherent_" + adherent.CodeAdherant + "_emprunts", empruntsJSON);
        localStorage.setItem("emprunts", empruntsTJSON);
    }  
    
    loadEmpruntsFromLocalStorage() {
        // Clear the existing emprunts array
        //localStorage.clear();
        this.emprunts = [];
        
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

    sauvegarderAmendeLocaux(adherent) {
        // Mettre à jour la propriété amende de l'adhérent
        if (adherent && Array.isArray(adherent.emprunts)) {
            // Convertir les amendes en format JSON
            var amendesJSON = JSON.stringify(adherent.amendes);
    
            // Stocker les amendes dans le localStorage sous la clé correspondant à l'adhérent
            localStorage.setItem("adherent_" + adherent.CodeAdherant + "_amendes", amendesJSON);
        } else {
            console.error("Adherent inconnu.");
        }
    }
    loadAmendesFromLocalStorage() {
        // Récupérer les amendes générales stockées dans le localStorage
        const savedAmendes = localStorage.getItem("amendes");
        this.amendes = savedAmendes ? new Map(JSON.parse(savedAmendes)) : new Map();
    
        // Mettre à jour les amendes des adhérents
        this.adherents.forEach((adherent, adherentId) => {
            const savedAmendes = localStorage.getItem("adherent_" + adherentId + "_amendes");
            adherent.amendes = savedAmendes ? JSON.parse(savedAmendes) : [];
            if (!Array.isArray(adherent.amendes)) {
                adherent.amendes = [];
            }
        });
    }

    saveStateToLocalStorage() {
        // Save the state of emprunts, bdExemplaires, adherents, and amendes to local storage
        const state = {
            emprunts: this.emprunts,
            bdExemplaires: Array.from(this.bdExemplaires),
            adherents: Array.from(this.adherents),
        };
        localStorage.setItem("gestion_emprunts_state", JSON.stringify(state));
    }
    
    loadStateFromLocalStorage() {
        const savedState = localStorage.getItem("gestion_emprunts_state");
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
    
                // ... (rest of the code)
    
                // Load amendes
                this.amendes = new Map(state.amendes);
    
            } catch (error) {
                console.error("Error parsing JSON from local storage:", error);
            }
        }
    }

    /*saveStateToLocalStorage() {
        // Save the state of emprunts, bdExemplaires, adherents, and amendes to local storage
        localStorage.setItem("emprunts", JSON.stringify(this.emprunts));
        localStorage.setItem("bdExemplaires", JSON.stringify(Array.from(this.bdExemplaires)));
        localStorage.setItem("adherents", JSON.stringify(Array.from(this.adherents)));
        localStorage.setItem("amendes", JSON.stringify(Object.fromEntries(this.amendes)));
    }
    loadStateFromLocalStorage() {
        try {
            // Load emprunts
            const emprunts = JSON.parse(localStorage.getItem("emprunts"));
            if (emprunts) {
                this.emprunts = emprunts;
            }
    
            // Load bdExemplaires
            const bdExemplaires = JSON.parse(localStorage.getItem("bdExemplaires"));
            if (bdExemplaires) {
                this.bdExemplaires = new Map(bdExemplaires);
            }
    
            // Load adherents
            const adherents = JSON.parse(localStorage.getItem("adherents"));
            if (adherents) {
                this.adherents = new Map(adherents);
            }
    
            // Load amendes
            const amendes = JSON.parse(localStorage.getItem("amendes"));
            if (amendes) {
                this.amendes = new Map(Object.entries(amendes));
            }
        } catch (error) {
            console.error("Error parsing JSON from local storage:", error);
        }
    }*/
        
    

}
    

const gestionEmprunts = new GestionEmprunts();
gestionEmprunts.loadStateFromLocalStorage(); 
gestionEmprunts.loadAmendesFromLocalStorage(); 

window.addEventListener("beforeunload", () => {
    gestionEmprunts.saveStateToLocalStorage(); // Enregistrez l'état avant que la page ne soit déchargée
    gestionEmprunts.sauvegarderAmendeLocaux(adherent); 
});



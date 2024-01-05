
	const SRC_IMG = "./ressources/"; // emplacement des images de l'appli
	const SRC_ALBUM_MINI = "albumsMini/"; // emplacement des images des albums en petit
	const SRC_ALBUM = "albums/"
	const SRC_DEFAULT = SRC_IMG + "noComicsMini.jpeg";
	const roleUser = localStorage.getItem("role");

	var miniBD = document.getElementById("listeBD");
	var barreRecherche = document.getElementById("formRecherche");
	var rechercheMotCle = document.getElementById("rechercheMotCle");
	var rechercheBtn = document.getElementById("btnRecherche");
	var tempExmpl = "";
	var album = albums.get("6");
	var serie = series.get(album.idSerie);
	var auteur = auteurs.get(album.idAuteur);

	var descriptBD = document.getElementById("descriptBD");

	afficheTabBDDynamic("","","","");

	// ajout d'un listener pour suivre l'écriture au niveau de l input recherche mot clé
	rechercheMotCle.addEventListener("input", function(e) {
		var motRecherche = rechercheMotCle.value;
		document.getElementById("idInputSerie").value = "";
		document.getElementById("idInputAuteur").value ="";
		document.getElementById("idInputTitre").value ="";
		afficheTabBDDynamic(motRecherche,null,null,null);
	});

	// ajout d'un listener au click pour effectuer la recherche par input serie / auteur / titre
	rechercheBtn.addEventListener("click", function() {
		var serieRech = document.getElementById("idInputSerie").value;
		var auteurRech = document.getElementById("idInputAuteur").value;
		var titreRech = document.getElementById("idInputTitre").value;
		document.getElementById("rechercheMotCle").value = "";
		afficheTabBDDynamic(null, titreRech, serieRech, auteurRech);
	});
	
	//////////////////// Fonctions //////////////////////:
	/**
	 * Affiche les images et résultats de recherche
	 * @param {string} motCle 
	 * @param {string} titreRech 
	 * @param {string} serieRech 
	 * @param {string} auteurRech 
	 */
	function afficheTabBDDynamic(motCle, titreRech, serieRech, auteurRech){
	
		while (miniBD.firstChild) {
			miniBD.removeChild(miniBD.firstChild);
		}
		let aucunResultat = true;

		albums.forEach((album, idAlbum) => {
			serie = series.get(album.idSerie);
			auteur = auteurs.get(album.idAuteur);
			
			var serieOk = (serieRech !== null && serie.nom.toLowerCase().includes(serieRech.toLowerCase()));
			var titreOk = (titreRech !== null && album.titre.toLowerCase().includes(titreRech.toLowerCase()));
			var auteurOK = (auteurRech !== null && auteur.nom.toLowerCase().includes(auteurRech.toLowerCase()));
			var regleRechMotCle = serie.nom + "-" + album.titre + "-" + auteur.nom;

			var nameBDAlt = serie.nom + "-" + album.numero + "-" + album.titre;
			var titreBD = adaptertitreBD(nameBDAlt);

			//condition pour l'affichage des resultats
			if ((motCle !== null && regleRechMotCle.toLowerCase().includes(motCle.toLowerCase()))|| (serieOk && titreOk && auteurOK)) {
				aucunResultat = false;
				var newDivCol = document.createElement("div");
				var newImg = document.createElement("img");
		
				newDivCol.setAttribute("class", "col-12 col-sm-4 col-md-3 col-lg-2");
				
				newImg.setAttribute("src",afficheMiniImg(titreBD));
				newImg.setAttribute("alt",nameBDAlt +".jpg");
				
				newImg.setAttribute("id", "album-"+idAlbum);
				newImg.setAttribute("class","shadow-sm p-1 mb-3 bg-white rounded full img-fluid");
				
				newDivCol.appendChild(newImg);
				miniBD.appendChild(newDivCol);
		
				newImg.addEventListener("click", function()  {afficheDetailsBD(newImg, titreBD);});
			} 
		});
		if (aucunResultat) {
			var newP = document.createElement("p");

			newP.innerText = "Aucune BD trouvée, merci de refaire la recherche";
			miniBD.appendChild(newP);
		}
	}

	
	/**
	 * Permet le formatage des données en titre de l'img 
	 * @param {string} nomFiction 
	 * @returns le contenu src de l'img
	 */
    function afficheMiniImg (nomFiction){
		if (!serie.nom || !album.numero || !album.titre) {
			return SRC_IMG+SRC_DEFAULT+nomFiction+".jpg";	
		} else {
			return SRC_IMG+SRC_ALBUM_MINI+nomFiction+".jpg";
		}
    }

	// NB : fonction pour afficher la grande image 
	/**
	 * Permet le formatage des données en titre de l'img 
	 * @param {string} nomFiction 
	 * @returns le contenu src de l'img
	 */
	function afficherGrandeImg (nomFiction){
		if (!serie.nom || !album.numero || !album.titre) {
			return SRC_IMG+SRC_DEFAULT+nomFiction+".jpg";	
		} else {
			return SRC_IMG+SRC_ALBUM+nomFiction+".jpg";
		}
	}
	
	/**
	 * crée le tableau du détail de la BD
	 * @param {string} BDalt 
	 * @param {string} title 
	 */
	function afficheDetailsBD (BDalt, title) {
		BDalt = BDalt.getAttribute("id");

		// Récupérer les infos de la BDD
		var idAlbumEnCours = BDalt.split("-")[1];
		var albumEnCours = albums.get(idAlbumEnCours)
		var lAuteur = auteurs.get(albumEnCours.idAuteur);
		var laSerie = series.get(albumEnCours.idSerie);
		var nbExempEnCours = nbrExmplairesAlbum(idAlbumEnCours);
		tempExmpl = nbExempEnCours;
		var titreBDAvantAdaptation = serie.nom + "-" + album.numero + "-" + album.titre;
        var titreBD = adaptertitreBD(titreBDAvantAdaptation);
		//var tDispo = ExplDispo(idAlbumEnCours);
		//console.log(tDispo);

        // afficher la grande image 
		var grandeImgBD = document.createElement("img");
		grandeImgBD.setAttribute("src",afficherGrandeImg(title));
		grandeImgBD.setAttribute("alt",titreBD);
		grandeImgBD.setAttribute("id", "currentBD");
		grandeImgBD.setAttribute("class", "grdImgBD")
		
		var descriptBD = document.getElementById("descriptBD")
		var divGrdImg = document.getElementById("grdImgBD")
		descriptBD.appendChild(divGrdImg);
		divGrdImg.appendChild(grandeImgBD);
		descriptBD.classList.remove("hide");
		miniBD.classList.add("hide");
		barreRecherche.classList.add("hide");


		// afficher les colonnes du tableau en affichant les info venant de la BDD
		
		var tableBDDetail = document.getElementById("tableDetailBD");
		// série
		var trSerieDetail = document.createElement("tr");
		var tdSerieHead = document.createElement("td");
		tdSerieHead.setAttribute("class","thDetailBD ");
		var tdSerieTitre = document.createElement("td");
		var headSerietxt = document.createTextNode("Série");
		var titreSerietxt = document.createTextNode(laSerie.nom);
		tdSerieHead.appendChild(headSerietxt);
		tdSerieTitre.appendChild(titreSerietxt);
		trSerieDetail.appendChild(tdSerieHead);
		trSerieDetail.appendChild(tdSerieTitre); 
		tableBDDetail.appendChild(trSerieDetail);
		// Album n
		var trAlbumN = document.createElement("tr");
		var tdAlbumHead = document.createElement("td");
		tdAlbumHead.classList.add("thDetailBD");
		var tdAlbumTitre = document.createElement("td");
		var headAlbumtxt = document.createTextNode("Album N°");
		var titreAlbumtxt = document.createTextNode(albumEnCours.numero);
		tdAlbumHead.appendChild(headAlbumtxt);
		tdAlbumTitre.appendChild(titreAlbumtxt);
		trAlbumN.appendChild(tdAlbumHead);
		trAlbumN.appendChild(tdAlbumTitre); 
		tableBDDetail.appendChild(trAlbumN);

		// Album n
		var trTitre = document.createElement("tr");
		var tdTitreHead = document.createElement("td");
		tdTitreHead.classList.add("thDetailBD");
		var tdTitreTitre = document.createElement("td");
		var headTitretxt = document.createTextNode("Titre");
		var titreTitretxt = document.createTextNode(albumEnCours.titre);
		tdTitreHead.appendChild(headTitretxt);
		tdTitreTitre.appendChild(titreTitretxt);
		trTitre.appendChild(tdTitreHead);
		trTitre.appendChild(tdTitreTitre); 
		tableBDDetail.appendChild(trTitre);

		// Auteur
		var trAuteur = document.createElement("tr");
		var tdAuteurHead = document.createElement("td");
		tdAuteurHead.classList.add("thDetailBD");
		var tdAuteurTitre = document.createElement("td");
		var headAuteurtxt = document.createTextNode("Auteur");
		var titreAuteurtxt = document.createTextNode(lAuteur.nom);
		tdAuteurHead.appendChild(headAuteurtxt);
		tdAuteurTitre.appendChild(titreAuteurtxt);
		trAuteur.appendChild(tdAuteurHead);
		trAuteur.appendChild(tdAuteurTitre); 
		tableBDDetail.appendChild(trAuteur);

		//nbr Exemplaire
		var trExemplaire = document.createElement("tr");
		var tdExemplaireHead = document.createElement("td");
		tdExemplaireHead.classList.add("thDetailBD");
		var tdExemplaireTitre = document.createElement("td");
		var headExemplairetxt = document.createTextNode("Exemplaires disponibles");
		var titreExemplairetxt = document.createTextNode(nbExempEnCours);
		tdExemplaireHead.appendChild(headExemplairetxt);
		tdExemplaireTitre.appendChild(titreExemplairetxt);
		trExemplaire.appendChild(tdExemplaireHead);
		trExemplaire.appendChild(tdExemplaireTitre); 
		tableBDDetail.appendChild(trExemplaire);
	
		// // serie 
		// var cellSerie = document.createElement("td");
		// var cellTextSerie = document.createTextNode(laSerie.nom);
		// cellSerie.appendChild(cellTextSerie);
		// row.appendChild(cellSerie);
		// tDetailBD.appendChild(row);
		


		// // num album 
		// var cellAlbum = document.createElement("td");
		// var cellTextAlbum = document.createTextNode(albumEnCours.numero);
		// cellAlbum.appendChild(cellTextAlbum);
		// row.appendChild(cellAlbum);
		// tDetailBD.appendChild(row);

		// // num titre 
		// var cellTitre = document.createElement("td");
		// var cellTextTitre = document.createTextNode(albumEnCours.titre);
		// cellTitre.appendChild(cellTextTitre);
		// row.appendChild(cellTitre);
		// tDetailBD.appendChild(row);

		// // nom auteur 
		// var cellAuteur = document.createElement("td");
		// var cellTextAuteur = document.createTextNode(lAuteur.nom);
		// cellAuteur.appendChild(cellTextAuteur);
		// row.appendChild(cellAuteur);
		// tDetailBD.appendChild(row);

		// //nbr Exemplaire
		// var cellExplaire = document.createElement("td");
		// var cellTextExplaire = document.createTextNode(nbExempEnCours);
		// cellExplaire.appendChild(cellTextExplaire);
		// row.appendChild(cellExplaire);
		// tDetailBD.appendChild(row);
		
		// document.getElementById("tBD").appendChild(tDetailBD);
		
		if (nbExempEnCours !== 0  && roleUser === "gestionnaire"){
			var btnEmprunt = creerBtns("Emprunter","empruntBtnID");
			btnEmprunt.classList.add("btnClasse");
			btnEmprunt.addEventListener("click", function() {redirectEmprunt(idAlbumEnCours);});
		}

		var btnRetour = creerBtns("Retour","previousBtn");
		btnRetour.classList.add("btnClasse");
		btnRetour.addEventListener("click", function()  {precedent ();});

	}

	/**
	 * Récupère le détail de la BD En cours
	 * @param {string} BDalt 
	 * @param {string} title 
	 */
	function recupDetailsBD (BDalt, title) {
		
		var miniImgBD = document.createElement("img");
		miniImgBD.setAttribute("src",afficheMiniImg(title));
		miniImgBD.setAttribute("alt",BDalt);
		miniImgBD.setAttribute("id", "currentBD")
		miniImgBD.setAttribute("class", "miniImageBD")

		var descriptBD = document.getElementById("descriptBD")
		descriptBD.appendChild(miniImgBD);

	}
	
	/**
	 * Crée le boutton retour / emprunter
	 */
	function creerBtns(txt,idBtn) {
		// boutton retour
		var descriptBD = document.getElementById("descriptBD");
		var divBtnTable = document.getElementById("divdirecttableDetailBD");
		var divGBtnTable = document.getElementById("divglovtablebtndetail");
		var divbtn = document.getElementById("btnsDiv");
		var btn = document.createElement("button");
		var t = document.createTextNode(txt);
		
		btn.setAttribute("id", idBtn);
		btn.setAttribute("class", "btnBD m-1");

		divGBtnTable.appendChild(divBtnTable);
		divBtnTable.appendChild(divbtn);
		divbtn.appendChild(btn);
		btn.appendChild(t);

		descriptBD.classList.remove("hide");
		miniBD.classList.add("hide");

		return btn
	
		
	}

	/**
	 * Supprime les éléments affichant le détail de la BD séléctionnées
	 */
	function supprimeElements() {
		
		var btnPrev = document.getElementById("previousBtn");
		var imgPrev = document.getElementById("currentBD");
		var tableBDDetail = document.getElementById("tableDetailBD");
		var btnEmpPrev = document.getElementById("empruntBtnID");
		btnPrev.remove();
		imgPrev.remove();
		tableBDDetail.innerHTML = "";
		if (tempExmpl !== 0 && roleUser === "gestionnaire") btnEmpPrev.remove();
		 
	
	}
	/**
	 * Permet le retour vers l'affichage de la liste globale des BD
	 */
	function precedent() {
		miniBD.classList.remove("hide");
		descriptBD.classList.add("hide");
		barreRecherche.classList.remove("hide");
		supprimeElements();
	}

	/**
	 * permet de faire les adaptations sur le nom de la BD pour pouvoir retrouver l'image
	 */
	function adaptertitreBD(titreBDEnEntree){
		var nomDbEnSortie = titreBDEnEntree.replace(/'|!|\?|\.|"|:|\$/g, "").replace(/à/g,"…").replace(/ê/g,'ˆ').replace(/è/g,"Š").replace(/ï/g,"‹").replace(/ô/g,"“").replace(/û/g,"–").replace(/â/g,"ƒ").replace(/(ƒg)/g,"ト").replace(/é/g,'‚').replace(/î/g,"Œ").replace(/(Šm)/g,"確").replace(/ü/g,"�").replace(/ù/g,"—").replace(/ç/g,"").replace(/(ƒn)/g,"ハ");
		return nomDbEnSortie

	}

	/**
	* retourne le nombre d'exemplaire pour l'album selectionné
	* @param {number} idAlbumEnCours 
	* @returns 
	*/
	function nbrExmplairesAlbum(idAlbum) {
		let nombreExemplaires = 0;
		exemplaires.forEach((exemplaire) => {
			if (exemplaire.idAlbum === idAlbum && exemplaire.disponible) {
				nombreExemplaires++;
			}
		});	
		return nombreExemplaires;
	}

	/**
	 * Redirection vers la page de l'emprunt avec envoie de l'id en paramêtre
	 */
	function redirectEmprunt(idAlbumActuel) {
		document.location.href="gestion_emprunts.html?albumid="+idAlbumActuel;
	}



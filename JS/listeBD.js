
	const SRC_IMG = "/ressources/"; // emplacement des images de l'appli
	const SRC_ALBUM_MINI = "albumsMini/"; // emplacement des images des albums en petit
	const SRC_ALBUM = "albums/"
	const SRC_DEFAULT = SRC_IMG + "noComicsMini.jpeg";
	var miniBD = document.getElementById("listeBD")

	var album = albums.get("6");
	var serie = series.get(album.idSerie);
	var auteur = auteurs.get(album.idAuteur);

	var nbExemp = exemplaires.get(album.idExemplaire);


	var descriptBD = document.getElementById("descriptBD");

	// insère les images après formatage des données
	// ajout l'idAlbum dans la boucle 
	albums.forEach((album, idAlbum) => {
	    serie = series.get(album.idSerie);
	    auteur = auteurs.get(album.idAuteur);

        var nameBDAlt = serie.nom + "-" + album.numero + "-" + album.titre;
        var titreBD = adaptertitreBD(nameBDAlt) 
		
		var newDivCol = document.createElement("div");
        var newImg = document.createElement("img");

		newDivCol.setAttribute("class", "col-6 col-sm-4 col-md-3 col-lg-2");
        
        newImg.setAttribute("src",showMiniAlbums(titreBD));
		newImg.setAttribute("alt",nameBDAlt +".jpg");
		
		newImg.setAttribute("id", "album-"+idAlbum);
		newImg.setAttribute("class","shadow-sm p-1 mb-3 bg-white rounded");
		
		newDivCol.appendChild(newImg);
		miniBD.appendChild(newDivCol);

		newImg.addEventListener("click", function()  {showDetailBD(newImg, titreBD);});
	});

	/**
	 * Permet le formatage des données en titre de l'img 
	 * @param {string} nomFiction 
	 * @returns le contenu src de l'img
	 */
    function showMiniAlbums (nomFiction){
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
		function showGrandeImage (nomFiction){
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
	function showDetailBD (BDalt, title) {
		BDalt = BDalt.getAttribute("id");

		// Récupérer les infos de la BDD
		var idAlbumEnCours = BDalt.split("-")[1];
		var albumEnCours = albums.get(idAlbumEnCours)
		var lAuteur = auteurs.get(albumEnCours.idAuteur);
		var laSerie = series.get(albumEnCours.idSerie);
		var nbExempEnCours = nbrExmplairesAlbum(idAlbumEnCours);
		var titreBDAvantAdaptation = serie.nom + "-" + album.numero + "-" + album.titre;
        var titreBD = adaptertitreBD(titreBDAvantAdaptation);
		//var tDispo = ExplDispo(idAlbumEnCours);
		//console.log(tDispo);

        // afficher la grande image 
		var grandeImgBD = document.createElement("img");
		grandeImgBD.setAttribute("src",showGrandeImage(title));
		grandeImgBD.setAttribute("alt",titreBD);
		grandeImgBD.setAttribute("id", "currentBD");
		grandeImgBD.setAttribute("class", "grdImgBD")
		

		var descriptBD = document.getElementById("descriptBD")
		var divGrdImg = document.getElementById("grdImgBD")
		descriptBD.appendChild(divGrdImg);
		divGrdImg.appendChild(grandeImgBD);
		descriptBD.classList.remove("hide");
		miniBD.classList.add("hide");

		var row = document.createElement("tr")
		row.setAttribute("id","row")

		// afficher les colonnes du tableau en affichant les info venant de la BDD
		// serie 
		var cellSerie = document.createElement("td");
		var cellTextSerie = document.createTextNode(laSerie.nom);
		cellSerie.appendChild(cellTextSerie);
		row.appendChild(cellSerie);
		tDetailBD.appendChild(row);

		// num album 
		var cellAlbum = document.createElement("td");
		var cellTextAlbum = document.createTextNode(albumEnCours.numero);
		cellAlbum.appendChild(cellTextAlbum);
		row.appendChild(cellAlbum);
		tDetailBD.appendChild(row);

		// num titre 
		var cellTitre = document.createElement("td");
		var cellTextTitre = document.createTextNode(albumEnCours.titre);
		cellTitre.appendChild(cellTextTitre);
		row.appendChild(cellTitre);
		tDetailBD.appendChild(row);

		// nom auteur 
		var cellAuteur = document.createElement("td");
		var cellTextAuteur = document.createTextNode(lAuteur.nom);
		cellAuteur.appendChild(cellTextAuteur);
		row.appendChild(cellAuteur);
		tDetailBD.appendChild(row);

		//nbr Exemplaire
		var cellExplaire = document.createElement("td");
		var cellTextExplaire = document.createTextNode(nbExempEnCours);
		cellExplaire.appendChild(cellTextExplaire);
		row.appendChild(cellExplaire);
		tDetailBD.appendChild(row);
		
		document.getElementById("tBD").appendChild(tDetailBD);
		
		if (nbExempEnCours !== 0){
			var btnEmprunt = creerBtns("Emprunter","empruntBtnID");
			btnEmprunt.addEventListener("click", function() {redirectEmprunt(idAlbumEnCours);});
		}

		var btnRetour = creerBtns("Retour","previousBtn");
		btnRetour.addEventListener("click", function()  {previous ();});
	}

	/**
	 * Récupère le détail de la BD En cours
	 * @param {string} BDalt 
	 * @param {string} title 
	 */
	function recupDetailsBD (BDalt, title) {
		
		var miniImgBD = document.createElement("img");
		miniImgBD.setAttribute("src",showMiniAlbums(title));
		miniImgBD.setAttribute("alt",BDalt);
		miniImgBD.setAttribute("id", "currentBD")
		miniImgBD.setAttribute("class", "miniImageBD")

		var descriptBD = document.getElementById("descriptBD")
		descriptBD.appendChild(miniImgBD);

	}
	
	/**
	 * Crée le boutton retour 
	 */
	function creerBtns(txt,idBtn) {
		// boutton retour
		var descriptBD = document.getElementById("descriptBD")
		var divbtn = document.getElementById("btnsDiv")
		var btn = document.createElement("button");
		var t = document.createTextNode(txt);
		
		btn.setAttribute("id", idBtn);
		btn.setAttribute("class", "btnBD m-1");

		descriptBD.appendChild(divbtn);
		divbtn.appendChild(btn);
		btn.appendChild(t);

		descriptBD.classList.remove("hide");
		miniBD.classList.add("hide");

		return btn
	
		
	}

	/**
	 * Supprime les éléments affichant le détail de la BD séléctionnées
	 */
	function deleteElmts() {
		var btnPrev = document.getElementById("previousBtn");
		var imgPrev = document.getElementById("currentBD");
		var rowPrev = document.getElementById("row");
		var btnEmpPrev = document.getElementById("empruntBtnID");
		btnPrev.remove();
		imgPrev.remove();
		rowPrev.remove();
		btnEmpPrev.remove();

	}
	/**
	 * Permet le retour vers l'affichage de la liste globale des BD
	 */
	function previous() {
		miniBD.classList.remove("hide");
		descriptBD.classList.add("hide");
		deleteElmts();
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

	// function ExplDispo(idAlbum){
	// 	let tExplDipsp = [];
	// 	exemplaires.forEach((exemplaire) => {
	// 		if (exemplaire.idAlbum === idAlbum) {
	// 			tExplDipsp.push(exemplaire.barreCode,exemplaire.disponible );

	// 		}
	// 	});	
	// 	return tExplDipsp;
	// }

	/**
	 * Redirection vers la page de l'emprunt avec envoie de l'id en paramêtre
	 */
	function redirectEmprunt(idAlbumActuel) {
		document.location.href="emprunt_BD.html?albumid="+idAlbumActuel;
	}
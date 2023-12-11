
	const SRC_IMG = "/ressources/"; // emplacement des images de l'appli
	const SRC_ALBUM_MINI = "albumsMini/"; // emplacement des images des albums en petit
	const SRC_DEFAULT = SRC_IMG + "noComicsMini.jpeg";
	var miniBD = document.getElementById("listeBD")

	var album = albums.get("6");
	var serie = series.get(album.idSerie);
	var auteur = auteurs.get(album.idAuteur);

	var descriptBD = document.getElementById("descriptBD");

	// insère les images après formatage des données
	albums.forEach(album => {
	    serie = series.get(album.idSerie);
	    auteur = auteurs.get(album.idAuteur);

        var nameBDAlt = serie.nom + "-" + album.numero + "-" + album.titre;
		
        var nomBD = nameBDAlt.replace(/'|!|\?|\.|"|:|\$/g, "").replace(/à/g,"…").replace(/ê/g,'ˆ').replace(/è/g,"Š").replace(/ï/g,"‹").replace(/ô/g,"“").replace(/û/g,"–").replace(/â/g,"ƒ").replace(/(ƒg)/g,"ト").replace(/é/g,'‚').replace(/î/g,"Œ").replace(/(Šm)/g,"確").replace(/ü/g,"�").replace(/ù/g,"—").replace(/ç/g,"").replace(/(ƒn)/g,"ハ");

		var newDivCol = document.createElement("div");
        var newImg = document.createElement("img");

		newDivCol.setAttribute("class", "col-6 col-sm-4 col-md-3 col-lg-2");
        
        newImg.setAttribute("src",showMiniAlbums(nomBD));
		newImg.setAttribute("alt",nameBDAlt +".jpg");
		newImg.setAttribute("class","shadow-sm p-1 mb-3 bg-white rounded");
		
		newDivCol.appendChild(newImg);
		miniBD.appendChild(newDivCol);

		newImg.addEventListener("click", function()  {showDetailBD(newImg, nomBD);});
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

	/**
	 * crée le tableau du détail de la BD
	 * @param {string} BDalt 
	 * @param {string} title 
	 */
	function showDetailBD (BDalt, title) {
		BDalt = BDalt.getAttribute("alt");
		var tBDalt = BDalt.split("-");
		descriptBD.classList.remove("hide");
		miniBD.classList.add("hide");
		recupDetailsBD(BDalt, title);
		var row = document.createElement("tr")
		row.setAttribute("id","row")
		
		for (i=0; i<tBDalt.length; i++) {
			var cell = document.createElement("td");
			var cellText = document.createTextNode(tBDalt[i]);
			cell.appendChild(cellText);
			row.appendChild(cell);
			tDetailBD.appendChild(row);
		}
	  
		document.getElementById("tBD").appendChild(tDetailBD);

		createBtn();
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

		var descriptBD = document.getElementById("descriptBD")
		descriptBD.appendChild(miniImgBD);

	}
	
	/**
	 * Créé le boutton retour 
	 */
	function createBtn() {
		var btn = document.createElement("button");
		var t = document.createTextNode("Retour");
		btn.appendChild(t);
		btn.setAttribute("id", "previousBtn");
		btn.setAttribute("class", "btnBD")

		document.body.appendChild(btn);
		btn.addEventListener("click", function()  {previous ();});
	}

	/**
	 * Supprime les éléments affichant le détail de la BD séléctionnées
	 */
	function deleteElmts() {
		var btnPrev = document.getElementById("previousBtn");
		var imgPrev = document.getElementById("currentBD");
		var rowPrev = document.getElementById("row");
		btnPrev.remove();
		imgPrev.remove();
		rowPrev.remove();

	}
	/**
	 * Permet le retour vers l'affichage de la liste globale des BD
	 */
	function previous() {
		miniBD.classList.remove("hide");
		descriptBD.classList.add("hide");
		deleteElmts();
	}
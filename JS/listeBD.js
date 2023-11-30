console.log("début traitement")
const SRC_IMG = "/ressources/"; // emplacement des images de l'appli
const SRC_ALBUM_MINI = "albumsMini/"; // emplacement des images des albums en petit
const SRC_DEFAULT = SRC_IMG + "noComicsMini.jpeg";
var affichageBD = document.getElementById("listeBD");
var miniImgBD = document.getElementById("miniImgBD")


console.log("Lecture d'un album");
	var album = albums.get("6");
	var serie = series.get(album.idSerie);
	var auteur = auteurs.get(album.idAuteur);
	console.log(album.titre+" "+serie.nom+" "+auteur.nom);

console.log("Liste des albums");

	albums.forEach(album => {
	    serie = series.get(album.idSerie);
	    auteur = auteurs.get(album.idAuteur);
	    console.log(album.titre+" N°"+album.numero+" Série:"+serie.nom+" Auteur:"+auteur.nom);
        
        //affichageBD.innerHTML = album.titre+" N°"+album.numero+" Série:"+serie.nom+" Auteur:"+auteur.nom;
        var nomBDalt = serie.nom + "-" + album.numero + "-" + album.titre;
        var nomBD = nomBDalt.replace(/'|!|\?|\.|"|:|\$/g, "").replace(/à/g,"…").replace(/ê/g,'ˆ').replace(/è/g,"Š").replace(/ï/g,"‹").replace(/ô/g,"“").replace(/û/g,"–").replace(/â/g,"ƒ").replace(/(ƒg)/g,"ト");
		nomBD = nomBD.replace(/é/g,'‚').replace(/î/g,"Œ").replace(/(Šm)/g,"確").replace(/ü/g,"�").replace(/ù/g,"—").replace(/ç/g,"");
		nomBD = nomBD.replace(/é/g,'‚').replace(/î/g,"Œ").replace(/(Šm)/g,"確").replace(/ü/g,"�").replace(/ù/g,"—").replace(/(ƒn)/g,"ハ");
		
		console.log(nomBDalt);
        var newImg = document.createElement("img");
        newImg.setAttribute("src",afficheMiniAlbums(nomBD));
		newImg.setAttribute("alt",nomBDalt +".jpg")
		console.log (newImg);
		miniImgBD.appendChild(newImg);
        
	});

    function afficheMiniAlbums (nomFiction){

		if (!serie.nom || !album.numero || !album.titre) {
			return SRC_IMG+SRC_DEFAULT+nomFiction+".jpg";
			
		} else {
			return SRC_IMG+SRC_ALBUM_MINI+nomFiction+".jpg";
		}
        
    }

console.log("Fin")



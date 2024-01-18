// On récupère l'adresse de l'API et on la met dans une variable
const urlApiWorks = "http://localhost:5678/api/works";
const urlApiFilters = "http://localhost:5678/api/categories";

const gallery = document.querySelector(".gallery");
const filtreSection = document.querySelector("#filtres");

// ------ AJOUT DES WORKS EN JAVASCRIPT-----------

// Fonction Fetch pour récupérer des données dans l'Api et les retourner en json
async function getWorks() {
  const reponse = await fetch(urlApiWorks);
  return (
    reponse.json()
      /* Ensuite on insère ces données dans data et on insert les balises <figure>
      contenant les travaux et leurs données respectives, dans le html à l'intérieur de la div ayant la classe .gallery
       */
      .then(function (data) {
        console.log(data);
        // On vide le conteneur avant de le remplir avec les projets
        gallery.innerHTML = "";
        for (works in data) {
          gallery.innerHTML += `<figure data-id="${data[works].category.name}" class="active">  
            <img src="${data[works].imageUrl}" alt="${data[works].title}">
            <figcaption>${data[works].title}</figcaption>
            </figure>`;
        }
      })
  );
}
// on lance la fonction
getWorks();

// ------ PARTIE FILTRES-----------

// ------ AJOUT DES FILTRES EN JAVASCRIPT-----------
async function getFilters() {
  const reponse = await fetch(urlApiFilters);
  return reponse
    .json()

    .then(function (dataCategories) {
// console.log(dataCategories)
      for (categories in dataCategories) {
        const filtreSection = document.querySelector("#filtres");
        const filter = document.createElement("div");
        filter.setAttribute("id", `${dataCategories[categories].name}`);
        filter.innerHTML += `${dataCategories[categories].name}`;
        filtreSection.appendChild(filter);

        // ------ PARTIE FONCTION DE FILTRAGE-----------
        let filtres = document.querySelectorAll("#filtres div");
        for (let filtre of filtres) {
          filtre.addEventListener("click", function () {
            let tag = this.id; // donne la valeur à tag -> l'id de la div du filtre cliquée, ex:"tous" ou "Appartement" etc...
            // console.log(tag);

            let worksList = document.querySelectorAll(".gallery figure");
            /* Avec une boucle, on indique que les div figure sont non-affichees en remplaçant
           leur class active par inactive */
            for (let eachWork of worksList) {
              eachWork.classList.replace("active", "inactive");
              //   console.log(eachWork, tag);

              /* Ensuite on dit que lorsque "SI" l'id de tag correspond à celui du dataset de la <figure> des works 
                "OU" si ça correspond à "tous"
                -> on remplace la class inactive par active (on affiche)
              */
              if (eachWork.dataset.id === tag || tag === "tous") {
                eachWork.classList.replace("inactive", "active");
              }
            }
          });
        }
      }
    });
}
// on lance la fonction
getFilters();







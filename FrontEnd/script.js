
// On récupère l'adresse de l'API et on la met dans une variable
const urlApiWorks = "http://localhost:5678/api/works";
const urlApiFilters = "http://localhost:5678/api/categories";

const gallery = document.querySelector(".gallery");
const filtreSection = document.querySelector("#filtres");


// ------ AJOUT DES WORKS EN JAVASCRIPT-----------

// Fonction Fetch pour récupérer des données dans l'Api et les retourner en json
async function getWorks() {

    const reponse = await fetch(urlApiWorks)
    return reponse.json()

        /* Ensuite on insère ces données dans data et on insert les balises <figure>
         contenant les travaux et leurs données respectives, dans le html à l'intérieur de la div ayant la classe .gallery */

        .then(function (data) {
            console.log(data)

            for (works in data) {

                gallery.innerHTML += `<figure data-id="${data[works].category.id}" class="active">
                
            <img src="${data[works].imageUrl}" alt="${data[works].title}">
            <figcaption>${data[works].title}</figcaption>
        </figure>`
            }
        })
}
// on lance la fonction
getWorks()




// ------ PARTIE FILTRES-----------

// ------ AJOUT DES FILTRES EN JAVASCRIPT-----------

async function getFilters() {

    const reponse = await fetch(urlApiFilters)
    return reponse.json()

        .then(function (dataCategories) {

            for (categories in dataCategories) {

                filtreSection.innerHTML += `<div id="${dataCategories[categories].id}">${dataCategories[categories].name}</div>`
            }
        })
}
// on lance la fonction
getFilters()




// ------ PARTIE FONCTION DE FILTRAGE-----------

// On défini les différents filtres dans une variable
let filtres = document.querySelectorAll("#filtres div")

console.log(filtres);

/* Avec une boucle, on ajoute un eventListener au click pour chaque filtre
et qui renvoi la valeur de son id */

for (let filtre of filtres) {
    filtre.addEventListener("click", function () {
        let tag = this.id; // donne la valeur à tag -> l'id de la div ex:"tous"
        console.log(tag)

        let worksList = document.querySelectorAll(".gallery figure");

        /* Avec une boucle, on indique que les div figure sont non-affichees en remplaçant leur class active par inactive */
        for (let eachWork of worksList) {
            eachWork.classList.replace("active", "inactive");
            console.log(eachWork, tag)

            /* Ensuite on dit que lorsque "SI" l'id de tag correspond à celui dans le dataset  "OU" si ça correspond à "tous" 
            -> on remplace la class inactive par active
            */

            if (eachWork.dataset.id === tag || tag === "tous") {
                eachWork.classList.replace("inactive", "active");
            }
        }
    });
}

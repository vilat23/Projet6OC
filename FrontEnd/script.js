
// On récupère l'dresse de l'API et on la met dans une variable
const urlApi = "http://localhost:5678/api/works";
const gallery = document.querySelector(".gallery");


// Fonction Fetch pour récupérer des données dans l'Api et les retourner en json
async function getWorks() {

    const reponse = await fetch(urlApi)
    return reponse.json()

        /* Ensuite on insère ces données dans data et on insert les balises <figure>
         contenant les travaux et leurs données respectives, dans la div .gallery */

        .then(function (data) {
            console.log(data)

            for (works in data) {
                gallery.innerHTML += `<figure data-${data[works].category.id} class="active">
                
            <img src="${data[works].imageUrl}" alt="${data[works].title}">
            <figcaption>${data[works].title}</figcaption>
        </figure>`
            }
            /*     CONSEILS MENTOR
                 for (works in data) {
                    gallery.innerHTML += `<figure data-category="${data[works].category.id}" class="active">
                    
                <img src="${data[works].imageUrl}" alt="${data[works].title}">
                 <figcaption>${data[works].title}</figcaption>
             </figure>`
                 } */
        })
}
// on lance la fonction
getWorks()

// ------ PARTIE FILTRES-----------

// On défini les différents filtres dans une variable
let filtres = document.querySelectorAll("#filtres div")

/* Avec une boucle, on ajoute un eventListener au click pour chaque filtre
et qui renvoi la valeur de son id */

for (let filtre of filtres) {
    filtre.addEventListener("click", function () {
        let tag = this.id; // donne la valeur à tag -> l'id de la div ex:"tous"
        //console.log(tag)


        let travaux = document.querySelectorAll(".gallery figure");
        /* Avec une boucle, on inqidue que les div figure sont inactive en remplaçant leur class */
        for (let travail of travaux) {
            travail.classList.replace("active", "inactive");
            console.log(travail,tag)

            /* Ensuite on dit que lorsque l'id de tag correspond à celui dans le dataset on remplace la class par active
            et on definit aussi une valeur pour l'etiquette "tous" */

            if (tag in travail.dataset || tag === "tous") {
                travail.classList.replace("inactive", "active");
            }
            // CONSEILS MENTOR
            // if (travail.getAttribute("data-category.id") === tag || tag === "tous") {
            //     travail.classList.replace("inactive", "active");
            // }
        }
    });
}

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
    reponse
      .json()

      /* Ensuite on insère ces données dans data et on insert les balises <figure>
                     contenant les travaux et leurs données respectives, dans le html à l'intérieur de la div ayant la classe .gallery */

      .then(function (data) {
        // console.log(data);

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
            let tag = this.id; // donne la valeur à tag -> l'id de la div ex:"tous" ou "Appartement" etc...
            // console.log(tag);

            let worksList = document.querySelectorAll(".gallery figure");
            /* Avec une boucle, on indique que les div figure sont non-affichees en remplaçant
                                      leur class active par inactive */
            for (let eachWork of worksList) {
              eachWork.classList.replace("active", "inactive");
              //   console.log(eachWork, tag);

              /* Ensuite on dit que lorsque "SI" l'id de tag correspond à celui dans le dataset 
                                            "OU" si ça correspond à "tous"
                                                      -> on remplace la class inactive par active
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

// ----------------------------------------------
// -----------------PARTIE MODAL---------------
// ------------------------------------------------

// AFFICHAGE ET FERMETURE DE LA MODAL
//variables
const editBtn = document.querySelector(".editBtn");
const modalContainer = document.querySelector(".modalContainer");
const closingCross = document.querySelector(".fa-xmark");

//FONCTION POUR l'AFFICHAGE ET FERMETURE DE LA MODAL-------------------------------

function modalSettings() {
  // Affichage de la modal au click sur "modifier" en mettant le style en "display flex"
  editBtn.addEventListener("click", () => {
    // console.log(editBtn);
    modalContainer.style.display = "flex";
  });

  // Fermeture de la modal au click sur "la croix" en mettant le style en "display none"
  closingCross.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
  // Fermeture de la modal au click à l'extérieur de la modal en mettant le style en "display none"
  modalContainer.addEventListener("click", (event) => {
    if (event.target.className === "modalContainer") {
      modalContainer.style.display = "none";
    }
  });
}
modalSettings();

// INSERTION DES PHOTOS DANS LA GALLERY MODAL-------------------------

const modalProjects = document.querySelector(".modalProjects");
// console.log(modalProjects);

async function getModalWorks() {
  const reponse = await fetch(urlApiWorks);
  return reponse
    .json()

    .then((data) => {
      // console.log(data);
      data.forEach((element) => {
        // console.log(element);
        const modalFigure = document.createElement("figure");
        const modalImg = document.createElement("img");
        const modalSpan = document.createElement("span");
        const modalIcon = document.createElement("i");
        modalSpan.classList.add("trashIcon");
        modalIcon.classList.add("fa-solid", "fa-trash-can", "fa-xs");
        modalImg.src = element.imageUrl;
        modalSpan.id = element.id;

        modalSpan.appendChild(modalIcon);
        modalFigure.appendChild(modalImg);
        modalFigure.appendChild(modalSpan);
        modalProjects.appendChild(modalFigure);
      });
      deleteWork();
    });
}
getModalWorks();

function deleteWork() {
  const token = localStorage.getItem("token");
  // console.log(token)
  const trashIcons = document.querySelectorAll(".trashIcon");
  // console.log(trashIcons);
  trashIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      // console.log(icon);
      const trashIconid = icon.id;
      // console.log(trashIconid);
      const deleteConfirm = confirm(
        "Etes vous sur de vouloir supprimer le projet ?"
      );
      // si ok on lance la fonction de suppression
      if (deleteConfirm) {
        function trashDelete() {
          fetch("http://localhost:5678/api/works/" + trashIconid, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("La supression à échoué");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
            });
        }
        trashDelete();
      }
    });
  });
}

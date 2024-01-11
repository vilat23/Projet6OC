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
      contenant les travaux et leurs données respectives, dans le html à l'intérieur de la div ayant la classe .gallery
       */
      .then(function (data) {
        //         // console.log(data);
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

//FONCTION POUR l'AFFICHAGE ET FERMETURE DE LA MODAL 1-------------------------------

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

// INSERTION DES PHOTOS DANS LA GALLERY MODAL1-------------------------

const modalProjects = document.querySelector(".modalProjects");
// console.log(modalProjects);

async function getModalWorks() {
  const reponse = await fetch(urlApiWorks);
  return reponse
    .json()

    .then((data) => {
      // On vide le container avant de le remplir
      modalProjects.innerHTML = "";
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

// SUPPRESSION D'UN PROJET'-------------------------

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
      // si click sur ok on lance la fonction de suppression
      if (deleteConfirm) {
        function trashDelete() {
          fetch("http://localhost:5678/api/works/" + trashIconid, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          })
            // on verifie que la requête est ok est on rend la réponse
            .then((response) => {
              if (!response.ok) {
                alert("Suppression échouée, veuillez vous reconnecter");
                document.location.href = "login.html";
              } else {
                console.log("delete effectué");
              }
            })
            .then(() => {
              // On relance les fonctions pour réimporter les projets dans le portofolio et la modale
              getWorks();
              getModalWorks();
            });
        }
        trashDelete();
      }
    });
  });
}

// ----------------------------------------------
// -----------------PARTIE MODAL 2---------------
// ------------------------------------------------
/* ------------------------------------------------------ */
/* GESTION DE L'AFFICHAGE ET FERMETURE DES MODALES  */
/* ------------------------------------------------------ */

// //variables
const postImgBtn = document.querySelector(".postImgBtn");
const postModalContainer = document.querySelector(".postModalContainer");
const postClosingCross = document.querySelector(".postClosingCross");
const returnArrowModal1 = document.querySelector(".returnArrowModal1");

// //FONCTION POUR l'AFFICHAGE MODAL 2 ET FERMETURE DE LA MODAL 1 -------------------------------

function postModalSettings() {
  // Affichage de la modal au click sur "modifier" en mettant le style en "display flex"
  postImgBtn.addEventListener("click", () => {
    // console.log(editBtn);
    modalContainer.style.display = "none";
    postModalContainer.style.display = "flex";
  });
}
postModalSettings();

// //FONCTION POUR FERMETURE DE LA MODAL 2 -------------------------------
//Fermeture de la modal 2 au click sur "la croix" en mettant le style en "display none"
function closeModal2() {
  postClosingCross.addEventListener("click", () => {
    postModalContainer.style.display = "none";
  });
}
closeModal2();

// //FONCTION POUR RETOUR SUR LA MODAL 1 -------------------------------
//Retour sur la modale 1 au click sur "la fleche" en mettant le style en "display none" et en affichant la modal 1
function returnModal1() {
  returnArrowModal1.addEventListener("click", () => {
    postModalContainer.style.display = "none";
    modalContainer.style.display = "flex";
  });
}
returnModal1();

  // Fermeture de la modal 2 au click à l'extérieur de la modal en mettant le style en "display none"
  postModalContainer.addEventListener("click", (event) => {
    if (event.target.className === "postModalContainer") {
      postModalContainer.style.display = "none";
    }
  });

// Fonction pour remplir la liste de catégories dans le formulaire d'ajout
async function addSelectCategories() {
  const reponse = await fetch(urlApiFilters);
  return reponse
    .json()

    .then((dataPostCategories) => {
      // console.log(dataPostCategories)
      const selectorCategory = document.getElementById("selectorCategory");
      // console.log(selectorCategory)
      dataPostCategories.forEach((categorie) => {
        const option = document.createElement("option");
        option.value = categorie.id;
        option.textContent = categorie.name;
        selectorCategory.appendChild(option);
      });
    });
}
addSelectCategories()
/* ------------------------------------------------------ */
/* AJOUTS DE PROJET  */
/* ------------------------------------------------------ */

const addImgInput = document.getElementById("addPic");

addImgInput.addEventListener("change", () =>{
  const selectedPic = addImgInput.files[0];
    console.log(selectedPic);
})

const titleInput = document.getElementById("postFormTitle");
console.log(titleInput)
const categorySelect = document.getElementById("selectorCategory");
console.log(categorySelect)
const validateBtn = document.getElementById("postFormValidateBtn");
console.log(validateBtn)

function postWork() {
  
}
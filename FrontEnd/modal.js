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
addSelectCategories();

/* ------------------------------------------------------ */
/* AJOUTS DE PROJET  */
/* ------------------------------------------------------ */

// GESTION DE L'AJOUT DE L'IMAGE ET SA PREVIEW
const addImgInput = document.getElementById("addPic");

addImgInput.addEventListener("change", () => {
  const previewImgDiv = document.getElementById("previewImgContainer");
  // On reinitialise la balise pour recreer qu'une seule img à chaque modification de choix (lors de l'ajout de photo)
  previewImgDiv.innerHTML = "";
  const previewImg = document.createElement("img");
  previewImg.src = URL.createObjectURL(addImgInput.files[0]);
  previewImgDiv.appendChild(previewImg);

  previewPhotoIcon.style.display = "none";
  // Event au click pour avoir la possibilité de modifier son choix d'image au clic sur celle ci
  previewImg.addEventListener("click", () => {
    addImgInput.click();
  });
});

// -----------------------------------------------------------
// // GESTION DE L'AJOUT D'UNE PHOTO AVEC FORMDATA
// ------------------------------------------------------------

const titleInput = document.getElementById("postFormTitle");
// console.log(titleInput)
const categorySelect = document.getElementById("selectorCategory");
// console.log(categorySelect)
const validateBtn = document.getElementById("postFormValidateBtn");
// console.log(validateBtn)

function postWork() {
  validateBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const warningMsg = document.querySelector(".modalWarningMessage");
    const formData = new FormData();
    formData.append("image", addImgInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);
    fetch(urlApiWorks, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          warningMsg.innerHTML =
            "Ajout non validé, veuillez revérifier les informations saisies";
          // alert("Ajout non validé, veuillez vérifier les informations");
        } else {
          response.json();
          alert("Votre photo a bien été ajoutée !");
          // On relance les fonctions pour réimporter les projets dans le portofolio et la modale
          getWorks();
          getModalWorks();
          postModalContainer.style.display = "none";
          modalContainer.style.display = "flex";

        // On "rafraichit" les champs
          titleInput.value = "";
          categorySelect.value = "";
        }
      })
      .catch((error) => console.error(error));
  });
}
postWork();

// --------------------------------------------------------------------
// // SUPPRESSION D'UN PROJET'-------------------------
// -------------------------------------------------------------------

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
        "Etes vous sur de vouloir supprimer la photo ?"
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
            // on rend la réponse de la requête
            .then((response) => {
              if (!response.ok) {
                alert(
                  "Suppression échouée, vous n'êtes pas connecté, veuillez vous reconnecter"
                );
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

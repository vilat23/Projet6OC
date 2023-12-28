
// On définit differentes variables, le chemin API de users, les champs input du formulaire 
const urlUsers = "http://localhost:5678/api/users/login";
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Variable du champ de texte pour l'affichage du message d'erreur
const errorMsgField = document.querySelector("#formSection p");


form.addEventListener('submit', (event) => {

    // empêche le rechargement de la page au submit
    event.preventDefault()

    let logInfos = {
        email: emailInput.value,
        password: passwordInput.value,
    }
    // On se connecte à l'api pour "verifier" les informations entrées dans les inputs
    fetch(urlUsers, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(logInfos)
    })
        // On retourne la réponse et on verifie si cela vaut "false" ou "true" ->si les données correspondent"
        .then(function (response) {
            // console.log(response.ok); si c'est ok on renvoie la reponse en json
            if(response.ok) {
                response.json()
            // fonction pour vérifier que les donnees de connexions entrées dans le local storage correspondent  
            // à celles du token, si c'est ok on renvoie vers la page admin.html
              .then((data) => {
                const userToken = data.token;
                if (localStorage.logInfos = userToken) 
                document.location.href=("admin.html"); 
            // sinon on affiche un message d'erreur dans le champ dédié
                })} else {
                    errorMsgField.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
                }

        })
})

// ----------------------------------------------
// -----------------PARTIE MODAL---------------
// ------------------------------------------------

// AFFICHAGE ET FERMETURE DE LA MODAL
const editBtn = document.querySelector(".editBtn");
const modalContainer = document.querySelector(".modalContainer");
const closingCross = document.querySelector(".fa-xmark");


editBtn.addEventListener("click", () =>{
    console.log(editBtn);
    modalContainer.style.display = "flex";
});
closingCross.addEventListener("click", () =>{
    modalContainer.style.display = "none";
});

modalContainer.addEventListener("click", (event) =>{
    if (event.target.className === "modalContainer") {
    modalContainer.style.display = "none";
}
});

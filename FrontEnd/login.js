
// On définit differentes variables, le chemin API de users, les champs input du formulaire 
const urlUsers = "http://localhost:5678/api/users/login";
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const form = document.querySelector("form");

// Variable du champ de texte pour l'affichage du message d'erreur
const errorMsgField = document.querySelector("#formSection p");


form.addEventListener('submit', (e) => {

    // empêche le rechargement de la page
    e.preventDefault() 


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

    // On retourne la réponse et on verifie si cela vaut "false" ou "true si les données correspondent"

    .then(function (response) {
        console.log(response.ok);
    })
})
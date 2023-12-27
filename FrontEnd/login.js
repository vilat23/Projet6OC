
// On définit differentes variables, le chemin API de users, les champs input du formulaire 
const urlUsers = "http://localhost:5678/api/users/login";
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const form = document.querySelector("form");

// Variable du champ de texte pour l'affichage du message d'erreur
const errorMsgField = document.querySelector("#formSection p");


form.addEventListener('submit', (e) => {

    // empêche le rechargement de la page au submit
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
        // On retourne la réponse et on verifie si cela vaut "false" ou "true" ->si les données correspondent"
        .then(function (response) {
            // console.log(response.ok); si c'est ok on renvoie la reponse en json
            if(response.ok) {
                response.json()
            // fonction pur vérifier que le token est bien présent dans le local storage,
            // si c'est ok on renvoie vers la page admin
              .then((data) => {
                const userdata = data.token;
                if (localStorage.user = userdata) 
                document.location.href=("admin.html"); 
            // sinon on affiche un message d'erreur dans le champ dédié
                })} else {
                  document.querySelector("#formSection p").innerHTML = "Erreur dans l’identifiant ou le mot de passe";
                }

        })
})
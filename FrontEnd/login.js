// On définit differentes variables, le chemin API de users, les champs input du formulaire
const urlUsers = "http://localhost:5678/api/users/login";
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Variable du champ de texte pour l'affichage du message d'erreur
const errorMsgField = document.querySelector("#formSection p");

form.addEventListener("submit", (event) => {
  // empêche le rechargement de la page au submit
  event.preventDefault();

  let logInfos = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  // On se connecte à l'api pour "envoyer" les informations entrées dans les inputs
  fetch(urlUsers, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logInfos),
  })
    // On retourne la réponse et on verifie si cela vaut "false" ou "true" ->si les données correspondent"
    .then(function (response) {
      // console.log(response.ok); si c'est ok on renvoie la reponse en json
      if (response.ok) {
        response
          .json()
          // On vérifie que le token est présent, si c'est ok on stock le token et le userId et on renvoie vers la page admin.html
          .then((data) => {
            // console.log(data)
            if (data.token) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("userId", data.userId);
              // console.log(data.token)
              // console.log(data.userId)
              document.location.href = "admin.html";
            }
          });
      }
      // sinon on affiche un message d'erreur dans le champ dédié
      else {
        errorMsgField.innerHTML =
          "Erreur dans l’identifiant ou le mot de passe";
      }
    });
});



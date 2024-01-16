
// ---------Gestion du logout----------------

const logoutLink = document.querySelector(".logoutLink");
// console.log(logoutLink)
logoutLink.addEventListener("click", () => {
    function logout() {
        // Supprime le userId et le token du localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        // Redirige l'utilisateur vers la page d'accueil
        window.location.href = "index.html";
    }
    logout();
});

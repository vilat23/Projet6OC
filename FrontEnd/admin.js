
// --------------------------------------------------------------------
// ---------------GESTION DU MODE ADMIN--------------------------------
// -------------------------------------------------------------------


// ------ Corrections Soutenance - ajout mode edition -----------

function editorMode(){
    const token = localStorage.getItem("token");
    const editorBar = document.querySelector(".editBar");
    const editorModeBtn = document.querySelector(".editBtn");
    const editorModeFilters = document.querySelector("#filtres");
    const editorLogoutLink = document.querySelector(".logoutLink");
    // console.log(token, editorBar, editorModeBtn, editorLogoutLink);
  
    if (!token){
      editorBar.style.display = "none";
      editorModeBtn.style.display = "none";
      editorModeFilters.style.display = "flex";
      editorLogoutLink.innerHTML= `<a href="login.html">login</a>`;
    }
    else{
      editorBar.style.display = "flex";
      editorModeBtn.style.display = "block";
      editorModeFilters.style.display = "none";
    }
  }
editorMode()
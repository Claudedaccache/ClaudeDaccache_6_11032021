// form variables and validation
var yourName = document.getElementById ("first");
var nameErrorMessage = document.getElementById("nameErrorMessage");
var validName = /^[a-zA-ZîèéïÉÈ][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$([-'\s][a-zA-ZÜüàÀÏÎÉÈîèéï][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$)?/;

var lastName = document.getElementById ("last");
var lastNameErrorMessage = document.getElementById("lastNameErrorMessage");
var validLastName = /^[a-zA-ZîèéïÉÈ][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$([-'\s][a-zA-ZÜüàÀÏÎÉÈîèéï][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$)?/;

var email = document.getElementById ("email");
var emailErrorMessage = document.getElementById("emailErrorMessage");
var validEmail = /^[a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ][a-zA-ZàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/

var content = document.querySelector(".content");
var buttonSubmit = document.querySelector(".btn-submit");

var scrollBtn = document.querySelector("#scrollMainPage");

var filterIcon = document.getElementById("#filterIcon");
var filterNotActive = document.querySelector(".notActive");


// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBody = document.querySelector(".modal-body");
const btnSubmit = document.querySelectorAll(".photographerContact");
const btnSubmitResp = document.querySelectorAll(".photographerContactResp");
const myForm = document.getElementById ("myForm");
const close = document.querySelectorAll(".close");

// launching modal form
btnSubmit.forEach((btn) => btn.addEventListener("click", launchForm));
btnSubmitResp.forEach((btn) => btn.addEventListener("click", launchForm));

function launchForm(){
modalbg.style.display = "block";}

// closing modal form
close.forEach((cls) => cls.addEventListener("click", closing));

function closing (){
  modalbg.style.display = "none";
  yourName.value = "";
  yourName.style.border = "2.5px solid transparent";
  nameErrorMessage.innerHTML = "";
  lastName.value = "";
  lastName.style.border = "2.5px solid transparent";
  lastNameErrorMessage.innerHTML = "";
  email.value = "";
  email.style.border = "2.5px solid transparent"
  emailErrorMessage.innerHTML = "";
}


//addEventListener section:
myForm.addEventListener("submit", formValidation);
yourName.addEventListener ("input", nameValidation);
lastName.addEventListener ("input", lastNameValidation);
email.addEventListener ("input", emailValidation);


//form validation:
function formValidation (e){
  e.preventDefault();
  if (nameValidation() && lastNameValidation() && emailValidation()){    
    modalBody.remove();
    content.style.width= "100%";
    content.style.height= "100%";
    content.style.padding= "8rem 3rem 0 3rem";
    formValidationMessage.style.visibility= "visible";
    return myForm.submit();
    }
}


// form functions:
function nameValidation(e){

  if (yourName.value === "" || yourName.value == null){
    // e.preventDefault();
    nameErrorMessage.innerHTML = "Veuillez renseigner votre Prénom.";
    nameErrorMessage.style.color = "white";
    yourName.style.border = "3px solid red";
    return false;
  }

    else if (yourName.value.length <= 2){
      // e.preventDefault();
      nameErrorMessage.innerHTML = "Le prénom renseigné est très court!";
      nameErrorMessage.style.color = "white";
      yourName.style.border = "3px solid red";
      return false;
    }
    
    else if ((validName.test(yourName.value)) === false) {
      // e.preventDefault();
      nameErrorMessage.innerHTML = "Veuillez respecter le format requis!";
      nameErrorMessage.style.color = "white";
      yourName.style.border = "3px solid red";
      return false;
    }
    
    else {
      nameErrorMessage.style.color = "green";
      yourName.style.border = "3px solid green";
      nameErrorMessage.innerHTML = "";
      return true;
    }
  }

function lastNameValidation(e){

  if (lastName.value === "" || lastName.value == null){
    // e.preventDefault();
    lastNameErrorMessage.innerHTML = "Veuillez renseigner votre Nom.";
    lastNameErrorMessage.style.color = "white";
    lastName.style.border = "3px solid red";
    return false;
  }

    else if (lastName.value.length <= 2){
      // e.preventDefault();
      lastNameErrorMessage.innerHTML = "Le prénom renseigné est très court!";
      lastNameErrorMessage.style.color = "white";
      lastName.style.border = "3px solid red";
      return false;
    }
    
    else if ((validLastName.test(lastName.value)) === false) {
      // e.preventDefault();
      lastNameErrorMessage.innerHTML = "Veuillez respecter le format requis!";
      lastNameErrorMessage.style.color = "white";
      lastName.style.border = "3px solid red";
      return false;
    }
    
    else {
      lastNameErrorMessage.style.color = "green";
      lastName.style.border = "3px solid green";
      lastNameErrorMessage.innerHTML = "";
      return true;
    }
    }

function emailValidation(e){

    if (email.value === "" || email.value == null){
      // e.preventDefault();
      emailErrorMessage.innerHTML = "Veuillez renseigner votre e-mail.";
      emailErrorMessage.style.color = "white";
      email.style.border = "3px solid red";
      return false;
    }

    else if ((validEmail.test(email.value)) === false) {
        // e.preventDefault();
        emailErrorMessage.innerHTML = "Veuillez respecter le format du e-mail! (exemple@domaine.fr)";
        emailErrorMessage.style.color = "white";
        email.style.border = "3px solid red";
        return false;
      }
    
    else {
      emailErrorMessage.style.color = "green";
      email.style.border = "3px solid green"
      emailErrorMessage.innerHTML = "";
      return true;}
}

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  console.log(scrolled)

 if(scrolled < 600){
    scrollBtn.style.display ="none";
  }
  else {
    scrollBtn.style.display ="block";}
    scrollBtn.style.position ="fixed";
  }
)





// opening of filter menu:
// filterIcon.addEventListener("click", () => {
//   if (filterNotActive.className === "notActive") {
//     filterNotActive.className += " responsive";
//   } else {
//     filterNotActive.className = "notActive";
//   }
// })
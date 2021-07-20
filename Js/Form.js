import data from "./../data.js";

function getCurrentId() {
  const params = new URLSearchParams(window.location.search);
  const product = parseInt(params.get("id"));
  return product;
}

formDisplay(".formTitle", data.photographers);


function formDisplay(container, phgs) {
  const formTitle = document.querySelector(container);
  formTitle.innerHTML = `${phgs
    .filter((x) => x.id === getCurrentId())
    .map((form)=>{
      return `
    Contactez-moi<br>${form.name}
`;
    })
    .join("")}`;
}

///////// variables and conditions /////////////

var yourName = document.getElementById("first");
var nameErrorMessage = document.getElementById("nameErrorMessage");
var validName =
  /^[a-zA-ZîèéïÉÈ][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$([-'\s][a-zA-ZÜüàÀÏÎÉÈîèéï][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$)?/;

var lastName = document.getElementById("last");
var lastNameErrorMessage = document.getElementById("lastNameErrorMessage");
var validLastName =
  /^[a-zA-ZîèéïÉÈ][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$([-'\s][a-zA-ZÜüàÀÏÎÉÈîèéï][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$)?/;

var email = document.getElementById("email");
var emailErrorMessage = document.getElementById("emailErrorMessage");
var validEmail =
  /^[a-zA-ZàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ][a-zA-ZàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;

var content = document.querySelector(".content");
// var buttonSubmit = document.querySelector(".btn-submit");

var btnSubmit = document.querySelectorAll(".photographerContact");
var btnSubmitResp = document.querySelectorAll(".photographerContactResp");

const myForm = document.getElementById("myForm");
const modalbg = document.querySelector(".bground");
const modalBody = document.querySelector(".modal-body");
const close = document.querySelectorAll(".close");
const closeBtn = document.querySelector(".btnClose");
const formValidationMessage= document.querySelector("#formValidationMessage");

// DOM Elements

// launching modal form
btnSubmit.forEach((btn) => btn.addEventListener("click", launchForm));
btnSubmitResp.forEach((btn) => btn.addEventListener("click", launchForm));

function launchForm() {
  modalbg.style.display = "block";
}

// closing modal form
close.forEach((cls) => cls.addEventListener("click", closing));

function closing() {
  modalbg.style.display = "none";
  yourName.value = "";
  yourName.style.border = "2.5px solid transparent";
  nameErrorMessage.innerHTML = "";
  lastName.value = "";
  lastName.style.border = "2.5px solid transparent";
  lastNameErrorMessage.innerHTML = "";
  email.value = "";
  email.style.border = "2.5px solid transparent";
  emailErrorMessage.innerHTML = "";
}

function closingForm() {
  modalbg.style.display = "none";
}

//addEventListener section:
myForm.addEventListener("submit", formValidation);
yourName.addEventListener("input", nameValidation);
lastName.addEventListener("input", lastNameValidation);
email.addEventListener("input", emailValidation);
closeBtn.addEventListener("click", closingForm);

//form validation:
function formValidation(e) {
  e.preventDefault();
  if (nameValidation() && lastNameValidation() && emailValidation()) {
    modalBody.remove();
    content.style.width = "85%";
    content.style.height = "70%";
    content.style.padding = "10rem 5% 0 5%";
    formValidationMessage.style.visibility = "visible";
    closeBtn.style.display = "block";
    return myForm.submit();
  }
}

// form functions:
function nameValidation() {
  if (yourName.value === "" || yourName.value == null) {
    nameErrorMessage.innerHTML = "Veuillez renseigner votre Prénom.";
    nameErrorMessage.style.color = "white";
    yourName.style.border = "3px solid red";
    return false;
  } else if (yourName.value.length < 2) {
    nameErrorMessage.innerHTML = "Le prénom renseigné est très court!";
    nameErrorMessage.style.color = "white";
    yourName.style.border = "3px solid orange";
    return false;
  } else if (validName.test(yourName.value) === false) {
    nameErrorMessage.innerHTML = "Veuillez respecter le format requis!";
    nameErrorMessage.style.color = "white";
    yourName.style.border = "3px solid red";
    return false;
  } else {
    nameErrorMessage.style.color = "green";
    yourName.style.border = "3px solid green";
    nameErrorMessage.innerHTML = "";
    return true;
  }
}

function lastNameValidation() {
  if (lastName.value === "" || lastName.value == null) {

    lastNameErrorMessage.innerHTML = "Veuillez renseigner votre Nom.";
    lastNameErrorMessage.style.color = "white";
    lastName.style.border = "3px solid red";
    return false;
  } else if (lastName.value.length < 2) {

    lastNameErrorMessage.innerHTML = "Le prénom renseigné est très court!";
    lastNameErrorMessage.style.color = "white";
    lastName.style.border = "3px solid orange";
    return false;
  } else if (validLastName.test(lastName.value) === false) {

    lastNameErrorMessage.innerHTML = "Veuillez respecter le format requis!";
    lastNameErrorMessage.style.color = "white";
    lastName.style.border = "3px solid red";
    return false;
  } else {
    lastNameErrorMessage.style.color = "green";
    lastName.style.border = "3px solid green";
    lastNameErrorMessage.innerHTML = "";
    return true;
  }
}

function emailValidation() {
  if (email.value === "" || email.value == null) {

    emailErrorMessage.innerHTML = "Veuillez renseigner votre e-mail.";
    emailErrorMessage.style.color = "white";
    email.style.border = "3px solid red";
    return false;
  } else if (validEmail.test(email.value) === false) {

    emailErrorMessage.innerHTML =
      "Veuillez respecter le format du e-mail! (exemple@domaine.fr)";
    emailErrorMessage.style.color = "white";
    email.style.border = "3px solid orange";
    return false;
  } else {
    emailErrorMessage.style.color = "green";
    email.style.border = "3px solid green";
    emailErrorMessage.innerHTML = "";
    return true;
  }
}

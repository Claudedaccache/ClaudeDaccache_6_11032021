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

const yourName = document.getElementById("first");
const nameErrorMessage = document.getElementById("nameErrorMessage");
const validName =
  /^[a-zA-ZîèéïÉÈ][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$([-'\s][a-zA-ZÜüàÀÏÎÉÈîèéï][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$)?/;

const lastName = document.getElementById("last");
const lastNameErrorMessage = document.getElementById("lastNameErrorMessage");
const validLastName =
  /^[a-zA-ZîèéïÉÈ][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$([-'\s][a-zA-ZÜüàÀÏÎÉÈîèéï][a-zàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ]+([^0-9]*)$)?/;

const email = document.getElementById("email");
const emailErrorMessage = document.getElementById("emailErrorMessage");
const validEmail =
  /^[a-zA-ZàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ][a-zA-ZàâçéèêëîïùûüÜÛÙÏÎËÊÈÉÇÂÀ0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;


const textArea = document.getElementById("message");
const messageErrorMessage = document.getElementById("messageErrorMessage");

const content = document.querySelector(".content");

const btnSubmit = document.querySelectorAll(".photographerContact");
const btnSubmitResp = document.querySelectorAll(".photographerContactResp");

const myForm = document.getElementById("myForm");
const modalbg = document.querySelector(".bground");
const modalBody = document.querySelector(".modal-body");
const close = document.querySelectorAll(".close");
const closeBtn = document.querySelector(".btnClose");
const formValidationMessage= document.querySelector("#formValidationMessage");
const header = document.querySelector("header");
const main = document.querySelector("#allBody");

// DOM Elements

// launching modal form
btnSubmit.forEach((btn) => btn.addEventListener("click", launchForm));
btnSubmitResp.forEach((btn) => btn.addEventListener("click", launchForm));

function launchForm() {
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
  modalbg.style.display = "block";
  modalbg.setAttribute("aria-hidden", "false");

  const  focusableElements =
  "button, input, textarea";
  const firstFocusableElement = modalbg.querySelectorAll(focusableElements)[0]; 
  const focusableContent = modalbg.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 2];
  const lastFocusableElementAfterSubmit = focusableContent[focusableContent.length - 1]; 
 
  console.log(lastFocusableElement);


  document.addEventListener("keydown", function(e) {
    let isTabPressed = e.key === "Tab" || e.key === 9;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) { // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); 
        e.preventDefault();
      }
    } else { // if tab key is pressed
      if (document.activeElement === lastFocusableElement || document.activeElement === lastFocusableElementAfterSubmit) {
        firstFocusableElement.focus(); 
        e.preventDefault();
      }
    }
  });

  firstFocusableElement.focus();
}

// closing modal form
close.forEach((cls) => cls.addEventListener("click", closing));
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    closing();
  }
});

function closing() {
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
  modalbg.style.display = "none";
  modalbg.setAttribute("aria-hidden", "true");
  yourName.value = "";
  yourName.style.border = "2.5px solid transparent";
  nameErrorMessage.innerHTML = "";
  lastName.value = "";
  lastName.style.border = "2.5px solid transparent";
  lastNameErrorMessage.innerHTML = "";
  email.value = "";
  email.style.border = "2.5px solid transparent";
  emailErrorMessage.innerHTML = "";
  textArea.value = "";
  textArea.style.border = "2.5px solid transparent";
  messageErrorMessage.innerHTML = "";
}

//addEventListener section:
myForm.addEventListener("submit", formValidation);
yourName.addEventListener("input", nameValidation);
lastName.addEventListener("input", lastNameValidation);
email.addEventListener("input", emailValidation);
textArea.addEventListener("input", textAreaValidation);
closeBtn.addEventListener("click", closing);

//form validation:
function formValidation(e) {
  e.preventDefault();
  if (nameValidation() && lastNameValidation() && emailValidation() &&  textAreaValidation()) {
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

function textAreaValidation() {
  if (textArea.value === "" || textArea.value == null) {
    messageErrorMessage.innerHTML = "Veuillez renseigner votre message.";
    messageErrorMessage.style.color = "white";
    textArea.style.border = "3px solid red";
    return false;
  } else {
    messageErrorMessage.style.color = "green";
    textArea.style.border = "3px solid green";
    messageErrorMessage.innerHTML = "";
    return true;
  }
}





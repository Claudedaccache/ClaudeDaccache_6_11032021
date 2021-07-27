import data from "./../data.js";

console.log(data);

var scrollBtn = document.querySelector("#scrollMainPage");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  if (scrolled < 300) {
    scrollBtn.style.display = "none";
  } else {
    scrollBtn.style.display = "block";
    scrollBtn.style.position = "fixed";
  }
});

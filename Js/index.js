import data from "./../data.js";

console.log(data);

// scrolling btn
var scrollBtn = document.querySelector("#scrollMainPage");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  // console.log(scrolled)

  if (scrolled < 300) {
    scrollBtn.style.display = "none";
  } else {
    scrollBtn.style.display = "block";
    scrollBtn.style.position = "fixed";
  }
});

// import data from "./../data.js";
// import {getPhotographsByPhotographersId} from "./Media.js";


/**
 * Display the photos and videos of according to each photographers Id into the lightbox.
 * @return {innerHTML}
 */

// function getCurrentId() {
//   const params = new URLSearchParams(window.location.search);
//   const phgId = parseInt(params.get("id"));
//   return phgId;
// }

displayPhotographsInLightbox("#lightBox");

// function getPhotographsById(){
//   let media =  data.media.filter((x) => x.photographerId === getCurrentId());
//   return media;
// }

// function getPhgType(media) {
//   // console.log(media.image, media.video);
//   if (media.image !== undefined) {
//     // console.log("image", lightBoxinfo.image);
//     return "<img src=\"\")>";
//   } else if (media.video !== undefined) {
//     // console.log("video", lightBoxinfo.video);

//     return `<video src=""
//     type="video/mp4" controls="controls"></video>`;
//   }
// }

function displayPhotographsInLightbox(container) {
  var theLightBoxSection = document.querySelector(container);
  theLightBoxSection.innerHTML = 
  // ${media
  //   .map((lightBoxinfo) =>{
    // console.log(lightBoxinfo);
    theLightBoxSection = `<div class="previewBox">
  <div class="closing">
    <span class="lightboxClosingBtn"><i class="fas fa-times"></i></span>
  </div>
  <div class="photographBox">
    <div class="slide prev"><i class="fas fa-angle-left"></i></div>
    <div class="slide next"><i class="fas fa-angle-right"></i></div>
    <div class="lightBoxPhotograph></div>
  </div>
  <span class="lightBoxPhotographTitle"></span>
</div>
<div class="shadow"></div>`;
}



const thePhotograph = document.querySelectorAll(".thePhotograph");
let lightBoxPhotographs = document.querySelector(".lightBoxPhotograph");
const previewBox = document.querySelector(".previewBox");
const shadow = document.querySelector(".shadow");
const closingBtn = document.querySelector(".lightboxClosingBtn");
const prevBtn = document.querySelector(".slide.prev");
const nextBtn = document.querySelector(".slide.next");
const lightBoxPhotographTitle = document.querySelector(
  ".lightBoxPhotographTitle"
);

closingBtn.addEventListener("click", () => {
  previewBox.classList.remove("show");
  shadow.style.display = "none";
});

window.addEventListener("load", () => {
  for (let i = 0; i < thePhotograph.length; i++) {
    // console.log(thePhotograph[I].nodeName == "IMG");

    let newIndex = i;

    // console.log(thePhotograph[i]);
    thePhotograph[i].addEventListener("click", () => {
      previewBox.classList.add("show");
      shadow.style.display = "block";

      function getSelectedPhg() {
        let photograph = thePhotograph[newIndex];
        console.log(photograph);
        let PhotographTitle = thePhotograph[newIndex].alt;

        lightBoxPhotographs.innerHTML = photograph;
        // console.log(lightBoxPhotographs);
        lightBoxPhotographTitle.innerHTML = PhotographTitle;
      }
      getSelectedPhg();

      if (newIndex == 0) {
        prevBtn.style.display = "none";
      }
      if (newIndex >= thePhotograph.length - 1) {
        nextBtn.style.display = "none";
      }
      prevBtn.addEventListener("click", incrementLightBox, false);
      // prevBtn.addEventListener("keydown", function (event) {
      //   if (event.keyCode == 37) {
      //     console.log("hey");
      //   }
      // });

      function incrementLightBox() {
        newIndex--;
        if (newIndex == 0) {
          getSelectedPhg();
          prevBtn.style.display = "none";
        } else {
          getSelectedPhg();
          nextBtn.style.display = "block";
        }
      }
      nextBtn.addEventListener("click", () => {
        newIndex++;
        if (newIndex >= thePhotograph.length - 1) {
          getSelectedPhg();
          nextBtn.style.display = "none";
        } else {
          getSelectedPhg();
          prevBtn.style.display = "block";
        }
      });
    });
  }
});

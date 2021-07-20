import data from "./../data.js";

/**
 * Display the photos and videos of according to each photographers Id into the lightbox.
 * @return {innerHTML}
 */

var theLightBoxSection = document.querySelector("#lightBox");

function getPhgType(lightBoxinfo) {
  // console.log(lightBoxinfo.image, lightBoxinfo.video);
  if (lightBoxinfo.image !== undefined) {
    // console.log("image", lightBoxinfo.image);
    return `<img src="" class="lightBoxPhotograph")>`;
  } else if (lightBoxinfo.video !== undefined) {
    // console.log("video", lightBoxinfo.video);

    return `<video src=""
    type="video/mp4" controls="controls" class="lightBoxPhotograph"></video>`;
  }
}

function displayPhotographsInLightbox(lightBoxinfo) {
  // console.log(lightBoxinfo);
  const lightBoxphgAsHtml = `<div class="previewBox">
  <div class="closing">
    <span class="lightboxClosingBtn"><i class="fas fa-times"></i></span>
  </div>
  <div class="photographBox">
    <div class="slide prev"><i class="fas fa-angle-left"></i></div>
    <div class="slide next"><i class="fas fa-angle-right"></i></div>
    ${getPhgType(lightBoxinfo)}
  </div>
  <span class="lightBoxPhotographTitle"></span>
</div>
<div class="shadow"></div>`;
  return lightBoxphgAsHtml;
}

function getCurrentId() {
  const id = parseInt(localStorage.getItem("currentId"));
  return id;
}

theLightBoxSection.innerHTML = `${data["media"]
  .filter((x) => x.photographerId === getCurrentId())
  .map(displayPhotographsInLightbox)
  .join("")}`;

const thePhotograph = document.querySelectorAll(".thePhotograph");
const lightBoxPhotographs = document.querySelector(".lightBoxPhotograph");
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
        let photographSrc = thePhotograph[newIndex].src;
        let PhotographTitle = thePhotograph[newIndex].alt;

        lightBoxPhotographs.src = photographSrc;
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

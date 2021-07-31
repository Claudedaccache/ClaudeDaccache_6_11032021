
/**
 * Display the photos and videos of according to each photographers Id into the lightbox.
 * @return {innerHTML}
 */
const photographs = document.querySelectorAll(".thePhotograph");
let lightBoxPhotograph = document.querySelector(".lightBoxPhotograph");
const previewBox = document.querySelector(".previewBox");
const shadow = document.querySelector(".shadow");
const closingBtn = document.querySelector(".lightboxClosingBtn");
const prevBtn = document.querySelector(".slide.prev");
const nextBtn = document.querySelector(".slide.next");
const lightBoxPhotographTitle = document.querySelector(".lightBoxPhotographTitle");



displayPhotographsInLightbox("#lightBox");

function displayPhotographsInLightbox(container) {
  let LightBoxSection = document.querySelector(container);
  LightBoxSection.innerHTML = 
      `<div class="previewBox">
        <div class="closing">
          <span class="lightboxClosingBtn"><i class="fas fa-times"></i></span>
        </div>
        <div class="photographBox">
          <div class="slide prev"><i class="fas fa-angle-left"></i></div>
          <div class="slide next"><i class="fas fa-angle-right"></i></div>
        <div class="lightBoxPhotograph></div>   
               <span class="lightBoxPhotographTitle"></span>
        </div>
        </div>
      <div class="shadow"></div>`;
}


  
window.addEventListener("load", () => {
  for (let i = 0; i < photographs.length; i++) {
    let newIndex = i;

    photographs[i].addEventListener("click", (e) => {
      e.preventDefault();
      previewBox.classList.add("show");
      shadow.style.display = "block";

      const currentSrc = e.currentTarget;
      console.log(currentSrc);

      function getSelectedPhg() {
        let currentPhotograph = photographs[newIndex];
        console.log(currentPhotograph);
        let PhotographTitle = photographs[newIndex].alt;
        console.log(lightBoxPhotograph.innerHTML);

        lightBoxPhotograph.innerHTML = currentPhotograph;
        // console.log(lightBoxPhotographs);
        lightBoxPhotographTitle.innerHTML = PhotographTitle;
      }
      getSelectedPhg();
  
      if (newIndex == 0) {
        prevBtn.style.display = "none";
      }

      if (newIndex >= photographs.length - 1) {
        nextBtn.style.display = "none";
      }

      prevBtn.addEventListener("click", () => {
        newIndex--;
        if (newIndex == 0) {
          getSelectedPhg();
          prevBtn.style.display = "none";
        } else {
          getSelectedPhg();
          nextBtn.style.display = "block";
        }
      });

      nextBtn.addEventListener("click", () => {
        newIndex++;
        if (newIndex >= photographs.length - 1) {
          getSelectedPhg();
          nextBtn.style.display = "none";
        } else {
          getSelectedPhg();
          prevBtn.style.display = "block";
        }
      });

      closingBtn.addEventListener("click", () => {
        previewBox.classList.remove("show");
        shadow.style.display = "none";
      });
    });
  }
});



  
  
  
  
  
  
  
  
  
  
  
  
// function getPhgType(media) {
//   console.log(media);
//   if (media.image !== undefined) {
//     // console.log("image", lightBoxinfo.image);
//     return `<img src="")>`;
//   } else if (media.video !== undefined) {
//     // console.log("video", lightBoxinfo.video);
  
//     return `<video src=""
//     type="video/mp4" controls="controls"></video>`;
//   }
// }

// prevBtn.addEventListener("keydown", function (event) {
//   if (event.keyCode == 37) {
//     console.log("hey");
//   }
// });


// function getPhotographType() {
//   photographs.forEach((photograph) => {
//     photograph.addEventListener("click", ()=>{
//       if (photograph.classList.contains("image")) {
//         console.log("image");
//         return `<img src="${photograph}" class="lightBoxPhotograph">`;
//       } else if (photograph.classList.contains("video")) {
//         console.log("video");
//         return `<video src="${photograph}" type="video/mp4" controls="controls" class="lightBoxPhotograph></video>`;
//       }
//     });
//   });
// }





import data from "./../data.js";
import {displayMediaList} from "./MediaFactory.js";
import {PhotographerHeader} from "./photographer.header.js";
import Lightbox from "./lightbox.js";



/**
 * Display the thePricingSec of each photographer according to each their Id.
 * @return {innerHTML}
 */

getPhotographerPrice(".thePricingSec", data.photographers);


function getCurrentId() {
  const params = new URLSearchParams(window.location.search);
  const phgId = parseInt(params.get("id"));
  return phgId;
}

function getPhotographerPrice(container, photographer) {
  let thePricingSec = document.querySelector(container);
  thePricingSec.innerHTML = `${photographer
    .filter((x) => x.id === getCurrentId())
    .map((photographer)=>{
      return `
   <div class="photographerLikesSec">
   <span id="totalLikes"></span
   ><i id="likesHeart" class="fas fa-heart"></i>
 </div>
 <p>${photographer.price}€ / jour</p>`;})
    .join("")}`;
}





/**
 * Display the photographers header Info according to their Id.
 * @return {innerHTML}
 */
getPhotographerInfo(".photographerInfo", data.photographers);

function getPhotographerInfo(container, photographer) {
  let photographerInfo = document.querySelector(container);
  photographerInfo.innerHTML = `${photographer
    .filter((x) => x.id === getCurrentId())
    .map((photographer) =>{
      return new PhotographerHeader(photographer).displayPhotographerHeader();
      
    })
    .join("")}`;
}





/**
 * Display the photos and videos of according to the photographer's Id.
 * @return {innerHTML}
 */

displayPhotographsByPhotographersId(".thePhotographsSection", data.media);
Lightbox.init();
function displayPhotographsByPhotographersId(container, photographs) {
  var thePhotographsSection = document.querySelector(container);
  thePhotographsSection.innerHTML =  getPhotographs(photographs);
}


function getPhotographs (photographs){
  const photographerName =  data["photographers"].find((x) => x.id === getCurrentId()).name;
  return `${photographs
    .filter((x) => x.photographerId === getCurrentId())
    .map((photographs) => {
      let mediaList = displayMediaList(photographs, photographerName);
      return mediaList;
    })
    .join("")}`;
}



/**
 * [when clicking a tag on the photographer page, the photos and videos will be filtered and displayed according the tag clicked]
 */
filteringByTag(".btnTag");

function filteringByTag(container) {
  const photographersBtnTags = document.querySelectorAll(container);
  photographersBtnTags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      const photographerPhotos = document.querySelectorAll(
        ".photographerPhotos"
      );
      console.log(tag);
      const filter = e.target.dataset.filter;
      photographerPhotos.forEach((photos) => {
        if (photos.classList.contains(filter)) {
          photos.style.display = "block";
        } else {
          photos.style.display = "none";
        }
      });
    });
  });
}





/**
 * [toggle between classes in css to display the filter section]
 */

var FilterIcon = document.querySelector("#filterIcon");
var FilterNotActive = document.querySelectorAll(".notActive");

FilterIcon.addEventListener("click", launchFilter);
FilterIcon.addEventListener("keydown", openFilterOnKeyDown);


function launchFilter() {
  FilterNotActive.forEach((btn) => {
    btn.classList.toggle("responsive");
    if (btn.classList.contains("responsive")) {
      FilterIcon.setAttribute("aria-expanded", "true");

    } else {
      FilterIcon.setAttribute("aria-expanded", "false");

    }
  });
}

function openFilterOnKeyDown(e) {
  if (e.key === 13) {
    launchFilter();
  } 
}



/**
 * [when clicking on the filter buttons,  the photographs will be sorted by popularity, date or title]
 *
 */
const popular = document.querySelector("#Popular");
const date = document.querySelector("#Date");
const title = document.querySelector("#Title");


popular.addEventListener("click", () => {
  let sortingByPopularity = data.media.sort(function (a, b) {
    return b.likes - a.likes;
  });
  displayPhotographsByPhotographersId(".thePhotographsSection", sortingByPopularity);
  itemlike();
  Lightbox.init();
});

date.addEventListener("click", () => {
  let sortingByDate = data.media.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  displayPhotographsByPhotographersId(".thePhotographsSection", sortingByDate);
  itemlike();
  Lightbox.init();
});

title.addEventListener("click", () => {
  let sortingByTitle = data.media.sort(function (a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  displayPhotographsByPhotographersId(".thePhotographsSection", sortingByTitle);
  itemlike();
  Lightbox.init();
});





/**
 * clickable hearts for each photo or video liked
 * clicking on the heart for each photo or video will increment or decrement the likes number and modify the photographer's total likes on his page]

 */
itemlike();
function itemlike(){
  const icons = document.querySelectorAll(".LikesIcon button");
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("liked");
      const pic = data.media.find((Element) => {
        return Element.id == icon.dataset.id;
      });
      if (icon.classList.contains("liked")) {
        icon.setAttribute("aria-label", "liked");
        pic.likes += 1;
      } else {
        icon.setAttribute("aria-label", "unliked");
        pic.likes -= 1;
      }
      icon.parentNode.parentNode.querySelector(".likesNumber").textContent =
      pic.likes;
      getTotalLikes("#totalLikes", mediaFilteredByPhgId);
    });

    icon.addEventListener("keydown", (e) => {
      if (e.key === 13) {
        icon.classList.toggle("liked");
        const pic = data.media.find((Element) => {
          return Element.id == icon.dataset.id;
        });
        if (icon.classList.contains("liked")) {
          pic.likes += 1;
        } else {
          pic.likes -= 1;
        }
        icon.parentNode.parentNode.querySelector(".likesNumber").textContent =
        pic.likes;
        getTotalLikes("#totalLikes", mediaFilteredByPhgId);
      }
    });
  });
}




/**
 * [displaying the total likes for each photographer]
 */
const mediaFilteredByPhgId = data["media"].filter(
  (x) => x.photographerId === getCurrentId()
);

getTotalLikes("#totalLikes", mediaFilteredByPhgId);

function getTotalLikes(container, photographs) {
  var totalLikes = document.querySelector(container);

  let LikesArray = [];
  photographs.forEach((photograph) => {
    LikesArray.push(photograph.likes);
  });
  let sum = LikesArray.reduce((totalValue, currentValue) => {
    return totalValue + currentValue;
  }, 0);

  totalLikes.innerHTML = sum;
  totalLikes.setAttribute("aria-label",`${sum}total likes`);
}


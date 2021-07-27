
import data from "./../data.js";

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
 * Display the photographers Info according to their Id.
 * @return {innerHTML}
 */
getPhotographerInfo(".photographerInfo", data.photographers);

function GetPhgtags(tags) {
  return `
  <div class="photographerHashtags">
  ${tags
    .map(function (tag) {
      return `
      <a href="#" class="btnTag" data-filter="${tag}">#${tag}</a>`;
    })
    .join("")}
  </div>
  `;
}

function getPhotographerInfo(container, photographer) {
  let photographerInfo = document.querySelector(container);
  photographerInfo.innerHTML = `${photographer
    .filter((x) => x.id === getCurrentId())
    .map((photographer) =>{
      return `
  <div class="photographerDescription">
  <div class="photographerDescriptionId">
    <h1 class="photographerFullName">${photographer.name}</h1>
    <div class="photographerDescriptionText">
      <p class="photographerDescriptionLocation">${photographer.city}, ${
  photographer.country
}</p>
      <p class="photographerDescriptionQuote">
      ${photographer.tagline}
      </p>
    </div>
    <div class="photographerDescriptionHashtags">
      ${GetPhgtags(photographer.tags)}
    </div>
  </div>
  <button class="photographerContact">Contactez-moi</button>
</div>
<img
  src="./SamplePhotos/PhotographersIDPhotos/${photographer.portrait}"
  alt="image de ${photographer.name}"
  class="photographerInfoPic"
/>
`;})
    .join("")}`;
}





/**
 * Display the photos and videos of according to the photographer's Id.
 * @return {innerHTML}
 */
getPhotographsByPhotographersId(".thePhotographsSection", data.media);

export function getPhotographsByPhotographersId(container, photographerinfo) {
  var thePhotographsSection = document.querySelector(container);
  thePhotographsSection.innerHTML = `${photographerinfo
    .filter((x) => x.photographerId === getCurrentId())
    .map((photographerinfo) => {
      if (photographerinfo.image) {
        const imageAsHtml = `<figure class="photographerPhotos ${
          photographerinfo.tags
        }">
      <img src="./SamplePhotos/${
  data["photographers"].find((x) => x.id === getCurrentId()).name
}/${photographerinfo.image}"
            alt="${photographerinfo.title}" title="clicker pour voir la photo"
            class="thePhotograph" >
      <figcaption class="photographDescr">
      <div class="photographDetails">
        <h2>${photographerinfo.title}</h2>
        <div class="photographPriceDate">

        <p>${photographerinfo.date}</p>
        <p class="photographPrice">${photographerinfo.price}€</p>
        </div>
        </div> 
        <div class="LikesSection">
          <span class="likesNumber" >${photographerinfo.likes}</span>
          <div class="LikesIcon">
            <i class="fa fa-heart" data-id="${photographerinfo.id}"></i> 
        </div>
      </div>
      </figcaption>
    </figure>`;
        return imageAsHtml;
      } else if (photographerinfo.video) {
        const videoAsHtml = `
  <figure class="photographerPhotos ${photographerinfo.tags}" >
  <video src="./SamplePhotos/${
  data["photographers"].find((x) => x.id === getCurrentId()).name
}/${photographerinfo.video}"  
  type="video/mp4" controls="controls" title="clicker pour voir la video" class="thePhotograph"></video>
  <figcaption class="photographDescr">
    <div class="photographDetails">
      <h2>${photographerinfo.title}</h2>
      <div class="photographPriceDate">

      <p>${photographerinfo.date}</p>
      <p class="photographPrice">${photographerinfo.price}€</p>
      </div>
     </div> 
      <div class="LikesSection">
        <span class="likesNumber" >${photographerinfo.likes}</span>
          <div class="LikesIcon">
              <i class="fa fa-heart" data-id="${photographerinfo.id}"></i> 
          </div>
      </div>
  </figcaption>
</figure>`;
        return videoAsHtml;
      }
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

function launchFilter() {
  FilterNotActive.forEach((btn) => btn.classList.toggle("responsive"));
}





/**
 * [when clicking on the filter buttons,  the photographs will be sorted by popularity, date or title]
 *
 */
const popular = document.querySelector("#Popular");
const date = document.querySelector("#Date");
const title = document.querySelector("#Title");
const mediaFilteredByPhgId = data["media"].filter(
  (x) => x.photographerId === getCurrentId()
);

popular.addEventListener("click", () => {
  let sortingByPopularity = mediaFilteredByPhgId.sort(function (a, b) {
    return b.likes - a.likes;
  });
  getPhotographsByPhotographersId(".thePhotographsSection", sortingByPopularity);
});

date.addEventListener("click", () => {
  let sortingByDate = mediaFilteredByPhgId.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  getPhotographsByPhotographersId(".thePhotographsSection", sortingByDate);
});

title.addEventListener("click", () => {
  let sortingByTitle = mediaFilteredByPhgId.sort(function (a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  getPhotographsByPhotographersId(".thePhotographsSection", sortingByTitle);
});





/**
 * clickable hearts for each photo or video liked
 * clicking on the heart for each photo or video will increment or decrement the likes number and modify the photographer's total likes on his page]

 */

var icons = document.querySelectorAll(".LikesIcon i");

icons.forEach((icon) =>
  icon.addEventListener("click", () => {
    icon.classList.toggle("liked");
    const pic = mediaFilteredByPhgId.find((Element) =>{
      return Element.id == icon.dataset.id;
    });
    if (icon.classList.contains("liked")){
      pic.likes += 1;
    } else {
      pic.likes -= 1;
    }
    icon.parentNode.parentNode.querySelector(".likesNumber").textContent = pic.likes;
    getTotalLikes("#totalLikes", mediaFilteredByPhgId);
  })
);





/**
 * [displaying the total likes for each photographer]
 */

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
}


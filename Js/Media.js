let jsonData = await fetch("./../data.json");
let json = await jsonData.json();

// function parseData(json) {
//   if (!json) return {};
//   if (typeof json === "object") return json;
//   if (typeof json === "string") return JSON.parse(json);
//   return {};
// }

// parseData();

/**
 * Display the thePricingSec of each photographer according to each their Id.
 * @return {innerHTML}
 */

var thePricingSec = document.querySelector(".thePricingSec");

function getCurrentId() {
  const id = parseInt(localStorage.getItem("currentId"));
  return id;
}

function getPhotographerPrice(photographer) {
  return `
   <div class="photographerLikesSec">
   <span id="totalLikes"></span
   ><i id="likesHeart" class="fas fa-heart"></i>
 </div>
 <p>${photographer.price}€ / jour</p>
 `;
}

thePricingSec.innerHTML = `${json["photographers"]
  .filter((x) => x.id === getCurrentId())
  .map(getPhotographerPrice)
  .join("")}`;

/**
 * Display the photographer's Info of according to their Id.
 * @return {innerHTML}
 */
var photographerInfo = document.querySelector(".photographerInfo");

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

function getPhotographerInfo(photographer) {
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
`;
}

photographerInfo.innerHTML = `${json["photographers"]
  .filter((x) => x.id === getCurrentId())
  .map(getPhotographerInfo)
  .join("")}`;

/**
 * Display the photos and videos of according to each photographers Id.
 * @return {innerHTML}
 */

var thePhotographsSection = document.querySelector(".thePhotographsSection");

function getPhotographsByPhotographersId(photographerinfo) {
  if (photographerinfo.image) {
    const imageAsHtml = `<figure class="photographerPhotos ${
      photographerinfo.tags
    }">
      <img src="./SamplePhotos/${
        json["photographers"].find((x) => x.id === getCurrentId()).name
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
            <i class="fa fa-heart"></i> 
        </div>
      </div>
      </figcaption>
    </figure>`;
    return imageAsHtml;
  } else if (photographerinfo.video) {
    const videoAsHtml = `
  <figure class="photographerPhotos ${photographerinfo.tags}" >
  <video src="./SamplePhotos/${
    json["photographers"].find((x) => x.id === getCurrentId()).name
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
              <i class="fa fa-heart"></i> 
          </div>
      </div>
  </figcaption>
</figure>`;
    return videoAsHtml;
  }
}

thePhotographsSection.innerHTML = `${json["media"]
  .filter((x) => x.photographerId === getCurrentId())
  .map(getPhotographsByPhotographersId)
  .join("")}`;

/**
 * [when clicking on a tag from the tags of each photographer, the photos and videos will be filtered and displayed according the tag clicked]
 */
const photographersBtnSearch = document.querySelectorAll(".btnTag");
const photographerPhotos = document.querySelectorAll(".photographerPhotos");

for (let i = 0; i < photographersBtnSearch.length; i++) {
  photographersBtnSearch[i].addEventListener("click", (e) => {
    e.preventDefault();
    const photographerPhotos = document.querySelectorAll(".photographerPhotos");
    console.log(photographersBtnSearch[i]);
    const filter = e.target.dataset.filter;
    photographerPhotos.forEach((photos) => {
      if (photos.classList.contains(filter)) {
        photos.style.display = "block";
      } else {
        photos.style.display = "none";
      }
    });
  });
}

/**
 * [toggle between classes in css to display the filter section]
 */

var FilterIcon = document.querySelector("#filterIcon");
var FilterNotActive = document.querySelectorAll(".notActive");
var filterList = document.querySelectorAll(".filterList");

// filterIcon.forEach((btn) => btn.addEventListener("click", launchFilter));
FilterIcon.addEventListener("click", launchFilter);

function launchFilter() {
  FilterNotActive.forEach((btn) => btn.classList.toggle("responsive"));
}

/**
 * [displaying the total likes for each photographer]
 */

var totalLikes = document.querySelector("#totalLikes");

let mediaFilteredByPhgId = json["media"].filter(
  (x) => x.photographerId === getCurrentId()
);

window.addEventListener("load", getPhotographLikesNbr());
function getPhotographLikesNbr() {
  var sumLikes = [];
  let toSort = 0;
  for (let i = 0; i < mediaFilteredByPhgId.length; i++) {
    toSort += mediaFilteredByPhgId[i].likes;
    sumLikes.push(toSort);
  }
  let totalPhgLikes = parseInt(sumLikes.slice(sumLikes.length - 1));
  // console.log(ff);

  totalLikes.innerHTML = totalPhgLikes;
}

/**
 * [on click on filter button,  the photographs will be sorted by popularity, date or title]
 *
 *
 *
 */
var popular = document.querySelector("#Popular");
var date = document.querySelector("#Date");
var title = document.querySelector("#Title");

/////////////////////////////////////////////////////////////////////////
var sortableByFilter = [];

popular.addEventListener("click", () => {
  let sortingByPopularity = mediaFilteredByPhgId.sort(function (a, b) {
    return b.likes - a.likes;
  });

  thePhotographsSection.innerHTML = `${sortingByPopularity
    .filter((x) => x.photographerId === getCurrentId())
    .map(getPhotographsByPhotographersId)
    .join("")} `;
});
//////////////////////////////////////////////////////////////////////////////////////////

date.addEventListener("click", () => {
  let sortingByDate = mediaFilteredByPhgId.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  thePhotographsSection.innerHTML = `${sortingByDate
    .filter((x) => x.photographerId === getCurrentId())
    .map(getPhotographsByPhotographersId)
    .join("")}`;
});

/////////////////////////////////////////////////////////////////////////

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

  thePhotographsSection.innerHTML = `${sortingByTitle
    .filter((x) => x.photographerId === getCurrentId())
    .map(getPhotographsByPhotographersId)
    .join("")}`;
});

/**
 * clickable hearts for each photo or video liked
 */

var icons = document.querySelectorAll(".LikesIcon i");

icons.forEach((icon) =>
  icon.addEventListener("click", () => {
    icon.classList.toggle("resp");
  })
);

/**
 * clicking on the heart for each photo or video will increment or decrement the likes number
 */
let likesNbrs = document.querySelectorAll(".likesNumber");
const LikesSection = document.querySelectorAll(".LikesSection");

function setCurrentlike(likes) {
  localStorage.setItem("currentLikes", likes);
}

function getCurrentlike() {
  const LikesInPhotographs = parseInt(localStorage.getItem("currentLikes"));
  return LikesInPhotographs;
}

// LikesSection.forEach((Sec) => {
//   Sec.addEventListener("click", (event) => {
//     if (parseInt(localStorage.getItem("currentLikes")) === likes) {
//       likes.innerHTML = likes++;
//     }
//     console.log("yes");
//   });
// });

// LikesSection.forEach((sec) =>
//   sec.addEventListener("click", () => {
//     if (localStorage.getItem("currentLikes")) {
//       console.log("ii");
//     }
//   })
// );

//   var nbrsOfLikes = [];
//   for (n of mediaFilteredByPhgId) {
//     let nbrs = n.likes;
//     nbrsOfLikes.push(nbrs);
//     let nbrFinalArray = nbrsOfLikes.slice(nbrsOfLikes.length - 1);

//     console.log(nbrFinalArray);
//   }
// })
// for (n of mediaFilteredByPhgId) {
//   console.log(n.likes);

// // for (i = 0; i < likesNumber.length; i++) {
// //   let like = likesNumber[i];
// //   console.log(like);
// for (i = 0; i < mediaFilteredByPhgId.length; i++) {
//   let GetLikes = mediaFilteredByPhgId[i].likes;

//   for (n = 0; n < GetLikes.length; n++) {
//     let GetLike = GetLikes[n];
//     // GetLikes.forEach((like) => console.log(like.value));

// console.log(sec);
//   })
// );
// }
// if (icon.className === "LikesIcon i.resp") {
//   parseInt(like++);
// } else {
//   parseInt(like--);
// }
// })

// });

// likesArray = [];
// for (let i = 0; i < mediaFilteredByPhgId.length; i++) {
//   let likeNbr = mediaFilteredByPhgId[i].likes;
//   likesArray.push(likeNbr);
//   let groupedlikesArray = likesArray.slice(likesArray.length - 1);
//   console.log(groupedlikesArray);
//     // localStorage.setItem("currentLike", `${photographerinfo.likes}`);
//   })
// );

// function setCurrentLikes(likes) {
//   localStorage.setItem("currentLikes", likes);
// }

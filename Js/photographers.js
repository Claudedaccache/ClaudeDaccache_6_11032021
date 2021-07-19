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
 * [display the photographers on the main page]
 */
var photographersList = document.querySelector(".photographersList");

///get the hashtags
function tags(tags) {
  return `
<div class="photographerHashtags">
${tags
  .map(function (tag) {
    return `<a href="#">#${tag}</a>`;
  })
  .join("")}
</div>
`;
}

///Save phg's id in localStorage
function setCurrentId(id) {
  // console.log(id);
  let idSet = localStorage.setItem("currentId", JSON.stringify(id));
  return idSet;
  // sessionStorage.setItem("currentId", id);
}

/// creating a template literal to display it in innerHTML
function photographersInfo(photographer) {
  console.log(photographer.id);
  return `
<figure class="photographer">
<a href="./Photographer.html" id="${photographer.id}" onclick=${setCurrentId(
    photographer.id
  )}) 
  ><img src="./SamplePhotos/PhotographersIDPhotos/${photographer.portrait}"
	alt="photo de ${photographer.name}" title="clicker pour voir ce photographe"
	class="photographerImg"></a>
	<figcaption class="photographerComment">
		<a href="${photographer.link}"><h2 class="photographerName">${
    photographer.name
  }</h2></a>
	<div class="photographerCommentText">
		<p class="photographerLocation">${photographer.city}, ${
    photographer.country
  }</p>
		<p class="photographerQuote">${photographer.tagline}</p>
		<p class="photographerFees">${photographer.price}€/jour</p>
	</div>
	${tags(photographer.tags)}
	
</figcaption>
</figure>
`;
}

photographersList.innerHTML = `${json["photographers"]
  .map(photographersInfo)
  .join("")}`;

/**
 * [when clicked on a hashtag from the main page the photographers will be filtered and only the photographers with the same tag will be displayed]
 */
const MenuBtnSearch = document.querySelectorAll(".MenuTag");
const photographerInfo = document.querySelectorAll(".photographer");

for (let i = 0; i < MenuBtnSearch.length; i++) {
  MenuBtnSearch[i].addEventListener("click", (e) => {
    const filterTags = e.target.dataset.filter;
    // console.log(filterTags);

    const characters = json["photographers"].filter((character) => {
      var characterTags = character.tags;
      return characterTags.includes(filterTags);
    });
    //  console.log(characters);
    photographersList.innerHTML = `${characters
      .map(photographersInfo)
      .join("")}`;
  });
}

/**
 * [on load display the hashtags on the main page to be use for the search later]
 */

const hashtags = document.querySelector("#header_nav ul");

// let tags = json["photographers"].reduce((sum, currentValue) => {
//   return sum + currentValue.tags;
// }, "");

// console.log(tags);

// let uniqueTag = [];
// u.forEach((c) => {
// if (!uniqueTag.includes(c)) {
//   uniqueTag.push(c);
// }
// });

function displayHashtags(hashtag) {
  let xx = hashtag.tags;

  console.log(xx);
  // let uniqueTag = [];

  xx.forEach((tag) => {
    console.log(tag);
  });

  // }
  // if (!uniqueTag.includes(tag)) {
  //   uniqueTag.push(tag);
  // }

  // console.log(uniqueTag);

  // return `
  // <li><a href="#${tag}"
  // class="MenuTag" data-filter="${tag}">#${tag}</a></li>`
}

hashtags.innerHTML = `${json["photographers"].map(displayHashtags).join("")}`;

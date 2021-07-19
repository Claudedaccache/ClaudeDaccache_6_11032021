import data from "./../data.js";


/**
 * [on load display the hashtags on the main page to be use for the search later]
 */

let phgTags = getTagsFromPhotographers(data.photographers);
displayPhotographersTags("#tags", phgTags);


function getTagsFromPhotographers(photographer){
  let tagsSet = new Set();
  photographer.forEach((photographer)=>{
    photographer.tags.map((tag)=> tagsSet.add(tag));
  });
  
  const arrayTags = [...tagsSet];
  return arrayTags;
}

function displayPhotographersTags(container, phgTags){
  let tagsContainer = document.querySelector(container);
  phgTags.forEach((tag) => {
    tagsContainer.innerHTML += `<li><a href="#${tag}" class="MenuTag" data-filter="${tag}">#${tag} </a></li>
  `;
  });}



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

photographersList.innerHTML = `${data["photographers"]
  .map(photographersInfo)
  .join("")}`;

/**
 * [when clicked on a hashtag from the main page the photographers will be filtered and only the photographers with the same tag will be displayed]
 */
const MenuBtnSearch = document.querySelectorAll(".MenuTag");

for (let i = 0; i < MenuBtnSearch.length; i++) {
  MenuBtnSearch[i].addEventListener("click", (e) => {
    const filterTags = e.target.dataset.filter;
    // console.log(filterTags);

    const characters = data["photographers"].filter((character) => {
      var characterTags = character.tags;
      return characterTags.includes(filterTags);
    });
    //  console.log(characters);
    photographersList.innerHTML = `${characters
      .map(photographersInfo)
      .join("")}`;
  });
}



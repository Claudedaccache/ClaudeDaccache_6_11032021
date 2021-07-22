import data from "./../data.js";


/**
 * [displaying the hashtags on the main page to be used for the search later]
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
    tagsContainer.innerHTML += `<li><a href="#${tag}" class="MenuTag" data-filter="${tag}">#${tag}</a></li>
  `;
  });}



/**
 * [display the photographers on the main page]
 */
displayPhotographers(".photographersList", data.photographers);


function displayingEachPhgTags(tags) {
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

function displayPhotographers(container, photographers){
  let phgContainer = document.querySelector(container);
  phgContainer.innerHTML = `${photographers
    .map((phg) =>{
      return `
    <figure class="photographer">
    <a href="./Photographer.html?id=${phg.id}"   
      ><img src="./SamplePhotos/PhotographersIDPhotos/${phg.portrait}"
    	alt="photo de ${phg.name}" title="clicker pour voir ce photographe"
    	class="photographerImg"></a>
    	<figcaption class="photographerComment">
    		<a href="./Photographer.html"><h2 class="photographerName">${
  phg.name
}</h2></a>
    	<div class="photographerCommentText">
    		<p class="photographerLocation">${phg.city}, ${
  phg.country
}</p>
    		<p class="photographerQuote">${phg.tagline}</p>
    		<p class="photographerFees">${phg.price}€/jour</p>
    	</div>
 ${displayingEachPhgTags(phg.tags)}
          </figcaption>
    </figure>`;
    })
    .join("")}`;
}

// function displayPhotographers(container, photographers){
//   let phgContainer = document.querySelector(container);
//   photographers.forEach((phg) => {
//     phgContainer.innerHTML += `
//     <figure class="photographer">
//     <a href="./Photographer.html?id=${phg.id}"   
//       ><img src="./SamplePhotos/PhotographersIDPhotos/${phg.portrait}"
//     	alt="photo de ${phg.name}" title="clicker pour voir ce photographe"
//     	class="photographerImg"></a>
//     	<figcaption class="photographerComment">
//     		<a href="./Photographer.html"><h2 class="photographerName">${
//   phg.name
// }</h2></a>
//     	<div class="photographerCommentText">
//     		<p class="photographerLocation">${phg.city}, ${
//   phg.country
// }</p>
//     		<p class="photographerQuote">${phg.tagline}</p>
//     		<p class="photographerFees">${phg.price}€/jour</p>
//     	</div>
//  ${displayingEachPhgTags(phg.tags)}
      
//     </figcaption>
//     </figure>
//     `;
//   });
// }

/**
 * [when clicked on a hashtag from the main page the photographers will be filtered and only the photographers with the same tag will be displayed]
 */

getFilteredPhgs(".MenuTag", data.photographers);


function getFilteredPhgs(tags, phgs){
  const tagsMenu = document.querySelectorAll(tags);
  tagsMenu.forEach((tag)=>{
    tag.addEventListener("click", (e) => {
      const filterTags = e.target.dataset.filter;
      console.log(filterTags);

      let filteredPhgs = phgs.filter((character) => {
        var characterTags = character.tags;
        return characterTags.includes(filterTags);
      });
      displayPhotographers(".photographersList", filteredPhgs);
    });
  });
}




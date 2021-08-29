export class PhotographerHeader {

  constructor(elt){
    this.name = elt.name;
    this.city = elt.city;
    this.country = elt.country;
    this.tagline= elt.tagline;
    this.tags=elt.tags;
    this.portrait=elt.portrait;
  }
  
  
  displayPhotographerHeader(){
    return `
  <div class="photographerDescription">
  <div class="photographerDescriptionId">
    <h1 class="photographerFullName">${this.name}</h1>
    <div class="photographerDescriptionText">
      <p class="photographerDescriptionLocation">${this.city}, ${
  this.country
}</p>
      <p class="photographerDescriptionQuote">
      ${this.tagline}
      </p>
    </div>
    <div class="photographerDescriptionHashtags">
    ${this.tags.map(tag => `<a href="#${tag}" class="btnTag" data-filter="${tag}">#${tag}</a>`).join("")}
    </div>
  </div>
  <button class="photographerContact">Contactez-moi</button>
</div>
<img
  src="./SamplePhotos/PhotographersIDPhotos/${this.portrait}"
  alt="image de ${this.name}"
  class="photographerInfoPic"
/>
`;}

}


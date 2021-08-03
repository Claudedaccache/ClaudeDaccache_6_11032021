export default class Video {

  constructor (elt, photographerName){
    this.id=elt.id;
    this.photographerId=elt.photographerId;
    this.photographerName= photographerName;
    this.title=elt.title;
    this.video=elt.video;
    this.description=elt.description;
    this.tags=elt.tags;
    this.likes=elt.likes;
    this.date=elt.date;
    this.price=elt.price;
    this.src= `./SamplePhotos/${this.photographerName}/${this.video}`;
  }


  displayVideoList(){
    return `<figure class="photographerPhotos ${
      this.tags}">
  <a href=${this.src}>
        <video class="thePhotograph video" controls>
<source src="${this.src}" type="video/mp4" controls="controls" title="clicker pour voir la video" aria-label="${this.description}"> <track src="${this.description}" kind="subtitles" srclang="fr" label="english">
  </video></a>
  <figcaption class="photographDescr">
  <div class="photographDetails">
    <h2>${this.title}</h2>
    <div class="photographPriceDate">
    <p>${this.date}</p>
    <p class="photographPrice">${this.price}€</p>
    </div>
    </div> 
    <div class="LikesSection">
      <span class="likesNumber"aria-label='${this.likes} likes' >${this.likes}</span>
      <div class="LikesIcon">
        <i class="fa fa-heart" aria-label="click to like the image" data-id="${this.id}"></i> 
    </div>
  </div>
  </figcaption>
</figure>`;}

}


export default class Image {

  constructor (elt, photographerName){
    this.id=elt.id;
    this.photographerId=elt.photographerId;
    this.photographerName = photographerName;
    this.title=elt.title;
    this.image=elt.image;
    this.description=elt.description;
    this.tags=elt.tags;
    this.likes=elt.likes;
    this.date=elt.date;
    this.price=elt.price;
    this.src= `./SamplePhotos/${this.photographerName}/${this.image}`;
  }


  displayImageList(){
    return `<figure class="photographerPhotos ${
      this.tags}">
  <a href="${this.src}"><img src="${this.src}"
        alt="${this.description}" title="clicker pour voir la photo"
        class="thePhotograph image" aria-label = ${this.description}></a>
  <figcaption class="photographDescr">
  <div class="photographDetails">
    <h2>${this.title}</h2>
    <div class="photographPriceDate">

    <p>${this.date}</p>
    <p class="photographPrice">${this.price}€</p>
    </div>
    </div> 
    <div class="LikesSection">
      <span class="likesNumber" aria-label='${this.likes} likes'>${this.likes}</span>
      <div class="LikesIcon">
        <i class="fa fa-heart" aria-label="click to like the image" data-id="${this.id}"></i> 
    </div>
  </div>
  </figcaption>
</figure>`;}
}
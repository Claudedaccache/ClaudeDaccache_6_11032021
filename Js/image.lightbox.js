export default class Imagelightbox {

  constructor (url, alt){
    this.url = url;
    this.alt = alt;
  }


  displayLightboxImage(){
    return `<img src="${this.url }"
        alt="${this.alt}">
  <p class="legend"></p>`;}
}
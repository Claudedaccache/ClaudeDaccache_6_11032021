export default class Videolightbox {

  constructor (url, alt){
    this.url = url;
    this.alt = alt;
  }


  displayLightboxVideo(){
    return `<video width="40%" controls>
    <source src="${this.url}" type="video/mp4" controls="controls"> <track src="${this.alt}" kind="subtitles" srclang="fr" label="english">
      </video>
  <p class="legend"></p>`;}
}
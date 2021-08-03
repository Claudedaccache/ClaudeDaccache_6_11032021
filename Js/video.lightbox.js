// export default class Videolightbox {

//   constructor (url, alt){
//     this.url = url;
//     this.alt = alt;
//   }


//   displayLightboxVideo(){
//     return `<video width="40%" controls>
//     <source src="${this.url}" type="video/mp4" controls="controls"> <track src="${this.alt}" kind="subtitles" srclang="fr" label="english">
//       </video>
//   <p class="legend"></p>`;}
// }


// loadImage(url, alt) {
//   this.url = null;
//   this.alt = null;
//   if (url.endsWith(".mp4")) {
//     this.url = url;
//     this.alt = alt;
//     const video = document.createElement("video");
//     const subtitles = document.createElement("track");
//     let legend = document.createElement("p");
//     const container = this.element.querySelector(".innerLightboxContainer");
//     container.innerHTML = "";
//     container.appendChild(video);
//     container.appendChild(legend);
//     video.appendChild(subtitles);
//     video.setAttribute("width", "40%");
//     video.setAttribute("controls", "");
//     video.src = url;
//     subtitles.setAttribute("kind", "subtitles");
//     subtitles.setAttribute("srclang", "fr");
//     subtitles.setAttribute("src", this.alt);
//     let realLegend = this.createLegend(this.url);
//     legend.innerText = realLegend;
//   } else {
//     this.url = url;
//     this.alt = alt;
//     const image = new Image();
//     let legend = document.createElement("p");
//     const container = this.element.querySelector(".innerLightboxContainer");
//     container.innerHTML = "";
//     container.appendChild(image);
//     container.appendChild(legend);
//     image.src = url;
//     image.setAttribute("alt", this.alt);
//     let realLegend = this.createLegend(this.url);
//     legend.innerText = realLegend;
//   }
// }
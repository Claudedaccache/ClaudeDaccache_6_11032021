import {Imagelightbox} from "./image.lightbox.js";
import {Videolightbox} from "./video.lightbox.js";


export function displayLightboxMediaList(url, alt){
  let lightboxImage = new Imagelightbox(url, alt);
  let lightboxVideo = new Videolightbox (url, alt);
  return url.endsWith(".mp4") ? lightboxVideo.displayLightboxVideo() : lightboxImage.displayLightboxImage();

}



import {Imagelightbox} from "./image.lightbox.js";
import {Videolightbox} from "./video.lightbox.js";


export function displayLightboxMediaList(url, alt){
  return (url.endsWith(".mp4")) ? new Imagelightbox(url, alt) : new Videolightbox (url, alt);

}
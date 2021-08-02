import Image from "./image.Class.js";
import Video from "./video.Class.js";

export function displayMediaList(elt, photographerName){
  return elt.image ? new Image(elt, photographerName) : new Video(elt, photographerName);

}


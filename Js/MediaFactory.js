import Image from "./image.Class.js";
import Video from "./video.Class.js";

export function displayMediaList(elt, photographerName){
  let imageList = new Image(elt, photographerName);
  let videoList = new Video(elt, photographerName);

  return elt.image ?  imageList.displayImageList() : videoList.displayVideoList();
}


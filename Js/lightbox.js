
export  default class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll("a[href$=\".jpg\"],a[href$=\".mp4\"]")
    );
    const gallery = links.map((link) => link.getAttribute("href"));
    const galleryOfAlts = links.map((link) => link.children[0].alt);
    const srcOfVideo = document.querySelector("track").src;
  

    /* the alt of the video will return undefined so we remplace the value of the alt with the srv of the video */
    for (let i = 0; i < galleryOfAlts.length; i++) {
      if (galleryOfAlts[i] === undefined) {
        galleryOfAlts[i] = srcOfVideo;
      }
    }

    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        new Lightbox(
          e.currentTarget.getAttribute("href"),
          e.currentTarget.children[0].alt,
          gallery,
          galleryOfAlts
        );
      })
    );
  }

  /**
   * @param {string} url URL of the image
   * @param {string[]} alt Attribut alt of the image
   * @param {string[]} images images/vidéos in the lightbox
   * @param {string[]} alts attributs alt for the images in the lightbox
   */
  constructor(url, alt, images, alts) {
    const box = document.querySelector("#Box");
    this.element = this.buildDOM(url);
    this.alt = alt;
    this.images = images;
    this.alts = alts;
    this.loadImage(url, alt);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.insertBefore(this.element, box);
    document.addEventListener("keyup", this.onKeyUp);
  }

  /**
   * @param {string} url URL of the image
   */
  loadImage(url, alt) {
    this.url = url;
    this.alt = alt;
    if (url.endsWith(".mp4")) {
      this.displayVideo();
    } else {
      this.displayImage();
    }
  }

  displayVideo() {
    const video = document.createElement("video");
    const subtitles = document.createElement("track");
    let legend = document.createElement("p");
    const container = this.element.querySelector(".innerLightboxContainer");
    container.innerHTML = "";
    container.appendChild(video);
    container.appendChild(legend);
    video.appendChild(subtitles);
    video.setAttribute("width", "40%");
    video.setAttribute("controls", "");
    video.src = this.url;
    subtitles.setAttribute("kind", "subtitles");
    subtitles.setAttribute("srclang", "fr");
    subtitles.setAttribute("src", this.alt);
    let realLegend = this.createLegend(this.url);
    legend.innerText = realLegend;
  }

  displayImage() {
    const image = new Image();
    let legend = document.createElement("p");
    const container = this.element.querySelector(".innerLightboxContainer");
    container.innerHTML = "";
    container.appendChild(image);
    container.appendChild(legend);
    image.src = this.url;
    image.setAttribute("alt", this.alt);
    let realLegend = this.createLegend(this.url);
    legend.innerText = realLegend;
  }

  createLegend(url) {
    let array = url.split("/");
    let realLegend = array[array.length - 1].replaceAll("_", " ");
    if (realLegend.endsWith(".jpg")) {
      return realLegend.replace(".jpg", " ");
    } else {
      return realLegend.replace(".mp4", " ");
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    } else if (e.keyCode == 32) {
      e.preventDefault();
      this.playVideo(e);
    } 
  }
  


  focusingOnlyOnLightbox() {
    let lightbox = this.element;
    let focusableElements = "button, video";
    let focusableContent = lightbox.querySelectorAll(focusableElements);
    let firstFocusableElement = focusableContent[0];
    let lastFocusableElement =
      focusableContent[focusableContent.length - 1];

    lightbox.addEventListener("keydown", function (e) {
      let isTabPressed = e.key === "Tab" || e.key === 9;

      if (!isTabPressed) {
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });
    firstFocusableElement.focus();
  }

  /**
   * closing the ligthbox
   * @param {MouseEvent|KeyboardEvent} event
   */
  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    const header = document.querySelector("header");
    const main = document.querySelector("#allBody");
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  /**
   * @param {MouseEvent|KeyboardEvent} event
   */
  next(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    let j = this.alts.findIndex((alt) => alt === this.alt);
    if (j === this.alts.length - 1) {
      j = -1;
    }
    this.loadImage(this.images[i + 1], this.alts[j + 1]);
  }

  /**
   * @param {MouseEvent|KeyboardEvent} event
   */
  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    let j = this.alts.findIndex((alt) => alt === this.alt);
    if (j === 0) {
      j = this.alts.length;
    }
    this.loadImage(this.images[i - 1], this.alts[j - 1]);
  }

  playVideo(e) {
    e.preventDefault();
    this.element.querySelector("video").focus();
  }

  /**
   * @param {string} url URL of the image
   * @return {HTMLElement}
   */

  buildDOM() {
    const header = document.querySelector("header");
    const main = document.querySelector("#allBody");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    const dom = document.createElement("section");
    dom.classList.add("lightBox");
    dom.setAttribute("aria-hidden", "false");
    dom.setAttribute("aria-label", "open full Image");
    dom.innerHTML = `
    <button class="lightboxClose" aria-label="Close lightBox"><i class="icon fas fa-times"></i></button>
    <button class="lightboxPrev" aria-label="Previous image"><i class="fas fa-angle-right"></i></button>
    <button class="lightboxNext" aria-label="Next image"><i class="fas fa-angle-right"></i></button>
    <div class="lightboxContainer">
    <div class="innerLightboxContainer"></div></div>`;
    dom
      .addEventListener("mouseover", this.focusingOnlyOnLightbox.bind(this));
    dom
      .querySelector(".lightboxClose")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightboxNext")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightboxPrev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}
// Lightbox.init();

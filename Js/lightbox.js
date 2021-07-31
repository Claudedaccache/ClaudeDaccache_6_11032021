class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll("a[href$=\".jpg\"],a[href$=\".mp4\"]")
    );
    
    const gallery = links.map((link) => link.getAttribute("href"));
    const galleryOfAlts = links.map((link) => link.children[0].alt);
    const srcOfVideo = document.querySelector("video").src;
    console.log(srcOfVideo);

    /* the alt of the video will return undefined so we remplace the value of the alt with the srv of the video */
    for (let i = 0; i < galleryOfAlts.length; i++) {
      if (galleryOfAlts[i] === undefined) {
        galleryOfAlts[i] = srcOfVideo;
      }
    }

    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        //console.log(e.currentTarget);
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
   * @param {string} url URL de l'image
   * @param {string[]} alt Attribut ALT de l'image
   * @param {string[]} images Chemins des images/vidéos de la lightbox
   * @param {string[]} alts Chemins des attributs alt pour les images de la lightbox
   */
  constructor(url, alt, images, alts) {
    this.element = this.buildDOM(url);
    this.alt = alt;
    this.images = images;
    this.alts = alts;
    this.loadImage(url, alt);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
    const header = document.querySelector("header");
    const main = document.querySelector("main");
  }

  /**
   * @param {string} url URL de l'image
   */
  loadImage(url, alt) {
    this.url = null;
    this.alt = null;
    if (url.endsWith(".mp4")) {
      this.url = url;
      this.alt = alt;
      const video = document.createElement("video");
      const subtitles = document.createElement("track");
      let legend = document.createElement("p");
      const container = this.element.querySelector(".lightboxContainer");
      container.innerHTML = "";
      container.appendChild(video);
      container.appendChild(legend);
      video.appendChild(subtitles);
      video.setAttribute("width", "40%");
      video.setAttribute("controls", "");
      video.src = url;
      subtitles.setAttribute("kind", "subtitles");
      subtitles.setAttribute("srclang", "fr");
      subtitles.setAttribute("src", this.alt);
      let realLegend = this.createLegend(this.url);
      legend.innerText = realLegend;
    } else {
      this.url = url;
      this.alt = alt;
      const image = new Image();
      let legend = document.createElement("p");
      const container = this.element.querySelector(".lightboxContainer");
      container.innerHTML = "";
      container.appendChild(image);
      container.appendChild(legend);
      image.src = url;
      image.setAttribute("alt", this.alt);
      let realLegend = this.createLegend(this.url);
      legend.innerText = realLegend;
    }
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
   * @param {KeyboardEvent} e
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

  /**
   * Ferme la ligthbox
   * @param {MouseEvent|KeyboardEvent} e
   */
  close(e) {
    e.preventDefault();
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    this.element.classList.add("fadeOut");
    this.element.setAttribute("aria-hidden", "true");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  /**
   * @param {MouseEvent|KeyboardEvent} e
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
   * @param {MouseEvent|KeyboardEvent} e
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

  keepFocusInLightbox() {
    let lightbox = this.element;
    let focusableElements = "button, video";
    let focusableContent = lightbox.querySelectorAll(focusableElements);
    let firstFocusableElement = focusableContent[0];
    let lastFocusableElement =
      focusableContent[focusableContent.length - 1];

    lightbox.addEventListener("keydown", function (e) {
      let isTabPressed = e.key === "Tab" || e.keyCode === 9;

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
   * @param {string} url URL de l'image
   * @return {HTMLElement}
   */
  buildDOM(url, header, main) {
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    const dom = document.querySelector("#lightbox");
    dom.setAttribute("aria-hidden", "false");
    dom.setAttribute("aria-label", "image close up view");
    dom.innerHTML = `
    <button class="lightboxClose" aria-label="Close dialog">Fermer</button>
    <button class="lightboxPrev" aria-label="Previous image">Précédent</button>
    <button class="lightboxNext" aria-label="Next image">Suivant</button>
    <div class="lightboxContainer"></div>
    `;
    dom
      .querySelector(".lightboxContainer")
      .addEventListener("mouseover", this.keepFocusInLightbox.bind(this));
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
Lightbox.init();

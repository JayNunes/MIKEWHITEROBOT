const fadeUp = gsap.utils.toArray(".fade-up");
const mellybeanMain = document.querySelector("main.mellybean");

gsap.set(titleContainer, { autoAlpha: 0 });
gsap.set(mellybeanMain, { autoAlpha: 0 });
gsap.set(".hero-text-inner", { y: 200 });

//! view more products button...
const viewMoreBtn = document.querySelector(".more-products-inner");
const btnText = document.querySelector(".more-products-inner p");

viewMoreBtn.addEventListener("click", () => {
  let expanded = viewMoreBtn.getAttribute("aria-expanded");

  if (expanded === "true") {
    viewMoreBtn.setAttribute("aria-expanded", "false");
    btnText.innerHTML = "VIEW MORE PRODUCTS";
    gsap.to(".more-products-menu", {
      autoAlpha: 0,
    });
  } else {
    viewMoreBtn.setAttribute("aria-expanded", "true");
    btnText.innerHTML = "CLOSE";
    gsap.to(".more-products-menu", {
      autoAlpha: 1,
    });
  }
});

//! scroll icon...

gsap.to(".icon-scroll", {
  "--y": "15px",
  repeat: -1,
  duration: 0.6,
  yoyo: true,
});

gsap.to(".icon-scroll", {
  autoAlpha: 0,
  scrollTrigger: {
    trigger: ".icon-scroll",
    scrub: true,
    ease: "none",
    end: "-=400",
  },
});

gsap.from(".icon-scroll", {
  y: 150,
  delay: 0.8,
  autoAlpha: 0,
});

//! cursor flashing...
const cursor = gsap.to(".cursor", {
  opacity: 0,
  ease: "power4.inOut",
  repeat: -1,
});

function init() {
  //! reveal landing page on scroll...
  let introMatch = gsap.matchMedia();
  introMatch.add(
    {
      isOther: "(min-width: 1025px)",
      isMobile: "(max-width: 1024.98px)",
      isTiny: "(max-width: 575.98px)",
      isLandscape: "(orientation: landscape)",
      isPortrait: "(orientation: portrait)",
    },
    (context) => {
      let { isTiny, isMobile, isOther, isLandscape, isPortrait } =
        context.conditions;

      let revealHeader = gsap.timeline();
      let speed = 1;
      revealHeader
        .to(titleContainer, speed, { autoAlpha: 1 })
        .to(
          navLinks,
          speed,
          {
            autoAlpha: isMobile ? 0 : 1,
          },
          `-=${speed}`
        )
        .to(hamburger, speed, { autoAlpha: isMobile ? 1 : 0 }, `-=${speed * 2}`)
        .to(mellybeanMain, speed, { autoAlpha: 1 }, `-=${0.7}`)
        .to(
          ".hero-text-inner",
          {
            autoAlpha: 1,
            y: 0,
          },
          `-=${0.7}`
        )
        .to(
          ".product-hero-background",
          {
            scale: 1.2,
            duration: 4,
            ease: "circ.out",
          },
          `-=0.7`
        );

      fadeUp.forEach((container) => {
        gsap.set(container, { y: 200 });
        gsap.to(container, {
          autoAlpha: 1,
          y: 0,
          scrollTrigger: {
            trigger: container,
            start: isTiny ? "top 100%" : "top 90%",
            end: isTiny ? "95% 95%" : "bottom 85%",
            scrub: true,
            ease: "none",
          },
        });
      });

      //! link effects for footer links to projects
      const hoverLinks = gsap.utils.toArray(".product-link-main");
      const hoverLinksAlt = gsap.utils.toArray(".product-link-view");
      const productLinkHover = gsap.utils.toArray(".product-links-inner");

      productLinkHover.forEach((link, i) => {
        const linkHoverTL = gsap.timeline({ reversed: true });
        const hoverFxSpeed = 0.2;

        linkHoverTL
          .to(hoverLinks[i], {
            y: isMobile ? -85 : -110,
            ease: "none",
            duration: hoverFxSpeed,
          })
          .to(
            hoverLinksAlt[i],
            { y: isMobile ? -43 : -53, ease: "none", duration: hoverFxSpeed },
            `-=${hoverFxSpeed}`
          );

        link.addEventListener("mouseenter", (e) => {
          linkHoverTL.play();
        });
        link.addEventListener("mouseleave", (e) => {
          linkHoverTL.reverse();
        });
        if (isMobile) {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            const url = e.target.href;
            linkHoverTL.play().eventCallback("onComplete", () => {
              setTimeout(() => {
                window.location.href = url;
              }, 150);
            });
          });
        }
      });
    }
  );
}

//! prevent flash of unstyled content with init() and reset scroll position to top when refreshed...
window.addEventListener("load", function (e) {
  init();
});

//! galleries...

//! gallery #1...
let mellybeanScriptGallery = new Swiper(".mellybean-script-gallery-swiper", {
  slidesPerView: 2,
  spaceBetween: 5,
  slidesPerGroup: 2,
  loop: false,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1023: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
});

//! gallery #2...
let mellybeanSketchesGallery = new Swiper(
  ".mellybean-sketches-gallery-swiper",
  {
    slidesPerView: 2,
    spaceBetween: 5,
    slidesPerGroup: 2,
    loop: false,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1199: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
  }
);

//! gallery #3...
let mellybeanV1Gallery = new Swiper(".mellybean-v1-gallery-swiper", {
  slidesPerView: 2,
  spaceBetween: 5,
  slidesPerGroup: 2,
  loop: false,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1023: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1199: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
});

//! gallery #4...
let mellybeanFinalGallery = new Swiper(".mellybean-final-gallery-swiper", {
  slidesPerView: 2,
  spaceBetween: 5,
  slidesPerGroup: 2,
  loop: false,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1023: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1199: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
});

//! controls for external gallery viewer...

const viewerPrev = document.querySelector(".viewer-prev");
const viewerNext = document.querySelector(".viewer-next");
const viewerClose = document.querySelector(".viewer-close");

viewerClose.addEventListener("click", () => {
  closeGallery();
});

function closeGallery() {
  gsap
    .to(".gallery-viewer", { autoAlpha: 0 })
    .eventCallback("onComplete", () => {
      setTimeout(() => {
        document.querySelector(".viewer-img img").src = "#";
      }, 150);
    });
}

function prev(currentImg, i, arr) {
  let prevIndex;

  if (i === 0) {
    prevIndex = arr.length - 1;
  } else {
    prevIndex = i - 1;
  }

  currentImg.src = arr[prevIndex].src;
  arr.unshift(arr.pop());
}

function next(currentImg, i, arr) {
  let nextIndex;

  if (i === arr.length - 1) {
    nextIndex = 0;
  } else {
    nextIndex = i + 1;
  }
  currentImg.src = arr[nextIndex].src;
  arr.push(arr.shift());
}
function arrowNav(currentImg, i, newArr) {
  const nav = (e) => {
    const key = e.key;
    switch (key) {
      case "ArrowLeft":
        prev(currentImg, i, newArr);
        break;
      case "ArrowRight":
        next(currentImg, i, newArr);
        break;
      case "Escape":
        closeGallery();
        window.removeEventListener("keydown", nav, true);
        break;
    }
  };
  window.addEventListener("keydown", nav, true);

  viewerClose.addEventListener("click", () => {
    window.removeEventListener("keydown", nav, true);
  });
}

function galleryInit(gallery) {
  gallery.map((img, i, arr) => {
    const copy = arr;
    img.addEventListener("click", (e) => {
      const newArr = [...copy];
      gsap.to(".gallery-viewer", { autoAlpha: 1 });
      let currentImg = document.querySelector(".viewer-img img");
      currentImg.src = img.src;

      viewerPrev.addEventListener("click", () => {
        prev(currentImg, i, newArr);
      });

      viewerNext.addEventListener("click", () => {
        next(currentImg, i, newArr);
      });
      arrowNav(currentImg, i, newArr);
    });
  });
}

let mellybeanScriptPhotos = gsap.utils.toArray(".mellybean-script-img");
let mellybeanSketches = gsap.utils.toArray(".mellybean-sketches-img");
let mellybeanV1Imgs = gsap.utils.toArray(".mellybean-v1-img");
let mellybeanFinalImgs = gsap.utils.toArray(".mellybean-final-img");

galleryInit(mellybeanScriptPhotos);
galleryInit(mellybeanSketches);
galleryInit(mellybeanV1Imgs);
galleryInit(mellybeanFinalImgs);

const productContainer = document.querySelector(".product-container");
const introContainer = document.querySelector(".intro-container");

let windowCenterY = window.innerHeight / 2 - navOffsetHeight / 2;

gsap.set("footer", { autoAlpha: 0 });
gsap.set(introContainer, { autoAlpha: 0 });
gsap.set(titleContainer, { y: windowCenterY });

function init() {
  //! animate letters typing out...
  const cursor = gsap.to(".cursor", {
    opacity: 0,
    ease: "power4.inOut",
    repeat: -1,
  });

  const titleTL = gsap.timeline();

  titleTL
    .to("header", { autoAlpha: 1 })
    .to("main", { autoAlpha: 1 })
    .to(".title-1", 0.4, { text: "MIKE" })
    .to(".title-2", 0.5, { text: "WHITE" })
    .to(".title-3", 0.4, { text: "ROBOT" });

  titleTL.duration(2.5);

  //! reveal landing page on scroll...

  let introMatch = gsap.matchMedia();
  introMatch.add(
    {
      isMobile: "(max-width: 991.98px)",
      isOther: "(min-width: 992px)",
      isTiny: "(max-width: 575.98px)",
      isLandscape: "(orientation: landscape)",
      isPortrait: "(orientation: portrait)",
    },
    (context) => {
      let { isTiny, isMobile, isOther, isLandscape, isPortrait } =
        context.conditions;
      let headerSetter = gsap.timeline();

      ScrollTrigger.create({
        animation: headerSetter,
        trigger: "header",
        scrub: true,
        // markers: true,
        // start: "20% 80%",
        start: "+=10",
        end: "+=500",
        // pin: true,
      });

      headerSetter
        .to(".title-1", 0.5, { fontSize: isTiny ? "1.5rem" : "2.4rem" })
        .to(".title-2", 0.5, { fontSize: isTiny ? "1.5rem" : "2.4rem" }, "-=.5")
        .to(".title-3", 0.5, { fontSize: isTiny ? "1.5rem" : "2.4rem" }, "-=.5")
        .to(".cursor", 0.5, { fontSize: isTiny ? "1.5rem" : "2.4rem" }, "-=.5")
        .to(titleContainer, 0.5, { y: isTiny ? 10 : 0 }, "-=.5")
        .to(
          navLinks,
          0.5,
          { yPercent: 0, autoAlpha: isMobile ? 0 : 1 },
          "-=0.2"
        )
        .to(hamburger, 0.5, { autoAlpha: isMobile ? 1 : 0 }, "-=0.2")
        .to(
          ".title-inner-wrapper",
          0.1,
          {
            borderBottom: "3px solid black",
            borderTop: "3px solid black",
          },
          "-=.5"
        )
        .to(introContainer, 1, { autoAlpha: 1 }, "-=.7")
        .to("footer", { autoAlpha: 1 }, "-=.4");

      //! get preview window sizes for landing page swiper
      const previewHeight = gsap.getProperty(".intro-preview", "height");
      const previewWidth = gsap.getProperty(".intro-preview", "width");
      gsap.set(".intro-swiper", { width: previewWidth, height: previewHeight });

      //! landing page swiper logic
      const swiper = new Swiper(".intro-swiper", {
        direction: isMobile ? "horizontal" : "vertical",
        loop: true,
        height: previewHeight,
        width: previewWidth,
        pauseOnMouseEnter: true,
        allowTouchMove: isMobile ? true : false,

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        autoplay: {
          delay: 4000,
          disableOnInteraction: true,
        },
      });
    }
  );
}

// ! Logo autoscroller...
const trusted = gsap.utils.toArray(".trusted");
gsap.set(trusted, { x: (i) => i * 250 });

gsap.to(trusted, {
  duration: 25,
  ease: "none",
  x: "+=4250",
  modifiers: {
    x: gsap.utils.unitize((x) => parseFloat(x) % 4250),
  },
  repeat: -1,
});

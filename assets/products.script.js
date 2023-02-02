const productContainers = gsap.utils.toArray(".product-container-outer");
const intro = document.querySelector(".intro");

gsap.set(titleContainer, { autoAlpha: 0 });
gsap.set(productContainers, { autoAlpha: 0 });
gsap.set(intro, { autoAlpha: 0 });

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
        .to(intro, speed, { autoAlpha: 1 }, `-=${0.7}`)
        .from(".intro-inner-wrapper", { autoAlpha: 0, y: 200 }, `-=${0.7}`);

      productContainers.forEach((container) => {
        gsap.to(container, {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            end: "bottom 85%",
            scrub: true,
            ease: "power3.out",
          },
        });
      });
    }
  );
}

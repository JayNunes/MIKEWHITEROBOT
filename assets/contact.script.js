const fadeUp = gsap.utils.toArray(".fade-up");
const main = document.querySelector("main");

gsap.set(titleContainer, { autoAlpha: 0 });
gsap.set(main, { autoAlpha: 0 });

gsap.from(fadeUp, {
  autoAlpha: 0,
  y: 200,
  duration: 1,
  stagger: 0.5,
});

const formName = document.querySelector("#name");
const formEmail = document.querySelector("#email");
const formMsg = document.querySelector(".message");

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
        .to(main, { autoAlpha: 1 }, "-=.7");

      // if (isOther) {
      //   const leftHeight = document.querySelector(".contact-l").offsetHeight;

      //   gsap.set(".contact-r", { height: leftHeight });
      //   console.log(leftHeight);
      // }
    }
  );
}

//! prevent flash of unstyled content with init() and reset scroll position to top when refreshed...
window.addEventListener("load", function (e) {
  init();
});

const fadeUp = gsap.utils.toArray(".fade-up");
const successMain = document.querySelector("#success");
const oopsMain = document.querySelector("#oops");

gsap.set(titleContainer, { autoAlpha: 0 });
gsap.set(successMain, { autoAlpha: 0, y: 150 });
gsap.set(oopsMain, { autoAlpha: 0, y: 150 });

//! cursor flashing...
const cursor = gsap.to(".cursor", {
  opacity: 0,
  ease: "power4.inOut",
  repeat: -1,
});

function init() {
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
        .to(
          hamburger,
          speed,
          { autoAlpha: isMobile ? 1 : 0 },
          `-=${speed * 2}`
        );

      gsap.to(successMain, { autoAlpha: 1, y: 0 }, "-=.7");
      gsap.to(oopsMain, { autoAlpha: 1, y: 0 }, "-=.7");
    }
  );
}

//! prevent flash of unstyled content with init() and reset scroll position to top when refreshed...
window.addEventListener("load", function (e) {
  init();
});

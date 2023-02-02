const fadeUp = gsap.utils.toArray(".fade-up");
const aboutMain = document.querySelector("main.about");

gsap.set(titleContainer, { autoAlpha: 0 });
gsap.set(aboutMain, { autoAlpha: 0 });
gsap.set(".hero-text-inner", { y: 200 });

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
        .to(aboutMain, speed, { autoAlpha: 1 }, `-=${0.7}`)
        .to(
          ".hero-text-inner",
          {
            autoAlpha: 1,
            y: 0,
          },
          `-=${0.7}`
        )
        .to(
          ".about-hero-background",
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
            start: "top 100%",
            end: isTiny ? "95% 95%" : "bottom 85%",
            scrub: true,
            ease: "none",
          },
        });
      });

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
    }
  );
}

//! prevent flash of unstyled content with init() and reset scroll position to top when refreshed...
window.addEventListener("load", function (e) {
  init();
});

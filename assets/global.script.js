//! refresh on orientation change
window.addEventListener("orientationchange", function () {
  "use strict";
  window.location.reload();
});

//! global settings

const titleContainer = document.querySelector(".title-container");
const navLinks = gsap.utils.toArray(".nav-link");
const navOffsetHeight = gsap.getProperty(titleContainer, "height");

gsap.set(navLinks, { autoAlpha: 0 });

navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      duration: 0.2,
      boxShadow: "0px 0px 0 0 black",
      x: 3,
      y: 3,
    });
  });
  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      duration: 0.2,
      boxShadow: "3px 3px 0 0 black",
      x: 0,
      y: 0,
    });
  });
});
//! mobile nav div...

const navMobile = document.querySelector(".nav-mobile");

gsap.set(navMobile, {
  xPercent: 101,
  yPercent: 0,
  top: 0,
  left: 0,
});

//! mobile nav toggle...
const hamburger = document.querySelector(".nav-toggle");

let windowWidth = window.innerWidth;

//* keep hamburger within dynamic margins (90% in css)
const wrapperWidth = (windowWidth) => {
  const margins = windowWidth - gsap.getProperty("main .wrapper", "width");
  return margins / 2;
};

gsap.set(hamburger, { autoAlpha: 0, right: wrapperWidth(windowWidth) });
const hamburgerTL = gsap.timeline({ paused: true, reversed: true });

let speed = 0.3;

hamburgerTL
  .to(".bar-1", speed, { y: "+=14" })
  .to(".bar-3", speed, { y: "-=14" }, `-=${speed}`)
  .to(".bar-1", speed, { rotation: 360, autoAlpha: 0 })
  .to(".bar-3", speed, { rotation: 405 }, `-=${speed}`)
  .to(".bar-2", speed, { rotation: 315 }, `-=${speed}`);

//! mobile nav links...
const mobileNavLink = gsap.utils.toArray(".mobile-nav-link");

hamburger.addEventListener("click", () => {
  //! close the hamburger menu when a user clicks a link - then navigate
  mobileNavLink.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const url = e.target.href;
      hamburgerTL.reverse();
      gsap.to(navMobile, {
        xPercent: 101,
        duration: 0.5,
        onComplete: setTimeout(() => {
          window.location.href = url;
        }, 500),
      });
    });
  });
  if (hamburgerTL.reversed()) {
    hamburgerTL.play();
    gsap.to(navMobile, {
      xPercent: -0.2,
      duration: 0.7,
      ease: "bounce.out",
      delay: 0.3,
    });
    gsap.from(
      mobileNavLink,
      {
        ease: "power4.out",
        autoAlpha: 0,
        stagger: 0.2,
        duration: 0.2,
        boxShadow: "0px 0px 0 0 black",
        y: "+=5",
      },
      "+=.01"
    );
    hamburger.setAttribute("aria-expanded", "true");
  } else {
    hamburgerTL.reverse();
    gsap.to(navMobile, {
      xPercent: 101,
      duration: 0.5,
    });
    hamburger.setAttribute("aria-expanded", "false");
  }
});

//! prevent flash of unstyled content with init() and reset scroll position to top when refreshed...
window.addEventListener("load", function (e) {
  ScrollTrigger.clearScrollMemory();
  window.history.scrollRestoration = "manual";
  init();
});

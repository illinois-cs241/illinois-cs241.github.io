function adjustNavbar() {
  // get navbar height
  let navheight = $("nav.navbar.navbar-fixed-top").height();
  let navh_s = `${navheight}px`;
  // reset top padding/position
  $(".sticky-top").css({
    top: `calc(${navh_s} + 1rem)`
  });
  $("body").css("padding-top", navh_s);
  $("h1,h2,h3,h4").css("scroll-margin-top", navh_s);
}


$(() => {
  "use strict";

  adjustNavbar();
  $(window).resize(() => {
    adjustNavbar();
  });
});

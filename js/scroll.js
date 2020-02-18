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
  // reset scrollspy offset (for table of content sync with scrollY)
  // NOTE: for some reason this only works when refresh the page, the toc offset
  // is not synced properly when resize window happens
  $("body").scrollspy({
    target: "#overview",
    offset: navheight + 10,
  }).scrollspy("refresh");
}


$(() => {
  "use strict";

  adjustNavbar();
  $(window).resize(() => {
    adjustNavbar();
  });
});

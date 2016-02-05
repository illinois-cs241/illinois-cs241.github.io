// Make drawer close when you click a link
$( document ).ready(function() {
    $('.mdl-layout__drawer .mdl-navigation__link')
        .click(
            function(){
                $('.mdl-layout__drawer')
                    .toggleClass('is-visible');
                $('.mdl-layout__obfuscator')
                    .toggleClass('is-visible');
            }
        );
});

// Turns a basic layout page into cs241's material design layout
var materialize = function() {
  // Iterate through all the children
  var elements = $("body").children()
  var sections = []
  var last_index = 0
  for (var i = 1; i < elements.length; i++){
    if ($(elements[i]).is("h2")) {
      // If you find an h2 tag then push that section on the array
      sections.push($(elements.slice(last_index,i)))
      // And reset the window
      last_index = i;
    }
  }
  // sections.push($(elements.slice(last_index,elements.length)))
  for (var i = 0; i < sections.length; i++){
    // For each section apply classes and wrap in divs
    var section = sections[i]
    $(section).wrapAll("<div class = 'pad'/><div class='mdl-card mdl-shadow--2dp large-card'/>")
    $(section[0]).addClass("mdl-card__title-text")
    $(section[0]).wrapAll("<div class='mdl-card__title'/>")
    $(section.slice(1,section.length)).wrapAll("<div class='text'/>")
  }
};

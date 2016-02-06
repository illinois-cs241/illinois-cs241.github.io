// Turns a basic layout page into cs241's material design layout
(function () {
  // Global Variables
  var elements = $("#content").children()
  var sections = []

  // Iterate through all the children
  var last_index = 0
  for (var i = 0; i < elements.length; i++) {
    var elem = $(elements[i])
    if (elem.is("h2")) {
      // If you find an h2 tag then push that section on the array
      sections.push($(elements.slice(last_index,i)))
      // And reset the window
      last_index = i
    }
  }
  sections.push($(elements.slice(last_index,elements.length)))

  // Style the sections
  for (var i = 0; i < sections.length; i++) {
    // For each section apply classes and wrap in divs
    var section = sections[i]
    $(section)
      // .append("<div class='mdl-card__actions mdl-card--border'></div>")
      .wrapAll("<div class='pad'/>")
      .wrapAll("<div class='mdl-card mdl-shadow--2dp large-card'/>")
    var title = $(section[0])
    title
      .addClass("mdl-card__title-text").css( "color", "white" )
      .wrapAll("<div class='mdl-card__title' style='background-color: #03a9f4'/>")
    var text = $(section.slice(1,section.length))
    text.wrapAll("<div class='content'/>")
  }
})()

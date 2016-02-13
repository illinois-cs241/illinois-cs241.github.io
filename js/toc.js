// Adds a table of content to a page
(function () {
  // Global Variables
  var elements = $("#content").children()
  var headers = []
  var headerIDs = []

  // Iterate through all the children
  for (var i = 0; i < elements.length; i++) {
    var elem = $(elements[i])
    if (elem.is("h2")) {
      // If you find an h2 tag then update the headers
      // for the table of content
      headers.push(elem.text())
      headerIDs.push(elem.attr('id'))
    }
  }

  // Generate Table of Content
  var toc = $("<ul class='toc'><h4>Contents</h4></ul>")
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i]
    var headerID = headerIDs[i]
    var link = $("<a id='" + "toc_" + headerID + "' href='#" + headerID + "'>" + header + "</a>")
    toc.append(link)
  }

  toc.appendTo("#toc, #tocMobile")


  // Determines if an element is atleast partially in the viewport
  function isInView(elem) {
    // http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling
    var $elem = $(elem)
    var $window = $(window)

    var docViewTop = $window.scrollTop()
    var docViewBottom = docViewTop + $window.height()

    var elemTop = $elem.offset().top
    var elemBottom = elemTop + $elem.height()

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop))
      || ((elemBottom >= docViewTop) && (elemTop <= docViewBottom))
      || ((elemTop <= docViewBottom) && (elemBottom >= docViewTop))
  }

  // Marks the entries in the toc that have their section visable
  var headers = $( "div" ).children( "h2" )
  $(".mdl-layout__content").scroll(function(){
    for(var i = 0; i < headers.length; i++) {
      var header = $(headers[i])
      var tocEntry = $("#toc_"+header.attr('id'))
      tocEntry.removeClass('inView')
      var card = header.parent().parent()
      if (isInView(card)){
        tocEntry.addClass('inView')
      }
    }
  })
})()

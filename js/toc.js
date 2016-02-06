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
    toc.append("<a href='#" + headerID + "'>" + header + "</a>")
  }

  $("#toc").append(toc)
})()

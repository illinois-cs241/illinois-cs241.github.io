// Adds a table of content to a page
(function () {
  "use strict";

  // Marks the entries in the toc that have their section visible
  var headers = $( "div" ).children( "h2" );
  $(".mdl-layout__content").scroll(function(){
    for(var i = 0; i < headers.length; i++) {
      var header = $(headers[i]);
      var tocEntry = $("#toc_"+header.attr('id'));
      tocEntry.removeClass('inView');
      var card = header.parent().parent();
      if (isInView(card)){
        tocEntry.addClass('inView');
      }
    }
  })
})()

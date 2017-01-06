// Adds a table of content to a page
(function () {
  "use strict";
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

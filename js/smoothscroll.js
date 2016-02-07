$(function(){
  // Apply on click only to links to anchors
  $('a[href^="#"]').click(function (event){
    // Get the href from the link
    var href = $(this).attr('href')
    // Stop the page from reloading
    event.preventDefault()
    // Calculate how far from the top you need to scroll
    var target = $(href)
    // How far the target is from the top of ".mdl-layout__content"
    var targetDisplacement = target.offset().top
    // The distance ".mdl-layout__content" has already traveled
    var windowDisplacement = $(".mdl-layout__content").scrollTop()
    // Height of the top nav bar
    var topNavHeight = $(".mdl-layout__header-row").height()
    // This is the distance from the top of the window to where you want to go
    // minus some padding. Notice that targetDisplacement + windowDisplacement
    // is the distance the target is from the top of the window
    var distance = targetDisplacement + windowDisplacement - 2 * topNavHeight

    $(".mdl-layout__content").animate({
      scrollTop: distance
    },'slow')
  })
})

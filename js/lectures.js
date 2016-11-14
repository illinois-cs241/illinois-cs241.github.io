// Manages the 241 lecture schedule page
(function () {
  // Function to convert a date into a key
  var dateToKey = function (dateString) {
      var tokens = dateString.split("/")
      var monthIndex = parseInt(tokens[0], 10)
      var dateIndex = parseInt(tokens[1], 10)
      return monthIndex * 100 + dateIndex
  };

  // Get today's Date
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1
  var currentDateKey = dateToKey (mm + "/" + dd)

  // Function that returns that start and end date keys
  var getRangeKeys = function (range) {
    var tokens = range.split(" - ")
    var startDateKey = dateToKey(tokens[0])
    var endDateKey = dateToKey(tokens[1])
    return [startDateKey, endDateKey]
  }

  // Find current week
  var weeks = $(".week")
  var currentWeek
  for (var i = 0; i < weeks.length; i++) {
    var keys = getRangeKeys($(weeks[i]).text())
    var startKey = keys[0]
    var endKey = keys[1]
    if(startKey <= currentDateKey && currentDateKey <= endKey){
      currentWeek = weeks[i]
      break
    }
  }

  // This will return the dom element that wraps the entire week
  var getAncestorDom = function (week) {
    return $(week).parent().parent().parent()
  }
  // Add an archor to the ancestor dom
  $(getAncestorDom(currentWeek)).prepend("<div id = 'currentWeek'></div")

  // Jump to the current week
  window.location.hash = 'currentWeek'

  // Get future weeks
  var futureWeeks = $(".week").filter(function(index, week){
    var keys = getRangeKeys($(week).text())
    var startKey = keys[0]
    return startKey > currentDateKey
  })

  // Grey out the titles and set the hide the announcements
  futureWeeks.map(function(index, week) {
    // This just getting the common ancester div
    var weekDom = getAncestorDom(week)
    // Grey out the titles
    weekDom
      .find(".mdl-card__title")
      .css("background-color", "#9E9E9E")
    // Hide the announcements
    weekDom
      .find(".announcement")
      .text("Announcements will appear here ...")
  })

  // Make all the text fit
  $(document).ready(function() {
    $(".mdl-card__title-text").textfill(20)
  })
  $(window).resize(function() {
    $(".mdl-card__title-text").textfill(20)
  })
})()

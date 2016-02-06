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
    console.log(tokens)
    var startDateKey = dateToKey(tokens[0])
    var endDateKey = dateToKey(tokens[1])
    return [startDateKey, endDateKey]
  }

  // Find current week
  var weeks = $(".week")
  var currentWeek
  for (var i = 0; i < weeks.length; i++) {
    var keys = getRangeKeys($(weeks[i]).text())
    console.log(keys)
    var startKey = keys[0]
    var endKey = keys[1]
    console.log(startKey, endKey)
    if(startKey <= currentDateKey && currentDateKey <= endKey){
      currentWeek = weeks[i]
      break
    }
  }

  // Add an archor
  $(currentWeek).append("<div id = 'currentWeek'></div")

  // Jump to the current week
  window.location.hash = 'currentWeek'

  // // Get future weeks
  // var futureWeeks = $(".week").filter(function(week){
  //   var keys = getRangeKeys($(week[i]).text())
  // })

  // Make all the text fit
  $(document).ready(function() {
    $(".mdl-card__title-text").textfill(20)
  })
  $(window).resize(function() {
    $(".mdl-card__title-text").textfill(20)
  })
})()

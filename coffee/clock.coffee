class Clock
  format: "dddd, MMMM Do YYYY"

  constructor: ->
    @date = moment()

  render: ->
    $('#clock > div').FlipClock
      clockFace: 'TwentyFourHourClock'
  
    $('#clock > h1').text @date.format(@format)
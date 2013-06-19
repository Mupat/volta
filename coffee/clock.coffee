class Clock
  options: {weekday: "long", year: "numeric", month: "long", day: "numeric"}
  locale: "en-US"

  constructor: ->
    @date = new Date().toLocaleDateString @locale, @options

  render: ->
    $('#clock > div').FlipClock
      clockFace: 'TwentyFourHourClock'
  
    $('#clock > h1').text @date
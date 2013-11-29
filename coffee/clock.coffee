class Clock
  format: "dddd, MMMM Do YYYY"
  $el: $('#clock-options > div')
  twelveHour: 'TwelveHourClock'
  twentyFourHour: 'TwentyFourHourClock'
  face: false

  constructor: (@options = YANTRE.options) ->
    @face = @options.get @options.CLOCK_TWELVE

    @options.registerOnChange @options.CLOCK_TWELVE, (new_value, old_value) =>
      @face = new_value
      @_removeClock()
      @_newClock()

    @date = moment()

  render: ->
    @_newClock()
    $('#clock-options > h1').text @date.format(@format)

  _newClock: ->
    face = if @face then @twelveHour else @twentyFourHour
    @clock = new FlipClock @$el, 0, {clockFace: face}

  _removeClock: ->
    @clock.stop()
    @clock.timer._destroyTimer()
    @$el.children().remove()

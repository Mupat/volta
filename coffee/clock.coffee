class Clock
  options: {weekday: "long", year: "numeric", month: "long", day: "numeric"}
  locale: "en-US"
  clockface_twenty_four: 'TwentyFourHourClock'
  clockface_twelve: 'TwelveHourClock'
  $el: $('#clock')

  constructor: (@options = window.options)->
    @date = new Date().toLocaleDateString @locale, @options
    @clockface = @clockface_twenty_four
    @clockface = @clockface_twelve if @options.get @options.CLOCKFACE_TWELVE
    @options.registerOnChange @options.CLOCKFACE_TWELVE, @_change_clockface

  render: ->
    @flipclock = @$el.children('div').FlipClock
      clockFace: @clockface

    @$el.children('h1').text @date

  _change_clockface: (new_value, old_value) =>
    if new_value
      @clockface = @clockface_twelve
    else
      @clockface = @clockface_twenty_four
    
    console.log 'set clockface', @clockface, @flipclock
    @flipclock.loadClockFace @clockface
    # @flipclock.reset()
    # @flipclock.start()
    @flipclock = null
    # @$el.children('div').remove()
    # @$el.append('<div></div>')
    # @flipclock = @$el.children('div').FlipClock
    #   clockFace: @clockface
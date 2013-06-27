class Body
  $el: $('body')

  constructor: (@options = window.options) ->
    @dark = @options.get @options.DARK_FONT
    if @dark 
      @$el.addClass 'dark'
      @$el.removeClass 'light'

    @options.registerOnChange @options.DARK_FONT, (new_value, old_value) =>
      @$el.toggleClass 'dark light'

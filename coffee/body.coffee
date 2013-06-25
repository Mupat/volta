class Body
  $el: $('body')
  toggle_class: 'dark'

  constructor: (@options = window.options) ->
    @dark = @options.get @options.DARK_FONT
    if @dark then @$el.addClass @toggle_class

    @options.registerOnChange @options.DARK_FONT, (new_value, old_value) =>
      @$el.toggleClass @toggle_class, new_value

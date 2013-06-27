class Wrapper
  $el: $('#wrapper')

  constructor: (@options = window.options) ->
    @theme = @options.get @options.THEME
    if @theme then @$el.addClass @theme

    @options.registerOnChange @options.THEME, (new_value, old_value) =>
      @$el.removeClass()
      @$el.addClass new_value

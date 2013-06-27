class Wrapper
  $el: $('#wrapper')
  $apps: $('#apps')

  constructor: (@options = window.options) ->
    @theme = @options.get @options.THEME
    if @theme then @$el.addClass @theme
    if @theme then @$apps.addClass @theme

    @options.registerOnChange @options.THEME, (new_value, old_value) =>
      @$el.removeClass()
      @$el.addClass new_value
      @$apps.removeClass()
      @$apps.addClass new_value

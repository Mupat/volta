class Basic
  $el: $('body')
  dark_class: 'dark'

  constructor: (@options = YANTRE.options) ->
    @_handle_dark_font()
    @_handle_theme()

    $("#default_home").click ->
      chrome.tabs.update url: "chrome-internal://newtab/"
      false

    setTimeout ( => @$el.addClass 'transition'), 500

  _handle_dark_font: ->
    @dark = @options.get @options.DARK_FONT
    if @dark then @$el.toggleClass @dark_class

    @options.registerOnChange @options.DARK_FONT, (new_value, old_value) =>
      @$el.toggleClass @dark_class

  _handle_theme: ->
    @theme = @options.get @options.THEME_KEY
    if @theme then @$el.addClass @theme

    @options.registerOnChange @options.THEME_KEY, (new_value, old_value) =>
      @$el.toggleClass "#{old_value} #{new_value}"
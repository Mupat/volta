class Basic
  $body: $('body')
  # $wrapper: $('#wrapper')
  # light_class: 'light'
  dark_class: 'dark'

  constructor: (@options = window.options) ->
    @_handle_dark_font()
    @_handle_theme()

    $("#default_home").click ->
      chrome.tabs.update url: "chrome-internal://newtab/"
      false

  _handle_dark_font: ->
    @dark = @options.get @options.DARK_FONT
    if @dark then @$body.toggleClass @dark_class

    @options.registerOnChange @options.DARK_FONT, (new_value, old_value) =>
      @$body.toggleClass @dark_class

  _handle_theme: ->
    @theme = @options.get @options.THEME_KEY
    if @theme then @$body.addClass @theme

    @options.registerOnChange @options.THEME_KEY, (new_value, old_value) =>
      @$body.toggleClass "#{old_value} #{new_value}"
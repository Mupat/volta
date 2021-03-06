class Basic
  $el: $('body')
  $infoEl: $('.icon-info')
  dark_class: 'dark'

  constructor: (@options = YANTRE.options) ->
    @_handle_dark_font()
    @_handle_theme()

    $("#default_home").click ->
      chrome.tabs.update url: "chrome-internal://newtab/"
      false

    @$infoEl.click (e) =>
      $(document).one 'mousedown', (event) =>
        @$infoEl.removeClass 'show' unless $(event.target).hasClass('.icon-info')

      $(e.target).toggleClass('show')

    setTimeout ( => @$el.addClass 'transition'), 25

  _handle_dark_font: ->
    @dark = @options.get @options.DARK_FONT
    if @dark then @$el.toggleClass @dark_class

    @options.registerOnChange @options.DARK_FONT, (new_value, old_value) =>
      if new_value then @$el.addClass @dark_class
      else @$el.removeClass @dark_class

  _handle_theme: ->
    @theme = @options.get @options.THEME_KEY
    if @theme then @$el.toggleClass "#{@theme} default"

    @options.registerOnChange @options.THEME_KEY, (new_value, old_value) =>
      if old_value then old = old_value else old = 'default'
      @$el.toggleClass "#{old} #{new_value}"
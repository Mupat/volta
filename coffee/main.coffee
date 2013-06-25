$ ->
  options = new Options ->
    window.options = options
    app = new App()
    mail = new Mail()
    clock = new Clock()

    app.render()
    mail.render()
    clock.render()

    if window.options.get window.options.DARK_FONT
      $('body').addClass 'dark'

  $("#default_home").click ->
    chrome.tabs.update url: "chrome-internal://newtab/"
    false

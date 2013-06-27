$ ->
  options = new Options ->
    window.options = options
    app = new App()
    mail = new Mail()
    clock = new Clock()
    body = new Body()
    wrapper = new Wrapper()

    app.render()
    mail.render()
    clock.render()

  $("#default_home").click ->
    chrome.tabs.update url: "chrome-internal://newtab/"
    false

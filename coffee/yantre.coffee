$ ->
  options = new Options ->
    YANTRE.options = options

    basic = new Basic()
    app = new App()
    mail = new Mail()
    clock = new Clock()

    app.render()
    setTimeout ( -> mail.render()), 500
    clock.render()
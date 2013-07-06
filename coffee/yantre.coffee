$ ->
  options = new Options ->
    YANTRE.options = options

    basic = new Basic()
    optionsView = new OptionsView()
    app = new App()
    mail = new Mail()
    clock = new Clock()

    optionsView.render()    
    app.render()
    setTimeout ( -> mail.render()), 500
    clock.render()
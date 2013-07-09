$ ->
  moment.lang 'en', calendar:
    lastDay: '[Yesterday at] HH:mm:ss',
    sameDay: '[Today at] HH:mm:ss',
    nextDay: '[Tomorrow at] HH:mm:ss',
    lastWeek: '[last] dddd [at] HH:mm:ss',
    nextWeek: 'dddd [at] HH:mm:ss',
    sameElse: 'YYYY-MM-DD HH:mm:ss'
   
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
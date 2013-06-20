$ ->
  app = new App()
  mail = new Mail()
  clock = new Clock()

  app.render()
  mail.render()
  clock.render()

  $('#options_button').click ->
    console.log 'clicj'
    $('#options').toggleClass 'show'

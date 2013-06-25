$ ->
  app = new App()
  mail = new Mail()
  clock = new Clock()

  app.render()
  mail.render()
  clock.render()

  $('#options_btn').click ->
    console.log 'clicj'
    $('#options').toggleClass 'show'

  $("#default_home").click ->
    chrome.tabs.update url: "chrome-internal://newtab/"
    false

  console.log chrome.storage
  chrome.storage.sync.get null, (options) ->
    console.log console.log 'all', options
    chrome.storage.sync.get 'YANTRE.storage.*', (options) ->
      console.log 'all ynatre', options
  options = new Options ->
    # options.set 'test', 'testtest', ->
    #   console.log 'test saved'
    #   options.set 'test2', 'test2test', ->
    #     console.log 'test2 saved'
    #     options.get 'test', (option) ->
    #       console.log 'get test', option
    #       options.get 'test2', (option) ->
    #         console.log 'get test2', option


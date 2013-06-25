class Options
  namespace: 'YANTRE.storage'
  storage: chrome.storage.sync

  constructor: (done) ->
    @storage.get null, (options) ->
      console.log options
      done()

  get: (key, done) ->
    @storage.get "#{@namespace}.#{key}", done

  set: (key, value, done) ->
    data = {}
    data["#{@namespace}.#{key}"] = value
    console.log 'value', data, key
    @storage.set data, done

  # registerOnChange: (key, change) ->


  # render: ->

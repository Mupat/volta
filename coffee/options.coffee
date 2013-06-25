class Options
  template: YANTRE.templates.option
  namespace: 'YANTRE.storage'
  storage: chrome.storage.sync
  options: {}
  $el: $('#options')

  # constants for option names
  DARK_FONT: 'darkFontColor'
  APP_GRAYSCALE: 'appGrayscale'

  constructor: (done) ->
    @storage.get null, (options) =>
      for key, value of options
        if key[0..@namespace.length-1] is @namespace
          @options[key] = value

      console.log 'options', @options
      @_registerCogClick()
      @_registerInputChange()

      chrome.storage.onChanged.addListener (changes, namespace) ->
        console.log 'changes', changes
        console.log 'namespace', namespace
        # for key, value in changes
        # for key in changes
        #   storageChange = changes[key]
        #   console.log('Storage key "%s" in namespace "%s" changed. ' +
        #               'Old value was "%s", new value is "%s".',
        #               key,
        #               namespace,
        #               storageChange.oldValue,
        #               storageChange.newValue)
        
      done()

  # get: (key, done) ->
  #   @storage.get "#{@namespace}.#{key}", done

  get: (key) ->
    @options["#{@namespace}.#{key}"]

  set: (key, value, done = ->) ->
    data = {}
    data["#{@namespace}.#{key}"] = value
    @storage.set data, done

  # registerOnChange: (key, change) ->


  render: ->
    @$el.html @template
      darkFont: { name: @DARK_FONT, value: Boolean(@get(@DARK_FONT)) }
      grayApps: { name: @APP_GRAYSCALE, value: Boolean(@get(@APP_GRAYSCALE)) }

  _registerCogClick: ->
    $('#options_btn').click =>
      @render()
      @$el.toggleClass 'show'

  _registerInputChange: ->
    @$el.on 'change', 'input', (e) =>
      @set e.target.name, e.target.checked, ->
        console.log 'saved'

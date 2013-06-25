class Options
  template: YANTRE.templates.option
  namespace: 'YANTRE.storage'
  storage: chrome.storage.sync
  options: {}
  $el: $('#options')
  listener: {}

  # constants for option names
  DARK_FONT: 'darkFontColor'
  APP_GRAYSCALE: 'appGrayscale'

  constructor: (done) ->
    @storage.get null, (options) =>
      for key, value of options
        if key[0..@namespace.length-1] is @namespace
          @options[key] = value

      @_registerBtnClick()
      @_registerInputChange()
      chrome.storage.onChanged.addListener @_triggerListener
      done()

  get: (key) ->
    @options[@_getFullKey(key)]

  set: (key, value, done = ->) ->
    data = {}
    data[@_getFullKey(key)] = value
    @storage.set data, done

  registerOnChange: (key, cb) ->
    key = @_getFullKey(key)
    if @listener[key] is undefined then @listener[key] = []
    @listener[key].push cb

  render: ->
    @$el.html @template
      darkFont: { name: @DARK_FONT, value: Boolean(@get(@DARK_FONT)) }
      grayApps: { name: @APP_GRAYSCALE, value: Boolean(@get(@APP_GRAYSCALE)) }

  _registerBtnClick: ->
    css_class = 'show'
    @$el.on 'mousedown', (e) -> e.stopPropagation()
    $('#options_btn').on 'click', =>
      @render()
      $(document).one 'mousedown', (e) =>
        id = $(e.target).attr 'id'
        if id != 'options_btn' then @$el.removeClass css_class
    
      @$el.toggleClass css_class

  _registerInputChange: ->
    @$el.on 'change', 'input', (e) =>
      @set e.target.name, e.target.checked, ->
        $target = $(e.target).parent()
        $target.addClass 'saved'
        setTimeout ( -> $target.removeClass 'saved'), 5000

  _getFullKey: (key) ->
    "#{@namespace}.#{key}"

  _triggerListener: (changes, namespace) =>
    for key, value of changes
      if @listener[key]
        for listener in @listener[key] 
          listener(value.newValue, value.oldValue) 

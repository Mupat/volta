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
  THEME: 'theme'

  THEMES:
    THEBEACH: {name: 'theBeach', dark: true}
    BLUEPRINTG: {name: 'bluePrintG'}
    BLUEPRINTC: {name: 'bluePrintC'}
    BOOKEH: {name: 'bookeh'}
    LINENDARK: {name: 'linenDark', grayApps: true}
    LINENLIGHT: {name: 'linenLight', dark: true}
    FILTHYTILE: {name: 'filthyTile'}
    NAVYBLUE: {name: 'navyBlue', grayApps: true}
    REDWINE: {name: 'redWine'}
    REDMESH: {name: 'redMesh'}

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
      theBeach: { name: @THEMES.THEBEACH.name, value: Boolean(@get(@THEME) is @THEMES.THEBEACH.name) }
      bluePrintG: { name: @THEMES.BLUEPRINTG.name, value: Boolean(@get(@THEME) is @THEMES.BLUEPRINTG.name) }
      bluePrintC: { name: @THEMES.BLUEPRINTC.name, value: Boolean(@get(@THEME) is @THEMES.BLUEPRINTC.name) }
      bookeh: { name: @THEMES.BOOKEH.name, value: Boolean(@get(@THEME) is @THEMES.BOOKEH.name) }
      linenDark: { name: @THEMES.LINENDARK.name, value: Boolean(@get(@THEME) is @THEMES.LINENDARK.name) }
      linenLight: { name: @THEMES.LINENLIGHT.name, value: Boolean(@get(@THEME) is @THEMES.LINENLIGHT.name) }
      filthyTile: { name: @THEMES.FILTHYTILE.name, value: Boolean(@get(@THEME) is @THEMES.FILTHYTILE.name) }
      navyBlue: { name: @THEMES.NAVYBLUE.name, value: Boolean(@get(@THEME) is @THEMES.NAVYBLUE.name) }
      redWine: { name: @THEMES.REDWINE.name, value: Boolean(@get(@THEME) is @THEMES.REDWINE.name) }
      redMesh: { name: @THEMES.REDMESH.name, value: Boolean(@get(@THEME) is @THEMES.REDMESH.name) }
      theme: @THEME

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
      #console.log 'name', e.target.name
      if e.target.name is @THEME then value = e.target.value else value = e.target.checked
      @set e.target.name, value, =>
        $target = $(e.target).parent()
        
        if e.target.name is @THEME
          @set @DARK_FONT, Boolean(@THEMES[e.target.value.toUpperCase()].dark), ->
            $target.addClass 'saved'    
            setTimeout ( -> $target.removeClass 'saved'), 5000
        else
          $target.addClass 'saved'    
          setTimeout ( -> $target.removeClass 'saved'), 5000

        if e.target.name is @THEME
          @set @APP_GRAYSCALE, Boolean(@THEMES[e.target.value.toUpperCase()].grayApps), ->
            $target.addClass 'saved'    
            setTimeout ( -> $target.removeClass 'saved'), 5000
        else
          $target.addClass 'saved'    
          setTimeout ( -> $target.removeClass 'saved'), 5000

  _getFullKey: (key) ->
    "#{@namespace}.#{key}"

  _triggerListener: (changes, namespace) =>
    for key, value of changes
      if @$el.hasClass "show"
        @$el.find("input##{key.split('.')[2]}").prop 'checked', value.newValue
      @options[key] = value.newValue
      if @listener[key]
        for listener in @listener[key] 
          listener(value.newValue, value.oldValue) 

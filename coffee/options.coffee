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
  THEME_KEY: 'theme'

  THEMES: [
    {name: 'theBeach', dark: true}
    {name: 'bluePrint'}
    {name: 'bookeh'}
    {name: 'linenDark'}
    {name: 'linenLight', dark: true}
    {name: 'filthyTile'}
    {name: 'greyWash'}
    {name: 'navyBlue'}
    {name: 'redWine'}
    {name: 'redMesh'}
  ]

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
    data = 
      darkFont: { name: @DARK_FONT, value: Boolean(@get(@DARK_FONT)) }
      grayApps: { name: @APP_GRAYSCALE, value: Boolean(@get(@APP_GRAYSCALE)) }
      theme: @THEME_KEY
      themes: {}

    for theme in @THEMES
      data.themes[theme.name] = name: @_prettify(theme.name), value: Boolean(@get(@THEME_KEY) is theme.name)

    @$el.html @template data

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
      if e.target.name is @THEME_KEY then value = e.target.value else value = e.target.checked
      @set e.target.name, value, =>
        $target = $(e.target).parent()
        
        if e.target.name is @THEME_KEY
          @_set_theme_options e.target.value
        
        # TODO: check if needed to show success?
        $target.addClass 'saved'    
        setTimeout ( -> $target.removeClass 'saved'), 5000

  _set_theme_options: (input_value) ->
    for theme in @THEMES
      if @THEMES.name is input_value
        value = Boolean(theme.dark)
        break;
        
    @set @DARK_FONT, value, =>
      @_setSaved $target

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

  _prettify: (value) ->
    value.replace(
      /([a-z])([A-Z])/g, 
      (match, l1, l2) -> "#{l1} #{l2}"
    ).toLowerCase()

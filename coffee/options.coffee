class Options
  namespace: 'YANTRE.storage'
  storage: chrome.storage.sync
  options: {}
  listener: {}

  # constants for option names
  DARK_FONT: 'darkFontColor'
  APP_GRAYSCALE: 'appGrayscale'
  THEME_KEY: 'theme'
  MAIL_LABEL: 'label'
  CLOCK_TWELVE: 'twelveHourClock'

  # available themes
  THEMES: [
    {name: 'theBeach', darkFont: true}
    {name: 'bluePrintGrungy'}
    {name: 'bluePrintClean'}
    {name: 'bookeh'}
    {name: 'linenDark', grayApps: true}
    {name: 'linenLight', darkFont: true}
    {name: 'filthyTile'}
    {name: 'navyBlue', grayApps: true}
    {name: 'redWine'}
    {name: 'redMesh'}
    {name: 'default'}
    {name: 'lightLogoColor', darkFont: true}
    {name: 'darkLogoColor'}
  ]

  constructor: (done) ->
    @storage.get null, (options) =>
      for key, value of options
        if key[0..@namespace.length-1] is @namespace
          @options[key] = value

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

  _getFullKey: (key) ->
    "#{@namespace}.#{key}"

  _triggerListener: (changes, namespace) =>
    for key, value of changes
      @options[key] = value.newValue
      if @listener[key]
        listener(value.newValue, value.oldValue, key) for listener in @listener[key]
class Mail
  mail_template: YANTRE.templates.mail
  read_template: YANTRE.templates.read
  unread_template: YANTRE.templates.unread
  notLoggedIn_template: YANTRE.templates.notin
  warning_template: YANTRE.templates.warning
  url: 'https://mail.google.com/mail/feed/atom/'
  loggedInUrl: 'https://mail.google.com/mail'
  $el: $('#mails')
  label: ''

  constructor: (@options = YANTRE.options) ->
    label = @options.get @options.MAIL_LABEL
    @label = label if label isnt undefined

    @options.registerOnChange @options.MAIL_LABEL, (new_value, old_value) =>
      @$el.children().fadeOut 400, =>
        @$el.prev().show 400, =>
          @label = new_value
          setTimeout ( => @render()), 500

  render: ->
    $.ajax(@loggedInUrl)
      .done (data) =>
        if data.indexOf('id="gaia_loginform"') is -1
          $.get(@url + @label)
            .done(@_success)
            .fail(@_error)
        else
          @$el.prev().fadeOut()
          @_showNotLoggedIn()
      .error (err) =>
        @$el.prev().fadeOut()
        @_showWarning()

  _generate_html: ($res) =>
    append_html = ''
    self = @
    $res.find('entry').each (index) ->
      $entry = $(this)
      $author = $entry.find('author')

      time = moment.utc($entry.find('issued').text()).local()
      append_html += self.mail_template
        title: $entry.find('title').text()
        author: "#{$author.children('name').text()} (#{$author.children('email').text()})"
        time: time.calendar()
        link: $entry.find('link').attr('href')
        summary: $entry.find('summary').text()

    append_html

  _showUnread: ($res) ->
    mails_html = @_generate_html $res
    count = Number($res.find('fullcount').text())
    unread_html = @unread_template 
      count: count
      account: $res.find('title').first().text().split('for ')[1]
      label: @label
      moreThenOne: Boolean(count > 1)

    @_putInDom unread_html, =>
      @$el.find('ul').html mails_html

  _showRead: ->
    @_putInDom @read_template()

  _showNotLoggedIn: ->
    @_putInDom @notLoggedIn_template()

  _showWarning: ->
    @_putInDom @warning_template()

  _success: (data) =>
    @$el.prev().fadeOut()
    $res = $(data)
    if Number($(data).find('fullcount').text()) > 0 
      @_showUnread $res
    else
      @_showRead()

  _error:  (data) =>
    console.error 'failed', data

  _putInDom: (html, done = ->)->
    @$el.fadeOut 400, =>
      @$el.html html
      @$el.fadeIn 400, done
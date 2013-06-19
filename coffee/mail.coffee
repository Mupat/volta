class Mail
  mail_template: Handlebars.templates.mail
  read_template: Handlebars.templates.read
  unread_template: Handlebars.templates.unread
  url: 'https://mail.google.com/mail/feed/atom/'
  $el: $('#mails')

  render: ->
    $.get(@url)
      .done(@_success)
      .fail(@_error)

  _generate_html: ($res) =>
    append_html = ''
    self = @
    $res.find('entry').each (index) ->
      $entry = $(this)
      $author = $entry.find('author')
      append_html += self.mail_template
        title: $entry.find('title').text()
        author: "#{$author.children('name').text()} (#{$author.children('email').text()})"
        time: $entry.find('issued').text()
        link: $entry.find('link').attr('href')
        summary: $entry.find('summary').text()

    append_html

  _showUnread: ($res) ->
    mails_html = @_generate_html $res
    unread_html = @unread_template 
      count: Number($res.find('fullcount').text())
      account: $res.find('title').first().text().split('for ')[1]

    console.log unread_html
    test = $(unread_html)

    console.log test
    @$el.append unread_html
    @$el.find('ul').append mails_html

    # @$el.append append_html

  _showRead: ->
    @$el.append @read_template()

  _success: (data) =>
    $res = $(data)
    if Number($(data).find('fullcount').text()) > 0 
      @_showUnread $res
    else
      @_showRead()

  _error:  (data) =>
    console.error 'failed', data

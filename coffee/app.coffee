class App
  template: YANTRE.templates.app
  $el: $('#apps')
  max_elements: 6

  render: ->
    chrome.management.getAll @_generate_html

  _generate_html: (all_apps) =>
    $append = $('<ul></ul>')
    counter = 0
    $.each all_apps, (index, app) =>
      if app.isApp
        if counter is 0 then $append.append '<li></li>'

        $append.find('li:last-of-type').append @template
          app_link: app.appLaunchUrl
          id: app.id
          name: app.name
          icon_link: app.icons[app.icons.length-1].url

        if @max_elements - counter is 1 then counter = 0
        else counter++

    @$el.append $append
    @$el.children('ul').bxSlider
      pager: false
      infiniteLoop: false
      hideControlOnEnd: true

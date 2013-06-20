(function() {
  var App, Clock, Mail,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = (function() {
    function App() {
      this._generate_html = __bind(this._generate_html, this);
    }

    App.prototype.template = YANTRE.templates.app;

    App.prototype.$el = $('#apps');

    App.prototype.max_elements = 6;

    App.prototype.render = function() {
      return chrome.management.getAll(this._generate_html);
    };

    App.prototype._generate_html = function(all_apps) {
      var $append, counter,
        _this = this;
      $append = $('<ul></ul>');
      counter = 0;
      $.each(all_apps, function(index, app) {
        if (app.isApp) {
          if (counter === 0) {
            $append.append('<li></li>');
          }
          $append.find('li:last-of-type').append(_this.template({
            app_link: app.appLaunchUrl,
            id: app.id,
            name: app.name,
            icon_link: app.icons[app.icons.length - 1].url
          }));
          if (_this.max_elements - counter === 1) {
            return counter = 0;
          } else {
            return counter++;
          }
        }
      });
      this.$el.append($append);
      return this.$el.children('ul').bxSlider({
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        nextText: '<i class="icon-right"></>',
        prevText: '<i class="icon-left"></>'
      });
    };

    return App;

  })();

  Clock = (function() {
    Clock.prototype.options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    Clock.prototype.locale = "en-US";

    function Clock() {
      this.date = new Date().toLocaleDateString(this.locale, this.options);
    }

    Clock.prototype.render = function() {
      $('#clock > div').FlipClock({
        clockFace: 'TwentyFourHourClock'
      });
      return $('#clock > h1').text(this.date);
    };

    return Clock;

  })();

  Mail = (function() {
    function Mail() {
      this._error = __bind(this._error, this);
      this._success = __bind(this._success, this);
      this._generate_html = __bind(this._generate_html, this);
    }

    Mail.prototype.mail_template = YANTRE.templates.mail;

    Mail.prototype.read_template = YANTRE.templates.read;

    Mail.prototype.unread_template = YANTRE.templates.unread;

    Mail.prototype.url = 'https://mail.google.com/mail/feed/atom/';

    Mail.prototype.$el = $('#mails');

    Mail.prototype.render = function() {
      return $.get(this.url).done(this._success).fail(this._error);
    };

    Mail.prototype._generate_html = function($res) {
      var append_html, self;
      append_html = '';
      self = this;
      $res.find('entry').each(function(index) {
        var $author, $entry;
        $entry = $(this);
        $author = $entry.find('author');
        return append_html += self.mail_template({
          title: $entry.find('title').text(),
          author: "" + ($author.children('name').text()) + " (" + ($author.children('email').text()) + ")",
          time: $entry.find('issued').text(),
          link: $entry.find('link').attr('href'),
          summary: $entry.find('summary').text()
        });
      });
      return append_html;
    };

    Mail.prototype._showUnread = function($res) {
      var mails_html, test, unread_html;
      mails_html = this._generate_html($res);
      unread_html = this.unread_template({
        count: Number($res.find('fullcount').text()),
        account: $res.find('title').first().text().split('for ')[1]
      });
      test = $(unread_html);
      this.$el.append(unread_html);
      return this.$el.find('ul').append(mails_html);
    };

    Mail.prototype._showRead = function() {
      return this.$el.append(this.read_template());
    };

    Mail.prototype._success = function(data) {
      var $res;
      $res = $(data);
      if (Number($(data).find('fullcount').text()) > 0) {
        return this._showUnread($res);
      } else {
        return this._showRead();
      }
    };

    Mail.prototype._error = function(data) {
      return console.error('failed', data);
    };

    return Mail;

  })();

  $(function() {
    var app, clock, mail;
    app = new App();
    mail = new Mail();
    clock = new Clock();
    app.render();
    mail.render();
    clock.render();
    return $('#options_button').click(function() {
      console.log('clicj');
      return $('#options').toggleClass('show');
    });
  });

}).call(this);

(function() {
  var App, Clock, Mail, Options,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = (function() {
    App.prototype.template = YANTRE.templates.app;

    App.prototype.$el = $('#apps');

    App.prototype.max_elements = 6;

    function App(options) {
      this.options = options != null ? options : window.options;
      this._generate_html = __bind(this._generate_html, this);
      this.gray_scale = this.options.get(this.options.APP_GRAYSCALE);
      if (this.gray_scale) {
        this.$el.addClass('grayscale');
      }
    }

    App.prototype.render = function() {
      return chrome.management.getAll(this._generate_html);
    };

    App.prototype._generate_html = function(all_apps) {
      var $append, counter,
        _this = this;
      $append = $('<ul></ul>');
      counter = 0;
      $.each(all_apps.sort(this._compareByName), function(index, app) {
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

    App.prototype._compareByName = function(app1, app2) {
      var a, b;
      a = app1.name.toLowerCase();
      b = app2.name.toLowerCase();
      if (a > b) {
        return 1;
      } else if (a === b) {
        return 0;
      } else {
        return -1;
      }
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
    var options;
    options = new Options(function() {
      var app, clock, mail;
      window.options = options;
      app = new App();
      mail = new Mail();
      clock = new Clock();
      app.render();
      mail.render();
      clock.render();
      if (window.options.get(window.options.DARK_FONT)) {
        return $('body').addClass('dark');
      }
    });
    return $("#default_home").click(function() {
      chrome.tabs.update({
        url: "chrome-internal://newtab/"
      });
      return false;
    });
  });

  Options = (function() {
    Options.prototype.template = YANTRE.templates.option;

    Options.prototype.namespace = 'YANTRE.storage';

    Options.prototype.storage = chrome.storage.sync;

    Options.prototype.options = {};

    Options.prototype.$el = $('#options');

    Options.prototype.DARK_FONT = 'darkFontColor';

    Options.prototype.APP_GRAYSCALE = 'appGrayscale';

    function Options(done) {
      var _this = this;
      this.storage.get(null, function(options) {
        var key, value;
        for (key in options) {
          value = options[key];
          if (key.slice(0, +(_this.namespace.length - 1) + 1 || 9e9) === _this.namespace) {
            _this.options[key] = value;
          }
        }
        console.log('options', _this.options);
        _this._registerCogClick();
        _this._registerInputChange();
        chrome.storage.onChanged.addListener(function(changes, namespace) {
          console.log('changes', changes);
          return console.log('namespace', namespace);
        });
        return done();
      });
    }

    Options.prototype.get = function(key) {
      return this.options["" + this.namespace + "." + key];
    };

    Options.prototype.set = function(key, value, done) {
      var data;
      if (done == null) {
        done = function() {};
      }
      data = {};
      data["" + this.namespace + "." + key] = value;
      return this.storage.set(data, done);
    };

    Options.prototype.render = function() {
      return this.$el.html(this.template({
        darkFont: {
          name: this.DARK_FONT,
          value: Boolean(this.get(this.DARK_FONT))
        },
        grayApps: {
          name: this.APP_GRAYSCALE,
          value: Boolean(this.get(this.APP_GRAYSCALE))
        }
      }));
    };

    Options.prototype._registerCogClick = function() {
      var _this = this;
      return $('#options_btn').click(function() {
        _this.render();
        return _this.$el.toggleClass('show');
      });
    };

    Options.prototype._registerInputChange = function() {
      var _this = this;
      return this.$el.on('change', 'input', function(e) {
        return _this.set(e.target.name, e.target.checked, function() {
          return console.log('saved');
        });
      });
    };

    return Options;

  })();

}).call(this);

(function() {
  var App, Basic, Clock, Mail, Options, OptionsView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = (function() {
    App.prototype.template = YANTRE.templates.app;

    App.prototype.$el = $('#apps');

    App.prototype.max_elements = 6;

    App.prototype.toggle_class = 'grayscale';

    function App(options) {
      var _this = this;
      this.options = options != null ? options : YANTRE.options;
      this._generate_html = __bind(this._generate_html, this);
      this.gray_scale = this.options.get(this.options.APP_GRAYSCALE);
      if (this.gray_scale) {
        this.$el.addClass(this.toggle_class);
      }
      this.options.registerOnChange(this.options.APP_GRAYSCALE, function(new_value, old_value) {
        return _this.$el.toggleClass(_this.toggle_class, new_value);
      });
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

  Basic = (function() {
    Basic.prototype.$el = $('body');

    Basic.prototype.dark_class = 'dark';

    function Basic(options) {
      var _this = this;
      this.options = options != null ? options : YANTRE.options;
      this._handle_dark_font();
      this._handle_theme();
      $("#default_home").click(function() {
        chrome.tabs.update({
          url: "chrome-internal://newtab/"
        });
        return false;
      });
      setTimeout((function() {
        return _this.$el.addClass('transition');
      }), 25);
    }

    Basic.prototype._handle_dark_font = function() {
      var _this = this;
      this.dark = this.options.get(this.options.DARK_FONT);
      if (this.dark) {
        this.$el.toggleClass(this.dark_class);
      }
      return this.options.registerOnChange(this.options.DARK_FONT, function(new_value, old_value) {
        return _this.$el.toggleClass(_this.dark_class);
      });
    };

    Basic.prototype._handle_theme = function() {
      var _this = this;
      this.theme = this.options.get(this.options.THEME_KEY);
      if (this.theme) {
        this.$el.addClass(this.theme);
      }
      return this.options.registerOnChange(this.options.THEME_KEY, function(new_value, old_value) {
        return _this.$el.toggleClass("" + old_value + " " + new_value);
      });
    };

    return Basic;

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
      var mails_html, unread_html,
        _this = this;
      mails_html = this._generate_html($res);
      unread_html = this.unread_template({
        count: Number($res.find('fullcount').text()),
        account: $res.find('title').first().text().split('for ')[1]
      });
      return this._putInDom(unread_html, function() {
        return _this.$el.find('ul').html(mails_html);
      });
    };

    Mail.prototype._showRead = function() {
      return this._putInDom(this.read_template());
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

    Mail.prototype._putInDom = function(html, done) {
      var _this = this;
      if (done == null) {
        done = function() {};
      }
      return this.$el.fadeOut(400, function() {
        _this.$el.html(html);
        return _this.$el.fadeIn(400, done);
      });
    };

    return Mail;

  })();

  Options = (function() {
    Options.prototype.namespace = 'YANTRE.storage';

    Options.prototype.storage = chrome.storage.sync;

    Options.prototype.options = {};

    Options.prototype.listener = {};

    Options.prototype.DARK_FONT = 'darkFontColor';

    Options.prototype.APP_GRAYSCALE = 'appGrayscale';

    Options.prototype.THEME_KEY = 'theme';

    Options.prototype.THEMES = [
      {
        name: 'theBeach',
        darkFont: true
      }, {
        name: 'bluePrintGrungy'
      }, {
        name: 'bluePrintClean'
      }, {
        name: 'bookeh'
      }, {
        name: 'linenDark',
        grayApps: true
      }, {
        name: 'linenLight',
        darkFont: true
      }, {
        name: 'filthyTile'
      }, {
        name: 'navyBlue',
        grayApps: true
      }, {
        name: 'redWine'
      }, {
        name: 'redMesh'
      }
    ];

    function Options(done) {
      this._triggerListener = __bind(this._triggerListener, this);
      var _this = this;
      this.storage.get(null, function(options) {
        var key, value;
        for (key in options) {
          value = options[key];
          if (key.slice(0, +(_this.namespace.length - 1) + 1 || 9e9) === _this.namespace) {
            _this.options[key] = value;
          }
        }
        chrome.storage.onChanged.addListener(_this._triggerListener);
        return done();
      });
    }

    Options.prototype.get = function(key) {
      return this.options[this._getFullKey(key)];
    };

    Options.prototype.set = function(key, value, done) {
      var data;
      if (done == null) {
        done = function() {};
      }
      data = {};
      data[this._getFullKey(key)] = value;
      return this.storage.set(data, done);
    };

    Options.prototype.registerOnChange = function(key, cb) {
      key = this._getFullKey(key);
      if (this.listener[key] === void 0) {
        this.listener[key] = [];
      }
      return this.listener[key].push(cb);
    };

    Options.prototype._getFullKey = function(key) {
      return "" + this.namespace + "." + key;
    };

    Options.prototype._triggerListener = function(changes, namespace) {
      var key, listener, value, _results;
      _results = [];
      for (key in changes) {
        value = changes[key];
        this.options[key] = value.newValue;
        if (this.listener[key]) {
          _results.push((function() {
            var _i, _len, _ref, _results1;
            _ref = this.listener[key];
            _results1 = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              listener = _ref[_i];
              _results1.push(listener(value.newValue, value.oldValue, key));
            }
            return _results1;
          }).call(this));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Options;

  })();

  OptionsView = (function() {
    OptionsView.prototype.template = YANTRE.templates.option;

    OptionsView.prototype.$el = $('#options');

    function OptionsView(options) {
      this.options = options != null ? options : YANTRE.options;
      this._registerBtnClick();
      this._registerTabChange();
      this._registerInputChange();
      this._registerOptionChange();
    }

    OptionsView.prototype.render = function() {
      var data, theme, _i, _len, _ref;
      data = {
        darkFont: {
          name: this.options.DARK_FONT,
          value: Boolean(this.options.get(this.options.DARK_FONT))
        },
        grayApps: {
          name: this.options.APP_GRAYSCALE,
          value: Boolean(this.options.get(this.options.APP_GRAYSCALE))
        },
        theme: this.options.THEME_KEY,
        themes: {}
      };
      _ref = this.options.THEMES;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        theme = _ref[_i];
        data.themes[theme.name] = {
          "class": theme.name,
          name: this._prettify(theme.name),
          grayApps: Boolean(theme.grayApps),
          darkFont: Boolean(theme.darkFont),
          value: Boolean(this.options.get(this.options.THEME_KEY) === theme.name)
        };
      }
      return this.$el.html(this.template(data));
    };

    OptionsView.prototype._registerTabChange = function() {
      var _this = this;
      return this.$el.on('click', 'i', function(e) {
        var $target, id;
        $target = $(e.target);
        id = $target.attr('data-content');
        _this.$el.find('.show').removeClass('show');
        _this.$el.find('.active').removeClass('active');
        $("#" + id).addClass('show');
        return $target.addClass('active');
      });
    };

    OptionsView.prototype._registerBtnClick = function() {
      var _this = this;
      this.$el.on('mousedown', function(e) {
        return e.stopPropagation();
      });
      return $('#options_btn').on('click', function() {
        $(document).one('mousedown', function(e) {
          var id;
          id = $(e.target).attr('id');
          if (id !== 'options_btn') {
            return _this.$el.removeClass('show');
          }
        });
        return _this.$el.toggleClass('show');
      });
    };

    OptionsView.prototype._registerInputChange = function() {
      var _this = this;
      return this.$el.on('change', 'input', function(e) {
        var value;
        if (e.target.name === _this.options.THEME_KEY) {
          value = e.target.value;
        } else {
          value = e.target.checked;
        }
        return _this.options.set(e.target.name, value, function() {
          var $target;
          $target = $(e.target).parent();
          if (e.target.name === _this.options.THEME_KEY) {
            return _this._set_theme_options(e.target.value);
          }
        });
      });
    };

    OptionsView.prototype._set_theme_options = function(input_value) {
      var darkFont, grayApps, theme, _i, _len, _ref;
      _ref = this.options.THEMES;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        theme = _ref[_i];
        if (theme.name === input_value) {
          darkFont = Boolean(theme.darkFont);
          grayApps = Boolean(theme.grayApps);
          break;
        }
      }
      this.options.set(this.options.DARK_FONT, darkFont);
      return this.options.set(this.options.APP_GRAYSCALE, grayApps);
    };

    OptionsView.prototype._registerOptionChange = function() {
      var _this = this;
      this.options.registerOnChange(this.options.APP_GRAYSCALE, function(new_value, old_value) {
        return _this.$el.find("#" + _this.options.APP_GRAYSCALE).prop('checked', new_value);
      });
      this.options.registerOnChange(this.options.DARK_FONT, function(new_value, old_value) {
        return _this.$el.find("#" + _this.options.DARK_FONT).prop('checked', new_value);
      });
      return this.options.registerOnChange(this.options.THEME_KEY, function(new_value, old_value) {
        return _this.$el.find("#" + _this.options.THEME_KEY).prop('checked', new_value);
      });
    };

    OptionsView.prototype._prettify = function(value) {
      return value.replace(/([a-z])([A-Z])/g, function(match, l1, l2) {
        return "" + l1 + " " + l2;
      }).toLowerCase();
    };

    return OptionsView;

  })();

  $(function() {
    var options;
    return options = new Options(function() {
      var app, basic, clock, mail, optionsView;
      YANTRE.options = options;
      basic = new Basic();
      optionsView = new OptionsView();
      app = new App();
      mail = new Mail();
      clock = new Clock();
      optionsView.render();
      app.render();
      setTimeout((function() {
        return mail.render();
      }), 500);
      return clock.render();
    });
  });

}).call(this);

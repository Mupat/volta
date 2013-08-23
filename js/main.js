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

    Basic.prototype.$infoEl = $('.icon-info');

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
      this.$infoEl.click(function(e) {
        $(document).one('mousedown', function(event) {
          if (!$(event.target).hasClass('.icon-info')) {
            return _this.$infoEl.removeClass('show');
          }
        });
        return $(e.target).toggleClass('show');
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
        if (new_value) {
          return _this.$el.addClass(_this.dark_class);
        } else {
          return _this.$el.removeClass(_this.dark_class);
        }
      });
    };

    Basic.prototype._handle_theme = function() {
      var _this = this;
      this.theme = this.options.get(this.options.THEME_KEY);
      if (this.theme) {
        this.$el.toggleClass("" + this.theme + " default");
      }
      return this.options.registerOnChange(this.options.THEME_KEY, function(new_value, old_value) {
        var old;
        if (old_value) {
          old = old_value;
        } else {
          old = 'default';
        }
        return _this.$el.toggleClass("" + old + " " + new_value);
      });
    };

    return Basic;

  })();

  Clock = (function() {
    Clock.prototype.format = "dddd, MMMM Do YYYY";

    Clock.prototype.$el = $('#clock-options > div');

    Clock.prototype.twelveHour = 'TwelveHourClock';

    Clock.prototype.twentyFourHour = 'TwentyFourHourClock';

    Clock.prototype.face = false;

    function Clock(options) {
      var _this = this;
      this.options = options != null ? options : YANTRE.options;
      this.face = this.options.get(this.options.CLOCK_TWELVE);
      this.options.registerOnChange(this.options.CLOCK_TWELVE, function(new_value, old_value) {
        _this.face = new_value;
        console.log('register change');
        _this._removeClock();
        return _this._newClock();
      });
      this.date = moment();
    }

    Clock.prototype.render = function() {
      this._newClock();
      return $('#clock-options > h1').text(this.date.format(this.format));
    };

    Clock.prototype._newClock = function() {
      var face;
      face = this.face ? this.twelveHour : this.twentyFourHour;
      return this.clock = new FlipClock(this.$el, 0, {
        clockFace: face
      });
    };

    Clock.prototype._removeClock = function() {
      this.clock.stop();
      this.clock.timer._destroyTimer();
      return this.$el.children().remove();
    };

    return Clock;

  })();

  Mail = (function() {
    Mail.prototype.mail_template = YANTRE.templates.mail;

    Mail.prototype.read_template = YANTRE.templates.read;

    Mail.prototype.unread_template = YANTRE.templates.unread;

    Mail.prototype.notLoggedIn_template = YANTRE.templates.notin;

    Mail.prototype.warning_template = YANTRE.templates.warning;

    Mail.prototype.url = 'https://mail.google.com/mail/feed/atom/';

    Mail.prototype.loggedInUrl = 'https://accounts.google.com/ServiceLogin?continue=https://mail.google.com/mail/';

    Mail.prototype.$el = $('#mails');

    Mail.prototype.label = '';

    function Mail(options) {
      var _this = this;
      this.options = options != null ? options : YANTRE.options;
      this._error = __bind(this._error, this);
      this._success = __bind(this._success, this);
      this._generate_html = __bind(this._generate_html, this);
      this.label = this.options.get(this.options.MAIL_LABEL);
      this.options.registerOnChange(this.options.MAIL_LABEL, function(new_value, old_value) {
        return _this.$el.children().fadeOut(400, function() {
          return _this.$el.prev().show(400, function() {
            _this.label = new_value;
            return setTimeout((function() {
              return _this.render();
            }), 500);
          });
        });
      });
    }

    Mail.prototype.render = function() {
      var _this = this;
      return $.ajax(this.loggedInUrl).done(function(data) {
        if (data.indexOf('"https://accounts.google.com/SignUp') === -1) {
          return $.get(_this.url + _this.label).done(_this._success).fail(_this._error);
        } else {
          _this.$el.prev().fadeOut();
          return _this._showNotLoggedIn();
        }
      }).error(function(err) {
        _this.$el.prev().fadeOut();
        return _this._showWarning();
      });
    };

    Mail.prototype._generate_html = function($res) {
      var append_html, self;
      append_html = '';
      self = this;
      $res.find('entry').each(function(index) {
        var $author, $entry, time;
        $entry = $(this);
        $author = $entry.find('author');
        time = moment.utc($entry.find('issued').text()).local();
        return append_html += self.mail_template({
          title: $entry.find('title').text(),
          author: "" + ($author.children('name').text()) + " (" + ($author.children('email').text()) + ")",
          time: time.calendar(),
          link: $entry.find('link').attr('href'),
          summary: $entry.find('summary').text()
        });
      });
      return append_html;
    };

    Mail.prototype._showUnread = function($res) {
      var count, mails_html, unread_html,
        _this = this;
      mails_html = this._generate_html($res);
      count = Number($res.find('fullcount').text());
      unread_html = this.unread_template({
        count: count,
        account: $res.find('title').first().text().split('for ')[1],
        label: this.label,
        moreThenOne: Boolean(count > 1)
      });
      return this._putInDom(unread_html, function() {
        return _this.$el.find('ul').html(mails_html);
      });
    };

    Mail.prototype._showRead = function() {
      return this._putInDom(this.read_template());
    };

    Mail.prototype._showNotLoggedIn = function() {
      return this._putInDom(this.notLoggedIn_template());
    };

    Mail.prototype._showWarning = function() {
      return this._putInDom(this.warning_template());
    };

    Mail.prototype._success = function(data) {
      var $res;
      this.$el.prev().fadeOut();
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

    Options.prototype.MAIL_LABEL = 'label';

    Options.prototype.CLOCK_TWELVE = 'twelveHourClock';

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
      }, {
        name: 'black'
      }, {
        name: 'default',
        darkFont: true
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

    OptionsView.prototype.$elWrapper = $('#clock-options');

    function OptionsView(options) {
      this.options = options != null ? options : YANTRE.options;
      this._registerBtnClick();
      this._registerTabChange();
      this._registerInputChange();
      this._registerOptionChange();
      this._regisrerLabelChange();
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
        twelveHourClock: {
          name: this.options.CLOCK_TWELVE,
          value: Boolean(this.options.get(this.options.CLOCK_TWELVE))
        },
        label: {
          name: this.options.MAIL_LABEL,
          value: this.options.get(this.options.MAIL_LABEL)
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
      if (this.options.get(this.options.THEME_KEY) == null) {
        data.themes['default'].value = true;
        this.options.set(this.options.DARK_FONT, true);
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
            return _this.$elWrapper.removeClass('show');
          }
        });
        return _this.$elWrapper.toggleClass('show');
      });
    };

    OptionsView.prototype._regisrerLabelChange = function() {
      var _this = this;
      return this.$el.on('submit', '.mail_label > form', function(e) {
        var $input;
        e.preventDefault();
        console.log($(e.target));
        $input = $(e.target).children('input');
        return _this.options.set($input.prop('name'), $input.val());
      });
    };

    OptionsView.prototype._registerInputChange = function() {
      var _this = this;
      return this.$el.on('change', 'input[type="checkbox"], input[type="radio"]', function(e) {
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
      this.options.registerOnChange(this.options.THEME_KEY, function(new_value, old_value) {
        return _this.$el.find("#" + _this.options.THEME_KEY).prop('checked', new_value);
      });
      return this.options.registerOnChange(this.options.MAIL_LABEL, function(new_value, old_value) {
        return _this.$el.find("#" + _this.options.MAIL_LABEL).val(new_value);
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
    moment.lang('en', {
      calendar: {
        lastDay: '[Yesterday at] HH:mm:ss',
        sameDay: '[Today at] HH:mm:ss',
        nextDay: '[Tomorrow at] HH:mm:ss',
        lastWeek: '[last] dddd [at] HH:mm:ss',
        nextWeek: 'dddd [at] HH:mm:ss',
        sameElse: 'YYYY-MM-DD HH:mm:ss'
      }
    });
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

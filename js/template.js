this["YANTRE"] = this["YANTRE"] || {};
this["YANTRE"]["templates"] = this["YANTRE"]["templates"] || {};

this["YANTRE"]["templates"]["app"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a class=\"app\" id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" href=\"";
  if (stack1 = helpers.app_link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.app_link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  <img src=\"";
  if (stack1 = helpers.icon_link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.icon_link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"icon_";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n  <h4>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n</a>";
  return buffer;
  });

this["YANTRE"]["templates"]["mail"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li>\n  <a href=\"";
  if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <strong>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>\n    <ul class=\"info\">\n      <li><strong>";
  if (stack1 = helpers.author) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.author; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong></li>\n      <li><strong>";
  if (stack1 = helpers.time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong></li>\n    </ul>\n    <p>";
  if (stack1 = helpers.summary) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.summary; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n  </a>\n</li>";
  return buffer;
  });

this["YANTRE"]["templates"]["option"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return " checked=\"checked\" ";
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <div class=\"capture\">\n        <input id=\""
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"radio\" name=\""
    + escapeExpression(((stack1 = depth1.theme),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\""
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack2 = helpers['if'].call(depth0, depth0.value, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " />\n        <label for=\""
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"icon-check\">\n          <div class=\"img "
    + escapeExpression(((stack1 = depth0['class']),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" alt=\"theme_preview_"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n          <div class=\"info\">\n            <strong>"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\n            "
    + "\n          </div>\n        </label> \n      </div>\n    ";
  return buffer;
  }

  buffer += "<ul>\n  <li><i class=\"icon-tools active\" data-content=\"general_options\" >General</i></li>\n  <li><i class=\"icon-background\" data-content=\"theme_options\" >Theme</i></li>\n  <li><i class=\"icon-info\" data-content=\"credits\" >Credits</i></li>\n</ul>\n<div>\n  <section id=\"general_options\" class=\"show\">\n    <div class=\"checkbox\">\n      <input id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" name=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.value), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " />\n      <label for=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"icon-check\">use dark font color</label>\n    </div>\n\n    <div class=\"checkbox\">\n      <input id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" name=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.value), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " />\n      <label for=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"icon-check\">use grayscaled app icons</label> \n    </div>\n  </section>\n  <section id=\"theme_options\" class=\"\">\n    ";
  stack2 = helpers.each.call(depth0, depth0.themes, {hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </section>\n  <section id=\"credits\" class=\"\">\n    <ul>\n      <li>FlipClock.js<a href=\"http://flipclockjs.com/\">Homepage</a></li>\n      <li>Moment.js<a href=\"http://momentjs.com/\">Homepage</a></li>\n      <li>Google Webfont Lato<a href=\"http://www.google.com/fonts/specimen/Lato\">Font Description</a></li>\n      <li>bxSlider<a href=\"http://bxslider.com/\">Homepage</a></li>\n      <li>jQuery<a href=\"http://jquery.com/\">Homepage</a></li>\n    </ul>\n  </section>\n  <div class=\"contributors\">\n    <a href=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.contributors),stack1 == null || stack1 === false ? stack1 : stack1.hacker)),stack1 == null || stack1 === false ? stack1 : stack1.profile_link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      <span>Hacker</span>\n      <img src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.contributors),stack1 == null || stack1 === false ? stack1 : stack1.hacker)),stack1 == null || stack1 === false ? stack1 : stack1.avatar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" alt=\"avatar for "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.contributors),stack1 == null || stack1 === false ? stack1 : stack1.hacker)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      <strong>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.contributors),stack1 == null || stack1 === false ? stack1 : stack1.hacker)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\n    </a>\n    <a href=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.contributors),stack1 == null || stack1 === false ? stack1 : stack1.designer)),stack1 == null || stack1 === false ? stack1 : stack1.profile_link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      <img src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.contributors),stack1 == null || stack1 === false ? stack1 : stack1.designer)),stack1 == null || stack1 === false ? stack1 : stack1.avatar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" alt=\"avatar for "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.contributors),stack1 == null || stack1 === false ? stack1 : stack1.designer)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      <strong>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.contributors),stack1 == null || stack1 === false ? stack1 : stack1.designer)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\n      <span>Designer</span>\n    </a>\n  </div>\n</div>\n";
  return buffer;
  });

this["YANTRE"]["templates"]["read"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"read\">\n  <h1>Well done<i class=\"icon-thumbs-up\"></i></h1>\n  <p>No unread mails</p>\n</div>";
  });

this["YANTRE"]["templates"]["unread"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"unread\">\n  <h1><strong>";
  if (stack1 = helpers.count) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.count; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong> unread mails in ";
  if (stack1 = helpers.account) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.account; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\n</div>\n<ul></ul>";
  return buffer;
  });
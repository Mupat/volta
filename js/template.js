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

this["YANTRE"]["templates"]["notin"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"read\">\n  <h1>Not signed in</h1>\n  <p>You need to sign in your google account, to see unread mails</p>\n</div>";
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
    + "\" />\n          <div class=\"info\"><strong>"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></div>\n        </label> \n      </div>\n    ";
  return buffer;
  }

  buffer += "<i class=\"icon-tools active\" data-content=\"general_options\" >"
    + "</i>\n<i class=\"icon-background\" data-content=\"theme_options\" >"
    + "</i>\n<div>\n  <section id=\"general_options\" class=\"show\">\n    <div>\n      <h1>Style</h1>\n      <div class=\"checkbox\">\n        <input id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" name=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.value), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " />\n        <label for=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"icon-check\">use dark font color</label>\n      </div>\n\n      <div class=\"checkbox\">\n        <input id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" name=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.value), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " />\n        <label for=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"icon-check\">use grayscaled app icons</label> \n      </div>\n      <h1>Clock format</h1>\n      <div class=\"checkbox\">\n        <input id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.twelveHourClock),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" name=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.twelveHourClock),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.twelveHourClock),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.twelveHourClock),stack1 == null || stack1 === false ? stack1 : stack1.value), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " />\n        <label for=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.twelveHourClock),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"icon-check\">use 12h clock format</label> \n      </div>\n    </div>\n    <div>\n      <h1>Mail</h1>\n      <div class=\"mail_label\">\n        <form>\n          <label for=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.label),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Add a google label to check for new mails. </label>\n          <input id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.label),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.label),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.label),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" />\n          <input type=\"submit\" value=\"Save\" />\n          <small>Clear it, to use the inbox.</small>\n        </form>\n      </div>\n    </div>    \n  </section>\n  <section id=\"theme_options\" class=\"\">\n    ";
  stack2 = helpers.each.call(depth0, depth0.themes, {hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </section>\n</div>\n";
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
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "s";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "#";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;
  }

  buffer += "<div class=\"unread\">\n  <h1><strong>";
  if (stack1 = helpers.count) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.count; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong> unread mail";
  stack1 = helpers['if'].call(depth0, depth0.moreThenOne, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " in <span>";
  if (stack1 = helpers.account) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.account; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = helpers['if'].call(depth0, depth0.label, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span></h1>\n</div>\n<ul></ul>";
  return buffer;
  });

this["YANTRE"]["templates"]["warning"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"read\">\n  <h1>User?! ... We have a problem!</h1>\n  <p>You're probably offline, please check your internet connection</p>\n</div>";
  });
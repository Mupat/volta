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

  buffer += "<div id=\"setFontColor\">\n  <label for=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <input id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" name=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.darkFont),stack1 == null || stack1 === false ? stack1 : stack1.value), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " />\n    Use dark font color\n  </label>\n</div>\n\n<div id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <label>\n    <input id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" name=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.grayApps),stack1 == null || stack1 === false ? stack1 : stack1.value), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " />\n    Use grayscale for app icons\n  </label> \n</div>";
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
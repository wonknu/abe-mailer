'use strict';

var fs = require('fs');
var path = require('path');

var route = function route(req, res, next, abe) {
  if(req.query.recipient != null){
    abe.config.mail.from = req.query.from;
    abe.config.mail.recipient = req.query.recipient;
    abe.config.smtp.options.auth.apiKey = req.query.mandrill_api_key;
    abe.config.mail.subject = req.query.subject;
    abe.config.captcha.secret = req.query.captcha;
    fs.writeFile(abe.config.root + '/abe.json', JSON.stringify(abe.config), 'utf8');
    res.json({'ok': 'ok'});
    return;
  }

  var data = path.join(__dirname + '/../../partials/configuration.html')
  var html = abe.coreUtils.file.getContent(data);
  var template = abe.Handlebars.compile(html, {noEscape: true})
  var tmp = template({
    manager: {config: JSON.stringify(abe.config)},
    config: abe.config,
    user: res.user,
    isPageConfigMail: true
  })
  res.send(tmp);

  return 
}

exports.default = route
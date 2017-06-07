'use strict';

var fs = require('fs');
var path = require('path');

var route = function route(req, res, next, abe) {

  var config = require(abe.config.root + '/mail/index.json');

  if(req.query.recipient != null){
    config.mail.recipient = req.query.recipient
    config.mail.mandrill_api_key = req.query.mandrill_api_key
    config.mail.subject = req.query.subject
    config.captcha.secret = req.query.captcha
    fs.writeFile(abe.config.root + '/mail/index.json', JSON.stringify(config), 'utf8');
    res.json({'ok': 'ok'});
    return;
  }

  var data = path.join(__dirname + '/../../partials/configuration.html')
  var html = abe.coreUtils.file.getContent(data);

  var template = abe.Handlebars.compile(html, {noEscape: true})
  var tmp = template({
    configMail: config,
    manager: {config: JSON.stringify(abe.config)},
    config: abe.config,
    user: res.user,
    isPageConfigMail: true
  })
  res.send(tmp);

  return 
}

exports.default = route
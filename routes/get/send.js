'use strict';

var fs = require('fs');
var path = require('path');

var route = function route(req, res, next, abe) {
  abe.abeExtend.hooks.instance.trigger('beforeRoute', req, res, next);
  if(typeof res._header !== 'undefined' && res._header !== null) return;
  fs.readFile(abe.config.root + abe.config.mail.template, 'utf8', function read(err, data) {
    if (err) throw err;
    var template = abe.Handlebars.compile(data);
    var result = template(req.query);
    try{
      abe.coreUtils.mail.send(abe.config.mail.from, abe.config.mail.recipient, abe.config.mail.subject, '', result);
      res.json({'sucess': 1});
    }
    catch(e){
      console.log("Error plugin abe-mailer : ", e)
      res.json({'error': 1});
    }
  });

  return ''
}

exports.default = route

'use strict';

var fs = require('fs');
var path = require('path');
var config = require('../../config');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(config.mail.mandrill_api_key);

var route = function route(req, res, next, abe) {
  abe.abeExtend.hooks.instance.trigger('beforeRoute', req, res, next);
  if(typeof res._header !== 'undefined' && res._header !== null) return;
  fs.readFile(abe.config.root + config.mail.template, 'utf8', function read(err, data) {
    if (err) throw err;
    var template = abe.Handlebars.compile(data);
    var result = template(req.query);
    var message = {
      html: result,
      subject: config.mail.subject,
      from_email: 'noreply@abe.fr',
      from_name: 'Noreply Abecms',
      to: [{
        email: config.mail.recipient
      }]
    };

    mandrill_client.messages.send({
      'message': message,
      'async': false,
    }, function() {
      res.json({'sucess': 1});
    }.bind(this), function() {
      res.json({'error': 1});
    });
  });

  return ''
}

exports.default = route

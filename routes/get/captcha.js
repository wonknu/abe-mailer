'use strict';

var request = require("request");

var route = function route(req, res, next, abe) {
  abe.abeExtend.hooks.instance.trigger('beforeRoute', req, res, next);
  if(typeof res._header !== 'undefined' && res._header !== null) return;
  var rsp = req.query.rsp;
  request({
    uri: "https://www.google.com/recaptcha/api/siteverify",
    method: "POST",
    form: {
      secret: abe.config.captcha.secret,
      response: rsp,
      remoteip: req.connection.remoteip
    }
  }, function(error,response,body) {
    body = JSON.parse(body);
    if(body.success !== undefined && !body.success) return res.json({"responseCode" : 1, "responseDesc" : "error"});
    res.json({"responseCode" : 0, "responseDesc" : "sucess"});
  });

  return ''
}

exports.default = route

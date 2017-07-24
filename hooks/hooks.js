'use strict';

var hooks = {
  afterExpress: function(app, express, abe) {
    var configUserEnable = abe.config.users.enable
    app.use('/', function (req, res, next) {
      if (req.url.indexOf('/abe/plugin/abe-mailer/send') > -1 || req.url.indexOf('/abe/plugin/abe-mailer/captcha') > -1) {
        abe.config.users.enable = false
      }
    next()
    })
    var lastBecomeFirst = app._router.stack.pop()
    app._router.stack = [lastBecomeFirst].concat(app._router.stack)

    app.use('/', function (req, res, next) {
      if (req.url.indexOf('/abe/plugin/abe-mailer/send') > -1 || req.url.indexOf('/abe/plugin/abe-mailer/captcha') > -1) {
        abe.config.users.enable = configUserEnable
      }
      next()
    })

    return app
  }
};

exports.default = hooks;

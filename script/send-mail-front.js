var CONST = {
  POST_URL: 'http://localhost:3000/abe/plugin/abe-mailer/',
  CLASS_BTN_SEND: '.btn-mail',
  FORM_ID: 'gform-el',
  SUCESS_MSG: '.sucess-mg'
};

function serialize(form) {
  var field, s = [];
  if (typeof form == 'object' && form.nodeName == "FORM") {
    var len = form.elements.length;
    for (i=0; i<len; i++) {
      field = form.elements[i];
      if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
        if (field.type == 'select-multiple') {
          for (j=form.elements[i].options.length-1; j>=0; j--) {
            if(field.options[j].selected) s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
          }
        } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
          s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
        }
      }
    }
  }
  return s.join('&').replace(/%20/g, '+');
}

(function () {
  
  var form = document.getElementById(CONST.FORM_ID);
  var sucessMessage = document.querySelector(CONST.SUCESS_MSG);
  var btnMail = document.querySelector(CONST.CLASS_BTN_SEND);
  sucessMessage.style.display = 'none';

  var submitForm = function submitForm() {
    var request = new XMLHttpRequest();
    request.open('GET', CONST.POST_URL + 'send?' + serialize(form), true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onreadystatechange = function() {
      if(request.readyState == 4 && request.status == 200) {
        sucessMessage.style.display = 'block';
        form.style.display = 'none';
      }
    }
    request.send();
  }

  btnMail.addEventListener('click', function (e) {
    var captchaResponse = document.getElementById("g-recaptcha-response");
    e.preventDefault();
    if(!e.target.checkValidity()) return;

    if(captchaResponse != null){
      var request_captcha = new XMLHttpRequest();
      request_captcha.open('GET', CONST.POST_URL + 'captcha?rsp=' + (captchaResponse.value != null ? captchaResponse.value : ''), true);
      request_captcha.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request_captcha.onreadystatechange = function() {
        if(request_captcha.readyState == 4 && request_captcha.status == 200) {
          var resp = JSON.parse(request_captcha.responseText)
          if(resp.responseDesc === 'sucess') submitForm();
          else grecaptcha.reset();
        }
      }
      request_captcha.send();
    }
    else submitForm();
  });
})();

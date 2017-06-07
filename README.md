# Plugin mail for [abecms](https://github.com/abecms/abecms)

## Install

Install plugin via abecms CI

```
abe install wonknu/abe-mailer
```
Copy javascript asset from this plugin to your frontend assets

```
cp node_modules/abe-mailer/script/send-mail-front.js templates/index_files/src/
```

replace templates/index_files/src/ with the path to your frontend assets files
and add a script tag on your template where there are your contact form
inside this file you can edit basic info

```
var CONST = {
  POST_URL: 'http://localhost:3000/abe/plugin/mail/send',
  CLASS_BTN_SEND: '.btn-mail',
  FORM_ID: 'gform',
  SUCESS_MSG: '.sucess-mg'
};
```

- POST_URL: is your abe instance followed with this plugin path
- CLASS_BTN_SEND: is the class name of your submit button on your html template
- FORM_ID: is the ID of your form tag
- SUCESS_MSG: this html element will get style display = block after mail success response

important: You have to handle form validation, all this script does is myForm.checkValidity() wich only check browser default validation such as required attribute or type attribute (email, number ...)

This repository contains "custom" folder which copied to your root folder on postinstall 
This will add a new tab "Mail configuration"

![Tab config](doc-image/doc-0.png)

Click on it and you will be able to edit you mail config directly from abems editor

![Tab config](doc-image/doc-1.png)

or open mail/index.json and edit it


```
{
	"mail": {
		"recipient": "fabrice.labbe@adfab.fr",
		"template": "/scripts/mail/template-mail/contact.html",
		"subject": "this is subject"
	},
	"captcha": {
		"secret": "YOUR_RECAPTCHA_SECRET"
	}
}


##Example form

On your Abe template you will need to have a form element like this :

```html
<form id="gform" action="#" method="POST">
  <input type="text" name="name" required>
  <input type="text" name="country" required>
  <input type="email" name="email" required>
  <!-- only if you use recaptcha -->
  <div class="col-sm-12 g-recaptcha" data-sitekey="YOUR_RECAPTCHA_PUBLIC_KEY" id="g-recaptcha-response"></div>
  <input type="submit" class="btn-mail" value='Submit for contact'>
</form>

<!-- only if you use recaptcha -->
<script src="https://www.google.com/recaptcha/api.js"></script>
<!-- don't forget to load the script -->
<script type="text/javascript" src="/src/send-mail-front.js"></script>
```
Note the ID #gform (form tag) and the class .btn-mail (button submit tab)

##Example template email

open mail/contact.html

```html
<table>
	<tr>
		<td>
			Nom: {{name}}
			<br>
			email: {{email}}
			<br>
			phone: {{country}}
		  	<br>
		</td>
	</tr>
</table>
```

As you can see you can use variable from your html form the name of the variable must be the same as the name attribut on your html form

example name="email" can be use like this {{email}}
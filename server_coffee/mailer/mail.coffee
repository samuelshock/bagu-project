###
Created by samuel_choque on 12-08-14.
###
nodeMailer = require("nodemailer")
jade = require("jade")
fs = require("fs")
path = require("path")
config = require("../config/environment")
HTML_ERROR = "<div>error: the template was not generated </div>"

###
Read the template for sending by email

@nameTemplate name to template
@params       parameters for the template
@callback     the function asynchronous
###
module.exports.readTemplate = (nameTemplate, params, callback) ->
  rootTemplate = path.join(path.resolve(__dirname, "../"), "mail-template/" + nameTemplate)
  fs.readFile rootTemplate, "utf8", (err, data) ->
    unless err
      fn = jade.compile(data)
      html = fn(params)
      callback html
    else
      console.error err
      callback HTML_ERROR



###
Send a mail

@from   direction that sending the email
@email  direction to sending the email
@subj   subject the email
@message message
@callback the function asynchronous
###
module.exports.sendMail = (from, email, subj, message, callback) ->
  transport = nodeMailer.createTransport("SMTP", config.smtp)
  options =
    from: from # sender address
    to: email # list of receivers
    subject: subj # Subject line
    html: message #sender message

  transport.sendMail options, (error, response) ->
    callback error

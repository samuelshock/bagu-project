/**
 * Created by samuel_choque on 12-08-14.
 */
var nodeMailer  = require("nodemailer");
var jade        = require('jade');
var fs          = require('fs');
var path        = require('path');
var config      = require('../config/environment');

var HTML_ERROR = "<div>error: the template was not generated </div>";
/**
 * Read the template for sending by email
 *
 * @nameTemplate name to template
 * @params       parameters for the template
 * @callback     the function asynchronous
 */
module.exports.readTemplate = function (nameTemplate, params, callback) {
  var rootTemplate = path.join(path.resolve(__dirname, '../'), 'mail-template/' + nameTemplate);
  fs.readFile(rootTemplate, 'utf8', function (err, data) {
    if (!err) {
      var fn    = jade.compile(data);
      var html  = fn(params);
      callback(html);
    } else {
      console.error(err);
      callback(HTML_ERROR);
    }
  });
};

/**
 * Send a mail
 *
 * @from   direction that sending the email
 * @email  direction to sending the email
 * @subj   subject the email
 * @message message
 * @callback the function asynchronous
 */
module.exports.sendMail = function (from, email, subj, message, callback) {
  var transport = nodeMailer.createTransport("SMTP", config.smtp);
  var options = {
    from  : from, // sender address
    to    : email, // list of receivers
    subject: subj, // Subject line
    html  : message //sender message
  };
  transport.sendMail(options, function (error, response) {
    callback(error);
  });
};
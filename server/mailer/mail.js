
/*
Created by samuel_choque on 12-08-14.
 */

(function() {
  var HTML_ERROR, config, fs, jade, nodeMailer, path;

  nodeMailer = require("nodemailer");

  jade = require("jade");

  fs = require("fs");

  path = require("path");

  config = require("../config/environment/index");

  HTML_ERROR = "<div>error: the template was not generated </div>";


  /*
  Read the template for sending by email
  
  @nameTemplate name to template
  @params       parameters for the template
  @callback     the function asynchronous
   */

  module.exports.readTemplate = function(nameTemplate, params, callback) {
    var rootTemplate;
    rootTemplate = path.join(path.resolve(__dirname, "../"), "mail-template/" + nameTemplate);
    console.log('***********************************');
    console.log(rootTemplate);
    return fs.readFile(rootTemplate, "utf8", function(err, data) {
      var fn, html;
      if (!err) {
        fn = jade.compile(data);
        html = fn(params);
        return callback(html);
      } else {
        console.error(err);
        return callback(HTML_ERROR);
      }
    });
  };


  /*
  Send a mail
  
  @from   direction that sending the email
  @email  direction to sending the email
  @subj   subject the email
  @message message
  @callback the function asynchronous
   */

  module.exports.sendMail = function(from, email, subj, message, callback) {
    var options, transport;
    console.log('++++++++++++++++++++++++++++++++++++++');
    console.log(config.smtp);
    transport = nodeMailer.createTransport(config.smtp);
    options = {
      from: from,
      to: email,
      subject: subj,
      html: message
    };
    return transport.sendMail(options, function(error, response) {
      return callback(error);
    });
  };

}).call(this);

//# sourceMappingURL=mail.js.map

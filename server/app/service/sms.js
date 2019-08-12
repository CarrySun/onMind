//螺丝帽：短信验证码借口
"use strict";

var https = require("https");
var querystring = require("querystring");
var Promise = require("bluebird");
var speakeasy = require("speakeasy");

var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var config = require("../../config/config");

smtpTransport = nodemailer.createTransport(
  smtpTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  })
);

exports.getCode = function() {
  var code = speakeasy.totp({
    secret: "onmind",
    digits: 4
  });

  return code;
};

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
exports.sendMail = function(recipient, subject, html) {
  return new Promise(function(resolve, reject) {
    smtpTransport.sendMail(
      {
        from: config.email.user,
        to: recipient,
        subject: subject,
        html: html
      },
      function(error, response) {
        if (error) {
          console.log(error.message);
          reject(error)
        }
        resolve('发送成功')
      }
    );
  });
};

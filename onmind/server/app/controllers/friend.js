"use strict";

var xss = require("xss");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Notice = mongoose.model("Notice");
var uuid = require("uuid");
var sms = require("../service/sms");

exports.searchFriend = async (ctx, next) => {
  var body = ctx.request.body;
  var user;
  if (body.type == "email") {
    user = await User.findOne({
      user_email: body.friend
    });
    ctx.body = { success: true, data: user };
  } else if (body.type == "name") {
    user = await User.findOne({
      user_name: body.friend
    });
    ctx.body = { success: true, data: user };
  }
  console.log(user)
};

exports.addFriend = async (ctx, next) => {
  var body = ctx.request.body;
  var fromUser = ctx.session.user;
  if (body.type == "email") {
    var toUser = await User.findOne({
      user_email: body.friend
    }).exec();
    if (toUser) {
      var notice = new Notice({
        toUser: toUser._id,
        fromUser: fromUser._id,
        type: "addFriend"
      });
      try {
        notice = await notice.save();
      } catch (e) {
        console.log(e);
        ctx.body = {
          success: false,
          err: e
        };
        return next;
      }
      ctx.body = { success: true };
    } else {
      ctx.body = { success: false, err: "没有这个用户" };
      return next;
    }
  }
};

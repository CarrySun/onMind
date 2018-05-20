"use strict";

var xss = require("xss");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Notice = mongoose.model("Notice");
var Friend = mongoose.model("Friend");
var uuid = require("uuid");
var sms = require("../service/sms");

var userFields = ["_id", "user_name", "user_email"];

exports.list = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  var friend = await Friend.find({
    $or: [
      { answer_id: user._id }, { ask_id: user._id }
    ]
  }).limit(body.page_size).skip(body.page_size * (body.page_no - 1))
    .sort({
      createTime: -1
    })
    .populate("answer_id", userFields.join(" "))
    .populate("ask_id", userFields.join(" "))
    .exec();
  ctx.body = {
    success: true,
    data: friend,
    total: friend.length
  };
};

exports.search = async (ctx, next) => {
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

exports.add = async (ctx, next) => {
  var body = ctx.request.body;
  var fromUser = ctx.session.user;
  var toUser
  if (body.type == "email") {
    toUser = await User.findOne({
      user_email: body.friend
    }).exec();
  } else if (body.type == "name") {
    toUser = await User.findOne({
      user_name: body.friend
    }).exec();
  }
  if (toUser) {
    if (fromUser._id == toUser._id.toString()) {
      ctx.body = { success: false, err: "别添加自己好不好" };
      return next;
    } else {
      var flag = false
      var friend = await Friend.find({}, { ask_id: toUser._id }, { answer_id: toUser._id })
      console.log(friend)
      // var answerFriend = await Friend.find({
      //   ask_id: toUser._id
      // })
      // var askFriend = await Friend.find({
      //   answer_id: toUser._id
      // })
      // if ((answerFriend && answerFriend.answer_id == fromUser._id) || (askFriend && askFriend.ask_id == fromUser._id)) {
      //   ctx.body = { success: false, err: "他／她已经是你的好友了哦" };
      // }

      // console.log('answerFriend')
      // console.log(answerFriend)
      // console.log('askFriend')
      // console.log(askFriend)
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
    }
  } else {
    ctx.body = { success: false, err: "没有这个用户" };
    return next;
  }
};

exports.delete = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  await Friend.remove({ _id: body._id });
  try {
    await Friend.remove({ _id: body._id });
  } catch (e) {
    console.log(e);
    ctx.body = {
      success: false,
      err: e
    };
    return next;
  }
  ctx.body = {
    success: true
  };
};
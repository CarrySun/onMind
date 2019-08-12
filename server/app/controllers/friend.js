"use strict";

var xss = require("xss");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Notice = mongoose.model("Notice");
var File = mongoose.model("File");
var Friend = mongoose.model("Friend");
var uuid = require("uuid");
var sms = require("../service/sms");
var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var userFields = ["_id", "user_name", "user_email"];

exports.list = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  var friend = await Friend.find({
    $or: [{ answer_id: user._id }, { ask_id: user._id }]
  })
    .limit(body.page_size)
    .skip(body.page_size * (body.page_no - 1))
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
    // user = await User.findOne({
    //   user_name: body.friend
    // });
    user = await User.find({
      user_name: { $regex: body.friend, $options: "i" }
    });
    ctx.body = { success: true, data: user };
  }
  console.log(user);
};

exports.add = async (ctx, next) => {
  var body = ctx.request.body;
  var fromUser = ctx.session.user;
  var toUser;
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
    console.log(toUser)
    if (fromUser._id == toUser._id.toString()) {
      ctx.body = { success: false, err: "不可以添加自己为好友哦" };
      return next;
    } else {
      // var flag = false;
      // var friend = await Friend.find(
      //   // {},
      //   { ask_id: toUser._id },
      //   { answer_id: toUser._id }
      // );
      // console.log("friend");
      // console.log(friend);
      var answerFriend = await Friend.findOne({
        ask_id: toUser._id
      })
      var askFriend = await Friend.findOne({
        answer_id: toUser._id
      })

      console.log('answerFriend')
      console.log(answerFriend)
      console.log('askFriend')
      console.log(askFriend)
      console.log(fromUser._id)
      if ((answerFriend && answerFriend.answer_id.toString() == fromUser._id) || (askFriend && askFriend.ask_id.toString() == fromUser._id)) {
        ctx.body = { success: false, err: "他／她已经是你的好友了哦" };
      }
      else {
        var notice = await Notice.find({
          toUser: toUser._id,
          fromUser: fromUser._id,
          type: "addFriend",
          agreed: 1
        });
        if (notice.length == 0) {
          notice = new Notice({
            toUser: toUser._id,
            fromUser: fromUser._id,
            type: "addFriend",
            agreed: 1
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
          ctx.body = {
            success: true,
            data: {
              notice: notice,
              to: toUser._id
            }
          };
        } else {
          ctx.body = { success: false, err: "已发送过好友请求了哦" };
        }
      }
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
exports.addPartner = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  var checked = body.checked;
  var uncheck = body.uncheck;
  var file_partner = body.file_partner;
  for (var i in checked) {
    var file = await File.findOne({ file_title: checked[i] }).exec();
    if (!file.file_partner) {
      file.file_partner = [];
    }
    var flag = false;
    for (var j = 0; j < file.file_partner.length; j++) {
      if (file.file_partner[j] == file_partner) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      file.file_partner.push(file_partner);
      try {
        file = await file.save();
        var notice = new Notice({
          toUser: body.file_partner,
          fromUser: user._id,
          type: "addPartner",
          content: file._id
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
      } catch (e) {
        console.log(e);
        ctx.body = {
          success: false,
          err: e
        };
        return next;
      }
    }
  }
  for (var i in uncheck) {
    var file = await File.findOne({ file_title: uncheck[i] }).exec();
    if (!file.file_partner) {
      file.file_partner = [];
    }
    var flag = false;
    var index = 0;
    for (var j = 0; j < file.file_partner.length; j++) {
      if (file.file_partner[j] == file_partner) {
        index = j;
        flag = true;
        break;
      }
    }
    if (flag) {
      file.file_partner.splice(index, 1);
      try {
        file = await file.save();
      } catch (e) {
        console.log(e);
        ctx.body = {
          success: false,
          err: e
        };
        return next;
      }
    }
  }
  ctx.body = {
    success: true,
    data: notice
  };
};

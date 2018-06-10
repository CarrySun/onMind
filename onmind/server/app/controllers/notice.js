"use strict";

var mongoose = require("mongoose");
var Notice = mongoose.model("Notice");
var Friend = mongoose.model("Friend");
var User = mongoose.model("User");

var userFields = ["_id", "user_name", "user_email"];
var fileFields = ["_id", "file_title"];
function cloneObj(obj) {
  var str,
    newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== "object") {
    return;
  } else {
    (str = JSON.stringify(obj)), //系列化对象
      (newobj = JSON.parse(str)); //还原
  }
  //  else {
  //   for (var i in obj) {
  //     newobj[i] = typeof obj[i] === "object" ? cloneObj(obj[i]) : obj[i];
  //   }
  // }
  return newobj;
}
exports.list = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  var notice = await Notice.find({ toUser: user._id })
    .sort({
      createTime: -1
    })
    .populate("fromUser", userFields.join(" "))
    .populate("content", fileFields.join(" "))
    .exec();
  console.log(notice.constructor);
  var oldNotice = cloneObj(notice)
  ctx.body = { success: true, data: oldNotice, newNotice: newNotice, total: oldNotice.length };
  if (body.flag) {
    var newNotice = notice.concat()
    console.log(newNotice)
    for (var i = 0; i < newNotice.length; i++) {
      if (!newNotice[i].readed && newNotice[i].type == "agreeFriend") {
        newNotice[i].readed = true;
        try {
          await newNotice[i].save();
        } catch (e) {
          console.log(e);
          ctx.body = {
            success: true,
            err: e
          };
          return next;
        }
      }
    }
  }
};
exports.update = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  var notice = await Notice.findOne({ _id: body._id }).exec();
  if (notice) {
    var friend;
    if (body.type == "addFriend") {
      notice.agreed = body.agreed;
      notice.readed = true;
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
      //同意 添加好友
      if (body.agreed == 2) {
        friend = new Friend({
          answer_id: user._id,
          ask_id: body.from_id
        });
        try {
          friend = await friend.save();
        } catch (e) {
          console.log(e);
          ctx.body = {
            success: false,
            err: e
          };
          return next;
        }
        friend = await Friend.findOne({ _id: friend._id })
          .populate("answer_id", userFields.join(" "))
          .populate("ask_id", userFields.join(" "));
      }
      //同意或拒绝 通知请求方
      var newNotice = new Notice({
        toUser: body.from_id,
        fromUser: user._id,
        type: "agreeFriend",
        agreed: body.agreed
      });
      try {
        newNotice = await newNotice.save();
      } catch (e) {
        console.log(e);
        ctx.body = {
          success: false,
          err: e
        };
        return next;
      }
    }
    ctx.body = {
      data: {
        friend: friend,
        notice: notice,
        to: body.from_id
      },
      success: true
    };
  } else {
    ctx.body = {
      success: false,
      err: "该文件不存在"
    };
  }
};

exports.recive = async (ctx, next) => {
  var body = ctx.request.body;
  var notice = await Notice.findOne({ _id: body._id }).exec();
  notice.readed = true;
  try {
    notice = await notice.save();
  } catch (e) {
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

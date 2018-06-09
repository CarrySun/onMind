"use strict";

var mongoose = require("mongoose");
var Notice = mongoose.model("Notice");
var Friend = mongoose.model("Friend");
var User = mongoose.model("User");

var userFields = ["_id", "user_name", "user_email"];
var fileFields = ["_id", "file_title"];

exports.list = async (ctx, next) => {
  var user = ctx.session.user;
  var notice = await Notice.find({ toUser: user._id })
    .sort({
      createTime: -1
    })
    .populate("fromUser", userFields.join(" "))
    .populate("content", fileFields.join(" "))
    .exec();
  ctx.body = {
    success: true,
    data: notice,
    total: notice.length
  };
};
exports.update = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  var notice = await Notice.findOne({ _id: body._id }).exec();
  if (notice) {
    var friend
    if (body.type == "addFriend") {
      notice.agreed = body.agreed;
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
        to: body.from_id,
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
// exports.add = async (ctx, next) => {
//   var body = ctx.request.body;
//   var user = ctx.session.user;
//   var file_partner = [];
//   if (body.file_partner) {
//     var file_partner = await User.findOne({ user_name: body.file_partner });
//   }
//   var file = new Notice({
//     file_title: body.file_title,
//     file_type: body.file_type,
//     file_partner: file_partner,
//     file_owner: user._id
//   });
//   try {
//     file = await file.save();
//   } catch (e) {
//     console.log(e);
//     ctx.body = {
//       success: false,
//       err: e
//     };
//     return next;
//   }
//   var id = file._id;
//   file = await Notice.findOne({ _id: id })
//     .populate("file_owner", userFields.join(" "))
//     .exec();
//   ctx.body = {
//     success: true,
//     file: file
//   };
// };

// exports.delete = async (ctx, next) => {
//   var body = ctx.request.body;
//   var user = ctx.session.user;
//   await Notice.remove({ _id: body._id });
//   try {
//     await Notice.remove({ _id: body._id });
//   } catch (e) {
//     console.log(e);
//     ctx.body = {
//       success: false,
//       err: e
//     };
//     return next;
//   }
//   ctx.body = {
//     success: true
//   };
// };

// exports.getData = async (ctx, next) => {
//   var body = ctx.request.body;
//   var user = ctx.session.user;
//   var file = await Notice.findOne({ _id: body._id }).exec();
//   if (file) {
//     ctx.body = {
//       success: true,
//       data: file
//     };
//   } else {
//     ctx.body = {
//       success: false,
//       err: "该文件不存在"
//     };
//   }
// };

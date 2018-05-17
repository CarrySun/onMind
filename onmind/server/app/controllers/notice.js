"use strict";

var mongoose = require("mongoose");
var Notice = mongoose.model("Notice");
var User = mongoose.model("User");

var userFields = ["_id", "user_name", "user_email"];

exports.list = async (ctx, next) => {
  var user = ctx.session.user;
  var data = [];
  var readed = await Notice.find({ toUser: user._id, readed: true })
    .sort({
      createTime: -1
    })
    .populate("fromUser", userFields.join(" "))
    .exec();
  var unread = await Notice.find({ toUser: user._id, readed: false })
    .sort({
      createTime: -1
    })
    .populate("fromUser", userFields.join(" "))
    .exec();
  ctx.body = {
    success: true,
    data: { readed: readed, unread: unread },
    total: { readed: readed.length, unread: unread.length }
  };
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
// exports.update = async (ctx, next) => {
//   var body = ctx.request.body;
//   var user = ctx.session.user;
//   var file = await Notice.findOne({ _id: body._id }).exec();
//   if (file) {
//     if (body.file_title) {
//       file.file_title = body.file_title;
//     } else if (body.file_details) {
//       file.file_details = body.file_details;
//     }
//     console.log(body);
//     console.log(file);
//     try {
//       file = await file.save();
//     } catch (e) {
//       console.log(e);
//       ctx.body = {
//         success: false,
//         err: e
//       };
//       return next;
//     }
//     ctx.body = {
//       success: true
//     };
//   } else {
//     ctx.body = {
//       success: false,
//       err: "该文件不存在"
//     };
//   }
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

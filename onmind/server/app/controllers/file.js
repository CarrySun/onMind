"use strict";

var mongoose = require("mongoose");
var File = mongoose.model("File");
var User = mongoose.model("User");

var userFields = ["_id", "user_name", "user_email"];

exports.isTitleRepeat = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  var file = await File.find({ file_owner: user._id }).exec();
  console.log(file);
  if (file.length > 0) {
    for (var i = 0; i < file.length; i++) {
      if (file[i].file_title == body.file_title) {
        ctx.body = {
          success: false,
          err: "文件名已存在"
        };
        return next;
      }
    }
    ctx.body = {
      success: true
    };
    return next;
  } else {
    ctx.body = {
      success: true
    };
  }
};

exports.add = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  var file_partner = [];
  if (body.file_partner) {
    var file_partner = await User.findOne({ user_name: body.file_partner });
  }
  var file = new File({
    file_title: body.file_title,
    file_type: body.file_type,
    file_partner: file_partner,
    file_owner: user._id
  });
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
  var id = file._id;
  file = await File.findOne({ _id: id })
    .populate("file_owner", userFields.join(" "))
    .exec();
  ctx.body = {
    success: true,
    file: file
  };
};
exports.list = async (ctx, next) => {
  var body = ctx.request.body;
  var listType = ctx.request.body.listType;
  var user = ctx.session.user;
  var data = [];
  if (listType == "file_owner") {
    data = await File.find({ file_owner: user._id })
      .sort({
        createTime: -1
      })
      .populate("file_owner", userFields.join(" "))
      .exec();
  } else if (listType == "file_partner") {
    data = await File.find({ file_owner: { $all: user._id } })
      .sort({
        createTime: -1
      })
      .populate("file_owner", userFields.join(" "))
      .exec();
  }
  ctx.body = {
    success: true,
    data: data,
    total: data.length
  };
};

exports.delete = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  await File.remove({ _id: body._id });
  try {
    await File.remove({ _id: body._id });
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
exports.update = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  var file = await File.findOne({ _id: body._id }).exec();
  if (file) {
    if (body.file_title) {
      file.file_title = body.file_title;
    } else if (body.file_details) {
      file.file_details = body.file_details;
    }
    console.log(body);
    console.log(file)
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
    ctx.body = {
      success: true
    };
  } else {
    ctx.body = {
      success: false,
      err: "该文件不存在"
    };
  }
};

exports.getData = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  var file = await File.findOne({ _id: body._id }).exec();
  if (file) {
    ctx.body = {
      success: true,
      data: file
    };
  } else {
    ctx.body = {
      success: false,
      err: "该文件不存在"
    };
  }
};

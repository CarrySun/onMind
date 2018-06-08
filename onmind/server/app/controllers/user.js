"use strict";

var xss = require("xss");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var uuid = require("uuid");
var sms = require("../service/sms");

exports.verify = async (ctx, next) => {
  var user_email = ctx.request.body.user_email.trim();
  var user = await User.findOne({
    user_email: user_email
  }).exec();

  var verifyCode = sms.getCode();
  var accessToken = uuid.v4();
  if (user && !user.verified) {
    var fields = "user_email, verifyCode, accessToken".split(",");
    var body = {
      user_email: user_email,
      verifyCode: verifyCode,
      accessToken: accessToken
    };
    fields.forEach(function(field) {
      if (body[field]) {
        user[field] = body[field].trim();
      }
    });
  } else if (!user) {
    user = new User({
      user_email: user_email,
      verifyCode: verifyCode,
      accessToken: accessToken
    });
  } else {
    ctx.body = {
      success: false,
      err: "邮箱已经注册过了，请直接登录"
    };
    return next;
  }

  try {
    user = await user.save();
  } catch (e) {
    console.log(e);
    ctx.body = {
      success: false,
      err: e
    };
    return next;
  }

  // 发送验证码
  await sms
    .sendMail(
      user.user_email,
      "激活您的OnMind账号",
      "请输入以下验证码以激活您的OnMind账号" + user.verifyCode
    )
    .then(data => {
      console.log(data);
      if (data == "发送成功") {
        ctx.body = {
          success: true
        };
      }
    })
    .catch(err => {
      ctx.body = {
        success: false,
        err: "邮件发送失败"
      };
    });
};
exports.isNameRepeat = async (ctx, next) => {
  var body = ctx.request.body;
  var user = await User.findOne({
    user_name: body.user_name
  }).exec();
  if (user) {
    ctx.body = {
      success: false,
      err: "用户名已存在"
    };
    return next;
  } else {
    ctx.body = {
      success: true
    };
  }
};
exports.reg = async (ctx, next) => {
  var body = ctx.request.body;
  var verifyCode = body.verifyCode;
  var user_email = body.user_email;
  var user_password = body.user_password;
  var user_name = body.user_name;
  var user = await User.findOne({
    user_name: user_name
  }).exec();
  if (user) {
    ctx.body = {
      success: false,
      err: "用户名已存在"
    };
  } else {
    user = await User.findOne({
      user_email: user_email,
      verifyCode: verifyCode
    }).exec();
    if (user && user.verified) {
      ctx.body = {
        success: false,
        err: "邮箱已经注册过了，请直接登录"
      };
      return next;
    } else if (user) {
      user.verified = true;
      user.user_email = user_email;
      user.user_password = user_password;
      user.user_name = user_name;

      user = await user.save();

      console.log(user);

      ctx.body = {
        success: true,
        user: user
      };
    } else {
      ctx.body = {
        success: false,
        err: "验证码错误"
      };
    }
  }
};

exports.log = async (ctx, next) => {
  var body = ctx.request.body;
  var user_password = body.user_password;
  var user_email = body.user_email;
  var hasEmail = await User.findOne({
    user_email: user_email
  }).exec();
  if (hasEmail) {
    var user = await User.findOne({
      user_email: user_email,
      user_password: user_password
    }).exec();
    if (user) {
      ctx.body = {
        success: true,
        user: user
      };
    } else {
      ctx.body = {
        success: false,
        err: "密码错误"
      };
    }
  } else {
    ctx.body = {
      success: false,
      err: "邮箱未注册"
    };
  }
};
exports.verifyForget = async (ctx, next) => {
  var user_email = ctx.request.body.user_email.trim();
  var user = await User.findOne({
    user_email: user_email
  }).exec();

  var verifyCode = sms.getCode();
  var accessToken = uuid.v4();
  if (!user || (user && !user.verified)) {
    ctx.body = {
      success: false,
      err: "邮箱尚未注册"
    };
    return next;
  } else {
    user.verifyCode = verifyCode;

    try {
      user = await user.save();
    } catch (e) {
      console.log(e);
      ctx.body = {
        success: false,
        err: e
      };
      return next;
    }

    // 发送验证码
    await sms
      .sendMail(
        user.user_email,
        "OnMind-重置密码",
        "请输入以下验证码来重置密码" + user.verifyCode
      )
      .then(data => {
        if (data == "发送成功") {
          ctx.body = {
            success: true
          };
        }
      })
      .catch(err => {
        ctx.body = {
          success: false,
          err: "邮件发送失败"
        };
      });
  }
};

exports.forget = async (ctx, next) => {
  var body = ctx.request.body;
  var verifyCode = body.verifyCode;
  var user_email = body.user_email;
  var user_password = body.user_password;

  var user = await User.findOne({
    user_email: user_email,
    verifyCode: verifyCode
  }).exec();
  if (user) {
    user.user_password = user_password;
    user.verifyCode = "0527";
    try {
      user = await user.save();
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
      user: user
    };
  } else {
    ctx.body = {
      success: false,
      err: "验证码错误"
    };
  }
};
exports.update = async (ctx, next) => {
  var body = ctx.request.body;
  var user = ctx.session.user;
  var fields = "user_name".split(",");
  fields.forEach(function(field) {
    if (body[field]) {
      user[field] = xss(body[field].trim());
    }
  });
  try {
    user = await user.save();
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
    data: user
  };
};
exports.updatePwd = async (ctx, next) => {
  var oldpwd = ctx.request.body.oldpwd;
  var newpwd = ctx.request.body.newpwd;
  var user = ctx.session.user;
  console.log(user.user_password)
  if (user.user_password == oldpwd) {
    user.user_password = newpwd;
    try {
      user = await user.save();
      ctx.body = {
        success: true,
        data: user
      };
    } catch (e) {
      console.log(e);
      ctx.body = {
        success: false,
        err: e
      };
      return next;
    }
  } else {
    ctx.body = {
      success: false,
      err: "旧密码错误"
    };
  }
};

exports.getUserInfo = async (ctx, next) => {
  var _id = ctx.request.body._id;
  var user = await User.findOne({
    _id: _id
  });
  if (user) {
    ctx.body = {
      success: true,
      user: user
    };
  } else {
    ctx.body = {
      success: false,
      errMsg: "未找到用户信息"
    };
  }
};

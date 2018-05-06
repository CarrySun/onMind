'use strict'

var mongoose = require('mongoose')
var User = mongoose.model('User')

exports.hasBody = async (ctx, next) => {
  var body = ctx.request.body || {}
  console.log(body)
  if (!body || Object.keys(body).length === 0) {
    ctx.body = {
      success: false,
      err: '是不是漏掉什么了'
    }

    return next
  }

  await next()
}

exports.hasToken = async (ctx, next) => {
  var accessToken = ctx.query.accessToken

  if (!accessToken) {
    accessToken = ctx.request.body.accessToken
  }

  if (!accessToken) {
    ctx.body = {
      success: false,
      err: '登陆状态失效，请重新登陆'
    }

    return next
  }

  var user = await User.findOne({
      accessToken: accessToken
    })
    .exec()

  if (!user) {
    ctx.body = {
      success: false,
      err: '用户没登陆'
    }

    return next
  }

  ctx.session = ctx.session || {}
  ctx.session.user = user

  await next()
}

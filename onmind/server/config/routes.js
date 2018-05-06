'use strict'

var Router = require('koa-router')
var App = require('../app/controllers/app')
var User = require('../app/controllers/user')
var File = require('../app/controllers/file')

module.exports = function() {
  var router = new Router({
    prefix: '/api'
  })
  router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  //user
  router.post('/u/verify', App.hasBody, User.verify)
  router.post('/u/isNameRepeat', App.hasBody, User.isNameRepeat)
  router.post('/u/reg', App.hasBody, User.reg)
  router.post('/u/log', App.hasBody, User.log)
  router.post('/u/verifyForget', App.hasBody, User.verifyForget)
  router.post('/u/forget', App.hasBody, User.forget)

  router.post('/u/update', App.hasBody, App.hasToken, User.update)
  router.post('/u/updatePwd', App.hasBody, App.hasToken, User.updatePwd)

  //file

  router.post('/f/isTitleRepeat', App.hasBody, App.hasToken, File.isTitleRepeat)
  router.post('/f/add', App.hasBody, App.hasToken, File.add)
  router.post('/f/list', App.hasBody, App.hasToken, File.list)
  router.post('/f/delete', App.hasBody, App.hasToken, File.delete)
  router.post('/f/update', App.hasBody, App.hasToken, File.update)
  router.post('/f/getData', App.hasBody, App.hasToken, File.getData)
  return router
}

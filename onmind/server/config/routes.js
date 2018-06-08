"use strict";

var Router = require("koa-router");
var App = require("../app/controllers/app");
var User = require("../app/controllers/user");
var File = require("../app/controllers/file");
var Friend = require("../app/controllers/friend");
var Notice = require("../app/controllers/notice");
module.exports = function () {
  var router = new Router({
    prefix: "/api"
  });
  router.get("/", (ctx, next) => {
    ctx.body = "Hello World!";
  });
  //user
  router.post("/user/verify", App.hasBody, User.verify);
  router.post("/user/isNameRepeat", App.hasBody, User.isNameRepeat);
  router.post("/user/reg", App.hasBody, User.reg);
  router.post("/user/log", App.hasBody, User.log);
  router.post("/user/verifyForget", App.hasBody, User.verifyForget);
  router.post("/user/forget", App.hasBody, User.forget);

  router.post("/user/update", App.hasBody, App.hasToken, User.update);
  router.post("/user/updatePwd", App.hasBody, App.hasToken, User.updatePwd);

  //file
  router.post("/file/isTitleRepeat",App.hasBody,App.hasToken,File.isTitleRepeat);
  router.post("/file/add", App.hasBody, App.hasToken, File.add);
  router.post("/file/list", App.hasBody, App.hasToken, File.list);
  router.post("/file/delete", App.hasBody, App.hasToken, File.delete);
  router.post("/file/update", App.hasBody, App.hasToken, File.update);
  router.post("/file/getData", App.hasBody, App.hasToken, File.getData);
  router.post('/file/quitPartner', App.hasBody, App.hasToken, File.quitPartner);

  //friend

  router.post("/friend/search", App.hasBody, App.hasToken, Friend.search);
  router.post("/friend/add", App.hasBody, App.hasToken, Friend.add);
  router.post("/friend/list", App.hasBody, App.hasToken, Friend.list);
  router.post("/friend/delete", App.hasBody, App.hasToken, Friend.delete);
  router.post("/friend/addPartner", App.hasBody, App.hasToken, Friend.addPartner);

  //notice
  router.post("/notice/list", App.hasBody, App.hasToken, Notice.list);
  router.post("/notice/update", App.hasBody, App.hasToken, Notice.update);
  return router;
};

"use strict";

var fs = require("fs");
var path = require("path");
var mongoose = require("mongoose");
var db = "mongodb://localhost/onmind";
// var db = "mongodb://simpleUser:simplePass@localhost/onmind";
mongoose.Promise = require("bluebird");
mongoose.connect(db);

var models_path = path.join(__dirname, "/app/models");

var walk = function(modelPath) {
  fs.readdirSync(modelPath).forEach(function(file) {
    var filePath = path.join(modelPath, "/" + file);
    var stat = fs.statSync(filePath);

    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(filePath);
      }
    } else if (stat.isDirectory()) {
      walk(filePath);
    }
  });
};

walk(models_path);

const Koa = require("koa");
// var koa = require('koa')
var logger = require("koa-logger");
var session = require("koa-session");
var bodyParser = require("koa-bodyparser");
const app = new Koa();

app.keys = ["im onmind"];
app.use(logger());
app.use(session(app));
app.use(bodyParser());

var router = require("./config/routes")();

app.use(router.routes()).use(router.allowedMethods());

var server = app.listen(3000);
const io = require("socket.io")(server);

if (user) {
  console.log(user);
}
var usocket = {},
  user = [];

var number = 0;
io.on("connection", function(socket) {
  socket.on("log", _id => {
    console.log("------------------------有人上线哦------------------------");
    console.log("新来的：");
    console.log(_id);
    socket._id = _id;
    if (!(_id in usocket)) {
      usocket[_id] = socket;
      user.push(_id);
    }
    console.log("在线的人:");
    console.log(user);
    socket.emit("login", "hello" + _id);
  });
  socket.on("logout", function(_id) {
    console.log("------------------------走了一个人--------------------");
    console.log(_id);
    if (_id in usocket) {
      delete usocket[_id];
      user.splice(user.indexOf(_id), 1);
    }
    console.log("现在还有谁在");
    console.log(user);
    socket.broadcast.emit("user left", _id);
  });
  socket.on("disconnect", function() {
    console.log("------------------------走了一个人--------------------");
    console.log(socket._id);
    if (socket._id in usocket) {
      delete usocket[socket._id];
      user.splice(user.indexOf(socket._id), 1);
    }
    console.log("现在还有谁在");
    console.log(user);
    socket.broadcast.emit("user left", socket._id);
  });

  socket.on("newNotice", function(res) {
    // console.log(res);
    console.log("newNotice");

    if (res.to in usocket) {
      console.log("在线");
      usocket[res.to].emit("newNotice", res);
    } else {
      console.log(res.to + "不在线 收不到消息");
    }
  });
  socket.on("newReplayNotice", function(res) {
    // console.log(res);
    console.log("newReplayNotice");
    if (res.to in usocket) {
      console.log("在线");
      usocket[res.to].emit("newReplayNotice", res);
    } else {
      console.log(res.to + "不在线 收不到消息");
    }
  });
  socket.on("newPartner", function(res) {
    // console.log(res);
    console.log("newPartner");
    for (var i in res.tos) {
      if (res.tos[i] in usocket) {
        console.log("在线");
        usocket[res.tos[i]].emit("newPartner", res);
      } else {
        console.log(res.tos[i] + "不在线 收不到消息");
      }
    }
  });
  socket.on("addEditingUser", function(res) {
    // console.log(res);
    console.log("addEditingUser");
    for (var i in res.tos) {
      if (res.tos[i] in usocket) {
        console.log(res.tos[i] + "在线");
        usocket[res.tos[i]].emit("addEditingUser", res);
      } else {
        console.log(res.tos[i] + "不在线 收不到消息");
      }
    }
  });
  socket.on("removeEditingUser", function(res) {
    // console.log(res);
    console.log("removeEditingUser");
    for (var i in res.tos) {
      if (res.tos[i] in usocket) {
        console.log(res.tos[i] + "在线");
        usocket[res.tos[i]].emit("removeEditingUser", res);
      } else {
        console.log(res.tos[i] + "不在线 收不到消息");
      }
    }
  });
  socket.on("addLookingUser", function(res) {
    // console.log(res);
    console.log("addLookingUser");
    for (var i in res.tos) {
      if (res.tos[i] in usocket) {
        console.log(res.tos[i] + "在线");
        usocket[res.tos[i]].emit("addLookingUser", res);
      } else {
        console.log(res.tos[i] + "不在线 收不到消息");
      }
    }
  });
  socket.on("removeLookingUser", function(res) {
    // console.log(res);
    console.log("removeLookingUser");
    for (var i in res.tos) {
      if (res.tos[i] in usocket) {
        console.log(res.tos[i] + "在线");
        usocket[res.tos[i]].emit("removeLookingUser", res);
      } else {
        console.log(res.tos[i] + "不在线 收不到消息");
      }
    }
  });
  socket.on("quit", function(res) {
    // console.log(res);
    console.log("quit");
    quit(res.file_id, res._id);
  });
});
var mongoose = require("mongoose");
var File = mongoose.model("File");
function quit(file_id, _id) {
  File.findOne({
    _id: file_id
  }).then(file => {
    if (file) {
      file.isEdit = false;
      file.editingUser = null;
      if (!file.lookingUser) {
        file.lookingUser = [];
      }
      for (var i = 0; i < file.lookingUser.length; i++) {
        if (file.lookingUser[i].toString() == _id) {
          file.lookingUser.splice(i, 1);
          break;
        }
      }
      for (var i = 0; i < file.lookingUser.length; i++) {
        if (file.lookingUser[i] in usocket) {
          console.log(file.lookingUser[i] + "在线");
          var res = {
            lookingUser: file.lookingUser
          };
          console.log(res);
          usocket[file.lookingUser[i]].emit("removeLookingUser", res);
          usocket[file.lookingUser[i]].emit("removeEditingUser");
        } else {
          console.log(file.lookingUser[i] + "不在线 收不到消息");
        }
      }
      file.save();
    }
  });
}

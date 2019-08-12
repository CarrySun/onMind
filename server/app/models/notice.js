"use strict";
var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var NoticeSchema = new Schema({
  fromUser: {
    type: ObjectId,
    ref: "User"
  },
  toUser: {
    type: ObjectId,
    ref: "User"
  },
  //agreeFriend addFriend addPartner
  type: String,
  content: {
    type: ObjectId,
    ref: "File"
  },
  readed: {
    type: Boolean,
    default: false
  },
  agreed: {//1, 2同意, 3拒绝
    type: Number,
    default: 1
  },
  createTime: {
    type: Date,
    default: Date.now()
  },
  updateTime: {
    type: Date,
    default: Date.now()
  }
});
NoticeSchema.pre("save", function(next) {
  if (!this.isNew) {
    this.updateTime = Date.now();
  } else {
    this.createTime = this.updateTime = Date.now();
  }
  next();
});

module.exports = mongoose.model("Notice", NoticeSchema);

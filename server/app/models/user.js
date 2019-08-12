'use strict'
var mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var UserSchema = new Schema({
  user_name: {
    unique: true,
    type: String
  },
  user_password: String,
  user_email:{
    unique: true,
    type: String
  },
  accessToken: String,
  verifyCode: String,
  verified: {
    type: Boolean,
    default: false
  },
  createTime: {
    type: Date,
    default: Date.now()
  },
  updateTime: {
    type: Date,
    default: Date.now()
  }
})
UserSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updateTime = Date.now()
  } else {
    this.createTime = this.updateTime = Date.now()
  }
  next()
})

module.exports = mongoose.model('User', UserSchema)

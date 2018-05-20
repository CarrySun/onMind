'use strict'
var mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var FriendSchema = new Schema({
  answer_id: {
    type: ObjectId,
    ref: "User"
  },
  ask_id: {
    type: ObjectId,
    ref: "User"
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
FriendSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updateTime = Date.now()
  } else {
    this.createTime = this.updateTime = Date.now()
  }
  next()
})

module.exports = mongoose.model('Friend', FriendSchema)

"use strict";
var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var FileSchema = new Schema({
  file_title: String,
  file_type: String,
  file_direction: String,
  // {
  //   type: String,
  //   default: "center"
  // },
  file_theme: {
    type: String,
    default: "primary"
  },
  file_details: [String],
  isEdit: {
    type: Boolean,
    default: false
  },
  lookingUser: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  editingUser: {
    type: ObjectId,
    ref: "User"
  },
  file_owner: {
    type: ObjectId,
    ref: "User"
  },
  file_partner: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  createTime: {
    type: Date,
    default: Date.now()
  },
  updateTime: {
    type: Date,
    default: Date.now()
  }
});
FileSchema.pre("save", function(next) {
  if (!this.isNew) {
    this.updateTime = Date.now();
  } else {
    this.createTime = this.updateTime = Date.now();
  }
  next();
});

module.exports = mongoose.model("File", FileSchema);

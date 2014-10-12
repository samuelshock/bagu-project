"use strict"
mongoose = require("mongoose")
Schema = mongoose.Schema
PlaceSchema = new Schema(
  name:
    type: String
    trim: true
    unique: true
    required: true

  sites: [
    type: String
  ]

  info: String
  active: Boolean
)
module.exports = mongoose.model("Place", PlaceSchema)
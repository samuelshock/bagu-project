mongoose = require 'mongoose'
Schema = mongoose.Schema
ArrangementSchema = new Schema(
  name:
    type: String
    trim: true
    unique: true
    required: true

  info:
    type: String
    required: true

  active:
    type: Boolean
    default: false

  register_date:
    type: Date
    default: new Date()

  price:
    type: Number

  total_price:
    type: Number
    default: (@price * @days)

  days:
    type: Number
    default: 1

  configuration: {}
)
module.exports = mongoose.model("Arrangement", ArrangementSchema)
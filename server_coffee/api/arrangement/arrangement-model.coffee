SHA256 = require 'crypto-js/sha256'
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

  publicationId:
    type: Schema.Types.ObjectId
    ref: "Publication"
#    required: true

  active:
    type: Boolean
    default: false

  register_date:
    type: Date
    default: new Date()

  activation_hash:
    type: String
    default: SHA256("#{@register_date}#{@publicationId}")

  activation_date:
    type: Date

  end_date:
    type: Date

  price:
    type: Number

  configuration: {}
)
module.exports = mongoose.model("Arrangement", ArrangementSchema)
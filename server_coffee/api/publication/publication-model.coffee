mongoose = require("mongoose")
SHA256 = require 'crypto-js/sha256'
Schema = mongoose.Schema
commentSchema = new Schema(
  comment:
    type: String
    trim: true

  registerDate:
    type: Date
    default: Date.now

  person:
    type: Schema.Types.ObjectId
    ref: "User"
)

plan = new Schema(

  arrangement:
    type: Schema.Types.ObjectId
    ref: "Arrangement"
    
  register_date:
    type: Date
    default: new Date()

  activation_hash:
    type: String
    default: SHA256("#{@register_date}#{@arrangement}")

  activation_date:
    type: Date

  end_date:
    type: Date

)
starsSchema = new Schema(
  votes:
    type: Number

  registerDate:
    type: Date
    default: Date.now
)
PublicationSchema = new Schema(
  owner:
    type: Schema.Types.ObjectId
    ref: "User"

  name:
    type: String
    trim: true
    unique: true
    required: true

  shortDescription:
    type: String
    required: true

  description:
    type: String

  address:
    type: String
    trim: true
    unique: true
    required: true

  web_site:
    type: String

  phone:
    type: String
    trim: true
    unique: true
    required: true

  tags: [
    type: String
    trim: true
    unique: true
  ]

  followers: [
    type: Schema.Types.ObjectId
    ref: "User"
  ]

  map:
    type: Schema.Types.ObjectId
    ref: "Map"

  stars: [ starsSchema ]

  comments: [ commentSchema ]

  images: [
    type: String
    default: "place.jpg"
  ]

  date:
    type: Date
    default: Date.now

  isActive: Boolean

  city:
    type: String
    lowercase: true
    required: true

  province:
    type: String


  visits:
    type: Number

  priority:
    type: Number
    default: 3

  arrangement:
    type: Schema.Types.ObjectId
    ref: 'Arrangement'
)
module.exports = mongoose.model("Publication", PublicationSchema)
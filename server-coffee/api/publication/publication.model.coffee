mongoose = require("mongoose")
Schema = mongoose.Schema
commentSchema = new Schema(
  comment:
    type: String

  registerDate:
    type: Date
    default: Date.now

  person:
    type: Schema.Types.ObjectId
    ref: "User"
)
starsSchema = new Schema(
  votes:
    type: Number

  personVotes:
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
    required: true

  shortDescription:
    type: String
    required: true

  description:
    type: String

  address:
    type: String
    required: true

  phone:
    type: String

  tags: [ type: String ]
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
    required: true

  province:
    type: String

  visits:
    type: Number

  priority:
    type: Number
    default: 3
)
module.exports = mongoose.model("Publication", PublicationSchema)
"use strict"
mongoose = require("mongoose")
Schema = mongoose.Schema
crypto = require("crypto")
authTypes = [ "github", "twitter", "facebook", "google" ]
Q = require 'q'
mailer = require '../../mailer/mail'
messagesDoc = new Schema(
  remitter:
    type: Schema.Types.ObjectId
    ref: "User"

  Date:
    type: Date
    default: Date.now

  message:
    type: String

  title:
    type: String

  isRead:
    type: Boolean
    default: false
)
alertsDoc = new Schema(
  Date:
    type: Date
    default: Date.now

  type:
    type: String

  title:
    type: String

  message:
    type: String
)
UserSchema = new Schema(
  role:
    type: String
    default: "user"

  hashedPassword: String
  provider: String
  salt: String
  facebook: {}
  twitter: {}
  google: {}
  github: {}
  name:
    type: String
    required: true

  email:
    type: String
    required: true
    index:
      unique: true
      sparse: true

    lowercase: true

  hash:
    type: String

  publications: [
    type: Schema.Types.ObjectId
    ref: "publication"
  ]
  favorites: [
    type: Schema.Types.ObjectId
    ref: "publication"
  ]
  registerDate:
    type: Date
    default: Date.now

  profilePhoto:
    type: String
    default: "profile/profile.png"

  messages: [ messagesDoc ]
  alerts: [ alertsDoc ]
  pending:
    type: Boolean
    default: false
)

###
Virtuals
###
UserSchema.virtual("password").set((password) ->
  @_password = password
  @salt = @makeSalt()
  @hashedPassword = @encryptPassword(password)
).get ->
  @_password


# Public profile information
UserSchema.virtual("profile").get ->
  name: @name
  role: @role


# Non-sensitive info we'll be putting in the token
UserSchema.virtual("token").get ->
  _id: @_id
  role: @role


###
Validations
###

# Validate empty email
UserSchema.path("email").validate ((email) ->
  return true  if authTypes.indexOf(@provider) isnt -1
  email.length
), "Email cannot be blank"

# Validate empty password
UserSchema.path("hashedPassword").validate ((hashedPassword) ->
  return true  if authTypes.indexOf(@provider) isnt -1
  hashedPassword.length
), "Password cannot be blank"

# Validate email is not taken
UserSchema.path("email").validate ((value, respond) ->
  self = this
  @constructor.findOne
    email: value
  , (err, user) ->
    throw err  if err
    if user
      return respond(true)  if self.id is user.id
      return respond(false)
    respond true

), "The specified email address is already in use."
validatePresenceOf = (value) ->
  value and value.length


###
Pre-save hook
###
UserSchema.pre "save", (next) ->
  return next()  unless @isNew
  if not validatePresenceOf(@hashedPassword) and authTypes.indexOf(@provider) is -1
    next new Error("Invalid password")
  else
    next()


###
Methods
###
UserSchema.methods =
  ###
  Adds a publication

  @param publication [Publication]
  ###
  addPublication: (publication) ->
    deferred = Q.defer()
    @publications.push publication._id
    @save (error) ->
      deferred.reject error if error

      deferred.resolve @

  ###
  Authenticate - check if the passwords are the same

  @param {String} plainText
  @return {Boolean}
  @api public
  ###
  authenticate: (plainText) ->
    @encryptPassword(plainText) is @hashedPassword


  ###
  Make salt

  @return {String}
  @api public
  ###
  makeSalt: ->
    crypto.randomBytes(16).toString "base64"


  ###
  Encrypt password

  @param {String} password
  @return {String}
  @api public
  ###
  encryptPassword: (password) ->
    return ""  if not password or not @salt
    salt = new Buffer(@salt, "base64")
    crypto.pbkdf2Sync(password, salt, 10000, 64).toString "base64"

module.exports = mongoose.model("User", UserSchema)
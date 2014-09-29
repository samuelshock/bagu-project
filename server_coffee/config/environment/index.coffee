path = require("path")
_ = require("lodash")


requiredProcessEnv = (name) ->
  throw new Error("You must set the " + name + " environment variable")  unless process.env[name]
  process.env[name]


# All configurations will extend these options
# ============================================
all =
  smtp:
    service: "hotmail"
    auth:
      user: "samuel7_3@hotmail.com"
      pass: "6d696c64726564"

#    host: "smtp.gmail.com"
#    secureConnection: false
#    port: 587
#    requiresAuth: true
#    domains: [ "gmail.com", "googlemail.com" ]
#    auth:
#      user: "artutobagu@gmail.com"
#      pass: "arturotapia"

  env: process.env.NODE_ENV

# Root path of server
  root: path.normalize(__dirname + "/../../..")

# Server port
  port: process.env.PORT or 9000

# Should we populate the DB with sample data?
  seedDB: false

# Secret for session, you will want to change this and make it an environment variable
  secrets:
    session: "bagu-secret"


# List of user roles
  userRoles: [ "guest", "user", "admin" ]

# MongoDB connection options
  mongo:
    options:
      db:
        safe: true

  facebook:
    clientID: process.env.FACEBOOK_ID or "id"
    clientSecret: process.env.FACEBOOK_SECRET or "secret"
    callbackURL: process.env.DOMAIN + "/auth/facebook/callback"

  twitter:
    clientID: process.env.TWITTER_ID or "id"
    clientSecret: process.env.TWITTER_SECRET or "secret"
    callbackURL: process.env.DOMAIN + "/auth/twitter/callback"

  google:
    clientID: process.env.GOOGLE_ID or "id"
    clientSecret: process.env.GOOGLE_SECRET or "secret"
    callbackURL: process.env.DOMAIN + "/auth/google/callback"


# Export the config object based on the NODE_ENV
# ==============================================
module.exports = _.merge(all, require("./" + process.env.NODE_ENV + ".js") or {})
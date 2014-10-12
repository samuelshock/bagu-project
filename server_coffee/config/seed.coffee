###
Populate DB with sample data on server start
to disable, edit config/environment/index.js, and set `seedDB: false`
###
User = require("../api/user/user-model")

User.find({}).remove ->
  User.create
    provider: "local"
    name: "Test User"
    email: "test@test.com"
    password: "test"
  ,
    provider: "local"
    role: "admin"
    name: "Admin"
    email: "admin@admin.com"
    password: "admin"
  , ->
    console.log "finished populating users"


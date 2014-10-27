express = require('express')
configuration = require '../../config/config.json'

router = express.Router()
router.get '/', (req, res) ->
  res.json configuration

module.exports = router
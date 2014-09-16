exports.handleError = (res, err) ->
  res.send err.statusCode, err if err.statusCode
  res.send 500, err

exports.handleSuccess = (res, result) ->
  res.json result.statusCode, result if result.statusCode
  res.json 200, result
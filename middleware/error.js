const { ERROR_MESSAGE, STATUS_CODE } = require("../constant");

const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err.stack.red);

  res.status(err.statusCode || STATUS_CODE._500).json({
    success: false,
    error: err.message || ERROR_MESSAGE.SERVER
  })
}

module.exports = errorHandler;
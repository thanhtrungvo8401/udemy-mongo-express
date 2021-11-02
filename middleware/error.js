const ErrorResponse = require("../utils/errorResponse");
const { ERROR_MESSAGE, STATUS_CODE, MONGOOSE_ERROR } = require("../constant");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  let error = new ErrorResponse(err.message, err.statusCode);

  // Mongoose bad ObjectId:
  if (err.name === MONGOOSE_ERROR.BAD_OBJECT_ID) {
    error = new ErrorResponse(`Bootcamp not found with id of ${err.value}`, STATUS_CODE._404);
  }

  // Mongoose validation error:
  if (err.name === MONGOOSE_ERROR.VALIDATION) {
    const message = Object.values(err.errors).map(val => val.message).join(" ---- ");
    error = new ErrorResponse(message, STATUS_CODE._400);
  }

  res.status(error.statusCode || STATUS_CODE._500).json({
    success: false,
    error: error.message || ERROR_MESSAGE.SERVER
  })
}

module.exports = errorHandler;
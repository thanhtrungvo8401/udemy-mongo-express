const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { STATUS_CODE } = require("../constant");

// @Desc Register user:
// @route GET /api/v1/bootcamps
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user:
  const user = await User.create({
    name,
    email,
    password,
    role,
  })
  // Create token:
  const token = user.getSignedJwtToken()
  res.status(200).json({ success: true, token })
});

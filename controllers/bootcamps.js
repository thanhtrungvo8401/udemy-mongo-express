const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { STATUS_CODE } = require("../constant");
const asyncHanlder = require("../middleware/async");
const { query } = require("express");


// @Desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHanlder(async (req, res, next) => {
  // coppy req.query:
  const reqQuery = { ...req.query };

  // fields to exclude:
  const removeFields = ["select", "sort"];
  // Loop over removeFields and delete them from reqQuery:
  removeFields.forEach(param => delete reqQuery[param])

  // create query string:
  let queryStr = JSON.stringify(req.query);
  // create operators ($gt, $gte, etc..)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource:
  let query = Bootcamp.find(JSON.parse(queryStr));

  // Select fields:
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort:
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy)
  } else {
    query = query.sort("-createdAt")
  }

  const bootcamps = await query;
  res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @Desc Get a bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id=${req.params.id}`, STATUS_CODE._404));
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @Desc Create a new bootcamp
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(200).json({ success: true, data: bootcamp });
});

// @Desc Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params?.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if(!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id=${req.params.id}`, STATUS_CODE._404));
  }

  res.status(200).json({ success: true, data: bootcamp });
})

// @Desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params?.id, req.body);
  
  if(!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id=${req.params.id}`, STATUS_CODE._404));
  }

  res.status(200).json({ success: true, data: bootcamp });
});
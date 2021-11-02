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
  const reqQuery = { ...req.query };

  // fields to exclude:
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach(param => delete reqQuery[param])

  // create operators ($gt, $gte, etc..)
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // FETCH DATA:
  let query = Bootcamp.find(JSON.parse(queryStr));

  // SELECT, SORT, PAGINATION:
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy)
  } else {
    query = query.sort("-createdAt")
  }
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startInd = (page - 1) * limit;
  const endInd = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startInd).limit(limit);

  const bootcamps = await query;
  // Pagination result:
  const pagination = {};
  if (endInd < total) {
    pagination.next = { page: page + 1, limit }
  }
  if (startInd > 0) {
    pagination.prev = { page: page - 1, limit }
  }
  res.status(200).json({ success: true, count: bootcamps.length, pagination, data: bootcamps });
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
const { STATUS_CODE } = require("../constant");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");

// @Desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
}

// @Desc Get a bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id=${req.params.id}`, STATUS_CODE._404));
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(new ErrorResponse(`Bootcamp not found with id=${req.params.id}`, STATUS_CODE._404));
  }
}

// @Desc Create a new bootcamp
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({ 
      success: true,
      data: bootcamp
     });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: error
    })
  }
}

// @Desc Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params?.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if(!bootcamp) {
      return res.status(400).json({ success: false })
    }
  
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: error
    })
  }
}

// @Desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params?.id, req.body);
    
    if(!bootcamp) {
      return res.status(400).json({ success: false })
    }
  
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    })
  }
}
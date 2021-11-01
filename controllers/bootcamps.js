const Bootcamp = require("../models/Bootcamp");

// @Desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, data: bootcamps });
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
    const bootcamp = await Bootcamp.findById(req?.params?.id)

    if (!bootcamp) {
      return res.status(400).json({ success: false, data: {} })
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
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
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update a bootcamp ${req.params.id}` });
}

// @Desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
}
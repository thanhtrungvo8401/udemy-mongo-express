const express = require("express");
const router = express.Router({ mergeParams: true });
const { getCourses, getCourse, addCourse, updateCourse } = require("../controllers/course");
const { protect } = require("../middleware/auth");

router.route("/").get(getCourses).post(protect, addCourse);
router.route("/:id").get(getCourse).put(protect, updateCourse);

module.exports = router;
const express = require("express");
const router = express.Router({ mergeParams: true });
const { getCourses, getCourse, addCourse } = require("../controllers/course");

router.route("/").get(getCourses).post(addCourse);
router.route("/:id").get(getCourse);

module.exports = router;
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");


// Load env vars:
dotenv.config({
    path: "./config/config.env"
})

// Connect to DB:
connectDB();

// Route files:
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");

const { NODE_ENV } = require("./constant");

const app = express();

// Body parser:
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === NODE_ENV.DEV) {
    app.use(morgan('dev'));
}

// Mount routes:
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses)
app.use("/api/v1/auth", auth)

// Error Handler
app.use(errorHandler);

// SERVER RUN:
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejections:
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server and exit process:
    server.close(() => process.exit(1))
});
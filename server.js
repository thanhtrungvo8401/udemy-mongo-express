const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Load env vars:
dotenv.config({
    path: "./config/config.env"
})

// Route files:
const bootcamps = require("./routes/bootcamps");
const { NODE_ENV } = require("./constant");

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === NODE_ENV.DEV) {
    app.use(morgan('dev'));
}

// Mount routes:
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./db/db");
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointment");
const doctorRoutes = require("./routes/doctor");

dotenv.config();
const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(compression()); // Compress all routes
app.use(helmet()); // Secure headers
app.use(morgan("dev")); // Logging
app.use(limiter); // Rate limiting

app.use(
  cors({
    credentials: true,
    origin: process.env.VITE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);

app.get("/", (req, res) => {
  res.send("DocBook API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

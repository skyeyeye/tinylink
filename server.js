require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// // Routes
// app.use("/api/links", require("./routes/links"));
// app.use("/", require("./routes/redirect"));
// app.use("/", require("./routes/healthz"));


// 2. API routes (MUST come before redirect)
app.use("/api/links", require("./routes/links"));

// 3. Healthcheck route
app.use("/", require("./routes/healthz"));

// 4. Redirect route (MUST ALWAYS BE LAST!!)
app.use("/", require("./routes/redirect"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));

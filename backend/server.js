const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/student", require("./routes/studentRoutes")); 

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

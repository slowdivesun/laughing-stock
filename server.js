const express = require("express");
const connectDB = require("./config/db");

const app = express();
var cors = require("cors");

app.use(cors());
// Connect Database
connectDB();

// Init middleware
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/conversations", require("./routes/api/conversations"));
app.use("/api/messages", require("./routes/api/messages"));

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

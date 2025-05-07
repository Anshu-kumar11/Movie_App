const express = require("express");
require("dotenv").config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
const port = process.env.PORT;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

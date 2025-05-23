require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/user");
const { mongooseConnection } = require("./config/config");
const { errorHandler } = require("./middlewares/error");
require("express-async-errors");
const app = express();
const port = process.env.PORT;

app.use(express.json());
mongooseConnection();
app.use("/api/user", userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is runnning on http://localhost:${port}`);
});

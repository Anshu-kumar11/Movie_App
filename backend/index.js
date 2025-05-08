require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/user");
const { mongooseConnection } = require("./config/config");

const app = express();
const port = process.env.PORT;

app.use(express.json());
mongooseConnection();
app.use("/api/user", userRouter);

app.post(
  "/sign-in",
  (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "email and password are missing" });
    }
    next();
  },
  (req, res) => {
    res.status(200).json({
      message: "this is about page",
    });
  }
);

app.listen(port, () => {
  console.log(`Server is runnning on http://localhost:${port}`);
});

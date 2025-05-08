const mongoose = require("mongoose");
require("dotenv").config();
exports.mongooseConnection = () => {
  mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
      console.log("DB CONNECTION SUCCESSFULLY");
    })
    .catch((err) => {
      console.log("error occur during db connection", err);
    });
};

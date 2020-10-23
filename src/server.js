const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");

//setup environment variables
env.config();

//connect mongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.uwl1f.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("MongoDB Connected!");
  });

//routes
const userRoutes = require("./routes/user/auth");
const adminRoutes = require("./routes/admin/auth");

app.use(express.json());

//route middleware
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at port: ${process.env.PORT}`);
});

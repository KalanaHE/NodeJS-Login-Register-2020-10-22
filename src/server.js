const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");

//setup environ variables
env.config();

//connect mongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.uwl1f.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB Connected!");
  });

//routes
const userRoutes = require("./routes/user");

app.use(express.json());

//route middleware
app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at port: ${process.env.PORT}`);
});

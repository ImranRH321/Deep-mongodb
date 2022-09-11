const express = require("express");
const app = express();
const serviceRouter = require("./routes/services.route");
const { connectToServer } = require("./utils/dbConnact");

const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 5000;

connectToServer(err => {
  if (!err) {
    app.listen(PORT, () => {
      console.log("server si running");
    });
  } else {
    console.log(err.message);
  }
});

// Middleware
app.use(express.json());
app.use("/api/v1", serviceRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(errorHandler)

process.on('uncaughtException', (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1)
  })
})

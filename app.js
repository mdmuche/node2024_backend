const express = require("express");

const comm = require("./utils/connectDb");

const app = express();

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.json({ home: "homepage" });
});

//start server
comm(() => {
  app.listen(4000, () => {
    console.log("listening for request at port 4000");
  });
});

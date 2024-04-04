const express = require("express");
const cors = require("cors");

const { router } = require("./routes/productRoutes");
const comm = require("./utils/connectDb");
let origin = ["http://localhost:3000"];
const path = require("path");
const { authRouter } = require("./routes/authRouter");

const app = express();

//middleware
app.use(cors({ credentials: true, origin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/api/user", authRouter);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.send(path.join(__dirname, "/client/build", "index.html"));
});

//start server
comm(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`listening for request at port ${process.env.PORT}`);
  });
});
